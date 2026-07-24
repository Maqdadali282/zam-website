"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Panel = { label: string; sub: string; values: number[]; bias: "bull" | "bear"; color: string };
type Scenario = {
  id: "aligned" | "conflicting";
  label: string;
  verdict: string;
  verdictColor: string;
  panels: [Panel, Panel, Panel];
};

const vbW = 640;
const vbH = 260;
const padX = 24;
const panelH = 68;
const panelGap = 12;
const panelTops = [16, 16 + panelH + panelGap, 16 + (panelH + panelGap) * 2];

const scaleY = (v: number, pTop: number) => pTop + panelH - (v / 100) * panelH;

function pathFor(vals: number[], pTop: number) {
  const step = (vbW - padX * 2) / (vals.length - 1);
  return vals.map((v, i) => `${i === 0 ? "M" : "L"}${padX + step * i} ${scaleY(v, pTop)}`).join(" ");
}

const HTF_UP = [30, 40, 52, 60, 72, 82, 90];

const scenarios: Scenario[] = [
  {
    id: "aligned",
    label: "Aligned Setup",
    verdict: "✓ All Three Agree — High Confidence",
    verdictColor: "var(--mint)",
    panels: [
      { label: "Weekly / Daily", sub: "Higher Timeframe — Bias", values: HTF_UP, bias: "bull", color: "var(--mint)" },
      { label: "4-Hour", sub: "Middle Timeframe — Structure", values: [40, 68, 52, 72, 58, 78, 90], bias: "bull", color: "var(--mint)" },
      { label: "15-Minute", sub: "Lower Timeframe — Entry", values: [55, 48, 60, 50, 65, 58, 85], bias: "bull", color: "var(--mint)" },
    ],
  },
  {
    id: "conflicting",
    label: "Conflicting Setup",
    verdict: "✗ Timeframes Disagree — Skip or Wait",
    verdictColor: "var(--red)",
    panels: [
      { label: "Weekly / Daily", sub: "Higher Timeframe — Bias", values: HTF_UP, bias: "bull", color: "var(--mint)" },
      { label: "4-Hour", sub: "Middle Timeframe — Structure", values: [70, 60, 68, 50, 58, 42, 48], bias: "bear", color: "var(--red)" },
      { label: "15-Minute", sub: "Lower Timeframe — Entry", values: [60, 52, 58, 44, 50, 38, 32], bias: "bear", color: "var(--red)" },
    ],
  },
];

const CHIP_KEYS = ["htf", "mtf", "ltf"] as const;

export default function MultiTimeframeChart() {
  const [tab, setTab] = useState<Scenario["id"]>("aligned");
  const [hover, setHover] = useState<string | null>(null);
  const scenario = useMemo(() => scenarios.find((s) => s.id === tab)!, [tab]);

  const dim = (key: string) => !!hover && hover !== key;

  return (
    <div className="ms-chart-card glow-card">
      <div className="ms-tabs">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`ms-tab${tab === s.id ? " active" : ""}`}
            style={tab === s.id ? { background: "var(--cat-8)", borderColor: "var(--cat-8)" } : undefined}
            onClick={() => {
              setTab(s.id);
              setHover(null);
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.svg
          key={tab}
          viewBox={`0 0 ${vbW} ${vbH}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {scenario.panels.map((panel, pi) => {
            const pTop = panelTops[pi];
            const key = CHIP_KEYS[pi];
            return (
              <g key={panel.label} style={{ opacity: dim(key) ? 0.3 : 1, transition: "opacity 0.2s ease" }}>
                <motion.rect
                  x={8}
                  y={pTop - 2}
                  width={vbW - 16}
                  height={panelH + 4}
                  fill={panel.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hover === key ? 0.12 : 0.05 }}
                  transition={{ duration: 0.4 }}
                />
                <line x1={8} y1={pTop + panelH} x2={vbW - 8} y2={pTop + panelH} stroke="var(--line)" strokeWidth="1" />
                <text x={10} y={pTop - 6} fontFamily="var(--font-mono)" fontSize="10.5" fontWeight={700} fill="var(--text)">
                  {panel.label}
                </text>
                <text x={vbW - 10} y={pTop - 6} textAnchor="end" fontFamily="var(--font-mono)" fontSize="9.5" fill={panel.color}>
                  {panel.sub} {panel.bias === "bull" ? "▲" : "▼"}
                </text>
                <motion.path
                  d={pathFor(panel.values, pTop)}
                  stroke={panel.color}
                  strokeWidth="2.2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: "easeInOut", delay: pi * 0.15 }}
                />
              </g>
            );
          })}

          <text x={vbW / 2} y={vbH - 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight={700} fill={scenario.verdictColor}>
            {scenario.verdict}
          </text>
        </motion.svg>
      </AnimatePresence>

      <div className="ms-chip-row">
        <div
          className={`ms-chip${hover === "htf" ? " highlight" : ""}`}
          style={{ borderColor: hover === "htf" ? scenario.panels[0].color : undefined }}
          onMouseEnter={() => setHover("htf")}
          onMouseLeave={() => setHover(null)}
        >
          <span className="dot" style={{ background: scenario.panels[0].color }} />
          Higher Timeframe (Bias)
        </div>
        <div
          className={`ms-chip${hover === "mtf" ? " highlight" : ""}`}
          style={{ borderColor: hover === "mtf" ? scenario.panels[1].color : undefined }}
          onMouseEnter={() => setHover("mtf")}
          onMouseLeave={() => setHover(null)}
        >
          <span className="dot" style={{ background: scenario.panels[1].color }} />
          Middle Timeframe (Structure)
        </div>
        <div
          className={`ms-chip${hover === "ltf" ? " highlight" : ""}`}
          style={{ borderColor: hover === "ltf" ? scenario.panels[2].color : undefined }}
          onMouseEnter={() => setHover("ltf")}
          onMouseLeave={() => setHover(null)}
        >
          <span className="dot" style={{ background: scenario.panels[2].color }} />
          Lower Timeframe (Entry)
        </div>
      </div>
    </div>
  );
}
