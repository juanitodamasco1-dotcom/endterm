import { ReviewStatus, RouteId } from "@/types/club";

export const LOGO_SRC = "/assets/logo.png";
export const SESSION_KEY = "campus_club_session_v6";
export const STORE_KEY = "campus_shared_v3";

export const CATEGORIES = [
  "Academic",
  "Arts & Culture",
  "Community Service",
  "Environmental",
  "Religious",
  "Sports & Recreation",
  "Special Interest",
  "Student Governance",
];

export const YEAR_LEVELS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
  "Graduate",
];

export const ROLES = [
  "President",
  "Vice President",
  "Secretary",
  "Treasurer",
  "Public Information Officer",
  "Committee Head",
  "Member",
];

export const MAX_EVENT_PHOTOS = 6;
export const MAX_ACCRED_PHOTOS = 4;

export const REVIEW_LABELS: Record<ReviewStatus, string> = {
  draft: "Not submitted",
  pending: "Pending review",
  approved: "Approved",
  declined: "Declined",
  missing: "Missing info",
};

export const NAV_ITEMS: { id: RouteId; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "◆" },
  { id: "events", label: "Events", icon: "▤" },
  { id: "calendar", label: "Calendar", icon: "▦" },
  { id: "reports", label: "Reports", icon: "◔" },
  { id: "profile", label: "Club Profile", icon: "●" },
  { id: "settings", label: "Settings", icon: "⚙" },
];
