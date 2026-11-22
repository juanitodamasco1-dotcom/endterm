"use client";

import React, { useState } from "react";
import { CATEGORIES, LOGO_SRC } from "@/lib/constants";
import { fmtDateTime, getAccredList, isEmail, normalizeEmail, uid } from "@/lib/utils";
import { Club } from "@/types/club";
import { ClubDetailFields, ClubDetailValue } from "@/components/ClubDetailFields";
import { ImagePreviewModal } from "@/components/ImagePreviewModal";
import { useToast } from "@/components/ToastProvider";

interface PendingShellViewProps {
  club: Club;
  onLogout: () => void;
  onResubmit: (updatedClub: Club, newEmail: string) => void;
}

export function PendingShellView({
  club,
  onLogout,
  onResubmit,
}: PendingShellViewProps) {
  const { toast } = useToast();
  const [reviseMode, setReviseMode] = useState(false);
  const [preview, setPreview] = useState<{ src: string; title: string } | null>(null);

  const app = club.account.application;
  const accred = getAccredList(app);

  const [detail, setDetail] = useState<ClubDetailValue>(() => ({
    clubName: app.clubName || "",
    category: app.category || CATEGORIES[0],
    adviser: {
      firstName: app.adviserFirstName || "",
      middleName: app.adviserMiddleName || "",
      lastName: app.adviserLastName || "",
      extName: app.adviserExtName || "",
      email: app.adviserEmail || "",
    },
    description: app.description || "",
    accreditationPhotos: accred,
  }));

  const handleResubmit = () => {
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
      toast("Enter valid email addresses.", true);
      return;
    }
    if (!detail.accreditationPhotos.length) {
      toast(
        "Please upload proof of club accreditation (picture or digital copy of approved papers).",
        true
      );
      return;
    }

    const photos = detail.accreditationPhotos.slice();
    const updatedClub: Club = {
      ...club,
      account: {
        status: "pending",
        officialClubId: null,
        approvedAt: null,
        rejectionReason: null,
        lastAppCode: null,
        lastApprovalCode: null,
        application: {
          appId: uid("APP"),
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
    };
    setReviseMode(false);
    toast("Application resubmitted.");
    onResubmit(updatedClub, adviserEmail);
  };

  return (
    <div style={{ minHeight: "100vh", width: "100%" }}>
      <div className="pending-topbar">
        <div className="brand-mark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_SRC} alt="Logo" />
        </div>
        <div className="brand-text">
          <div className="name">Club Console</div>
          <div className="sub">{app.adviserEmail}</div>
        </div>
        <button
          type="button"
          className="btn ghost small"
          id="logoutBtnPending"
          style={{ marginLeft: "auto" }}
          onClick={onLogout}
        >
          Log out
        </button>
      </div>

      <div style={{ padding: "36px 20px" }}>
        {club.account.status === "rejected" ? (
          reviseMode ? (
            <div className="gate-wrap" style={{ margin: "0 auto" }}>
              <h1 className="display" style={{ fontSize: "22px", margin: "0 0 6px" }}>
                Revise application
              </h1>
              <div className="card">
                <ClubDetailFields
                  value={detail}
                  onChange={setDetail}
                  onPreviewPhoto={(src, title) => setPreview({ src, title })}
                />
                <button
                  type="button"
                  className="btn primary"
                  id="resubmitApp"
                  style={{ width: "100%" }}
                  onClick={handleResubmit}
                >
                  Resubmit
                </button>
              </div>
            </div>
          ) : (
            <div className="gate-wrap" style={{ margin: "0 auto" }}>
              <h1 className="display" style={{ fontSize: "22px", margin: "0 0 6px" }}>
                Application not approved
              </h1>
              <p style={{ color: "var(--ink-soft)", fontSize: "14px" }}>
                Reason given: {club.account.rejectionReason || "No reason given."}
              </p>
              <button
                type="button"
                className="btn primary"
                id="startRevise"
                onClick={() => setReviseMode(true)}
              >
                Revise &amp; resubmit
              </button>
            </div>
          )
        ) : (
          <div className="gate-wrap" style={{ margin: "0 auto" }}>
            <h1 className="display" style={{ fontSize: "24px", margin: "0 0 6px" }}>
              Application submitted
            </h1>
            <p style={{ color: "var(--ink-soft)", fontSize: "14px" }}>
              &ldquo;{app.clubName}&rdquo; is waiting for the registrar&apos;s review. You don&apos;t
              need to do anything else — this page updates automatically as soon as a decision is
              made.
            </p>
            <div className="card">
              <div className="card-title" style={{ fontSize: "14px" }}>
                Status
              </div>
              <span className="badge pending">Pending review</span>
              <div style={{ marginTop: "10px", fontSize: "12.5px", color: "var(--ink-soft)" }}>
                Submitted {fmtDateTime(app.submittedAt)}
              </div>
              {accred.length > 0 && (
                <div
                  style={{
                    marginTop: "14px",
                    paddingTop: "12px",
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 600,
                      color: "var(--ink-soft)",
                      marginBottom: "6px",
                    }}
                  >
                    Proof of club accreditation
                  </div>
                  <div className="photo-grid">
                    {accred.map((src, i) => (
                      <div
                        key={i}
                        className="photo-thumb"
                        style={{ cursor: "pointer" }}
                        title="Click to view"
                        onClick={() =>
                          setPreview({
                            src,
                            title: `Proof of Club Accreditation (${i + 1}/${accred.length})`,
                          })
                        }
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`Accreditation proof ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <ImagePreviewModal
        src={preview?.src ?? null}
        title={preview?.title}
        onClose={() => setPreview(null)}
      />
    </div>
  );
}
