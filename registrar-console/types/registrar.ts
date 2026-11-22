export type RegistrarRouteId =
  | "dashboard"
  | "applications"
  | "clubs"
  | "events"
  | "calendar"
  | "reports"
  | "settings";

export type EventAppStatus = "pending" | "approved" | "declined" | "missing";

export interface RegistrarAuth {
  username?: string;
  passwordHash: string | null;
  loggedIn: boolean;
}

export interface RegistrarApplication {
  shared?: boolean;
  id: string;
  clubEmail?: string;
  clubName: string;
  category: string;
  description: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  decidedAt: string | null;
  reason: string | null;
  assignedClubId: string | null;
  adviserFirstName: string;
  adviserMiddleName: string;
  adviserLastName: string;
  adviserExtName: string;
  adviserEmail: string;
  presidentFirstName: string;
  presidentMiddleName: string;
  presidentLastName: string;
  presidentExtName: string;
  presidentEmail: string;
}

export interface RegistrarClub {
  shared?: boolean;
  id: string;
  name: string;
  category: string;
  status: "active" | "suspended";
  approvedAt: string | null;
  members: number | null;
  adviserFirstName: string;
  adviserMiddleName: string;
  adviserLastName: string;
  adviserExtName: string;
  adviserEmail: string;
  presidentFirstName: string;
  presidentMiddleName: string;
  presidentLastName: string;
  presidentExtName: string;
  presidentEmail: string;
}

export interface RegistrarEventApp {
  shared?: boolean;
  key: string;
  clubId: string;
  clubName: string;
  eventId: string;
  name: string;
  category: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  target: number | null;
  photos: string[];
  submittedAt: string;
  status: EventAppStatus;
  note: string;
  decidedAt: string | null;
  resubmitted: boolean;
}

export interface RegistrarEvent {
  shared?: boolean;
  id: string;
  appKey: string;
  clubId: string;
  clubName: string;
  name: string;
  category: string;
  date: string;
  target: number | null;
}

export interface RegistrarState {
  auth: RegistrarAuth;
  applications: RegistrarApplication[];
  clubs: RegistrarClub[];
  events: RegistrarEvent[];
  eventApps: RegistrarEventApp[];
}
