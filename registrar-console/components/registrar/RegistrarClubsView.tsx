"use client";

import React, { useState } from "react";
import { fmtDate, fullName } from "@/lib/utils";
import { RegistrarClub } from "@/types/registrar";

interface RegistrarClubsViewProps {
  clubs: RegistrarClub[];
  onToggleClub: (club: RegistrarClub) => void;
}

export function RegistrarClubsView({
  clubs,
  onToggleClub,
}: RegistrarClubsViewProps) {
  const [search, setSearch] = useState("");
  const q = search.toLowerCase();
  const rows = clubs.filter((c) => !q || c.name.toLowerCase().includes(q));

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Clubs Registry</h1>
          <p>All officially approved clubs and their current standing.</p>
        </div>
        <div className="head-actions" />
      </div>

      <div className="search-bar">
        <input
          id="clubSearch"
          placeholder="Search clubs…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card">
        <div className="table-wrap">
          {!rows.length ? (
            <div className="empty">
              <div className="big">No clubs yet</div>
              <div>Approve an application to add a club to the registry.</div>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Club</th>
                  <th>Category</th>
                  <th>Adviser</th>
                  <th>Approved</th>
                  <th>Members</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.category}</td>
                    <td>
                      {fullName(
                        c.adviserFirstName,
                        c.adviserMiddleName,
                        c.adviserLastName,
                        c.adviserExtName
                      )}
                    </td>
                    <td>{fmtDate((c.approvedAt || "").slice(0, 10))}</td>
                    <td>{c.members == null ? "—" : c.members}</td>
                    <td>
                      <span className={`badge ${c.status}`}>{c.status}</span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button
                          type="button"
                          className="btn small"
                          onClick={() => onToggleClub(c)}
                        >
                          {c.status === "active" ? "Suspend" : "Reactivate"}
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
    </>
  );
}
