"use client";

import { useId } from "react";
import { LOT_TYPE_LABELS, type LotType } from "@/lib/forex/calculations";

const OPTIONS: LotType[] = ["standard", "mini", "micro"];

export default function LotTypeSelect({
  value,
  onChange,
  label = "Lot Type",
}: {
  value: LotType;
  onChange: (v: LotType) => void;
  label?: string;
}) {
  const id = useId();
  return (
    <div className="calc-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as LotType)} className="calc-select">
        {OPTIONS.map((o) => (
          <option key={o} value={o}>
            {LOT_TYPE_LABELS[o]}
          </option>
        ))}
      </select>
    </div>
  );
}
