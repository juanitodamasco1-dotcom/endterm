export type AccountStatus = "unregistered" | "pending" | "approved" | "rejected";
export type ReviewStatus = "draft" | "pending" | "approved" | "declined" | "missing";
export type EventStatusOverride = "auto" | "cancelled";
export type ComputedEventStatus = "upcoming" | "ongoing" | "completed" | "cancelled";

export interface ClubApplication {
  appId: string;
  clubName: string;
  category: string;
  adviserFirstName: string;
  adviserMiddleName: string;
  adviserLastName: string;
  adviserExtName: string;
  adviserEmail: string;
  description: string;
  accreditationPhotos: string[];
  accreditationProof: string | null;
  submittedAt: string;
}

export interface ClubAccount {
  status: AccountStatus;
  officialClubId: string | null;
  approvedAt: string | null;
  rejectionReason: string | null;
  lastAppCode: string | null;
  lastApprovalCode: string | null;
  application: ClubApplication;
}

export interface Member {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  extName: string;
  email: string;
  program: string;
  year: string;
  role: string;
  joinedAt: string;
}

export interface Collaborator {
  clubId: string;
  clubName: string;
}

export interface EventReview {
  status: ReviewStatus;
  note?: string;
  submittedAt?: string;
  decidedAt?: string;
  resubmitted?: boolean;
}

export interface ClubEvent {
  id: string;
  name: string;
  category: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  targetParticipants: number | null;
  status: EventStatusOverride;
  photos: string[];
  collaborators: Collaborator[];
  externalPartners: string[];
  review?: EventReview;
}

export interface ClubBranding {
  title?: string;
  sub?: string;
}

export interface Club {
  passwordHash: string;
  account: ClubAccount;
  members: Member[];
  events: ClubEvent[];
  branding?: ClubBranding;
}

export interface SharedDb {
  clubs: Club[];
  standing: Record<string, string>;
}

export type RouteId = "settings" | "overview" | "events" | "calendar" | "reports" | "profile";
