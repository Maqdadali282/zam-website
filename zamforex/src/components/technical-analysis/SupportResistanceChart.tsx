"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Point = { x: number; y: number; tag?: string; tagColor?: string };
type Scenario = {
  id: "bullish" | "bearish";
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

const RES = "var(--red)";
const SUP = "var(--mint)";
const FLIP = "var(--gold)";

const scenarios: Scenario[] = [
  {
    id: "bullish",
    label: "Bullish Breakout & Flip",
    lineColor: "var(--mint)",
    points: mkPoints([
      30,
      { v: 65, tag: "Resistance", tagColor: RES },
      35,
      { v: 64, tag: "Resistance", tagColor: RES },
      38,
      { v: 88, tag: "Breakout", tagColor: FLIP },
      { v: 62, tag: "Retest / Flip", tagColor: FLIP },
      90,
    ]),
    refLine: { y: 65, label: "Old Resistance → New Support" },
    chips: [
      { label: "Resistance", color: RES },
      { label: "Breakout", color: FLIP },
      { label: "Retest / Flip", color: FLIP },
    ],
  },
  {
    id: "bearish",
    label: "Bearish Breakdown & Flip",
    lineColor: "var(--red)",
    points: mkPoints([
      70,
      { v: 35, tag: "Support", tagColor: SUP },
      65,
      { v: 36, tag: "Support", tagColor: SUP },
      63,
      { v: 12, tag: "Breakdown", tagColor: FLIP },
      { v: 38, tag: "Retest / Flip", tagColor: FLIP },
      10,
    ]),
    refLine: { y: 35, label: "Old Support → New Resistance" },
    chips: [
      { label: "Support", color: SUP },
      { label: "Breakdown", color: FLIP },
      { label: "Retest / Flip", color: FLIP },
    ],
  },
];

export default function SupportResistanceChart() {
  const [tab, setTab] = useState<Scenario["id"]>("bullish");
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
            style={tab === s.id ? { background: s.lineColor, borderColor: s.lineColor } : undefined}
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
            stroke="var(--gold)"
            strokeWidth="1.2"
            strokeDasharray="5 5"
            opacity="0.6"
          />
          <text x={8} y={16} fontFamily="var(--font-mono)" fontSize="10.5" fill="var(--gold)">
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
                transition={{ duration: 0.3, delay: 0.15 + i * 0.07 }}
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
