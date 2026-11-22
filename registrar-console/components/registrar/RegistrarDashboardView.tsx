"use client";

import React from "react";
import { fmtDateTime } from "@/lib/utils";
import { RegistrarState } from "@/types/registrar";

export function RegistrarDashboardView({ state }: { state: RegistrarState }) {
  const active = state.clubs.filter((c) => c.status === "active").length;
  const pendingApps = state.applications.filter(
    (a) => a.status === "pending"
  ).length;
  const totalEvents = state.events.length;
  const totalTarget = state.events.reduce((acc, e) => acc + (e.target || 0), 0);
  const recentApps = state.applications
    .slice()
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .slice(0, 5);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p>
            Org-wide standing across all registered clubs — no member-level
            detail here, only counts.
          </p>
        </div>
        <div className="head-actions" />
      </div>

      <div className="grid stats" style={{ marginBottom: "20px" }}>
        <div className="card stat-card">
          <div className="num">{active}</div>
          <div className="label">Active clubs</div>
        </div>
        <div className="card stat-card">
          <div className="num">{pendingApps}</div>
          <div className="label">Pending applications</div>
        </div>
        <div className="card stat-card">
          <div className="num">{totalEvents}</div>
          <div className="label">Logged events</div>
        </div>
        <div className="card stat-card">
          <div className="num">{totalTarget}</div>
          <div className="label">Target participants</div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Recent applications</h3>
        <p className="card-sub">Latest submissions, any status.</p>
        {recentApps.length > 0 ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Club</th>
                  <th>Category</th>
                  <th>Submitted</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApps.map((a) => (
                  <tr key={a.id}>
                    <td>{a.clubName}</td>
                    <td>{a.category}</td>
                    <td>{fmtDateTime(a.submittedAt)}</td>
                    <td>
                      <span className={`badge ${a.status}`}>{a.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty">
            <div className="big">No applications yet</div>
            <div />
          </div>
        )}
      </div>
    </>
  );
}
