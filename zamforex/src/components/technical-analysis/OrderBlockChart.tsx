"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Candle = { o: number; h: number; l: number; c: number };
type Zone = { fromIdx: number; toIdx: number; top: number; bottom: number; label: string };
type Scenario = {
  id: "bullish" | "bearish";
  label: string;
  candles: Candle[];
  obIndex: number;
  reactionIndex: number;
  zone: Zone;
  chips: { label: string; color: string }[];
};

const vbW = 640;
const vbH = 230;
const padX = 20;
const baseline = 200;
const top = 18;

const OB_COLOR_BULL = "var(--cat-5)";
const OB_COLOR_BEAR = "var(--cat-5)";
const DISPLACEMENT = "var(--gold)";

const scenarios: Scenario[] = [
  {
    id: "bullish",
    label: "Bullish Example",
    candles: [
      { o: 60, h: 62, l: 50, c: 52 },
      { o: 52, h: 54, l: 42, c: 44 },
      { o: 44, h: 46, l: 38, c: 40 },
      { o: 42, h: 64, l: 40, c: 62 },
      { o: 62, h: 84, l: 60, c: 82 },
      { o: 82, h: 92, l: 80, c: 90 },
      { o: 88, h: 90, l: 42, c: 45 },
      { o: 45, h: 70, l: 43, c: 68 },
    ],
    obIndex: 2,
    reactionIndex: 7,
    zone: { fromIdx: 2, toIdx: 7, top: 46, bottom: 38, label: "Bullish Order Block" },
    chips: [
      { label: "Order Block", color: OB_COLOR_BULL },
      { label: "Displacement", color: DISPLACEMENT },
      { label: "Return to Zone", color: "var(--text)" },
      { label: "Reaction", color: "var(--mint)" },
    ],
  },
  {
    id: "bearish",
    label: "Bearish Example",
    candles: [
      { o: 40, h: 50, l: 38, c: 48 },
      { o: 48, h: 58, l: 46, c: 56 },
      { o: 56, h: 62, l: 54, c: 60 },
      { o: 58, h: 60, l: 36, c: 38 },
      { o: 38, h: 40, l: 16, c: 18 },
      { o: 18, h: 20, l: 8, c: 10 },
      { o: 12, h: 58, l: 10, c: 55 },
      { o: 55, h: 57, l: 30, c: 32 },
    ],
    obIndex: 2,
    reactionIndex: 7,
    zone: { fromIdx: 2, toIdx: 7, top: 62, bottom: 54, label: "Bearish Order Block" },
    chips: [
      { label: "Order Block", color: OB_COLOR_BEAR },
      { label: "Displacement", color: DISPLACEMENT },
      { label: "Return to Zone", color: "var(--text)" },
      { label: "Reaction", color: "var(--red)" },
    ],
  },
];

export default function OrderBlockChart() {
  const [tab, setTab] = useState<Scenario["id"]>("bullish");
  const [hover, setHover] = useState<string | null>(null);
  const scenario = useMemo(() => scenarios.find((s) => s.id === tab)!, [tab]);

  const n = scenario.candles.length;
  const slot = Math.min(40, (vbW - padX * 2) / n);
  const candleW = slot * 0.58;
  const startX = (vbW - slot * n) / 2;
  const xAt = (i: number) => startX + slot * i + slot / 2;

  const domainVals = [...scenario.candles.flatMap((k) => [k.h, k.l]), scenario.zone.top, scenario.zone.bottom];
  const rawMin = Math.min(...domainVals);
  const rawMax = Math.max(...domainVals);
  const domainPad = (rawMax - rawMin) * 0.14 || 5;
  const domainMin = rawMin - domainPad;
  const domainMax = rawMax + domainPad;
  const scaleY = (v: number) => baseline - ((v - domainMin) / (domainMax - domainMin)) * (baseline - top);

  const dim = (key: "ob" | "displacement" | "return" | "reaction") => !!hover && hover !== key;

  return (
    <div className="ms-chart-card glow-card">
      <div className="ms-tabs">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`ms-tab${tab === s.id ? " active" : ""}`}
            style={tab === s.id ? { background: "var(--cat-5)", borderColor: "var(--cat-5)" } : undefined}
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
          <text x={8} y={16} fontFamily="var(--font-mono)" fontSize="10.5" fill="var(--cat-5)">
            {scenario.zone.label}
          </text>

          <motion.rect
            x={xAt(scenario.zone.fromIdx) - slot / 2}
            y={scaleY(scenario.zone.top)}
            width={xAt(scenario.zone.toIdx) - xAt(scenario.zone.fromIdx) + slot}
            height={scaleY(scenario.zone.bottom) - scaleY(scenario.zone.top)}
            fill="var(--cat-5)"
            initial={{ opacity: 0 }}
            animate={{ opacity: dim("ob") ? 0.08 : 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          {scenario.candles.map((k, i) => {
            const bull = k.c >= k.o;
            const isOB = i === scenario.obIndex;
            const isDisp = i === scenario.obIndex + 1 || i === scenario.obIndex + 2;
            const isReturn = i === scenario.reactionIndex - 1;
            const isReaction = i === scenario.reactionIndex;
            const color = isOB ? OB_COLOR_BULL : bull ? "var(--mint)" : "var(--red)";
            const cx = xAt(i);
            const yOpen = scaleY(k.o);
            const yClose = scaleY(k.c);
            const yHigh = scaleY(k.h);
            const yLow = scaleY(k.l);
            const bodyTop = Math.min(yOpen, yClose);
            const bodyH = Math.max(Math.abs(yClose - yOpen), 3);

            let opacity = 1;
            if (hover === "ob") opacity = isOB ? 1 : 0.25;
            else if (hover === "displacement") opacity = isDisp ? 1 : 0.25;
            else if (hover === "return") opacity = isReturn ? 1 : 0.25;
            else if (hover === "reaction") opacity = isReaction ? 1 : 0.25;

            return (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
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
          const key = c.label === "Order Block" ? "ob" : c.label === "Displacement" ? "displacement" : c.label === "Return to Zone" ? "return" : "reaction";
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
