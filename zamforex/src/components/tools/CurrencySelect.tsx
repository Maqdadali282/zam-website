"use client";

import { useId } from "react";
import { CURRENCIES, type CurrencyCode } from "@/lib/forex/pairs";

export default function CurrencySelect({
  label = "Account Currency",
  value,
  onChange,
  hint,
}: {
  label?: string;
  value: CurrencyCode;
  onChange: (code: CurrencyCode) => void;
  hint?: string;
}) {
  const id = useId();
  return (
    <div className="calc-field">
      <label htmlFor={id}>{label}</label>
      {hint && <p className="calc-field-hint">{hint}</p>}
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as CurrencyCode)} className="calc-select">
        {CURRENCIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
