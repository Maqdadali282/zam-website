"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const vbW = 640;
const vbH = 260;
const padX = 24;
const baseline = 225;
const top = 25;
const scaleY = (v: number) => baseline - (v / 100) * (baseline - top);

function pathFor(vals: number[]) {
  const step = (vbW - padX * 2) / (vals.length - 1);
  return vals.map((v, i) => `${i === 0 ? "M" : "L"}${padX + step * i} ${scaleY(v)}`).join(" ");
}
function xAt(i: number, n: number) {
  const step = (vbW - padX * 2) / (n - 1);
  return padX + step * i;
}

const MA_PRICE = [46, 48, 53, 60, 68, 74, 70, 62, 52, 45];
const MA_FAST = [50, 49, 50, 54, 60, 67, 71, 69, 62, 53];
const MA_SLOW = [58, 56, 54, 53, 54, 57, 61, 65, 67, 66];
const GOLDEN_IDX = 3;
const DEATH_IDX = 8;

const BB_PRICE = [52, 49, 53, 50, 54, 60, 68, 75, 79, 77];
const BB_UPPER = [58, 57, 56, 55, 55, 58, 64, 72, 78, 82];
const BB_LOWER = [42, 43, 46, 47, 49, 48, 46, 44, 46, 50];
const BB_BASIS = [50, 50, 51, 51, 52, 53, 55, 58, 62, 66];
const SQUEEZE_RANGE: [number, number] = [0, 3];
const BREAKOUT_RANGE: [number, number] = [5, 8];
const TREND_SLOW = "var(--cat-7)";

export default function TrendIndicatorChart() {
  const [tab, setTab] = useState<"ma" | "bb">("ma");
  const [hover, setHover] = useState<string | null>(null);

  const dim = (key: string) => !!hover && hover !== key;

  const maChips = [
    { key: "fast", label: "Fast MA (e.g. EMA 20)", color: "var(--gold)" },
    { key: "slow", label: "Slow MA (e.g. EMA 50)", color: TREND_SLOW },
    { key: "golden", label: "Golden Cross", color: "var(--mint)" },
    { key: "death", label: "Death Cross", color: "var(--red)" },
  ];
  const bbChips = [
    { key: "bands", label: "Upper / Lower Band", color: "var(--cat-1)" },
    { key: "squeeze", label: "Squeeze", color: "var(--gold)" },
    { key: "breakout", label: "Breakout / Walking the Band", color: "var(--mint)" },
  ];

  return (
    <div className="ms-chart-card glow-card">
      <div className="ms-tabs">
        <button
          type="button"
          className={`ms-tab${tab === "ma" ? " active" : ""}`}
          style={tab === "ma" ? { background: "var(--cat-1)", borderColor: "var(--cat-1)" } : undefined}
          onClick={() => {
            setTab("ma");
            setHover(null);
          }}
        >
          Moving Averages
        </button>
        <button
          type="button"
          className={`ms-tab${tab === "bb" ? " active" : ""}`}
          style={tab === "bb" ? { background: "var(--cat-1)", borderColor: "var(--cat-1)" } : undefined}
          onClick={() => {
            setTab("bb");
            setHover(null);
          }}
        >
          Bollinger Bands
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === "ma" ? (
          <motion.svg
            key="ma"
            viewBox={`0 0 ${vbW} ${vbH}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <line x1={8} y1={baseline} x2={vbW - 8} y2={baseline} stroke="var(--line)" strokeWidth="1" />
            <text x={8} y={16} fontFamily="var(--font-mono)" fontSize="10.5" fill="var(--muted)">
              Price with Fast / Slow Moving Averages
            </text>

            <path d={pathFor(MA_PRICE)} stroke="var(--muted)" strokeWidth="1.6" fill="none" opacity="0.6" />

            <motion.path
              d={pathFor(MA_SLOW)}
              stroke={TREND_SLOW}
              strokeWidth="2.4"
              fill="none"
              style={{ opacity: dim("slow") ? 0.2 : 1, transition: "opacity 0.2s ease" }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
            <motion.path
              d={pathFor(MA_FAST)}
              stroke="var(--gold)"
              strokeWidth="2.4"
              fill="none"
              style={{ opacity: dim("fast") ? 0.2 : 1, transition: "opacity 0.2s ease" }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, ease: "easeInOut", delay: 0.1 }}
            />

            <g style={{ opacity: dim("golden") ? 0.2 : 1, transition: "opacity 0.2s ease" }}>
              <circle cx={xAt(GOLDEN_IDX, MA_FAST.length)} cy={scaleY(MA_FAST[GOLDEN_IDX])} r="7" fill="var(--mint)" />
              <text x={xAt(GOLDEN_IDX, MA_FAST.length)} y={scaleY(MA_FAST[GOLDEN_IDX]) + 24} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight={700} fill="var(--mint)">
                Golden Cross
              </text>
            </g>
            <g style={{ opacity: dim("death") ? 0.2 : 1, transition: "opacity 0.2s ease" }}>
              <circle cx={xAt(DEATH_IDX, MA_FAST.length)} cy={scaleY(MA_FAST[DEATH_IDX])} r="7" fill="var(--red)" />
              <text x={xAt(DEATH_IDX, MA_FAST.length)} y={scaleY(MA_FAST[DEATH_IDX]) - 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight={700} fill="var(--red)">
                Death Cross
              </text>
            </g>
          </motion.svg>
        ) : (
          <motion.svg
            key="bb"
            viewBox={`0 0 ${vbW} ${vbH}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <line x1={8} y1={baseline} x2={vbW - 8} y2={baseline} stroke="var(--line)" strokeWidth="1" />
            <text x={8} y={16} fontFamily="var(--font-mono)" fontSize="10.5" fill="var(--muted)">
              Price with Bollinger Bands
            </text>

            <motion.rect
              x={xAt(SQUEEZE_RANGE[0], BB_PRICE.length)}
              y={top}
              width={xAt(SQUEEZE_RANGE[1], BB_PRICE.length) - xAt(SQUEEZE_RANGE[0], BB_PRICE.length)}
              height={baseline - top}
              fill="var(--gold)"
              initial={{ opacity: 0 }}
              animate={{ opacity: dim("squeeze") ? 0.06 : 0.16 }}
              transition={{ duration: 0.5 }}
            />
            <motion.rect
              x={xAt(BREAKOUT_RANGE[0], BB_PRICE.length)}
              y={top}
              width={xAt(BREAKOUT_RANGE[1], BB_PRICE.length) - xAt(BREAKOUT_RANGE[0], BB_PRICE.length)}
              height={baseline - top}
              fill="var(--mint)"
              initial={{ opacity: 0 }}
              animate={{ opacity: dim("breakout") ? 0.06 : 0.14 }}
              transition={{ duration: 0.5 }}
            />

            <g style={{ opacity: dim("bands") ? 0.2 : 1, transition: "opacity 0.2s ease" }}>
              <path d={pathFor(BB_UPPER)} stroke="var(--cat-1)" strokeWidth="1.6" strokeDasharray="5 4" fill="none" />
              <path d={pathFor(BB_LOWER)} stroke="var(--cat-1)" strokeWidth="1.6" strokeDasharray="5 4" fill="none" />
              <path d={pathFor(BB_BASIS)} stroke="var(--cat-1)" strokeWidth="1.2" strokeDasharray="2 4" fill="none" opacity="0.6" />
            </g>

            <motion.path
              d={pathFor(BB_PRICE)}
              stroke="var(--text)"
              strokeWidth="2.4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      <div className="ms-chip-row">
        {(tab === "ma" ? maChips : bbChips).map((c) => (
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
