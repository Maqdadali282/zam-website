"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Candle = { o: number; h: number; l: number; c: number };
type Chip = { key: string; label: string; color: string; indices: number[] };
type Pattern = {
  id: "bullish-engulfing" | "bearish-engulfing" | "morning-star" | "evening-star";
  label: string;
  candles: Candle[];
  chips: Chip[];
};

const vbW = 640;
const vbH = 230;
const padX = 24;
const baseline = 200;
const top = 18;

const PATTERN_COLOR = "var(--cat-2)";
const TREND = "var(--muted)";

const patterns: Pattern[] = [
  {
    id: "bullish-engulfing",
    label: "Bullish Engulfing",
    candles: [
      { o: 76, h: 78, l: 66, c: 68 },
      { o: 68, h: 70, l: 58, c: 60 },
      { o: 60, h: 62, l: 52, c: 55 },
      { o: 54, h: 82, l: 51, c: 80 },
    ],
    chips: [
      { key: "trend", label: "Prior Trend", color: TREND, indices: [0, 1] },
      { key: "p1", label: "Engulfed Candle", color: "var(--red)", indices: [2] },
      { key: "p2", label: "Engulfing Candle", color: "var(--mint)", indices: [3] },
    ],
  },
  {
    id: "bearish-engulfing",
    label: "Bearish Engulfing",
    candles: [
      { o: 24, h: 34, l: 22, c: 32 },
      { o: 32, h: 42, l: 30, c: 40 },
      { o: 40, h: 48, l: 38, c: 45 },
      { o: 46, h: 49, l: 18, c: 20 },
    ],
    chips: [
      { key: "trend", label: "Prior Trend", color: TREND, indices: [0, 1] },
      { key: "p1", label: "Engulfed Candle", color: "var(--mint)", indices: [2] },
      { key: "p2", label: "Engulfing Candle", color: "var(--red)", indices: [3] },
    ],
  },
  {
    id: "morning-star",
    label: "Morning Star",
    candles: [
      { o: 80, h: 82, l: 70, c: 72 },
      { o: 72, h: 74, l: 44, c: 46 },
      { o: 42, h: 46, l: 36, c: 40 },
      { o: 44, h: 74, l: 42, c: 72 },
    ],
    chips: [
      { key: "trend", label: "Prior Trend", color: TREND, indices: [0] },
      { key: "p1", label: "First Candle", color: "var(--red)", indices: [1] },
      { key: "p2", label: "Indecision Candle", color: "var(--gold)", indices: [2] },
      { key: "p3", label: "Reversal Candle", color: PATTERN_COLOR, indices: [3] },
    ],
  },
  {
    id: "evening-star",
    label: "Evening Star",
    candles: [
      { o: 20, h: 30, l: 18, c: 28 },
      { o: 28, h: 56, l: 26, c: 54 },
      { o: 54, h: 60, l: 50, c: 56 },
      { o: 56, h: 58, l: 26, c: 28 },
    ],
    chips: [
      { key: "trend", label: "Prior Trend", color: TREND, indices: [0] },
      { key: "p1", label: "First Candle", color: "var(--mint)", indices: [1] },
      { key: "p2", label: "Indecision Candle", color: "var(--gold)", indices: [2] },
      { key: "p3", label: "Reversal Candle", color: PATTERN_COLOR, indices: [3] },
    ],
  },
];

export default function MultiCandlePatternChart() {
  const [tab, setTab] = useState<Pattern["id"]>("bullish-engulfing");
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

  const hoveredIndices = pattern.chips.find((c) => c.key === hover)?.indices ?? null;

  return (
    <div className="ms-chart-card glow-card">
      <div className="ms-tabs">
        {patterns.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`ms-tab${tab === p.id ? " active" : ""}`}
            style={tab === p.id ? { background: PATTERN_COLOR, borderColor: PATTERN_COLOR } : undefined}
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
            const color = bull ? "var(--mint)" : "var(--red)";
            const cx = xAt(i);
            const yOpen = scaleY(k.o);
            const yClose = scaleY(k.c);
            const yHigh = scaleY(k.h);
            const yLow = scaleY(k.l);
            const bodyTop = Math.min(yOpen, yClose);
            const bodyH = Math.max(Math.abs(yClose - yOpen), 3);
            const opacity = hoveredIndices ? (hoveredIndices.includes(i) ? 1 : 0.2) : 1;

            return (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.12 }}
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
        {pattern.chips.map((c) => (
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
