"use client";

import React from "react";
import { Club } from "@/types/club";
import { BarChart, ChartDatum, ChartLegend, DonutChart } from "@/components/Charts";

export function ReportsView({ club }: { club: Club }) {
  const byYear: Record<string, number> = {};
  club.members.forEach((m) => {
    byYear[m.year] = (byYear[m.year] || 0) + 1;
  });
  const yearData: ChartDatum[] = Object.keys(byYear).map((k) => ({
    label: k,
    value: byYear[k],
  }));

  const byProgram: Record<string, number> = {};
  club.members.forEach((m) => {
    const p = m.program || "Unspecified";
    byProgram[p] = (byProgram[p] || 0) + 1;
  });
  const programData: ChartDatum[] = Object.keys(byProgram).map((k) => ({
    label: k,
    value: byProgram[k],
  }));

  const eventTargetData: ChartDatum[] = club.events
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => ({
      label: e.name,
      value: e.targetParticipants || 0,
    }));

  const byCat: Record<string, number> = {};
  club.events.forEach((e) => {
    byCat[e.category] = (byCat[e.category] || 0) + 1;
  });
  const catData: ChartDatum[] = Object.keys(byCat).map((k) => ({
    label: k,
    value: byCat[k],
  }));

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Reports</h1>
          <p>
            Member and event analytics for your own club — this level of detail
            isn&apos;t shared with the administrator.
          </p>
        </div>
        <div className="head-actions" />
      </div>

      <div className="chart-row" style={{ marginBottom: "16px" }}>
        <div className="card">
          <h3 className="card-title">Target participants per event</h3>
          <p className="card-sub">The headcount you are aiming for at each event.</p>
          {eventTargetData.length > 0 ? (
            <BarChart data={eventTargetData} />
          ) : (
            <div className="empty">
              <div className="big">No events yet</div>
              <div />
            </div>
          )}
        </div>
        <div className="card">
          <h3 className="card-title">Members by year level</h3>
          <p className="card-sub">{club.members.length} total members.</p>
          {yearData.length > 0 ? (
            <>
              <DonutChart data={yearData} />
              <ChartLegend data={yearData} />
            </>
          ) : (
            <div className="empty">
              <div className="big">No members yet</div>
              <div />
            </div>
          )}
        </div>
      </div>

      <div className="chart-row">
        <div className="card">
          <h3 className="card-title">Events by category</h3>
          <p className="card-sub">{club.events.length} events in total.</p>
          {catData.length > 0 ? (
            <>
              <DonutChart data={catData} />
              <ChartLegend data={catData} />
            </>
          ) : (
            <div className="empty">
              <div className="big">No events yet</div>
              <div />
            </div>
          )}
        </div>
        <div className="card">
          <h3 className="card-title">Members by program</h3>
          <p className="card-sub">Program mix across your roster.</p>
          {programData.length > 0 ? (
            <>
              <DonutChart data={programData} />
              <ChartLegend data={programData} />
            </>
          ) : (
            <div className="empty">
              <div className="big">No members yet</div>
              <div />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
