"use client";

import type { TradeDirection } from "@/lib/forex/calculations";

export default function TradeDirectionToggle({
  value,
  onChange,
  label = "Trade Direction",
}: {
  value: TradeDirection;
  onChange: (v: TradeDirection) => void;
  label?: string;
}) {
  return (
    <div className="calc-field">
      <span className="calc-field-label-static">{label}</span>
      <div className="direction-toggle" role="group" aria-label={label}>
        <button
          type="button"
          className={`direction-toggle-btn${value === "buy" ? " active active-buy" : ""}`}
          aria-pressed={value === "buy"}
          onClick={() => onChange("buy")}
        >
          ▲ Buy / Long
        </button>
        <button
          type="button"
          className={`direction-toggle-btn${value === "sell" ? " active active-sell" : ""}`}
          aria-pressed={value === "sell"}
          onClick={() => onChange("sell")}
        >
          ▼ Sell / Short
        </button>
      </div>
    </div>
  );
}
