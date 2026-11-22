"use client";

import React from "react";
import { RegistrarState } from "@/types/registrar";
import {
  BarChart,
  ChartDatum,
  ChartLegend,
  DonutChart,
  LineChart,
} from "@/components/Charts";

export function RegistrarReportsView({ state }: { state: RegistrarState }) {
  const byCat: Record<string, number> = {};
  state.clubs.forEach((c) => {
    byCat[c.category] = (byCat[c.category] || 0) + 1;
  });
  const catData: ChartDatum[] = Object.keys(byCat).map((k) => ({
    label: k,
    value: byCat[k],
  }));

  const appFunnel: ChartDatum[] = [
    {
      label: "Submitted",
      value: state.applications.length,
      color: "var(--accent2)",
    },
    {
      label: "Approved",
      value: state.applications.filter((a) => a.status === "approved").length,
      color: "var(--good)",
    },
    {
      label: "Rejected",
      value: state.applications.filter((a) => a.status === "rejected").length,
      color: "var(--bad)",
    },
    {
      label: "Pending",
      value: state.applications.filter((a) => a.status === "pending").length,
      color: "var(--warn)",
    },
  ];

  const byClubEvents: Record<string, number> = {};
  state.events.forEach((e) => {
    byClubEvents[e.clubName] = (byClubEvents[e.clubName] || 0) + 1;
  });
  const eventsPerClub: ChartDatum[] = Object.keys(byClubEvents).map((k) => ({
    label: k,
    value: byClubEvents[k],
  }));

  const byPeriod: Record<string, number> = {};
  state.events.forEach((e) => {
    const k = (e.date || "").slice(0, 7);
    if (k) byPeriod[k] = (byPeriod[k] || 0) + 1;
  });
  const trendData: ChartDatum[] = Object.keys(byPeriod)
    .sort()
    .map((k) => ({ label: k, value: byPeriod[k] }));

  const activeCount = state.clubs.filter((c) => c.status === "active").length;
  const suspendedCount = state.clubs.filter(
    (c) => c.status === "suspended"
  ).length;
  const standingData: ChartDatum[] = [
    { label: "Active", value: activeCount, color: "var(--good)" },
    { label: "Suspended", value: suspendedCount, color: "var(--bad)" },
  ];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Reports</h1>
          <p>
            Organization-wide analytics. These are club- and event-level counts
            only — individual member or student data isn&apos;t collected here.
          </p>
        </div>
        <div className="head-actions" />
      </div>

      <div className="chart-row" style={{ marginBottom: "16px" }}>
        <div className="card">
          <h3 className="card-title">Clubs by category</h3>
          <p className="card-sub">{state.clubs.length} clubs on record.</p>
          {catData.length > 0 ? (
            <>
              <DonutChart data={catData} />
              <ChartLegend data={catData} />
            </>
          ) : (
            <div className="empty">
              <div className="big">No clubs yet</div>
              <div />
            </div>
          )}
        </div>
        <div className="card">
          <h3 className="card-title">Application funnel</h3>
          <p className="card-sub">All applications received.</p>
          <BarChart data={appFunnel} />
        </div>
      </div>

      <div className="chart-row" style={{ marginBottom: "16px" }}>
        <div className="card">
          <h3 className="card-title">Events per club</h3>
          <p className="card-sub">Approved events, updated live.</p>
          {eventsPerClub.length > 0 ? (
            <BarChart data={eventsPerClub} />
          ) : (
            <div className="empty">
              <div className="big">No events logged yet</div>
              <div />
            </div>
          )}
        </div>
        <div className="card">
          <h3 className="card-title">Active vs suspended</h3>
          <p className="card-sub">Current club standing.</p>
          <DonutChart data={standingData} />
          <ChartLegend data={standingData} />
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Events per month</h3>
        <p className="card-sub">
          Approved events across all clubs, updated live.
        </p>
        {trendData.length > 1 ? (
          <LineChart data={trendData} />
        ) : trendData.length === 1 ? (
          <BarChart data={trendData} />
        ) : (
          <div className="empty">
            <div className="big">Not enough data yet</div>
            <div />
          </div>
        )}
      </div>
    </>
  );
}
