"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Candle = { o: number; h: number; l: number; c: number };
type Pattern = {
  id: "doji" | "hammer" | "shooting-star" | "inverted-hammer";
  label: string;
  candles: Candle[];
  patternIndex: number;
  reactionIndex: number;
  chips: { label: string; color: string }[];
};

const vbW = 640;
const vbH = 230;
const padX = 24;
const baseline = 200;
const top = 18;

const PATTERN_COLOR = "var(--mint)";
const TREND = "var(--muted)";

const patterns: Pattern[] = [
  {
    id: "doji",
    label: "Doji",
    candles: [
      { o: 78, h: 80, l: 68, c: 70 },
      { o: 70, h: 72, l: 60, c: 62 },
      { o: 62, h: 64, l: 50, c: 52 },
      { o: 52, h: 66, l: 38, c: 53 },
      { o: 53, h: 74, l: 51, c: 72 },
    ],
    patternIndex: 3,
    reactionIndex: 4,
    chips: [
      { label: "Prior Trend", color: TREND },
      { label: "Pattern Candle", color: PATTERN_COLOR },
      { label: "Confirmation", color: "var(--gold)" },
    ],
  },
  {
    id: "hammer",
    label: "Hammer",
    candles: [
      { o: 82, h: 84, l: 72, c: 74 },
      { o: 74, h: 76, l: 62, c: 64 },
      { o: 64, h: 66, l: 52, c: 54 },
      { o: 52, h: 54, l: 26, c: 51 },
      { o: 51, h: 72, l: 49, c: 70 },
    ],
    patternIndex: 3,
    reactionIndex: 4,
    chips: [
      { label: "Prior Trend", color: TREND },
      { label: "Pattern Candle", color: PATTERN_COLOR },
      { label: "Confirmation", color: "var(--gold)" },
    ],
  },
  {
    id: "shooting-star",
    label: "Shooting Star",
    candles: [
      { o: 20, h: 32, l: 18, c: 30 },
      { o: 30, h: 42, l: 28, c: 40 },
      { o: 40, h: 52, l: 38, c: 50 },
      { o: 52, h: 78, l: 50, c: 53 },
      { o: 53, h: 55, l: 32, c: 34 },
    ],
    patternIndex: 3,
    reactionIndex: 4,
    chips: [
      { label: "Prior Trend", color: TREND },
      { label: "Pattern Candle", color: PATTERN_COLOR },
      { label: "Confirmation", color: "var(--red)" },
    ],
  },
  {
    id: "inverted-hammer",
    label: "Inverted Hammer",
    candles: [
      { o: 82, h: 84, l: 72, c: 74 },
      { o: 74, h: 76, l: 62, c: 64 },
      { o: 64, h: 66, l: 52, c: 54 },
      { o: 52, h: 76, l: 50, c: 54 },
      { o: 54, h: 72, l: 52, c: 70 },
    ],
    patternIndex: 3,
    reactionIndex: 4,
    chips: [
      { label: "Prior Trend", color: TREND },
      { label: "Pattern Candle", color: PATTERN_COLOR },
      { label: "Confirmation", color: "var(--gold)" },
    ],
  },
];

export default function SingleCandlePatternChart() {
  const [tab, setTab] = useState<Pattern["id"]>("doji");
  const [hover, setHover] = useState<string | null>(null);
  const pattern = useMemo(() => patterns.find((p) => p.id === tab)!, [tab]);

  const n = pattern.candles.length;
  const slot = Math.min(40, (vbW - padX * 2) / n);
  const candleW = slot * 0.58;
  const startX = (vbW - slot * n) / 2;
  const xAt = (i: number) => startX + slot * i + slot / 2;

  const domainVals = pattern.candles.flatMap((k) => [k.h, k.l]);
  const rawMin = Math.min(...domainVals);
  const rawMax = Math.max(...domainVals);
  const domainPad = (rawMax - rawMin) * 0.14 || 5;
  const domainMin = rawMin - domainPad;
  const domainMax = rawMax + domainPad;
  const scaleY = (v: number) => baseline - ((v - domainMin) / (domainMax - domainMin)) * (baseline - top);

  const keyFor = (label: string) => (label === "Prior Trend" ? "trend" : label === "Pattern Candle" ? "pattern" : "confirm");

  return (
    <div className="ms-chart-card glow-card">
      <div className="ms-tabs">
        {patterns.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`ms-tab${tab === p.id ? " active" : ""}`}
            style={tab === p.id ? { background: PATTERN_COLOR, borderColor: PATTERN_COLOR, color: "#04140f" } : undefined}
            onClick={() => {
              setTab(p.id);
              setHover(null);
            }}
          >
            {p.label}
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
          <text x={8} y={16} fontFamily="var(--font-mono)" fontSize="10.5" fill={PATTERN_COLOR}>
            {pattern.label}
          </text>

          {pattern.candles.map((k, i) => {
            const bull = k.c >= k.o;
            const isPattern = i === pattern.patternIndex;
            const isTrend = i < pattern.patternIndex;
            const isConfirm = i === pattern.reactionIndex;
            const color = isPattern ? PATTERN_COLOR : bull ? "var(--mint)" : "var(--red)";
            const cx = xAt(i);
            const yOpen = scaleY(k.o);
            const yClose = scaleY(k.c);
            const yHigh = scaleY(k.h);
            const yLow = scaleY(k.l);
            const bodyTop = Math.min(yOpen, yClose);
            const bodyH = Math.max(Math.abs(yClose - yOpen), 3);

            let opacity = 1;
            if (hover === "trend") opacity = isTrend ? 1 : 0.2;
            else if (hover === "pattern") opacity = isPattern ? 1 : 0.2;
            else if (hover === "confirm") opacity = isConfirm ? 1 : 0.2;

            return (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.09 }}
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
        {pattern.chips.map((c) => {
          const key = keyFor(c.label);
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
