"use client";

import { useId } from "react";
import { CURRENCY_PAIRS } from "@/lib/forex/pairs";

export default function CurrencyPairSelect({
  label = "Currency Pair",
  value,
  onChange,
  hint,
}: {
  label?: string;
  value: string;
  onChange: (symbol: string) => void;
  hint?: string;
}) {
  const id = useId();
  return (
    <div className="calc-field">
      <label htmlFor={id}>{label}</label>
      {hint && <p className="calc-field-hint">{hint}</p>}
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="calc-select">
        {CURRENCY_PAIRS.map((p) => (
          <option key={p.symbol} value={p.symbol}>
            {p.symbol}
          </option>
        ))}
      </select>
    </div>
  );
}
