"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Mode = "on" | "off";

const modes: Record<Mode, {
  label: string;
  color: string;
  headline: string;
  points: string[];
  currencies: { code: string; dir: "up" | "down" }[];
}> = {
  on: {
    label: "RISK-ON",
    color: "var(--mint)",
    headline: "Investors seek riskier assets",
    points: [
      "Stocks and equity indices tend to rise",
      "Commodity currencies often strengthen",
      "Safe havens often underperform",
    ],
    currencies: [
      { code: "AUD", dir: "up" },
      { code: "NZD", dir: "up" },
      { code: "CAD", dir: "up" },
      { code: "USD", dir: "down" },
      { code: "JPY", dir: "down" },
      { code: "CHF", dir: "down" },
    ],
  },
  off: {
    label: "RISK-OFF",
    color: "var(--red)",
    headline: "Investors seek safer assets",
    points: [
      "Stocks and equity indices tend to fall",
      "Safe havens (USD, JPY, CHF) often strengthen",
      "Commodity currencies often weaken",
    ],
    currencies: [
      { code: "USD", dir: "up" },
      { code: "JPY", dir: "up" },
      { code: "CHF", dir: "up" },
      { code: "AUD", dir: "down" },
      { code: "NZD", dir: "down" },
      { code: "CAD", dir: "down" },
    ],
  },
};

export default function RiskToggleDashboard() {
  const [mode, setMode] = useState<Mode>("on");
  const m = modes[mode];

  return (
    <div>
      <div className="sentiment-toggle-wrap">
        <div className="sentiment-toggle">
          {(Object.keys(modes) as Mode[]).map((key) => (
            <button
              key={key}
              type="button"
              className={mode === key ? "active" : undefined}
              style={mode === key ? { background: modes[key].color, color: "#04140f" } : undefined}
              onClick={() => setMode(key)}
            >
              {modes[key].label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          className="data-card glow-card"
          style={{ borderTopColor: m.color, borderTopWidth: "3px" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="data-card-head">
            <h4 style={{ color: m.color }}>{m.headline}</h4>
          </div>

          <ul style={{ margin: "0 0 22px", paddingLeft: "20px", color: "var(--muted)", fontSize: "13px", lineHeight: 1.7 }}>
            {m.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <div className="ms-chip-row" style={{ borderTop: "none", marginTop: 0, paddingTop: 0 }}>
            {m.currencies.map((c) => (
              <div
                key={c.code}
                className="ms-chip"
                style={{ borderColor: c.dir === "up" ? "var(--mint)" : "var(--red)", color: c.dir === "up" ? "var(--mint)" : "var(--red)" }}
              >
                {c.code} {c.dir === "up" ? "▲" : "▼"}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
