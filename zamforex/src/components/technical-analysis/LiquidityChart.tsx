"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Point = { x: number; y: number; tag?: string; tagColor?: string };
type Scenario = {
  id: "bsl" | "ssl";
  label: string;
  lineColor: string;
  points: Point[];
  refLine: { y: number; label: string };
  chips: { label: string; color: string }[];
};

const vbW = 640;
const vbH = 260;
const padX = 24;
const baseline = 225;
const top = 25;
const scaleY = (v: number) => baseline - (v / 100) * (baseline - top);

function mkPoints(vals: (number | { v: number; tag?: string; tagColor?: string })[]): Point[] {
  const step = (vbW - padX * 2) / (vals.length - 1);
  return vals.map((entry, i) => {
    const v = typeof entry === "number" ? entry : entry.v;
    const tag = typeof entry === "number" ? undefined : entry.tag;
    const tagColor = typeof entry === "number" ? undefined : entry.tagColor;
    return { x: padX + step * i, y: scaleY(v), tag, tagColor };
  });
}

const RESTING = "var(--cat-3)";
const SWEEP = "var(--gold)";
const REVERSAL = "var(--mint)";
const REVERSAL_DOWN = "var(--red)";

const scenarios: Scenario[] = [
  {
    id: "bsl",
    label: "Buy-Side Liquidity Sweep",
    lineColor: "var(--cat-3)",
    points: mkPoints([
      40,
      { v: 72, tag: "Equal High", tagColor: RESTING },
      50,
      { v: 73, tag: "Equal High", tagColor: RESTING },
      48,
      { v: 92, tag: "Sweep / Stop Hunt", tagColor: SWEEP },
      { v: 32, tag: "Reversal", tagColor: REVERSAL_DOWN },
    ]),
    refLine: { y: 72, label: "Resting sell-stops above equal highs (BSL)" },
    chips: [
      { label: "Equal High", color: RESTING },
      { label: "Sweep / Stop Hunt", color: SWEEP },
      { label: "Reversal", color: REVERSAL_DOWN },
    ],
  },
  {
    id: "ssl",
    label: "Sell-Side Liquidity Sweep",
    lineColor: "var(--cat-3)",
    points: mkPoints([
      60,
      { v: 28, tag: "Equal Low", tagColor: RESTING },
      50,
      { v: 27, tag: "Equal Low", tagColor: RESTING },
      52,
      { v: 8, tag: "Sweep / Stop Hunt", tagColor: SWEEP },
      { v: 68, tag: "Reversal", tagColor: REVERSAL },
    ]),
    refLine: { y: 28, label: "Resting buy-stops below equal lows (SSL)" },
    chips: [
      { label: "Equal Low", color: RESTING },
      { label: "Sweep / Stop Hunt", color: SWEEP },
      { label: "Reversal", color: REVERSAL },
    ],
  },
];

export default function LiquidityChart() {
  const [tab, setTab] = useState<Scenario["id"]>("bsl");
  const [hoverChip, setHoverChip] = useState<string | null>(null);
  const scenario = useMemo(() => scenarios.find((s) => s.id === tab)!, [tab]);

  const pathD = scenario.points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");

  return (
    <div className="ms-chart-card glow-card">
      <div className="ms-tabs">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`ms-tab${tab === s.id ? " active" : ""}`}
            style={tab === s.id ? { background: s.lineColor, borderColor: s.lineColor, color: "#04140f" } : undefined}
            onClick={() => {
              setTab(s.id);
              setHoverChip(null);
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
          <line x1={8} y1={baseline} x2={vbW - 8} y2={baseline} stroke="var(--line)" strokeWidth="1" />

          <line
            x1={8}
            y1={scaleY(scenario.refLine.y)}
            x2={vbW - 8}
            y2={scaleY(scenario.refLine.y)}
            stroke={RESTING}
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.55"
          />
          {[0.35, 0.5, 0.65].map((f) => (
            <circle key={f} cx={8 + (vbW - 16) * f} cy={scaleY(scenario.refLine.y)} r="2.4" fill={RESTING} opacity="0.7" />
          ))}
          <text x={8} y={16} fontFamily="var(--font-mono)" fontSize="10" fill={RESTING}>
            {scenario.refLine.label}
          </text>

          <motion.path
            d={pathD}
            stroke={scenario.lineColor}
            strokeWidth="2.4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {scenario.points.map((p, i) => {
            const isActive = !!hoverChip && p.tag === hoverChip;
            const dimmed = !!hoverChip && !isActive;
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}
              >
                <g style={{ opacity: dimmed ? 0.25 : 1, transition: "opacity 0.2s ease" }}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isActive ? 6.5 : p.tag ? 4.5 : 3}
                    fill={p.tagColor ?? scenario.lineColor}
                    style={{ transition: "r 0.2s ease" }}
                  />
                  {p.tag && (
                    <text
                      x={p.x}
                      y={p.y - 14}
                      textAnchor="middle"
                      fontFamily="var(--font-mono)"
                      fontSize={isActive ? "12" : "10"}
                      fontWeight={isActive ? 700 : 400}
                      fill={p.tagColor ?? "var(--text)"}
                    >
                      {p.tag}
                    </text>
                  )}
                </g>
              </motion.g>
            );
          })}
        </motion.svg>
      </AnimatePresence>

      <div className="ms-chip-row">
        {scenario.chips.map((c) => (
          <div
            key={c.label}
            className={`ms-chip${hoverChip === c.label ? " highlight" : ""}`}
            style={{ borderColor: hoverChip === c.label ? c.color : undefined }}
            onMouseEnter={() => setHoverChip(c.label)}
            onMouseLeave={() => setHoverChip(null)}
          >
            <span className="dot" style={{ background: c.color }} />
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}
