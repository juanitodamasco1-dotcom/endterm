"use client";

import React, { useState } from "react";
import { CATEGORIES, MAX_EVENT_PHOTOS } from "@/lib/constants";
import {
  compressImage,
  eventStatusAuto,
  fmtDate,
  reviewOf,
  uid,
} from "@/lib/utils";
import { Club, ClubEvent, Collaborator, EventStatusOverride } from "@/types/club";
import { Modal } from "@/components/Modal";
import { EventsTable } from "@/components/views/EventsTable";
import { useToast } from "@/components/ToastProvider";

interface EventsViewProps {
  club: Club;
  allClubs: Club[];
  suspended: boolean;
  onUpdateClub: (next: Club) => void;
}

export function EventsView({
  club,
  allClubs,
  suspended,
  onUpdateClub,
}: EventsViewProps) {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Modal form state
  const [eName, setEName] = useState("");
  const [eCategory, setECategory] = useState(CATEGORIES[0]);
  const [eDesc, setEDesc] = useState("");
  const [eDate, setEDate] = useState("");
  const [eTarget, setETarget] = useState("");
  const [eStart, setEStart] = useState("");
  const [eEnd, setEEnd] = useState("");
  const [eVenue, setEVenue] = useState("");
  const [eCollabs, setECollabs] = useState<Collaborator[]>([]);
  const [eExternal, setEExternal] = useState("");
  const [ePhotos, setEPhotos] = useState<string[]>([]);
  const [eStatus, setEStatus] = useState<"" | "cancelled">("");

  const otherApproved = allClubs.filter(
    (c) =>
      c.account.application.adviserEmail !== club.account.application.adviserEmail &&
      c.account.status === "approved" &&
      c.account.officialClubId
  );

  const myClubId = club.account.officialClubId;
  const incomingCollabs: { event: ClubEvent; host: string }[] = [];
  allClubs.forEach((c) => {
    if (
      c.account.application.adviserEmail === club.account.application.adviserEmail ||
      c.account.status !== "approved"
    ) {
      return;
    }
    (c.events || []).forEach((ev) => {
      if ((ev.collaborators || []).some((x) => x.clubId === myClubId)) {
        incomingCollabs.push({ event: ev, host: c.account.application.clubName });
      }
    });
  });
  incomingCollabs.sort((a, b) => b.event.date.localeCompare(a.event.date));

  const openEventModal = (id: string | null) => {
    const ev = id ? club.events.find((x) => x.id === id) || null : null;
    if (ev) {
      setEditingId(ev.id);
      setEName(ev.name);
      setECategory(ev.category || CATEGORIES[0]);
      setEDesc(ev.description || "");
      setEDate(ev.date);
      setETarget(ev.targetParticipants ? String(ev.targetParticipants) : "");
      setEStart(ev.startTime || "");
      setEEnd(ev.endTime || "");
      setEVenue(ev.venue || "");
      setECollabs((ev.collaborators || []).slice());
      setEExternal((ev.externalPartners || []).join(", "));
      setEPhotos((ev.photos || []).slice());
      setEStatus(ev.status === "cancelled" ? "cancelled" : "");
    } else {
      setEditingId(null);
      setEName("");
      setECategory(CATEGORIES[0]);
      setEDesc("");
      setEDate("");
      setETarget("");
      setEStart("");
      setEEnd("");
      setEVenue("");
      setECollabs([]);
      setEExternal("");
      setEPhotos([]);
      setEStatus("");
    }
    setModalOpen(true);
  };

  const handleSubmitEvent = (id: string) => {
    if (suspended) {
      toast("This club is suspended — events can't be submitted right now.", true);
      return;
    }
    const nextEvents = club.events.map((ev) => {
      if (ev.id !== id) return ev;
      const prev = reviewOf(ev).status;
      return {
        ...ev,
        review: {
          status: "pending" as const,
          note: "",
          submittedAt: new Date().toISOString(),
          resubmitted: prev === "declined" || prev === "missing",
        },
      };
    });
    onUpdateClub({ ...club, events: nextEvents });
    toast("Event sent to the registrar for review.");
  };

  const handlePhotoUpload = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(ev.target.files || []);
    ev.target.value = "";
    const next = ePhotos.slice();
    for (const file of files) {
      if (next.length >= MAX_EVENT_PHOTOS) {
        toast(`Up to ${MAX_EVENT_PHOTOS} photos per event.`, true);
        break;
      }
      try {
        next.push(await compressImage(file));
      } catch {
        toast(`Couldn't read ${file.name}.`, true);
      }
    }
    setEPhotos(next);
  };

  const handleToggleCollab = (clubId: string, clubName: string, checked: boolean) => {
    if (checked) {
      if (!eCollabs.some((c) => c.clubId === clubId)) {
        setECollabs([...eCollabs, { clubId, clubName }]);
      }
    } else {
      setECollabs(eCollabs.filter((c) => c.clubId !== clubId));
    }
  };

  const handleSaveEvent = () => {
    const name = eName.trim();
    const date = eDate.trim();
    if (!name || !date) {
      toast("Event name and date are required.", true);
      return;
    }
    if (eStart && eEnd && eEnd <= eStart) {
      toast("End time must be after start time.", true);
      return;
    }
    const data: Omit<ClubEvent, "id" | "review"> = {
      name,
      category: eCategory || CATEGORIES[0],
      description: eDesc.trim(),
      date,
      startTime: eStart,
      endTime: eEnd,
      venue: eVenue.trim(),
      targetParticipants: parseInt(eTarget, 10) || null,
      status: (eStatus === "cancelled" ? "cancelled" : "auto") as EventStatusOverride,
      photos: ePhotos.slice(),
      collaborators: eCollabs.slice(),
      externalPartners: eExternal
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    let nextEvents: ClubEvent[];
    if (editingId) {
      nextEvents = club.events.map((ev) =>
        ev.id === editingId ? { ...ev, ...data } : ev
      );
      toast("Event updated.");
    } else {
      nextEvents = [
        ...club.events,
        { id: uid("EVT"), review: { status: "draft" }, ...data },
      ];
      toast("Event created — submit it to the admin from the Events list.");
    }
    onUpdateClub({ ...club, events: nextEvents });
    setModalOpen(false);
  };

  const handleDeleteEvent = () => {
    if (!editingId) return;
    if (!confirm("Delete this event?")) return;
    onUpdateClub({
      ...club,
      events: club.events.filter((x) => x.id !== editingId),
    });
    toast("Event deleted.");
    setModalOpen(false);
  };

  const q = search.toLowerCase();
  const filteredRows = club.events
    .filter((e) => !q || e.name.toLowerCase().includes(q))
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Events</h1>
          <p>
            Create and manage your club&apos;s events. Status auto-updates by date,
            or set Cancelled manually.
          </p>
        </div>
        <div className="head-actions">
          <button
            type="button"
            className="btn primary"
            onClick={() => openEventModal(null)}
          >
            New event
          </button>
        </div>
      </div>

      <div className="search-bar">
        <input
          id="eventSearch"
          placeholder="Search events…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card">
        <div className="table-wrap">
          <EventsTable
            rows={filteredRows}
            onEdit={(id) => openEventModal(id)}
            onSubmit={handleSubmitEvent}
          />
        </div>
      </div>

      {incomingCollabs.length > 0 && (
        <div className="card" style={{ marginTop: "16px" }}>
          <h3 className="card-title">Collaborations with other clubs</h3>
          <p className="card-sub">
            Events hosted by another club that you are co-hosting. Managed by the
            host club.
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Host club</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {incomingCollabs.map((x) => {
                  const st = eventStatusAuto(x.event);
                  return (
                    <tr key={`${x.host}-${x.event.id}`}>
                      <td>{x.event.name}</td>
                      <td>{x.host}</td>
                      <td>{fmtDate(x.event.date)}</td>
                      <td>{x.event.venue}</td>
                      <td>
                        <span className={`badge ${st}`}>{st}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>{editingId ? "Edit event" : "New event"}</h2>
        <div className="field">
          <label htmlFor="eName">Event name *</label>
          <input
            id="eName"
            type="text"
            value={eName}
            onChange={(e) => setEName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="eCategory">Category</label>
          <select
            id="eCategory"
            value={eCategory}
            onChange={(e) => setECategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="eDesc">Description</label>
          <textarea
            id="eDesc"
            value={eDesc}
            onChange={(e) => setEDesc(e.target.value)}
          />
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="eDate">Date *</label>
            <input
              id="eDate"
              type="date"
              value={eDate}
              onChange={(e) => setEDate(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="eTarget">Target participants</label>
            <input
              id="eTarget"
              type="number"
              value={eTarget}
              onChange={(e) => setETarget(e.target.value)}
            />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="eStart">Start time</label>
            <input
              id="eStart"
              type="time"
              value={eStart}
              onChange={(e) => setEStart(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="eEnd">End time</label>
            <input
              id="eEnd"
              type="time"
              value={eEnd}
              onChange={(e) => setEEnd(e.target.value)}
            />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="eVenue">Venue</label>
            <input
              id="eVenue"
              type="text"
              value={eVenue}
              onChange={(e) => setEVenue(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label>
            Collaborating clubs{" "}
            <span style={{ fontWeight: 400, color: "var(--ink-soft)" }}>
              (optional — co-hosted with other clubs)
            </span>
          </label>
          {otherApproved.length > 0 ? (
            <div
              style={{
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-sm)",
                padding: "8px 10px",
                maxHeight: "130px",
                overflowY: "auto",
                background: "var(--paper)",
              }}
            >
              {otherApproved.map((c) => {
                const cid = c.account.officialClubId!;
                const cname = c.account.application.clubName;
                const checked = eCollabs.some((x) => x.clubId === cid);
                return (
                  <label
                    key={cid}
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                      fontWeight: 400,
                      margin: "3px 0",
                      color: "var(--ink)",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ width: "auto" }}
                      checked={checked}
                      onChange={(e) =>
                        handleToggleCollab(cid, cname, e.target.checked)
                      }
                    />{" "}
                    {cname}
                  </label>
                );
              })}
            </div>
          ) : (
            <div className="hint">No other registered clubs yet.</div>
          )}
          <input
            id="eExternal"
            placeholder="Other partners not on the console (comma-separated)"
            style={{ marginTop: "8px" }}
            value={eExternal}
            onChange={(e) => setEExternal(e.target.value)}
          />
          <div className="hint">
            Collaborating clubs will see this event in their Events list and
            Calendar.
          </div>
        </div>
        <div className="field">
          <label htmlFor="ePhotoInput">
            Photos{" "}
            <span style={{ fontWeight: 400, color: "var(--ink-soft)" }}>
              (up to {MAX_EVENT_PHOTOS} — add more any time)
            </span>
          </label>
          <div className="photo-grid">
            {ePhotos.map((src, i) => (
              <div key={i} className="photo-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Event photo ${i + 1}`} />
                <button
                  type="button"
                  title="Remove"
                  onClick={() => setEPhotos(ePhotos.filter((_, idx) => idx !== i))}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <input
            id="ePhotoInput"
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
          />
        </div>
        <div className="field">
          <label htmlFor="eStatus">Status override</label>
          <select
            id="eStatus"
            value={eStatus}
            onChange={(e) =>
              setEStatus(e.target.value === "cancelled" ? "cancelled" : "")
            }
          >
            <option value="">Auto (by date)</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="modal-actions">
          {editingId && (
            <button
              type="button"
              className="btn danger"
              style={{ marginRight: "auto" }}
              onClick={handleDeleteEvent}
            >
              Delete
            </button>
          )}
          <button
            type="button"
            className="btn ghost"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button type="button" className="btn primary" onClick={handleSaveEvent}>
            Save
          </button>
        </div>
      </Modal>
    </>
  );
}
