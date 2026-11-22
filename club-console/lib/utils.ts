import { ClubApplication, ClubEvent, ComputedEventStatus, EventReview } from "@/types/club";

export function uid(prefix: string): string {
  if (typeof window !== "undefined" && window.crypto && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID().split("-")[0].toUpperCase()}`;
  }
  return `${prefix}-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function fmtDate(s?: string | null): string {
  if (!s) return "—";
  const d = new Date(`${s}T00:00:00`);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function fmtDateTime(iso?: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}, ${d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`;
}

export async function sha256Hex(text: string): Promise<string> {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function normalizeEmail(s?: string | null): string {
  return (s || "").trim().toLowerCase();
}

export function isEmail(s?: string | null): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((s || "").trim());
}

export function fullName(
  first?: string | null,
  middle?: string | null,
  last?: string | null,
  ext?: string | null
): string {
  const parts = [first, middle, last].map((s) => (s || "").trim()).filter(Boolean);
  let out = parts.join(" ");
  const e = (ext || "").trim();
  if (e) out += (out ? " " : "") + e;
  return out;
}

export function eventStatusAuto(ev: ClubEvent): ComputedEventStatus {
  if (ev.status === "cancelled") return "cancelled";
  const t = todayStr();
  if (ev.date > t) return "upcoming";
  if (ev.date === t) return "ongoing";
  return "completed";
}

export function reviewOf(ev: ClubEvent): EventReview {
  return ev.review || { status: "draft" };
}

export function getAccredList(app?: Partial<ClubApplication> | null): string[] {
  if (!app) return [];
  if (Array.isArray(app.accreditationPhotos) && app.accreditationPhotos.length) {
    return app.accreditationPhotos.slice();
  }
  if (app.accreditationProof) return [app.accreditationProof];
  return [];
}

export function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(new Error("read"));
    fr.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("img"));
      img.onload = () => {
        const max = 560;
        const sc = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * sc);
        c.height = Math.round(img.height * sc);
        const ctx = c.getContext("2d");
        if (!ctx) {
          reject(new Error("canvas"));
          return;
        }
        ctx.drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.55));
      };
      img.src = String(fr.result);
    };
    fr.readAsDataURL(file);
  });
}
