"use client";

import React, { useState } from "react";
import { sha256Hex } from "@/lib/utils";
import { useToast } from "@/components/ToastProvider";

interface RegistrarSettingsViewProps {
  onChangePassword: (newHash: string) => void;
  onResetAll: () => void;
}

export function RegistrarSettingsView({
  onChangePassword,
  onResetAll,
}: RegistrarSettingsViewProps) {
  const { toast } = useToast();
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");

  const handleUpdatePass = async () => {
    const a = p1.trim();
    const b = p2.trim();
    if (a.length < 6) {
      toast("Use at least 6 characters.", true);
      return;
    }
    if (a !== b) {
      toast("Passwords don't match.", true);
      return;
    }
    const hash = await sha256Hex(a);
    onChangePassword(hash);
    setP1("");
    setP2("");
    toast("Password updated.");
  };

  const handleReset = () => {
    if (
      !confirm(
        "This permanently erases all registrar data and the admin password for this console. Continue?"
      )
    ) {
      return;
    }
    onResetAll();
    toast("Console data cleared.");
  };

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Settings</h1>
          <p>Console-level preferences.</p>
        </div>
        <div className="head-actions" />
      </div>

      <div className="card" style={{ maxWidth: "480px" }}>
        <h3 className="card-title" style={{ fontSize: "14px" }}>
          Change password
        </h3>
        <div className="field">
          <label htmlFor="newPass">New password</label>
          <input
            id="newPass"
            type="password"
            value={p1}
            onChange={(e) => setP1(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="newPass2">Confirm</label>
          <input
            id="newPass2"
            type="password"
            value={p2}
            onChange={(e) => setP2(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn primary"
          onClick={handleUpdatePass}
        >
          Update password
        </button>
      </div>

      <div className="card" style={{ maxWidth: "480px", marginTop: "16px" }}>
        <h3 className="card-title" style={{ fontSize: "14px" }}>
          Clear console data
        </h3>
        <p className="card-sub">
          Permanently erases the records, admin password and settings stored by
          this console in this browser. Club-submitted data in the shared store
          is not affected.
        </p>
        <button type="button" className="btn danger" onClick={handleReset}>
          Clear all data
        </button>
      </div>
    </>
  );
}
