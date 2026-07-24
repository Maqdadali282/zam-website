"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Point = { x: number; y: number; tag?: string; tagColor?: string };
type Scenario = {
  id: "bullish" | "bearish" | "ranging";
  label: string;
  lineColor: string;
  points: Point[];
  refLines?: { y: number; label: string }[];
  chips: { label: string; color: string; matchTags: string[] }[];
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

const BOS_COLOR = "var(--mint)";
const CHOCH_COLOR = "var(--red)";

const scenarios: Scenario[] = [
  {
    id: "bullish",
    label: "Bullish Structure",
    lineColor: "var(--mint)",
    points: mkPoints([
      20,
      55,
      38,
      { v: 72, tag: "HH / BOS", tagColor: BOS_COLOR },
      { v: 50, tag: "HL", tagColor: "var(--text)" },
      { v: 92, tag: "HH / BOS", tagColor: BOS_COLOR },
      { v: 34, tag: "CHoCH", tagColor: CHOCH_COLOR },
    ]),
    chips: [
      { label: "HH", color: "var(--text)", matchTags: ["HH / BOS"] },
      { label: "HL", color: "var(--text)", matchTags: ["HL"] },
      { label: "BOS", color: BOS_COLOR, matchTags: ["HH / BOS"] },
      { label: "CHoCH", color: CHOCH_COLOR, matchTags: ["CHoCH"] },
    ],
  },
  {
    id: "bearish",
    label: "Bearish Structure",
    lineColor: "var(--red)",
    points: mkPoints([
      80,
      45,
      62,
      { v: 28, tag: "LL / BOS", tagColor: BOS_COLOR },
      { v: 50, tag: "LH", tagColor: "var(--text)" },
      { v: 8, tag: "LL / BOS", tagColor: BOS_COLOR },
      { v: 66, tag: "CHoCH", tagColor: CHOCH_COLOR },
    ]),
    chips: [
      { label: "LL", color: "var(--text)", matchTags: ["LL / BOS"] },
      { label: "LH", color: "var(--text)", matchTags: ["LH"] },
      { label: "BOS", color: BOS_COLOR, matchTags: ["LL / BOS"] },
      { label: "CHoCH", color: CHOCH_COLOR, matchTags: ["CHoCH"] },
    ],
  },
  {
    id: "ranging",
    label: "Ranging Market",
    lineColor: "var(--gold)",
    points: mkPoints([
      50,
      { v: 78, tag: "Range High", tagColor: "var(--gold)" },
      32,
      { v: 76, tag: "Range High", tagColor: "var(--gold)" },
      { v: 24, tag: "Range Low", tagColor: "var(--gold)" },
      { v: 74, tag: "Range High", tagColor: "var(--gold)" },
      { v: 26, tag: "Range Low", tagColor: "var(--gold)" },
    ]),
    refLines: [
      { y: 77, label: "Resistance" },
      { y: 25, label: "Support" },
    ],
    chips: [
      { label: "Range High", color: "var(--gold)", matchTags: ["Range High"] },
      { label: "Range Low", color: "var(--gold)", matchTags: ["Range Low"] },
    ],
  },
];

export default function MarketStructureChart() {
  const [tab, setTab] = useState<Scenario["id"]>("bullish");
  const [hoverChip, setHoverChip] = useState<string | null>(null);
  const scenario = useMemo(() => scenarios.find((s) => s.id === tab)!, [tab]);

  const pathD = scenario.points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
  const activeChip = scenario.chips.find((c) => c.label === hoverChip);

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

          {scenario.refLines?.map((rl) => (
            <line
              key={rl.label}
              x1={8}
              y1={scaleY(rl.y)}
              x2={vbW - 8}
              y2={scaleY(rl.y)}
              stroke="var(--gold)"
              strokeWidth="1"
              strokeDasharray="5 5"
              opacity="0.5"
            />
          ))}

          <motion.path
            d={pathD}
            stroke={scenario.lineColor}
            strokeWidth="2.4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />

          {scenario.points.map((p, i) => {
            const isActive = activeChip && p.tag === activeChip.matchTags[0];
            const dimmed = activeChip && !isActive;
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
                    r={isActive ? 6.5 : 4}
                    fill={p.tagColor ?? scenario.lineColor}
                    style={{ transition: "r 0.2s ease" }}
                  />
                  {p.tag && (
                    <text
                      x={p.x}
                      y={p.y - 14}
                      textAnchor="middle"
                      fontFamily="var(--font-mono)"
                      fontSize={isActive ? "12.5" : "10.5"}
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
