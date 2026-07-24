"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Direction = "up" | "down";
type Scenario = {
  id: "bullish" | "bearish";
  label: string;
  dir: Direction;
  low: number;
  high: number;
  priceValues: number[];
  lineColor: string;
};

const vbW = 640;
const vbH = 260;
const padX = 24;
const baseline = 225;
const top = 25;
const scaleY = (v: number) => baseline - (v / 100) * (baseline - top);

const LEVELS = [0, 23.6, 38.2, 50, 61.8, 78.6, 100];
const GOLD = "var(--gold)";

function fibValue(low: number, high: number, pct: number, dir: Direction) {
  return dir === "up" ? high - (pct / 100) * (high - low) : low + (pct / 100) * (high - low);
}

const scenarios: Scenario[] = [
  {
    id: "bullish",
    label: "Bullish Retracement",
    dir: "up",
    low: 18,
    high: 88,
    priceValues: [18, 88, 39, 55, 96],
    lineColor: "var(--mint)",
  },
  {
    id: "bearish",
    label: "Bearish Retracement",
    dir: "down",
    low: 15,
    high: 85,
    priceValues: [85, 15, 64, 46, 6],
    lineColor: "var(--red)",
  },
];

export default function FibonacciChart() {
  const [tab, setTab] = useState<Scenario["id"]>("bullish");
  const [hover, setHover] = useState<string | null>(null);
  const scenario = useMemo(() => scenarios.find((s) => s.id === tab)!, [tab]);

  const n = scenario.priceValues.length;
  const step = (vbW - padX * 2) / (n - 1);
  const xAt = (i: number) => padX + step * i;
  const pathD = scenario.priceValues.map((v, i) => `${i === 0 ? "M" : "L"}${xAt(i)} ${scaleY(v)}`).join(" ");

  const pocketTop = Math.min(fibValue(scenario.low, scenario.high, 61.8, scenario.dir), fibValue(scenario.low, scenario.high, 78.6, scenario.dir));
  const pocketBottom = Math.max(fibValue(scenario.low, scenario.high, 61.8, scenario.dir), fibValue(scenario.low, scenario.high, 78.6, scenario.dir));

  const dim = (key: string) => !!hover && hover !== key;

  const chips = [
    { key: "levels", label: "Fibonacci Levels", color: "var(--cat-1)" },
    { key: "pocket", label: "Golden Pocket (61.8–78.6%)", color: GOLD },
    { key: "continuation", label: "Continuation", color: scenario.lineColor },
  ];

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
          <g style={{ opacity: dim("levels") ? 0.25 : 1, transition: "opacity 0.2s ease" }}>
            {LEVELS.map((pct) => {
              const v = fibValue(scenario.low, scenario.high, pct, scenario.dir);
              const y = scaleY(v);
              const isGolden = pct === 61.8 || pct === 78.6;
              return (
                <g key={pct}>
                  <line
                    x1={8}
                    y1={y}
                    x2={vbW - 8}
                    y2={y}
                    stroke={isGolden ? GOLD : "var(--line)"}
                    strokeWidth={isGolden ? 1.4 : 1}
                    strokeDasharray="4 4"
                    opacity={isGolden ? 0.75 : 0.55}
                  />
                  <text x={vbW - 6} y={y - 4} textAnchor="end" fontFamily="var(--font-mono)" fontSize="9.5" fill={isGolden ? GOLD : "var(--muted)"}>
                    {pct}%
                  </text>
                </g>
              );
            })}
          </g>

          <motion.rect
            x={8}
            y={scaleY(pocketBottom)}
            width={vbW - 16}
            height={scaleY(pocketTop) - scaleY(pocketBottom)}
            fill={GOLD}
            initial={{ opacity: 0 }}
            animate={{ opacity: dim("pocket") ? 0.06 : 0.16 }}
            transition={{ duration: 0.5 }}
          />

          <motion.path
            d={pathD}
            stroke={scenario.lineColor}
            strokeWidth="2.6"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />

          <g style={{ opacity: dim("continuation") ? 0.2 : 1, transition: "opacity 0.2s ease" }}>
            <circle cx={xAt(n - 1)} cy={scaleY(scenario.priceValues[n - 1])} r="6" fill={scenario.lineColor} />
          </g>
        </motion.svg>
      </AnimatePresence>

      <div className="ms-chip-row">
        {chips.map((c) => (
          <div
            key={c.key}
            className={`ms-chip${hover === c.key ? " highlight" : ""}`}
            style={{ borderColor: hover === c.key ? c.color : undefined }}
            onMouseEnter={() => setHover(c.key)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="dot" style={{ background: c.color }} />
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}
