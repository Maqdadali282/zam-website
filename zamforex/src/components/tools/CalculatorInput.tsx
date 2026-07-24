"use client";

import { useId } from "react";

type Props = {
  label: string;
  value: number | "";
  onChange: (value: number | "") => void;
  unit?: string;
  hint?: string;
  min?: number;
  step?: number | string;
  placeholder?: string;
  error?: string;
};

export default function CalculatorInput({ label, value, onChange, unit, hint, min, step = "any", placeholder, error }: Props) {
  const id = useId();

  return (
    <div className="calc-field">
      <label htmlFor={id}>{label}</label>
      {hint && <p className="calc-field-hint">{hint}</p>}
      <div className={`calc-input-wrap${error ? " has-error" : ""}`}>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          step={step}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => {
            const raw = e.target.value;
            onChange(raw === "" ? "" : Number(raw));
          }}
        />
        {unit && <span className="calc-input-unit">{unit}</span>}
      </div>
      {error && (
        <p id={`${id}-error`} className="calc-field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
