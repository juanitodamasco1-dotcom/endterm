"use client";

import React from "react";
import { CATEGORIES, MAX_ACCRED_PHOTOS } from "@/lib/constants";
import { compressImage } from "@/lib/utils";
import { PersonFields, PersonValue } from "@/components/PersonFields";
import { useToast } from "@/components/ToastProvider";

export interface ClubDetailValue {
  clubName: string;
  category: string;
  adviser: PersonValue;
  description: string;
  accreditationPhotos: string[];
}

interface ClubDetailFieldsProps {
  value: ClubDetailValue;
  onChange: (next: ClubDetailValue) => void;
  onPreviewPhoto: (src: string, title: string) => void;
}

export function ClubDetailFields({
  value,
  onChange,
  onPreviewPhoto,
}: ClubDetailFieldsProps) {
  const { toast } = useToast();

  const handleFileChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(ev.target.files || []);
    ev.target.value = "";
    const nextPhotos = value.accreditationPhotos.slice();
    for (const file of files) {
      if (nextPhotos.length >= MAX_ACCRED_PHOTOS) {
        toast(`Up to ${MAX_ACCRED_PHOTOS} accreditation images allowed.`, true);
        break;
      }
      try {
        nextPhotos.push(await compressImage(file));
      } catch {
        toast(`Couldn't read ${file.name}.`, true);
      }
    }
    onChange({ ...value, accreditationPhotos: nextPhotos });
  };

  const removePhoto = (idx: number) => {
    const nextPhotos = value.accreditationPhotos.filter((_, i) => i !== idx);
    onChange({ ...value, accreditationPhotos: nextPhotos });
  };

  return (
    <>
      <div className="field">
        <label htmlFor="cdName">Club name *</label>
        <input
          id="cdName"
          type="text"
          value={value.clubName}
          onChange={(e) => onChange({ ...value, clubName: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="cdCategory">Category</label>
        <select
          id="cdCategory"
          value={value.category}
          onChange={(e) => onChange({ ...value, category: e.target.value })}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <h3 className="card-title" style={{ fontSize: "14px", marginTop: "6px" }}>
        Adviser
      </h3>
      <PersonFields
        prefix="cdAdviser"
        required
        value={value.adviser}
        onChange={(adviser) => onChange({ ...value, adviser })}
      />
      <div className="field">
        <label htmlFor="cdDesc">Short description</label>
        <textarea
          id="cdDesc"
          placeholder="What does this club do?"
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="cdAccredInput">
          Proof of club accreditation *{" "}
          <span style={{ fontWeight: 400, color: "var(--ink-soft)" }}>
            (Approved papers — digital copy or photo, up to {MAX_ACCRED_PHOTOS})
          </span>
        </label>
        <div className="photo-grid" id="cdAccredGrid">
          {value.accreditationPhotos.map((src, i) => (
            <div
              key={i}
              className="photo-thumb"
              style={{ cursor: "pointer" }}
              title="Click to preview"
              onClick={() =>
                onPreviewPhoto(
                  src,
                  `Proof of Club Accreditation (${i + 1}/${value.accreditationPhotos.length})`
                )
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Accreditation proof ${i + 1}`} />
              <button
                type="button"
                title="Remove"
                onClick={(ev) => {
                  ev.stopPropagation();
                  removePhoto(i);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          id="cdAccredInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <div className="hint">
          Upload a clear picture or digital image of your club&apos;s approved accreditation papers.
        </div>
      </div>
    </>
  );
}
