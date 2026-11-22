"use client";

import React from "react";
import { REVIEW_LABELS } from "@/lib/constants";
import { eventStatusAuto, fmtDate, reviewOf } from "@/lib/utils";
import { ClubEvent } from "@/types/club";

interface EventsTableProps {
  rows: ClubEvent[];
  compact?: boolean;
  onEdit?: (id: string) => void;
  onSubmit?: (id: string) => void;
}

function CollabNote({ event }: { event: ClubEvent }) {
  const names = (event.collaborators || [])
    .map((x) => x.clubName)
    .concat(event.externalPartners || []);
  if (!names.length) return null;
  return (
    <span style={{ fontSize: "11px", color: "var(--ink-soft)" }}>
      {" "}
      · Collab with {names.join(", ")}
    </span>
  );
}

export function EventsTable({
  rows,
  compact = false,
  onEdit,
  onSubmit,
}: EventsTableProps) {
  if (!rows.length) {
    return (
      <div className="empty">
        <div className="big">No events yet</div>
        <div>Create your first event, then submit it to the admin for approval.</div>
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Event</th>
          <th>Date</th>
          <th>Venue</th>
          <th>Status</th>
          <th>Target participants</th>
          {!compact && (
            <>
              <th>Admin review</th>
              <th></th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map((e) => {
          const st = eventStatusAuto(e);
          const cap = e.targetParticipants ? e.targetParticipants : "—";
          const rv = reviewOf(e);
          const submitLabel =
            rv.status === "draft"
              ? "Submit to admin"
              : rv.status === "pending" || rv.status === "approved"
              ? ""
              : "Resubmit";

          return (
            <tr key={e.id}>
              <td>
                {e.name}
                <CollabNote event={e} />
                {e.photos && e.photos.length > 0 && (
                  <span style={{ fontSize: "11px", color: "var(--ink-soft)" }}>
                    {" "}
                    · {e.photos.length} photo{e.photos.length > 1 ? "s" : ""}
                  </span>
                )}
              </td>
              <td>{fmtDate(e.date)}</td>
              <td>{e.venue}</td>
              <td>
                <span className={`badge ${st}`}>{st}</span>
              </td>
              <td>{cap}</td>
              {!compact && (
                <>
                  <td>
                    <span className={`badge rv-${rv.status}`}>
                      {REVIEW_LABELS[rv.status]}
                    </span>
                    {(rv.status === "declined" || rv.status === "missing") &&
                      rv.note && (
                        <div className="review-note">
                          <b>{rv.status === "declined" ? "Reason" : "Missing"}:</b>{" "}
                          {rv.note}
                        </div>
                      )}
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        type="button"
                        className="btn small"
                        onClick={() => onEdit?.(e.id)}
                      >
                        Edit
                      </button>
                      {submitLabel && (
                        <button
                          type="button"
                          className="btn small primary"
                          onClick={() => onSubmit?.(e.id)}
                        >
                          {submitLabel}
                        </button>
                      )}
                    </div>
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
