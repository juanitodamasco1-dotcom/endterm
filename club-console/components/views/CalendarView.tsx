"use client";

import React, { useState } from "react";
import { fmtDate, todayStr } from "@/lib/utils";
import { Club, ClubEvent } from "@/types/club";

interface CalendarViewProps {
  club: Club;
  allClubs: Club[];
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DOW_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function CalendarView({ club, allClubs }: CalendarViewProps) {
  const [year, setYear] = useState(2027);
  const [month, setMonth] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const myClubId = club.account.officialClubId;
  const incomingEvents: ClubEvent[] = [];
  allClubs.forEach((c) => {
    if (
      c.account.application.adviserEmail === club.account.application.adviserEmail ||
      c.account.status !== "approved"
    ) {
      return;
    }
    (c.events || []).forEach((ev) => {
      if ((ev.collaborators || []).some((x) => x.clubId === myClubId)) {
        incomingEvents.push({
          ...ev,
          name: `${ev.name} (w/ ${c.account.application.clubName})`,
        });
      }
    });
  });

  const combined = club.events.concat(incomingEvents);
  const byDay: Record<number, ClubEvent[]> = {};
  combined.forEach((e) => {
    const d = new Date(`${e.date}T00:00:00`);
    if (Number.isNaN(d.getTime()) || d.getFullYear() !== year || d.getMonth() !== month) {
      return;
    }
    const day = d.getDate();
    (byDay[day] = byDay[day] || []).push(e);
  });

  const startWeekday = new Date(year, month, 1).getDay();
  const daysInM = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const todayIso = todayStr();
  const trailing = (7 - ((startWeekday + daysInM) % 7)) % 7;

  const handlePrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const handleToday = () => {
    const d = new Date();
    setYear(d.getFullYear());
    setMonth(d.getMonth());
    setSelectedDate(null);
  };

  const selectedDayEvents = selectedDate
    ? (byDay[parseInt(selectedDate.slice(8, 10), 10)] || []).filter(
        (e) => e.date === selectedDate
      )
    : [];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Calendar</h1>
          <p>Your club&apos;s own events, by date.</p>
        </div>
        <div className="head-actions" />
      </div>

      <div className="card">
        <div className="cal-head">
          <div className="cal-nav">
            <button
              type="button"
              className="btn small"
              aria-label="Previous month"
              onClick={handlePrev}
            >
              &larr;
            </button>
            <div className="cal-title">
              {MONTH_NAMES[month]} {year}
            </div>
            <button
              type="button"
              className="btn small"
              aria-label="Next month"
              onClick={handleNext}
            >
              &rarr;
            </button>
            <button type="button" className="btn small" onClick={handleToday}>
              Today
            </button>
          </div>
        </div>

        <div className="cal-grid">
          {DOW_LABELS.map((x) => (
            <div key={x} className="cal-dow">
              {x}
            </div>
          ))}
          {Array.from({ length: startWeekday }, (_, i) => (
            <div key={`prev-${i}`} className="cal-cell out">
              <div className="cal-daynum">{prevDays - startWeekday + 1 + i}</div>
            </div>
          ))}
          {Array.from({ length: daysInM }, (_, idx) => {
            const d = idx + 1;
            const dateStr = `${year}-${pad2(month + 1)}-${pad2(d)}`;
            const evs = byDay[d] || [];
            const shown = evs.slice(0, 3);
            const more = evs.length - shown.length;
            return (
              <div
                key={dateStr}
                className={`cal-cell${dateStr === todayIso ? " today" : ""}${
                  dateStr === selectedDate ? " selected" : ""
                }`}
                onClick={() =>
                  setSelectedDate((cur) => (cur === dateStr ? null : dateStr))
                }
              >
                <div className="cal-daynum">{d}</div>
                {shown.map((e, i) => (
                  <div key={`${e.id}-${i}`} className="cal-chip" title={e.name}>
                    {e.name}
                  </div>
                ))}
                {more > 0 && <div className="cal-more">+{more} more</div>}
              </div>
            );
          })}
          {Array.from({ length: trailing }, (_, j) => (
            <div key={`next-${j}`} className="cal-cell out">
              <div className="cal-daynum">{j + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="card cal-details">
          <h3 className="card-title">{fmtDate(selectedDate)}</h3>
          {selectedDayEvents.length > 0 ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Category</th>
                    <th>Target participants</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDayEvents.map((e) => (
                    <tr key={e.id}>
                      <td>{e.name}</td>
                      <td>{e.category}</td>
                      <td>{e.targetParticipants || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty">
              <div className="big">No events on this day</div>
              <div />
            </div>
          )}
        </div>
      )}
    </>
  );
}
