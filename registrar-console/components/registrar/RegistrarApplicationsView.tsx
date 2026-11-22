"use client";

import React, { useState } from "react";
import { fmtDateTime, fullName } from "@/lib/utils";
import { RegistrarApplication } from "@/types/registrar";
import { Modal } from "@/components/Modal";

interface RegistrarApplicationsViewProps {
  applications: RegistrarApplication[];
  onApprove: (app: RegistrarApplication) => void;
  onReject: (app: RegistrarApplication, reason: string) => void;
}

export function RegistrarApplicationsView({
  applications,
  onApprove,
  onReject,
}: RegistrarApplicationsViewProps) {
  const [search, setSearch] = useState("");
  const [viewingId, setViewingId] = useState<string | null>(null);

  const q = search.toLowerCase();
  const rows = applications
    .filter((a) => !q || a.clubName.toLowerCase().includes(q))
    .slice()
    .sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (b.status === "pending" && a.status !== "pending") return 1;
      return b.submittedAt.localeCompare(a.submittedAt);
    });

  const viewing = viewingId
    ? applications.find((x) => x.id === viewingId) || null
    : null;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Applications</h1>
          <p>
            Clubs that register in the Club Console appear here automatically.
            Open one to approve or reject it.
          </p>
        </div>
        <div className="head-actions" />
      </div>

      <div className="search-bar">
        <input
          id="appSearch"
          placeholder="Search applications…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card">
        <div className="table-wrap">
          {!rows.length ? (
            <div className="empty">
              <div className="big">No applications</div>
              <div>Club applications will show up here.</div>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Club</th>
                  <th>Category</th>
                  <th>President</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((a) => (
                  <tr key={a.id}>
                    <td>{a.clubName}</td>
                    <td>{a.category}</td>
                    <td>
                      {fullName(
                        a.presidentFirstName,
                        a.presidentMiddleName,
                        a.presidentLastName,
                        a.presidentExtName
                      )}
                    </td>
                    <td>{fmtDateTime(a.submittedAt)}</td>
                    <td>
                      <span className={`badge ${a.status}`}>{a.status}</span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button
                          type="button"
                          className="btn small"
                          onClick={() => setViewingId(a.id)}
                        >
                          View
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

      <Modal open={!!viewing} onClose={() => setViewingId(null)}>
        {viewing && (
          <>
            <h2>{viewing.clubName}</h2>
            <div className="app-detail">
              <div>
                <span>Category</span>
                <span>{viewing.category}</span>
              </div>
              <div>
                <span>President</span>
                <span>
                  {fullName(
                    viewing.presidentFirstName,
                    viewing.presidentMiddleName,
                    viewing.presidentLastName,
                    viewing.presidentExtName
                  )}{" "}
                  · {viewing.presidentEmail}
                </span>
              </div>
              <div>
                <span>Adviser</span>
                <span>
                  {fullName(
                    viewing.adviserFirstName,
                    viewing.adviserMiddleName,
                    viewing.adviserLastName,
                    viewing.adviserExtName
                  )}{" "}
                  · {viewing.adviserEmail}
                </span>
              </div>
              <div>
                <span>Submitted</span>
                <span>{fmtDateTime(viewing.submittedAt)}</span>
              </div>
              <div>
                <span>Status</span>
                <span>
                  <span className={`badge ${viewing.status}`}>
                    {viewing.status}
                  </span>
                </span>
              </div>
            </div>
            {viewing.description && (
              <p style={{ fontSize: "13px", color: "var(--ink-soft)" }}>
                {viewing.description}
              </p>
            )}
            {viewing.status === "pending" ? (
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => setViewingId(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn danger"
                  onClick={() => {
                    const reason =
                      prompt("Reason for rejecting this application:") ||
                      "No reason given.";
                    onReject(viewing, reason);
                    setViewingId(null);
                  }}
                >
                  Reject
                </button>
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => {
                    onApprove(viewing);
                    setViewingId(null);
                  }}
                >
                  Approve
                </button>
              </div>
            ) : viewing.status === "approved" ? (
              <>
                <p style={{ fontSize: "12.5px", color: "var(--ink-soft)" }}>
                  Assigned club ID:{" "}
                  <span className="mono">{viewing.assignedClubId}</span>
                </p>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => setViewingId(null)}
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <p style={{ fontSize: "12.5px", color: "var(--ink-soft)" }}>
                  Reason: {viewing.reason || "—"}
                </p>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => setViewingId(null)}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
}
