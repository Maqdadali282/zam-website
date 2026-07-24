"use client";

import { motion } from "framer-motion";

const rows = [
  { label: "USD Strength", value: "Strong", color: "var(--mint)" },
  { label: "Sentiment", value: "Risk-On", color: "var(--cyan)" },
  { label: "Active Session", value: "London / New York", color: "var(--gold)" },
  { label: "Next High-Impact Event", value: "In 4h 12m", color: "var(--text)" },
];

export default function MarketsHeroVisual() {
  return (
    <div className="tools-hero-visual glow-card">
      <div className="tools-hero-visual-tag">
        <motion.span
          className="tools-hero-visual-dot"
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        Example market snapshot
      </div>
      <div className="tools-hero-visual-rows">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            className="tools-hero-visual-row"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.18, ease: "easeOut" }}
          >
            <span>{row.label}</span>
            <b style={{ color: row.color }}>{row.value}</b>
          </motion.div>
        ))}
      </div>
      <p className="tools-hero-visual-note">
        Illustrative example — not a live market feed.
      </p>
    </div>
  );
}
