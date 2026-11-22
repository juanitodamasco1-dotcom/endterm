"use client";

import React from "react";
import { Modal } from "@/components/Modal";

interface ImagePreviewModalProps {
  src: string | null;
  title?: string;
  onClose: () => void;
}

export function ImagePreviewModal({ src, title, onClose }: ImagePreviewModalProps) {
  return (
    <Modal open={!!src} onClose={onClose}>
      <h2>{title || "Accreditation Proof"}</h2>
      <div
        style={{
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-sm)",
          overflow: "hidden",
          background: "var(--paper)",
          maxHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt="Accreditation proof"
            style={{
              maxWidth: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
              display: "block",
            }}
          />
        )}
      </div>
      <div className="modal-actions">
        <button type="button" className="btn primary" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
