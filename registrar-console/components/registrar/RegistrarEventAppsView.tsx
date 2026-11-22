"use client";

import React, { useState } from "react";
import { EVAPP_LABELS } from "@/lib/registrarStore";
import { fmtDate, fmtDateTime } from "@/lib/utils";
import { EventAppStatus, RegistrarEventApp } from "@/types/registrar";
import { Modal } from "@/components/Modal";
import { useToast } from "@/components/ToastProvider";

interface RegistrarEventAppsViewProps {
  eventApps: RegistrarEventApp[];
  onDecide: (
    app: RegistrarEventApp,
    decision: "approved" | "missing" | "declined",
    note: string
  ) => void;
}

const FILTER_TABS: ("all" | EventAppStatus)[] = [
  "all",
  "pending",
  "missing",
  "declined",
  "approved",
];

export function RegistrarEventAppsView({
  eventApps,
  onDecide,
}: RegistrarEventAppsViewProps) {
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | EventAppStatus>("all");
  const [viewingKey, setViewingKey] = useState<string | null>(null);
  const [decision, setDecision] = useState<
    "" | "approved" | "missing" | "declined"
  >("");
  const [note, setNote] = useState("");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const counts: Record<EventAppStatus, number> = {
    pending: 0,
    approved: 0,
    declined: 0,
    missing: 0,
  };
  eventApps.forEach((a) => {
    counts[a.status]++;
  });

  const order: Record<EventAppStatus, number> = {
    pending: 0,
    missing: 1,
    declined: 2,
    approved: 3,
  };

  const rows = eventApps
    .filter((a) => filter === "all" || a.status === filter)
    .slice()
    .sort(
      (a, b) =>
        order[a.status] - order[b.status] ||
        b.submittedAt.localeCompare(a.submittedAt)
    );

  const viewing = viewingKey
    ? eventApps.find((x) => x.key === viewingKey) || null
    : null;

  const openModalFor = (app: RegistrarEventApp) => {
    setViewingKey(app.key);
    setDecision(app.status === "pending" ? "" : app.status);
    setNote(
      app.status === "declined" || app.status === "missing"
        ? app.note || ""
        : ""
    );
  };

  const handleSave = () => {
    if (!viewing) return;
    if (!decision) {
      toast("Choose Approve, Missing info or Decline first.", true);
      return;
    }
    const trimmed = note.trim();
    if ((decision === "declined" || decision === "missing") && !trimmed) {
      toast(
        decision === "declined"
          ? "Add the reason for declining."
          : "Say what is missing.",
        true
      );
      return;
    }
    onDecide(viewing, decision, trimmed);
    setViewingKey(null);
  };

  const timeStr = viewing
    ? viewing.startTime
      ? `${viewing.startTime}${viewing.endTime ? ` – ${viewing.endTime}` : ""}`
      : "—"
    : "—";

  const needsNote = decision === "declined" || decision === "missing";

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Event Applications</h1>
          <p>
            Clubs submit each event with its details and photos for your
            approval. Approve it, decline it, or mark it as missing information
            and explain what is needed.
          </p>
        </div>
        <div className="head-actions" />
      </div>

      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "12px",
        }}
      >
        {FILTER_TABS.map((k) => {
          const n = k === "all" ? eventApps.length : counts[k];
          return (
            <button
              key={k}
              type="button"
              className={`btn small${filter === k ? " primary" : ""}`}
              onClick={() => setFilter(k)}
            >
              {k === "all" ? "All" : EVAPP_LABELS[k]} ({n})
            </button>
          );
        })}
      </div>

      <div className="card">
        <div className="table-wrap">
          {!rows.length ? (
            <div className="empty">
              <div className="big">No event applications</div>
              <div>
                Events that clubs submit for approval will show up here.
              </div>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Club</th>
                  <th>Date</th>
                  <th>Photos</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((a) => (
                  <tr key={a.key}>
                    <td>{a.name}</td>
                    <td>{a.clubName}</td>
                    <td>{fmtDate(a.date)}</td>
                    <td>{(a.photos || []).length}</td>
                    <td>{fmtDateTime(a.submittedAt)}</td>
                    <td>
                      <span className={`badge rv-${a.status}`}>
                        {EVAPP_LABELS[a.status]}
                      </span>
                      {(a.status === "declined" || a.status === "missing") &&
                        a.note && (
                          <div className="review-note">
                            <b>
                              {a.status === "declined" ? "Reason" : "Missing"}:
                            </b>{" "}
                            {a.note}
                          </div>
                        )}
                    </td>
                    <td>
                      <div className="row-actions">
                        <button
                          type="button"
                          className="btn small"
                          onClick={() => openModalFor(a)}
                        >
                          {a.status === "pending" ? "Review" : "View"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal open={!!viewing} onClose={() => setViewingKey(null)}>
        {viewing && (
          <>
            <h2>{viewing.name}</h2>
            <div className="app-detail">
              <div>
                <span>Club</span>
                <span>{viewing.clubName}</span>
              </div>
              <div>
                <span>Category</span>
                <span>{viewing.category}</span>
              </div>
              <div>
                <span>Date</span>
                <span>{fmtDate(viewing.date)}</span>
              </div>
              <div>
                <span>Time</span>
                <span>{timeStr}</span>
              </div>
              <div>
                <span>Venue</span>
                <span>{viewing.venue || "—"}</span>
              </div>
              <div>
                <span>Target participants</span>
                <span>{viewing.target || "—"}</span>
              </div>
              <div>
                <span>Submitted</span>
                <span>
                  {fmtDateTime(viewing.submittedAt)}
                  {viewing.resubmitted ? " (resubmitted)" : ""}
                </span>
              </div>
              <div>
                <span>Status</span>
                <span>
                  <span className={`badge rv-${viewing.status}`}>
                    {EVAPP_LABELS[viewing.status]}
                  </span>
                </span>
              </div>
            </div>

            {viewing.description && (
              <p style={{ fontSize: "13px", color: "var(--ink-soft)" }}>
                {viewing.description}
              </p>
            )}

            <div
              style={{
                fontSize: "12.5px",
                fontWeight: 600,
                marginTop: "10px",
              }}
            >
              Photos ({viewing.photos.length})
            </div>
            {viewing.photos.length > 0 ? (
              <div className="photo-grid">
                {viewing.photos.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    className="photo-thumb"
                    title="Click to enlarge"
                    onClick={() => setLightboxSrc(src)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Event photo ${i + 1}`} />
                  </button>
                ))}
              </div>
            ) : (
              <p
                style={{
                  fontSize: "12.5px",
                  color: "var(--ink-soft)",
                  margin: "4px 0 12px",
                }}
              >
                No photos were attached.
              </p>
            )}

            <div style={{ fontSize: "12.5px", fontWeight: 600 }}>Decision</div>
            <div className="decide-opts">
              {(["approved", "missing", "declined"] as const).map((k) => (
                <label
                  key={k}
                  className={decision === k ? "sel" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setDecision(k);
                  }}
                >
                  <input
                    type="radio"
                    name="evDecision"
                    value={k}
                    checked={decision === k}
                    onChange={() => setDecision(k)}
                  />
                  {k === "approved"
                    ? "Approve"
                    : k === "missing"
                    ? "Missing info"
                    : "Decline"}
                </label>
              ))}
            </div>

            {needsNote && (
              <div className="field">
                <label htmlFor="evNote">
                  {decision === "declined"
                    ? "Why is this event declined?"
                    : "What is missing?"}
                </label>
                <textarea
                  id="evNote"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={
                    decision === "declined"
                      ? "Explain the reason so the club understands."
                      : "List what the club still needs to provide (e.g. more photos, venue permit, adviser sign-off)."
                  }
                />
              </div>
            )}

            <div className="modal-actions">
              <button
                type="button"
                className="btn ghost"
                onClick={() => setViewingKey(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn primary"
                onClick={handleSave}
              >
                {viewing.status !== "pending"
                  ? "Update decision"
                  : "Send decision"}
              </button>
            </div>
          </>
        )}
      </Modal>

      {lightboxSrc && (
        <div className="lightbox" onClick={() => setLightboxSrc(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightboxSrc} alt="Event photo" />
        </div>
      )}
    </>
  );
}
