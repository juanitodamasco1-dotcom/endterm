"use client";

import React, { useState } from "react";
import { LOGO_SRC, ROLES, YEAR_LEVELS } from "@/lib/constants";
import { fmtDate, fullName, isEmail, normalizeEmail, todayStr, uid } from "@/lib/utils";
import { Club, Member } from "@/types/club";
import { Modal } from "@/components/Modal";
import { PersonFields, PersonValue } from "@/components/PersonFields";
import { useToast } from "@/components/ToastProvider";

interface SettingsViewProps {
  club: Club;
  onUpdateClub: (next: Club) => void;
}

export function SettingsView({ club, onUpdateClub }: SettingsViewProps) {
  const { toast } = useToast();
  const clubName = club.account.application.clubName;

  const [brandTitleInput, setBrandTitleInput] = useState(club.branding?.title || "");
  const [brandSubInput, setBrandSubInput] = useState(club.branding?.sub || "");

  const [memberSearch, setMemberSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [person, setPerson] = useState<PersonValue>({
    firstName: "",
    middleName: "",
    lastName: "",
    extName: "",
    email: "",
  });
  const [program, setProgram] = useState("");
  const [year, setYear] = useState(YEAR_LEVELS[0]);
  const [role, setRole] = useState(ROLES[ROLES.length - 1]);

  const previewTitle = brandTitleInput.trim() || "Club Console";
  const previewSub = brandSubInput.trim() || clubName;

  const handleSaveBrand = () => {
    onUpdateClub({
      ...club,
      branding: {
        title: brandTitleInput.trim(),
        sub: brandSubInput.trim(),
      },
    });
    toast("Names updated.");
  };

  const handleResetBrand = () => {
    setBrandTitleInput("");
    setBrandSubInput("");
    onUpdateClub({
      ...club,
      branding: { title: "", sub: "" },
    });
    toast("Names reset to default.");
  };

  const openMemberModal = (m: Member | null) => {
    if (m) {
      setEditingMemberId(m.id);
      setPerson({
        firstName: m.firstName,
        middleName: m.middleName,
        lastName: m.lastName,
        extName: m.extName,
        email: m.email,
      });
      setProgram(m.program);
      setYear(m.year);
      setRole(m.role);
    } else {
      setEditingMemberId(null);
      setPerson({
        firstName: "",
        middleName: "",
        lastName: "",
        extName: "",
        email: "",
      });
      setProgram("");
      setYear(YEAR_LEVELS[0]);
      setRole(ROLES[ROLES.length - 1]);
    }
    setModalOpen(true);
  };

  const handleSaveMember = () => {
    const firstName = person.firstName.trim();
    const lastName = person.lastName.trim();
    const email = normalizeEmail(person.email);
    if (!firstName || !lastName) {
      toast("First and last name are required.", true);
      return;
    }
    if (email && !isEmail(email)) {
      toast("Enter a valid email.", true);
      return;
    }
    const data = {
      firstName,
      middleName: person.middleName.trim(),
      lastName,
      extName: person.extName.trim(),
      email,
      program: program.trim(),
      year: year || YEAR_LEVELS[0],
      role: role || ROLES[ROLES.length - 1],
    };

    let nextMembers: Member[];
    if (editingMemberId) {
      nextMembers = club.members.map((m) =>
        m.id === editingMemberId ? { ...m, ...data } : m
      );
      toast("Member updated.");
    } else {
      nextMembers = [
        ...club.members,
        { id: uid("MEM"), joinedAt: todayStr(), ...data },
      ];
      toast("Member added.");
    }
    onUpdateClub({ ...club, members: nextMembers });
    setModalOpen(false);
  };

  const handleDeleteMember = (id: string) => {
    if (!confirm("Remove this member?")) return;
    onUpdateClub({
      ...club,
      members: club.members.filter((m) => m.id !== id),
    });
    toast("Member removed.");
  };

  const q = memberSearch.toLowerCase();
  const filteredMembers = club.members.filter(
    (m) =>
      !q ||
      fullName(m.firstName, m.middleName, m.lastName, m.extName)
        .toLowerCase()
        .includes(q) ||
      m.program.toLowerCase().includes(q)
  );

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Settings</h1>
          <p>Personalize your console and manage your club&apos;s members.</p>
        </div>
        <div className="head-actions" />
      </div>

      <div className="card" style={{ marginBottom: "18px" }}>
        <h3 className="card-title">Personalization</h3>
        <p className="card-sub">
          Change the names shown at the top of the sidebar. Leave a field blank to use
          the default. Names can only be changed here in Settings.
        </p>
        <div className="field-row">
          <div className="field">
            <label htmlFor="brandTitle">Top name</label>
            <input
              id="brandTitle"
              maxLength={40}
              placeholder="Club Console"
              value={brandTitleInput}
              onChange={(e) => setBrandTitleInput(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="brandSub">Bottom name</label>
            <input
              id="brandSub"
              maxLength={60}
              placeholder={clubName}
              value={brandSubInput}
              onChange={(e) => setBrandSubInput(e.target.value)}
            />
          </div>
        </div>
        <div
          className="brand"
          style={{
            background: "var(--paper)",
            border: "1px solid var(--line)",
            borderRadius: "10px",
            padding: "10px 14px",
            marginBottom: "12px",
            display: "inline-flex",
          }}
          aria-label="Sidebar preview"
        >
          <div className="brand-mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_SRC} alt="Logo" />
          </div>
          <div className="brand-text">
            <div className="name">{previewTitle}</div>
            <div className="sub">{previewSub}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button type="button" className="btn primary" onClick={handleSaveBrand}>
            Save names
          </button>
          <button type="button" className="btn ghost" onClick={handleResetBrand}>
            Reset to default
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "10px",
        }}
      >
        <div>
          <h3 className="card-title" style={{ margin: 0 }}>
            Members
          </h3>
          <p className="card-sub" style={{ margin: "2px 0 0" }}>
            Your club&apos;s roster.
          </p>
        </div>
        <button
          type="button"
          className="btn primary"
          onClick={() => openMemberModal(null)}
        >
          Add member
        </button>
      </div>

      <div className="search-bar">
        <input
          id="memberSearch"
          placeholder="Search by name or program…"
          value={memberSearch}
          onChange={(e) => setMemberSearch(e.target.value)}
        />
      </div>

      <div className="card">
        <div className="table-wrap">
          {!filteredMembers.length ? (
            <div className="empty">
              <div className="big">No members yet</div>
              <div>Add your first member to start building your roster.</div>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Program</th>
                  <th>Year</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((m) => (
                  <tr key={m.id}>
                    <td>{fullName(m.firstName, m.middleName, m.lastName, m.extName)}</td>
                    <td>{m.program}</td>
                    <td>{m.year}</td>
                    <td>{m.role}</td>
                    <td>{m.email}</td>
                    <td>{fmtDate(m.joinedAt)}</td>
                    <td>
                      <div className="row-actions">
                        <button
                          type="button"
                          className="btn small"
                          onClick={() => openMemberModal(m)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn small danger"
                          onClick={() => handleDeleteMember(m.id)}
                        >
                          Remove
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>{editingMemberId ? "Edit member" : "Add member"}</h2>
        <PersonFields
          prefix="m"
          label="Member"
          required
          value={person}
          onChange={setPerson}
        />
        <div className="field-row">
          <div className="field">
            <label htmlFor="mProgram">Program</label>
            <input
              id="mProgram"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="mYear">Year level</label>
            <select
              id="mYear"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {YEAR_LEVELS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="mRole">Role</label>
          <select id="mRole" value={role} onChange={(e) => setRole(e.target.value)}>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-actions">
          <button
            type="button"
            className="btn ghost"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button type="button" className="btn primary" onClick={handleSaveMember}>
            Save
          </button>
        </div>
      </Modal>
    </>
  );
}
