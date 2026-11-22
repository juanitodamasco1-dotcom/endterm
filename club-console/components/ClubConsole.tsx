"use client";

import React, { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { LOGO_SRC, NAV_ITEMS } from "@/lib/constants";
import {
  isSuspended,
  readSessionEmail,
  saveClubRecord,
  Store,
  writeSessionEmail,
} from "@/lib/store";
import { Club, RouteId } from "@/types/club";
import { ToastProvider, useToast } from "@/components/ToastProvider";
import { LandingView } from "@/components/views/LandingView";
import { PendingShellView } from "@/components/views/PendingShellView";
import { OverviewView } from "@/components/views/OverviewView";
import { SettingsView } from "@/components/views/SettingsView";
import { EventsView } from "@/components/views/EventsView";
import { CalendarView } from "@/components/views/CalendarView";
import { ReportsView } from "@/components/views/ReportsView";
import { ProfileView } from "@/components/views/ProfileView";

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

const emptySubscribe = () => () => {};
function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function ClubConsoleInner() {
  const { toast } = useToast();
  const ready = useIsClient();
  const [clubs, setClubs] = useState<Club[]>(() => Store.read().clubs);
  const [standing, setStanding] = useState<Record<string, string>>(
    () => Store.read().standing
  );
  const [sessionEmail, setSessionEmail] = useState<string | null>(() =>
    readSessionEmail()
  );
  const [route, setRoute] = useState<RouteId>("overview");

  useEffect(() => {
    return Store.subscribe(() => {
      if (userIsBusy()) return;
      const latest = Store.read();
      setClubs(latest.clubs);
      setStanding(latest.standing);
    });
  }, []);

  const handleSignIn = useCallback((email: string) => {
    writeSessionEmail(email);
    setSessionEmail(email);
    setRoute("overview");
  }, []);

  const handleRegister = useCallback(
    (newClub: Club, email: string) => {
      const nextClubs = saveClubRecord(newClub, email, (m) => toast(m, true));
      setClubs(nextClubs);
      setSessionEmail(email);
    },
    [toast]
  );

  const handleLogout = useCallback(() => {
    writeSessionEmail(null);
    setSessionEmail(null);
    setRoute("overview");
  }, []);

  const handleUpdateClub = useCallback(
    (updatedClub: Club, nextSessionEmail?: string) => {
      const targetEmail = nextSessionEmail ?? sessionEmail;
      const nextClubs = saveClubRecord(updatedClub, targetEmail, (m) =>
        toast(m, true)
      );
      setClubs(nextClubs);
      if (nextSessionEmail) setSessionEmail(nextSessionEmail);
    },
    [sessionEmail, toast]
  );

  if (!ready) {
    return <div id="app" />;
  }

  if (!sessionEmail) {
    return (
      <div id="app">
        <LandingView
          clubs={clubs}
          onSignIn={handleSignIn}
          onRegister={handleRegister}
        />
      </div>
    );
  }

  const activeClub =
    clubs.find((c) => c.account.application.adviserEmail === sessionEmail) || null;

  if (!activeClub) {
    return (
      <div id="app">
        <LandingView
          clubs={clubs}
          onSignIn={handleSignIn}
          onRegister={handleRegister}
        />
      </div>
    );
  }

  if (activeClub.account.status !== "approved") {
    return (
      <div id="app">
        <PendingShellView
          club={activeClub}
          onLogout={handleLogout}
          onResubmit={(updated, newEmail) => handleUpdateClub(updated, newEmail)}
        />
      </div>
    );
  }

  const suspended = isSuspended(activeClub, standing);
  const brandTitle = activeClub.branding?.title || "Club Console";
  const brandSub =
    activeClub.branding?.sub || activeClub.account.application.clubName;

  return (
    <div id="app">
      <div className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_SRC} alt="Logo" />
          </div>
          <div className="brand-text">
            <div className="name">{brandTitle}</div>
            <div className="sub">{brandSub}</div>
          </div>
        </div>

        {NAV_ITEMS.map((n) => (
          <button
            key={n.id}
            type="button"
            className={`nav-item${route === n.id ? " active" : ""}`}
            onClick={() => setRoute(n.id)}
          >
            <span>{n.icon}</span>
            <span>{n.label}</span>
          </button>
        ))}

        <div className="nav-status">
          <span className={`status-pill ${suspended ? "rejected" : "approved"}`}>
            {suspended ? "Suspended" : "Approved"}
          </span>
          <div style={{ marginTop: "8px" }}>
            Club ID:{" "}
            <span className="mono">{activeClub.account.officialClubId}</span>
          </div>
          <button
            type="button"
            className="btn ghost small"
            id="logoutBtn"
            style={{ width: "100%", marginTop: "10px" }}
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>

      <main id="main">
        {suspended && (
          <div
            className="card"
            style={{
              borderColor: "var(--bad)",
              background: "var(--bad-bg)",
              color: "var(--bad)",
              marginBottom: "16px",
            }}
          >
            <b>This club is suspended by the registrar.</b> You can view your
            records, but new events can&apos;t be submitted until the registrar
            reactivates the club.
          </div>
        )}

        {route === "overview" && <OverviewView club={activeClub} />}
        {route === "settings" && (
          <SettingsView club={activeClub} onUpdateClub={handleUpdateClub} />
        )}
        {route === "events" && (
          <EventsView
            club={activeClub}
            allClubs={clubs}
            suspended={suspended}
            onUpdateClub={handleUpdateClub}
          />
        )}
        {route === "calendar" && (
          <CalendarView club={activeClub} allClubs={clubs} />
        )}
        {route === "reports" && <ReportsView club={activeClub} />}
        {route === "profile" && (
          <ProfileView
            club={activeClub}
            onClearRecords={() => {
              handleUpdateClub({ ...activeClub, members: [], events: [] });
              setRoute("overview");
            }}
          />
        )}
      </main>
    </div>
  );
}

export function ClubConsole() {
  return (
    <ToastProvider>
      <ClubConsoleInner />
    </ToastProvider>
  );
}
