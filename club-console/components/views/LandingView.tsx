"use client";

import React, { useState } from "react";
import { CATEGORIES, LOGO_SRC } from "@/lib/constants";
import { isEmail, normalizeEmail, sha256Hex, uid } from "@/lib/utils";
import { Club } from "@/types/club";
import { ClubDetailFields, ClubDetailValue } from "@/components/ClubDetailFields";
import { ImagePreviewModal } from "@/components/ImagePreviewModal";
import { useToast } from "@/components/ToastProvider";
import { SystemSwitch } from "@/components/SystemSwitch";

const REGISTRAR_URL = process.env.NEXT_PUBLIC_REGISTRAR_URL || "http://localhost:3001";

interface LandingViewProps {
  clubs: Club[];
  onSignIn: (email: string) => void;
  onRegister: (club: Club, email: string) => void;
}

const emptyDetail = (): ClubDetailValue => ({
  clubName: "",
  category: CATEGORIES[0],
  adviser: {
    firstName: "",
    middleName: "",
    lastName: "",
    extName: "",
    email: "",
  },
  description: "",
  accreditationPhotos: [],
});

export function LandingView({ clubs, onSignIn, onRegister }: LandingViewProps) {
  const { toast } = useToast();
  const [tab, setTab] = useState<"signin" | "register">("signin");

  // Sign-in state
  const [selectedSample, setSelectedSample] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register state
  const [detail, setDetail] = useState<ClubDetailValue>(emptyDetail);
  const [regPassword, setRegPassword] = useState("");
  const [regPassword2, setRegPassword2] = useState("");
  const [preview, setPreview] = useState<{ src: string; title: string } | null>(null);

  const handleSampleChange = (val: string) => {
    setSelectedSample(val);
    if (val) {
      setEmail(val);
      setPassword("ClubPass2026!");
    }
  };

  const handleSignIn = async () => {
    const norm = normalizeEmail(email);
    const pw = password.trim();
    if (!norm || !pw) {
      toast("Enter your email and password.", true);
      return;
    }
    const club = clubs.find((c) => c.account.application.adviserEmail === norm);
    if (!club) {
      toast("No club found with that email.", true);
      return;
    }
    const hash = await sha256Hex(pw);
    if (hash !== club.passwordHash) {
      toast("Incorrect password.", true);
      return;
    }
    onSignIn(norm);
  };

  const handleRegister = async () => {
    const pw = regPassword.trim();
    const pw2 = regPassword2.trim();
    const adviserEmail = normalizeEmail(detail.adviser.email);

    if (
      !detail.clubName.trim() ||
      !detail.adviser.firstName.trim() ||
      !detail.adviser.lastName.trim() ||
      !adviserEmail
    ) {
      toast("Please fill in all required fields.", true);
      return;
    }
    if (!isEmail(adviserEmail)) {
      toast("Enter a valid email — this will be your sign-in.", true);
      return;
    }
    if (!detail.accreditationPhotos.length) {
      toast(
        "Please upload proof of club accreditation (picture or digital copy of approved papers).",
        true
      );
      return;
    }
    if (clubs.some((c) => c.account.application.adviserEmail === adviserEmail)) {
      toast("That email is already registered to a club.", true);
      return;
    }
    if (pw.length < 6) {
      toast("Password must be at least 6 characters.", true);
      return;
    }
    if (pw !== pw2) {
      toast("Passwords don't match.", true);
      return;
    }

    const appId = uid("APP");
    const passwordHash = await sha256Hex(pw);
    const photos = detail.accreditationPhotos.slice();
    const club: Club = {
      passwordHash,
      account: {
        status: "pending",
        officialClubId: null,
        approvedAt: null,
        rejectionReason: null,
        lastAppCode: null,
        lastApprovalCode: null,
        application: {
          appId,
          submittedAt: new Date().toISOString(),
          clubName: detail.clubName.trim(),
          category: detail.category || CATEGORIES[0],
          adviserFirstName: detail.adviser.firstName.trim(),
          adviserMiddleName: detail.adviser.middleName.trim(),
          adviserLastName: detail.adviser.lastName.trim(),
          adviserExtName: detail.adviser.extName.trim(),
          adviserEmail,
          description: detail.description.trim(),
          accreditationPhotos: photos,
          accreditationProof: photos[0] || null,
        },
      },
      members: [],
      events: [],
    };

    toast("Application submitted — the registrar will review it.");
    onRegister(club, adviserEmail);
  };

  return (
    <div className="landing">
      <div className="landing-hero" />
      <div className="landing-overlay" />
      <div className="landing-content">
        <div className="landing-brandline">
          <div className="mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_SRC} alt="Logo" />
          </div>
          <div className="name">Club Console</div>
          <div className="sub">JDJS University · Student Organizations</div>
        </div>
        <div className="gate-tabs" style={{ justifyContent: "center" }}>
          <button
            type="button"
            className={`gate-tab${tab === "signin" ? " active" : ""}`}
            onClick={() => setTab("signin")}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`gate-tab${tab === "register" ? " active" : ""}`}
            onClick={() => setTab("register")}
          >
            Register a club
          </button>
        </div>
        <div className="card">
          {tab === "signin" ? (
            <>
              <div className="field">
                <label htmlFor="liClubSelect">Quick select club (sample accounts)</label>
                <select
                  id="liClubSelect"
                  value={selectedSample}
                  onChange={(e) => handleSampleChange(e.target.value)}
                >
                  <option value="">-- Choose a club to auto-fill credentials --</option>
                  {clubs.map((c) => {
                    const em = c.account.application.adviserEmail;
                    const nm = c.account.application.clubName;
                    return (
                      <option key={em} value={em}>
                        {nm} ({em})
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="field">
                <label htmlFor="liEmail">Email</label>
                <input
                  id="liEmail"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="liPassword">Password</label>
                <input
                  id="liPassword"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSignIn();
                  }}
                />
              </div>
              <button
                type="button"
                className="btn primary"
                id="signInBtn"
                style={{ width: "100%" }}
                onClick={handleSignIn}
              >
                Sign in
              </button>
              <div className="demo-creds">
                <span>Demo account</span>
                <button
                  type="button"
                  className="demo-fill"
                  onClick={() => handleSampleChange("cs.society@jdjs.edu")}
                >
                  <code>cs.society@jdjs.edu</code> / <code>ClubPass2026!</code> · Use
                </button>
              </div>
            </>
          ) : (
            <>
              <p style={{ fontSize: "12.5px", color: "var(--ink-soft)", marginTop: 0 }}>
                Submit your club&apos;s details below — the adviser&apos;s email becomes your sign-in.
                The registrar will review it, and this page updates as soon as they decide.
              </p>
              <ClubDetailFields
                value={detail}
                onChange={setDetail}
                onPreviewPhoto={(src, title) => setPreview({ src, title })}
              />
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid var(--line)",
                  margin: "14px 0",
                }}
              />
              <div className="field-row">
                <div className="field">
                  <label htmlFor="regPassword">Password *</label>
                  <input
                    id="regPassword"
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="regPassword2">Confirm password *</label>
                  <input
                    id="regPassword2"
                    type="password"
                    value={regPassword2}
                    onChange={(e) => setRegPassword2(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn primary"
                id="submitApp"
                style={{ width: "100%" }}
                onClick={handleRegister}
              >
                Create account &amp; submit application
              </button>
            </>
          )}
        </div>
        <SystemSwitch
          href={REGISTRAR_URL}
          question="Registrar or student-affairs staff?"
          label="Go to Registrar Console"
        />
      </div>
      <ImagePreviewModal
        src={preview?.src ?? null}
        title={preview?.title}
        onClose={() => setPreview(null)}
      />
    </div>
  );
}
