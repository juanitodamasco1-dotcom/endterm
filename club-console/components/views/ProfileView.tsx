"use client";

import React, { useState } from "react";
import { fmtDateTime, fullName, getAccredList } from "@/lib/utils";
import { Club } from "@/types/club";
import { ImagePreviewModal } from "@/components/ImagePreviewModal";
import { useToast } from "@/components/ToastProvider";

interface ProfileViewProps {
  club: Club;
  onClearRecords: () => void;
}

function ProfRow({ label, val }: { label: string; val: string | null }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "16px",
        padding: "9px 0",
        borderBottom: "1px solid var(--line)",
        fontSize: "13.5px",
      }}
    >
      <span style={{ color: "var(--ink-soft)" }}>{label}</span>
      <span style={{ textAlign: "right" }}>{val || "—"}</span>
    </div>
  );
}

export function ProfileView({ club, onClearRecords }: ProfileViewProps) {
  const { toast } = useToast();
  const [preview, setPreview] = useState<{ src: string; title: string } | null>(null);

  const a = club.account.application;
  const accred = getAccredList(a);

  const handleReset = () => {
    if (
      !confirm(
        "Are you sure you want to permanently clear all members and events for this club?"
      )
    ) {
      return;
    }
    onClearRecords();
    toast("Club records cleared.");
  };

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Club profile</h1>
          <p>Your registered details on file.</p>
        </div>
        <div className="head-actions" />
      </div>

      <div className="card" style={{ maxWidth: "560px" }}>
        <ProfRow label="Club name" val={a.clubName} />
        <ProfRow label="Category" val={a.category} />
        <ProfRow
          label="Adviser"
          val={`${fullName(
            a.adviserFirstName,
            a.adviserMiddleName,
            a.adviserLastName,
            a.adviserExtName
          )} · ${a.adviserEmail}`}
        />
        <ProfRow label="Official club ID" val={club.account.officialClubId} />
        <ProfRow label="Approved" val={fmtDateTime(club.account.approvedAt)} />

        {accred.length > 0 ? (
          <div style={{ padding: "9px 0", fontSize: "13.5px" }}>
            <div style={{ color: "var(--ink-soft)", marginBottom: "8px" }}>
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
        ) : (
          <ProfRow label="Proof of club accreditation" val="On file" />
        )}
      </div>

      <div className="card" style={{ maxWidth: "560px", marginTop: "16px" }}>
        <h3 className="card-title" style={{ fontSize: "14px" }}>
          Clear club records
        </h3>
        <p className="card-sub">
          Permanently removes members and events for this club. Your registration,
          account login, and approved standing remain intact.
        </p>
        <button type="button" className="btn danger" onClick={handleReset}>
          Clear club records
        </button>
      </div>

      <ImagePreviewModal
        src={preview?.src ?? null}
        title={preview?.title}
        onClose={() => setPreview(null)}
      />
    </>
  );
}
