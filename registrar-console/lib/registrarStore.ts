import { Store } from "@/lib/store";
import {
  RegistrarApplication,
  RegistrarClub,
  RegistrarEvent,
  RegistrarEventApp,
  RegistrarState,
} from "@/types/registrar";

export const REGISTRAR_STORAGE_KEY = "campus_admin_state_v5";

export const EVAPP_LABELS: Record<RegistrarEventApp["status"], string> = {
  pending: "Pending review",
  approved: "Approved",
  declined: "Declined",
  missing: "Missing info",
};

export const REGISTRAR_NAV: {
  id:
    | "dashboard"
    | "applications"
    | "clubs"
    | "events"
    | "calendar"
    | "reports"
    | "settings";
  label: string;
  icon: string;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: "◆" },
  { id: "applications", label: "Applications", icon: "✉" },
  { id: "clubs", label: "Clubs Registry", icon: "☰" },
  { id: "events", label: "Event Applications", icon: "▤" },
  { id: "calendar", label: "Calendar", icon: "▦" },
  { id: "reports", label: "Reports", icon: "◔" },
  { id: "settings", label: "Settings", icon: "●" },
];

/**
 * Default sample admin account (replace with real accounts once the
 * shared database is connected).
 *   username: registrar
 *   password: Registrar2026!
 */
export const DEFAULT_ADMIN_USERNAME = "registrar";
export const DEFAULT_ADMIN_PASSWORD_HASH =
  "6d13d288edebfcde2d45287cd1dd276e0727195d82344feb0d756a8212e30fe6";

export function defaultRegistrarState(): RegistrarState {
  return {
    auth: {
      username: DEFAULT_ADMIN_USERNAME,
      passwordHash: DEFAULT_ADMIN_PASSWORD_HASH,
      loggedIn: false,
    },
    applications: [],
    clubs: [],
    events: [],
    eventApps: [],
  };
}

function isImg(s: unknown): s is string {
  return (
    typeof s === "string" &&
    /^data:image\/(png|jpe?g|gif|webp);base64,/.test(s)
  );
}

export function syncSharedIntoRegistrar(base: RegistrarState): RegistrarState {
  const db = Store.read();
  const applications: RegistrarApplication[] = base.applications.filter(
    (x) => !x.shared
  );
  const clubs: RegistrarClub[] = base.clubs.filter((x) => !x.shared);
  const events: RegistrarEvent[] = base.events.filter((x) => !x.shared);
  const eventApps: RegistrarEventApp[] = [];

  db.clubs.forEach((rec) => {
    const acc = rec.account;
    const ap = acc?.application;
    if (!ap) return;

    const pres = (rec.members || []).find((m) => m.role === "President");
    const P = {
      presidentFirstName: pres?.firstName || "",
      presidentMiddleName: pres?.middleName || "",
      presidentLastName: pres?.lastName || "",
      presidentExtName: pres?.extName || "",
      presidentEmail: pres?.email || "",
    };
    const A = {
      adviserFirstName: ap.adviserFirstName,
      adviserMiddleName: ap.adviserMiddleName,
      adviserLastName: ap.adviserLastName,
      adviserExtName: ap.adviserExtName,
      adviserEmail: ap.adviserEmail,
    };

    applications.push({
      shared: true,
      id: ap.appId || `APP-${acc.officialClubId || ap.adviserEmail}`,
      clubEmail: ap.adviserEmail,
      clubName: ap.clubName,
      category: ap.category,
      description: ap.description || "",
      submittedAt:
        ap.submittedAt || acc.approvedAt || "1970-01-01T00:00:00.000Z",
      status:
        acc.status === "approved"
          ? "approved"
          : acc.status === "rejected"
          ? "rejected"
          : "pending",
      decidedAt: acc.approvedAt || null,
      reason: acc.rejectionReason || null,
      assignedClubId: acc.officialClubId || null,
      ...A,
      ...P,
    });

    if (acc.status !== "approved" || !acc.officialClubId) return;
    const cid = acc.officialClubId;

    clubs.push({
      shared: true,
      id: cid,
      name: ap.clubName,
      category: ap.category,
      status: db.standing?.[cid] === "suspended" ? "suspended" : "active",
      approvedAt: acc.approvedAt,
      members: (rec.members || []).length,
      ...A,
      ...P,
    });

    (rec.events || []).forEach((ev) => {
      const rv = ev.review || { status: "draft" as const };
      if (rv.status === "draft") return;
      const key = `${cid}|${ev.id}`;
      eventApps.push({
        shared: true,
        key,
        clubId: cid,
        clubName: ap.clubName,
        eventId: ev.id,
        name: ev.name,
        category: ev.category,
        description: ev.description || "",
        date: ev.date,
        startTime: ev.startTime || "",
        endTime: ev.endTime || "",
        venue: ev.venue || "",
        target: ev.targetParticipants || null,
        photos: (ev.photos || []).filter(isImg),
        submittedAt: rv.submittedAt || "",
        status: rv.status as RegistrarEventApp["status"],
        note: rv.note || "",
        decidedAt: rv.decidedAt || null,
        resubmitted: !!rv.resubmitted,
      });

      if (rv.status === "approved") {
        events.push({
          shared: true,
          id: ev.id,
          appKey: key,
          clubId: cid,
          clubName: ap.clubName,
          name: ev.name,
          category: ev.category,
          date: ev.date,
          target: ev.targetParticipants || null,
        });
      }
    });
  });

  return {
    ...base,
    applications,
    clubs,
    events,
    eventApps,
  };
}

export function loadRegistrarState(): RegistrarState {
  let state: RegistrarState | null = null;
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(REGISTRAR_STORAGE_KEY);
      if (raw) state = JSON.parse(raw) as RegistrarState;
    } catch {
      // ignore
    }
  }
  if (!state) {
    state = defaultRegistrarState();
    saveRegistrarState(state);
  }
  if (!state.eventApps) state.eventApps = [];
  // Older saves may have no admin account yet — seed the sample one.
  if (!state.auth) state.auth = defaultRegistrarState().auth;
  if (!state.auth.username) state.auth.username = DEFAULT_ADMIN_USERNAME;
  if (!state.auth.passwordHash) state.auth.passwordHash = DEFAULT_ADMIN_PASSWORD_HASH;
  return syncSharedIntoRegistrar(state);
}

export function saveRegistrarState(
  state: RegistrarState,
  onError?: (msg: string) => void
) {
  if (typeof window === "undefined") return;
  try {
    const copy: RegistrarState = {
      ...state,
      applications: state.applications.filter((x) => !x.shared),
      clubs: state.clubs.filter((x) => !x.shared),
      events: state.events.filter((x) => !x.shared),
      eventApps: [],
    };
    localStorage.setItem(REGISTRAR_STORAGE_KEY, JSON.stringify(copy));
  } catch {
    onError?.("Couldn't save — your browser storage may be full or blocked.");
  }
}
