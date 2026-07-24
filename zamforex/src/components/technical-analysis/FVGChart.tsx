"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Candle = { o: number; h: number; l: number; c: number };
type Scenario = {
  id: "bullish" | "bearish";
  label: string;
  candles: Candle[];
  displacementIndex: number;
  fillIndex: number;
  reactionIndex: number;
  zoneTop: number;
  zoneBottom: number;
  zoneFromIdx: number;
  zoneToIdx: number;
  chips: { label: string; color: string }[];
};

const vbW = 640;
const vbH = 230;
const padX = 24;
const baseline = 200;
const top = 18;

const FVG_COLOR = "var(--cat-4)";
const DISPLACEMENT = "var(--gold)";

const scenarios: Scenario[] = [
  {
    id: "bullish",
    label: "Bullish Example",
    candles: [
      { o: 38, h: 50, l: 36, c: 48 },
      { o: 48, h: 74, l: 46, c: 70 },
      { o: 70, h: 80, l: 68, c: 78 },
      { o: 78, h: 90, l: 76, c: 88 },
      { o: 88, h: 90, l: 56, c: 58 },
      { o: 58, h: 82, l: 56, c: 80 },
    ],
    displacementIndex: 1,
    fillIndex: 4,
    reactionIndex: 5,
    zoneTop: 68,
    zoneBottom: 50,
    zoneFromIdx: 0,
    zoneToIdx: 2,
    chips: [
      { label: "Displacement", color: DISPLACEMENT },
      { label: "FVG Zone", color: FVG_COLOR },
      { label: "Return / Fill", color: "var(--text)" },
      { label: "Reaction", color: "var(--mint)" },
    ],
  },
  {
    id: "bearish",
    label: "Bearish Example",
    candles: [
      { o: 62, h: 64, l: 50, c: 52 },
      { o: 52, h: 54, l: 26, c: 30 },
      { o: 30, h: 32, l: 20, c: 22 },
      { o: 22, h: 24, l: 10, c: 12 },
      { o: 12, h: 44, l: 10, c: 42 },
      { o: 42, h: 44, l: 18, c: 20 },
    ],
    displacementIndex: 1,
    fillIndex: 4,
    reactionIndex: 5,
    zoneTop: 50,
    zoneBottom: 32,
    zoneFromIdx: 0,
    zoneToIdx: 2,
    chips: [
      { label: "Displacement", color: DISPLACEMENT },
      { label: "FVG Zone", color: FVG_COLOR },
      { label: "Return / Fill", color: "var(--text)" },
      { label: "Reaction", color: "var(--red)" },
    ],
  },
];

export default function FVGChart() {
  const [tab, setTab] = useState<Scenario["id"]>("bullish");
  const [hover, setHover] = useState<string | null>(null);
  const scenario = useMemo(() => scenarios.find((s) => s.id === tab)!, [tab]);

  const n = scenario.candles.length;
  const slot = Math.min(40, (vbW - padX * 2) / n);
  const candleW = slot * 0.58;
  const startX = (vbW - slot * n) / 2;
  const xAt = (i: number) => startX + slot * i + slot / 2;

  const domainVals = [...scenario.candles.flatMap((k) => [k.h, k.l]), scenario.zoneTop, scenario.zoneBottom];
  const rawMin = Math.min(...domainVals);
  const rawMax = Math.max(...domainVals);
  const domainPad = (rawMax - rawMin) * 0.14 || 5;
  const domainMin = rawMin - domainPad;
  const domainMax = rawMax + domainPad;
  const scaleY = (v: number) => baseline - ((v - domainMin) / (domainMax - domainMin)) * (baseline - top);

  return (
    <div className="ms-chart-card glow-card">
      <div className="ms-tabs">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`ms-tab${tab === s.id ? " active" : ""}`}
            style={tab === s.id ? { background: FVG_COLOR, borderColor: FVG_COLOR, color: "#1a1400" } : undefined}
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
          <line x1={8} y1={baseline} x2={vbW - 8} y2={baseline} stroke="var(--line)" strokeWidth="1" />
          <text x={8} y={16} fontFamily="var(--font-mono)" fontSize="10.5" fill={FVG_COLOR}>
            Fair Value Gap — a 3-candle imbalance
          </text>

          <motion.rect
            x={xAt(scenario.zoneFromIdx) - slot / 2}
            y={scaleY(scenario.zoneTop)}
            width={xAt(scenario.zoneToIdx) - xAt(scenario.zoneFromIdx) + slot}
            height={scaleY(scenario.zoneBottom) - scaleY(scenario.zoneTop)}
            fill={FVG_COLOR}
            initial={{ opacity: 0 }}
            animate={{ opacity: !!hover && hover !== "fvg" ? 0.08 : 0.22 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          {scenario.candles.map((k, i) => {
            const bull = k.c >= k.o;
            const isDisp = i === scenario.displacementIndex;
            const isFill = i === scenario.fillIndex;
            const isReaction = i === scenario.reactionIndex;
            const color = isDisp ? DISPLACEMENT : bull ? "var(--mint)" : "var(--red)";
            const cx = xAt(i);
            const yOpen = scaleY(k.o);
            const yClose = scaleY(k.c);
            const yHigh = scaleY(k.h);
            const yLow = scaleY(k.l);
            const bodyTop = Math.min(yOpen, yClose);
            const bodyH = Math.max(Math.abs(yClose - yOpen), 3);

            let opacity = 1;
            if (hover === "displacement") opacity = isDisp ? 1 : 0.25;
            else if (hover === "return") opacity = isFill ? 1 : 0.25;
            else if (hover === "reaction") opacity = isReaction ? 1 : 0.25;

            return (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
              >
                <g style={{ opacity, transition: "opacity 0.2s ease" }}>
                  <line x1={cx} y1={yHigh} x2={cx} y2={yLow} stroke={color} strokeWidth="1.6" />
                  <rect
                    x={cx - candleW / 2}
                    y={bodyTop}
                    width={candleW}
                    height={bodyH}
                    fill={color}
                    opacity={0.92}
                  />
                </g>
              </motion.g>
            );
          })}
        </motion.svg>
      </AnimatePresence>

      <div className="ms-chip-row">
        {scenario.chips.map((c) => {
          const key = c.label === "Displacement" ? "displacement" : c.label === "FVG Zone" ? "fvg" : c.label === "Return / Fill" ? "return" : "reaction";
          return (
            <div
              key={c.label}
              className={`ms-chip${hover === key ? " highlight" : ""}`}
              style={{ borderColor: hover === key ? c.color : undefined }}
              onMouseEnter={() => setHover(key)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="dot" style={{ background: c.color }} />
              {c.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
