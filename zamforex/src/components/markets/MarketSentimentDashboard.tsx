"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Mode = "bullish" | "neutral" | "bearish";

const modes: Record<
  Mode,
  {
    label: string;
    color: string;
    headline: string;
    points: string[];
    currencies: { code: string; dir: "up" | "down" | "flat" }[];
  }
> = {
  bullish: {
    label: "BULLISH",
    color: "var(--mint)",
    headline: "Positioning leans toward buying",
    points: [
      "More traders are net-long than net-short on this reading",
      "Often paired with risk-on flows into higher-yielding currencies",
      "A crowded bullish position can reverse sharply if sentiment shifts",
    ],
    currencies: [
      { code: "AUD", dir: "up" },
      { code: "NZD", dir: "up" },
      { code: "GBP", dir: "up" },
      { code: "USD", dir: "flat" },
      { code: "JPY", dir: "down" },
      { code: "CHF", dir: "down" },
    ],
  },
  neutral: {
    label: "NEUTRAL",
    color: "var(--gold)",
    headline: "Positioning is roughly balanced",
    points: [
      "No strong consensus lean among market participants",
      "Often seen ahead of a major data release or central bank decision",
      "Low positioning conviction can mean a bigger reaction once a catalyst hits",
    ],
    currencies: [
      { code: "USD", dir: "flat" },
      { code: "EUR", dir: "flat" },
      { code: "GBP", dir: "flat" },
      { code: "JPY", dir: "flat" },
      { code: "AUD", dir: "flat" },
      { code: "CAD", dir: "flat" },
    ],
  },
  bearish: {
    label: "BEARISH",
    color: "var(--red)",
    headline: "Positioning leans toward selling",
    points: [
      "More traders are net-short than net-long on this reading",
      "Often paired with risk-off flows into safe havens",
      "A crowded bearish position can squeeze violently on a surprise catalyst",
    ],
    currencies: [
      { code: "USD", dir: "up" },
      { code: "JPY", dir: "up" },
      { code: "CHF", dir: "up" },
      { code: "AUD", dir: "down" },
      { code: "NZD", dir: "down" },
      { code: "GBP", dir: "down" },
    ],
  },
};

const dirSymbol: Record<"up" | "down" | "flat", string> = {
  up: "▲",
  down: "▼",
  flat: "●",
};

export default function MarketSentimentDashboard() {
  const [mode, setMode] = useState<Mode>("neutral");
  const m = modes[mode];

  return (
    <div>
      <div className="sentiment-toggle-wrap">
        <div className="sentiment-toggle" role="group" aria-label="Market sentiment">
          {(Object.keys(modes) as Mode[]).map((key) => (
            <button
              key={key}
              type="button"
              className={mode === key ? "active" : undefined}
              style={mode === key ? { background: modes[key].color, color: "#04140f" } : undefined}
              aria-pressed={mode === key}
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
                style={{
                  borderColor: c.dir === "up" ? "var(--mint)" : c.dir === "down" ? "var(--red)" : "var(--muted)",
                  color: c.dir === "up" ? "var(--mint)" : c.dir === "down" ? "var(--red)" : "var(--muted)",
                }}
              >
                {c.code} {dirSymbol[c.dir]}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <p style={{ color: "var(--muted)", fontSize: "12.5px", marginTop: "18px", lineHeight: 1.6 }}>
        This reflects illustrative positioning and mood only — it is not a
        guaranteed predictor of future price movement. Sentiment can and does
        reverse quickly on new information.
      </p>
    </div>
  );
}
