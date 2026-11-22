"use client";

import React from "react";
import { eventStatusAuto } from "@/lib/utils";
import { Club } from "@/types/club";
import { EventsTable } from "@/components/views/EventsTable";

export function OverviewView({ club }: { club: Club }) {
  const upcoming = club.events.filter(
    (e) => eventStatusAuto(e) === "upcoming"
  ).length;
  const totalTarget = club.events.reduce(
    (acc, e) => acc + (e.targetParticipants || 0),
    0
  );
  const app = club.account.application;
  const recentEvents = club.events
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Overview</h1>
          <p>A snapshot of {app.clubName}&apos;s current standing.</p>
        </div>
        <div className="head-actions" />
      </div>

      <div className="grid stats" style={{ marginBottom: "20px" }}>
        <div className="card stat-card">
          <div className="num">{club.members.length}</div>
          <div className="label">Members</div>
        </div>
        <div className="card stat-card">
          <div className="num">{club.events.length}</div>
          <div className="label">Total events</div>
        </div>
        <div className="card stat-card">
          <div className="num">{upcoming}</div>
          <div className="label">Upcoming events</div>
        </div>
        <div className="card stat-card">
          <div className="num">{totalTarget}</div>
          <div className="label">Target participants</div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Recent events</h3>
        <p className="card-sub">Most recently dated, any status.</p>
        <div className="table-wrap">
          <EventsTable rows={recentEvents} compact />
        </div>
      </div>
    </>
  );
}
