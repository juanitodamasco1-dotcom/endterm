"use client";

import React from "react";

export interface PersonValue {
  firstName: string;
  middleName: string;
  lastName: string;
  extName: string;
  email: string;
}

interface PersonFieldsProps {
  prefix: string;
  label?: string;
  required?: boolean;
  value: PersonValue;
  onChange: (next: PersonValue) => void;
}

export function PersonFields({
  prefix,
  label,
  required = false,
  value,
  onChange,
}: PersonFieldsProps) {
  const star = required ? " *" : "";
  const update = (key: keyof PersonValue, v: string) =>
    onChange({ ...value, [key]: v });

  return (
    <>
      <div className="field-row-3">
        <div className="field">
          <label htmlFor={`${prefix}First`}>
            {label ? `${label} first name` : "First name"}
            {star}
          </label>
          <input
            id={`${prefix}First`}
            type="text"
            value={value.firstName}
            onChange={(e) => update("firstName", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor={`${prefix}Middle`}>
            {label ? `${label} middle name` : "Middle name"}
          </label>
          <input
            id={`${prefix}Middle`}
            type="text"
            value={value.middleName}
            onChange={(e) => update("middleName", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor={`${prefix}Last`}>
            {label ? `${label} last name` : "Last name"}
            {star}
          </label>
          <input
            id={`${prefix}Last`}
            type="text"
            value={value.lastName}
            onChange={(e) => update("lastName", e.target.value)}
          />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor={`${prefix}Ext`}>
            {label ? `${label} ext. (Jr., III)` : "Ext. (Jr., III)"}
          </label>
          <input
            id={`${prefix}Ext`}
            type="text"
            value={value.extName}
            onChange={(e) => update("extName", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor={`${prefix}Email`}>
            {label ? `${label} email` : "Email"}
            {star}
          </label>
          <input
            id={`${prefix}Email`}
            type="email"
            value={value.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
