"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Candle = { o: number; h: number; l: number; c: number };

const candles: Candle[] = [
  { o: 30, h: 42, l: 24, c: 38 },
  { o: 38, h: 48, l: 34, c: 44 },
  { o: 44, h: 50, l: 36, c: 40 },
  { o: 40, h: 46, l: 30, c: 34 },
  { o: 34, h: 40, l: 22, c: 26 },
  { o: 26, h: 38, l: 24, c: 36 },
  { o: 36, h: 52, l: 34, c: 50 },
  { o: 50, h: 62, l: 48, c: 58 },
  { o: 58, h: 66, l: 54, c: 62 },
  { o: 62, h: 76, l: 60, c: 74 },
  { o: 74, h: 88, l: 70, c: 84 },
];

const vbW = 420;
const vbH = 260;
const padX = 22;
const baseline = 225;
const top = 30;
const pitch = Math.min(30, (vbW - padX * 2) / candles.length);
const candleW = pitch * 0.58;
const totalW = pitch * candles.length;
const startX = (vbW - totalW) / 2;
const slot = pitch;

const domainVals = candles.flatMap((k) => [k.h, k.l]);
const rawMin = Math.min(...domainVals);
const rawMax = Math.max(...domainVals);
const domainPad = (rawMax - rawMin) * 0.14;
const domainMin = rawMin - domainPad;
const domainMax = rawMax + domainPad;
const scaleY = (v: number) => baseline - ((v - domainMin) / (domainMax - domainMin)) * (baseline - top);

export default function AnimatedCandleChart() {
  const [hover, setHover] = useState<number | null>(null);

  const trendPath = candles
    .map((k, i) => {
      const x = startX + slot * i + slot / 2;
      const y = scaleY(k.c);
      return `${i === 0 ? "M" : "L"}${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="ta-chart-panel">
      <motion.div
        className="ta-floating-tag"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        XAU/USD <span className="up">▲ +2.4%</span>
      </motion.div>

      <svg viewBox={`0 0 ${vbW} ${vbH}`}>
        <line x1={6} y1={baseline} x2={vbW - 6} y2={baseline} stroke="var(--line)" strokeWidth="1" />
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={6}
            y1={top + (baseline - top) * f}
            x2={vbW - 6}
            y2={top + (baseline - top) * f}
            stroke="var(--line)"
            strokeWidth="1"
            strokeDasharray="3 6"
            opacity="0.5"
          />
        ))}

        {candles.map((k, i) => {
          const cx = startX + slot * i + slot / 2;
          const bull = k.c >= k.o;
          const color = bull ? "var(--mint)" : "var(--red)";
          const yOpen = scaleY(k.o);
          const yClose = scaleY(k.c);
          const yHigh = scaleY(k.h);
          const yLow = scaleY(k.l);
          const bodyTop = Math.min(yOpen, yClose);
          const bodyH = Math.max(Math.abs(yClose - yOpen), 3);

          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.09, ease: "easeOut" }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            >
              <rect x={cx - slot / 2} y={top} width={slot} height={baseline - top} fill="transparent" />
              <line x1={cx} y1={yHigh} x2={cx} y2={yLow} stroke={color} strokeWidth="1.5" />
              <rect
                x={cx - candleW / 2}
                y={bodyTop}
                width={candleW}
                height={bodyH}
                fill={color}
                opacity={hover === null || hover === i ? 0.92 : 0.35}
              />
            </motion.g>
          );
        })}

        <motion.path
          d={trendPath}
          stroke="var(--gold)"
          strokeWidth="1.4"
          strokeDasharray="5 5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 1.6, delay: 1.2, ease: "easeInOut" }}
        />
      </svg>

      {hover !== null && (
        <div
          className="ta-candle-tooltip"
          style={{
            left: `${((startX + slot * hover + slot / 2) / vbW) * 100}%`,
            top: `${(scaleY(candles[hover].h) / vbH) * 100}%`,
            transform: "translate(-50%, -110%)",
          }}
        >
          <div>O <b>{candles[hover].o.toFixed(1)}</b> &nbsp; H <b>{candles[hover].h.toFixed(1)}</b></div>
          <div>L <b>{candles[hover].l.toFixed(1)}</b> &nbsp; C <b>{candles[hover].c.toFixed(1)}</b></div>
        </div>
      )}
    </div>
  );
}
