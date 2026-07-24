"use client";

import { motion } from "framer-motion";

const rows = [
  { label: "Account Balance", value: "$10,000.00", color: "var(--text)" },
  { label: "Risk Per Trade", value: "1.00 %", color: "var(--gold)" },
  { label: "Stop-Loss Distance", value: "30.0 pips", color: "var(--muted)" },
  { label: "Recommended Position Size", value: "0.33 lots", color: "var(--mint)" },
];

export default function ToolsHeroVisual() {
  return (
    <div className="tools-hero-visual glow-card">
      <div className="tools-hero-visual-tag">
        <motion.span
          className="tools-hero-visual-dot"
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        Example calculation preview
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
      <p className="tools-hero-visual-note">Illustrative example — not a live calculation.</p>
    </div>
  );
}
