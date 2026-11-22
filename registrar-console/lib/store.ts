import { SESSION_KEY, STORE_KEY } from "@/lib/constants";
import { getDefaultClubs } from "@/lib/defaultClubs";
import { Club, SharedDb } from "@/types/club";

const LEGACY_KEYS = [
  "campus_shared_v1",
  "campus_shared_v2",
  "campus_admin_state_v4",
  "campus_club_session_v5",
];

let clearedLegacy = false;
function clearLegacyOnce() {
  if (clearedLegacy || typeof window === "undefined") return;
  clearedLegacy = true;
  try {
    LEGACY_KEYS.forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignore storage errors
  }
}

export const Store = {
  read(): SharedDb {
    clearLegacyOnce();
    if (typeof window === "undefined") {
      return { clubs: getDefaultClubs(), standing: {} };
    }
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SharedDb;
        if (parsed && Array.isArray(parsed.clubs) && parsed.clubs.length > 0) {
          parsed.standing = parsed.standing || {};
          return parsed;
        }
      }
    } catch {
      // ignore parse errors
    }
    const db: SharedDb = { clubs: getDefaultClubs(), standing: {} };
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(db));
    } catch {
      // ignore storage errors
    }
    return db;
  },

  write(db: SharedDb, onError?: (msg: string) => void) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(db));
    } catch {
      onError?.("Couldn't save — your browser storage may be full or blocked.");
    }
  },

  update(fn: (db: SharedDb) => void, onError?: (msg: string) => void): SharedDb {
    const db = Store.read();
    fn(db);
    Store.write(db, onError);
    return db;
  },

  subscribe(cb: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORE_KEY) cb();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", cb);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", cb);
    };
  },
};

export function readSessionEmail(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(SESSION_KEY) || null;
  } catch {
    return null;
  }
}

export function writeSessionEmail(email: string | null) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SESSION_KEY, email || "");
  } catch {
    // ignore
  }
}

export function isSuspended(club: Club | null, standing?: Record<string, string>): boolean {
  const id = club?.account?.officialClubId;
  if (!id) return false;
  const map = standing ?? Store.read().standing ?? {};
  return map[id] === "suspended";
}

export function saveClubRecord(
  mine: Club,
  sessionEmail: string | null,
  onError?: (msg: string) => void
): Club[] {
  writeSessionEmail(sessionEmail);
  const updated = Store.update((db) => {
    const key = mine.account.application.adviserEmail;
    const idx = db.clubs.findIndex((c) => c.account.application.adviserEmail === key);
    if (idx === -1) {
      db.clubs.push(mine);
      return;
    }
    const f = db.clubs[idx];
    const clonedMine: Club = JSON.parse(JSON.stringify(mine));
    if (
      f.account.application.appId === clonedMine.account.application.appId &&
      f.account.status !== "pending" &&
      clonedMine.account.status === "pending"
    ) {
      clonedMine.account = {
        ...clonedMine.account,
        status: f.account.status,
        officialClubId: f.account.officialClubId,
        approvedAt: f.account.approvedAt,
        rejectionReason: f.account.rejectionReason,
      };
    }
    (clonedMine.events || []).forEach((ev) => {
      const fe = (f.events || []).find((x) => x.id === ev.id);
      const lt = ev.review ? ev.review.decidedAt || ev.review.submittedAt || "" : "";
      if (fe?.review?.decidedAt && fe.review.decidedAt > lt) {
        ev.review = fe.review;
      }
    });
    db.clubs[idx] = clonedMine;
  }, onError);
  return updated.clubs;
}
