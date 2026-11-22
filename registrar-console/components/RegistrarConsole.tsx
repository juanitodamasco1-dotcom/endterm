"use client";

import React, { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { LOGO_SRC } from "@/lib/constants";
import {
  DEFAULT_ADMIN_USERNAME,
  defaultRegistrarState,
  loadRegistrarState,
  REGISTRAR_NAV,
  saveRegistrarState,
  syncSharedIntoRegistrar,
} from "@/lib/registrarStore";
import { Store } from "@/lib/store";
import { sha256Hex, uid } from "@/lib/utils";
import {
  RegistrarApplication,
  RegistrarClub,
  RegistrarEventApp,
  RegistrarRouteId,
  RegistrarState,
} from "@/types/registrar";
import { ToastProvider, useToast } from "@/components/ToastProvider";
import { SystemSwitch } from "@/components/SystemSwitch";

const CLUB_URL = process.env.NEXT_PUBLIC_CLUB_URL || "http://localhost:3000";
import { RegistrarDashboardView } from "@/components/registrar/RegistrarDashboardView";
import { RegistrarApplicationsView } from "@/components/registrar/RegistrarApplicationsView";
import { RegistrarClubsView } from "@/components/registrar/RegistrarClubsView";
import { RegistrarEventAppsView } from "@/components/registrar/RegistrarEventAppsView";
import { RegistrarCalendarView } from "@/components/registrar/RegistrarCalendarView";
import { RegistrarReportsView } from "@/components/registrar/RegistrarReportsView";
import { RegistrarSettingsView } from "@/components/registrar/RegistrarSettingsView";

const emptySubscribe = () => () => {};
function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function userIsBusy(): boolean {
  if (typeof document === "undefined") return false;
  const tag = document.activeElement?.tagName;
  return (
    !!document.getElementById("modalBackdrop") ||
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT"
  );
}

function RegistrarConsoleInner() {
  const { toast } = useToast();
  const ready = useIsClient();
  const [state, setState] = useState<RegistrarState>(() =>
    loadRegistrarState()
  );
  const [route, setRoute] = useState<RegistrarRouteId>("dashboard");

  // Auth gate inputs
  const [authUser, setAuthUser] = useState("");
  const [authPass, setAuthPass] = useState("");

  useEffect(() => {
    return Store.subscribe(() => {
      if (userIsBusy()) return;
      setState((prev) => syncSharedIntoRegistrar(prev));
    });
  }, []);

  const persistAndSync = useCallback(
    (next: RegistrarState) => {
      saveRegistrarState(next, (m) => toast(m, true));
      setState(syncSharedIntoRegistrar(next));
    },
    [toast]
  );

  const handleLogin = async () => {
    const user = authUser.trim().toLowerCase();
    const pass = authPass.trim();
    if (!user || !pass) {
      toast("Enter your username and password.", true);
    }
    const expectedUser = (state.auth.username || DEFAULT_ADMIN_USERNAME).toLowerCase();
    const h = await sha256Hex(pass);
    if (user === expectedUser && h === state.auth.passwordHash) {
      const next: RegistrarState = {
        ...state,
        auth: { ...state.auth, loggedIn: true },
      };
      setAuthPass("");
      persistAndSync(next);
    } else {
      toast("Incorrect username or password.", true);
    }
  };

  const handleLogout = () => {
    const next: RegistrarState = {
      ...state,
      auth: { ...state.auth, loggedIn: false },
    };
    persistAndSync(next);
  };

  const handleApproveApp = (a: RegistrarApplication) => {
    const clubId = uid("CLB");
    const when = new Date().toISOString();
    let next = state;
    if (a.shared) {
      Store.update(
        (db) => {
          const rec = db.clubs.find(
            (c) => c.account.application.adviserEmail === a.clubEmail
          );
          if (rec) {
            rec.account.status = "approved";
            rec.account.officialClubId = clubId;
            rec.account.approvedAt = when;
            rec.account.rejectionReason = null;
          }
        },
        (m) => toast(m, true)
      );
    } else {
      next = {
        ...state,
        applications: state.applications.map((x) =>
          x.id === a.id
            ? {
                ...x,
                status: "approved",
                decidedAt: when,
                assignedClubId: clubId,
              }
            : x
        ),
        clubs: [
          ...state.clubs,
          {
            id: clubId,
            name: a.clubName,
            category: a.category,
            adviserFirstName: a.adviserFirstName,
            adviserMiddleName: a.adviserMiddleName,
            adviserLastName: a.adviserLastName,
            adviserExtName: a.adviserExtName,
            adviserEmail: a.adviserEmail,
            presidentFirstName: a.presidentFirstName,
            presidentMiddleName: a.presidentMiddleName,
            presidentLastName: a.presidentLastName,
            presidentExtName: a.presidentExtName,
            presidentEmail: a.presidentEmail,
            status: "active",
            approvedAt: when,
            members: null,
          },
        ],
      };
    }
    persistAndSync(next);
    toast("Club approved — their dashboard unlocks automatically.");
  };

  const handleRejectApp = (a: RegistrarApplication, reason: string) => {
    const when = new Date().toISOString();
    let next = state;
    if (a.shared) {
      Store.update(
        (db) => {
          const rec = db.clubs.find(
            (c) => c.account.application.adviserEmail === a.clubEmail
          );
          if (rec) {
            rec.account.status = "rejected";
            rec.account.rejectionReason = reason;
          }
        },
        (m) => toast(m, true)
      );
    } else {
      next = {
        ...state,
        applications: state.applications.map((x) =>
          x.id === a.id
            ? { ...x, status: "rejected", decidedAt: when, reason }
            : x
        ),
      };
    }
    persistAndSync(next);
    toast("Application rejected — the club can see the reason.");
  };

  const handleToggleClub = (club: RegistrarClub) => {
    const nextStatus = club.status === "active" ? "suspended" : "active";
    if (club.shared) {
      Store.update(
        (db) => {
          db.standing[club.id] = nextStatus;
        },
        (m) => toast(m, true)
      );
    }
    const next: RegistrarState = {
      ...state,
      clubs: state.clubs.map((c) =>
        c.id === club.id ? { ...c, status: nextStatus } : c
      ),
    };
    persistAndSync(next);
    toast(`Club ${nextStatus === "active" ? "reactivated" : "suspended"}.`);
  };

  const handleDecideEventApp = (
    app: RegistrarEventApp,
    decision: "approved" | "missing" | "declined",
    note: string
  ) => {
    const when = new Date().toISOString();
    const finalNote = decision === "approved" ? "" : note;
    Store.update(
      (db) => {
        const rec = db.clubs.find(
          (c) => c.account.officialClubId === app.clubId
        );
        const ev = rec?.events?.find((x) => x.id === app.eventId);
        if (ev) {
          ev.review = {
            status: decision,
            note: finalNote,
            submittedAt: app.submittedAt,
            decidedAt: when,
            resubmitted: false,
          };
        }
      },
      (m) => toast(m, true)
    );
    persistAndSync(state);
    const msg =
      decision === "approved"
        ? "Event approved"
        : decision === "declined"
        ? "Event declined"
        : "Marked as missing info";
    toast(`${msg} — the club sees it right away.`);
  };

  if (!ready) {
    return <div id="app" />;
  }

  if (!state.auth.passwordHash || !state.auth.loggedIn) {
    return (
      <div id="app">
        <div className="landing">
          <div className="landing-hero" />
          <div className="landing-overlay" />
          <div className="landing-content">
            <div className="landing-brandline">
              <div className="mark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={LOGO_SRC} alt="Logo" />
              </div>
              <div className="name">Registrar Console</div>
              <div className="sub">
                JDJS University · Office of Student Affairs
              </div>
            </div>
            <div className="card">
              <h2 className="auth-title">Staff sign in</h2>
              <p className="auth-sub">
                For registrar and student-affairs staff only.
              </p>
              <div className="field">
                <label htmlFor="authUser">Username</label>
                <input
                  id="authUser"
                  type="text"
                  autoComplete="username"
                  value={authUser}
                  onChange={(e) => setAuthUser(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="authPass">Password</label>
                <input
                  id="authPass"
                  type="password"
                  autoComplete="current-password"
                  value={authPass}
                  onChange={(e) => setAuthPass(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin();
                  }}
                />
              </div>
              <button
                type="button"
                className="btn primary"
                style={{ width: "100%" }}
                onClick={handleLogin}
              >
                Sign in
              </button>
              <div className="demo-creds">
                <span>Demo account</span>
                <button
                  type="button"
                  className="demo-fill"
                  onClick={() => {
                    setAuthUser(DEFAULT_ADMIN_USERNAME);
                    setAuthPass("Registrar2026!");
                  }}
                >
                  <code>registrar</code> / <code>Registrar2026!</code> · Use
                </button>
              </div>
            </div>
            <SystemSwitch
              href={CLUB_URL}
              question="Are you a club officer or adviser?"
              label="Go to Club Console"
            />
          </div>
        </div>
      </div>
    );
  }

  const pendingApps = state.applications.filter(
    (a) => a.status === "pending"
  ).length;
  const pendingEvents = state.eventApps.filter(
    (a) => a.status === "pending"
  ).length;

  return (
    <div id="app">
      <div className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_SRC} alt="Logo" />
          </div>
          <div className="brand-text">
            <div className="name">Registrar Console</div>
            <div className="sub">Student org oversight</div>
          </div>
        </div>

        {REGISTRAR_NAV.map((n) => {
          const cnt =
            n.id === "applications"
              ? pendingApps
              : n.id === "events"
              ? pendingEvents
              : 0;
          return (
            <button
              key={n.id}
              type="button"
              className={`nav-item${route === n.id ? " active" : ""}`}
              onClick={() => setRoute(n.id)}
            >
              <span>{n.icon}</span>
              <span>{n.label}</span>
              {cnt > 0 && <span className="nav-badge">{cnt}</span>}
            </button>
          );
        })}

        <div className="nav-foot">
          <a
            href={CLUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="system-link"
          >
            <span>Club Console</span>
            <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className="btn ghost small"
            style={{ width: "100%" }}
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>

      <main id="main">
        {route === "dashboard" && <RegistrarDashboardView state={state} />}
        {route === "applications" && (
          <RegistrarApplicationsView
            applications={state.applications}
            onApprove={handleApproveApp}
            onReject={handleRejectApp}
          />
        )}
        {route === "clubs" && (
          <RegistrarClubsView
            clubs={state.clubs}
            onToggleClub={handleToggleClub}
          />
        )}
        {route === "events" && (
          <RegistrarEventAppsView
            eventApps={state.eventApps}
            onDecide={handleDecideEventApp}
          />
        )}
        {route === "calendar" && (
          <RegistrarCalendarView events={state.events} clubs={state.clubs} />
        )}
        {route === "reports" && <RegistrarReportsView state={state} />}
        {route === "settings" && (
          <RegistrarSettingsView
            onChangePassword={(passwordHash) =>
              persistAndSync({
                ...state,
                auth: { ...state.auth, passwordHash },
              })
            }
            onResetAll={() => {
              const blank = defaultRegistrarState();
              setRoute("dashboard");
              persistAndSync(blank);
            }}
          />
        )}
      </main>
    </div>
  );
}

export function RegistrarConsole() {
  return (
    <ToastProvider>
      <RegistrarConsoleInner />
    </ToastProvider>
  );
}
