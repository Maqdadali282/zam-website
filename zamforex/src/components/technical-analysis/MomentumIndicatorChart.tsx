"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const vbW = 640;
const vbH = 260;
const padX = 24;

const priceTop = 15;
const priceBottom = 92;
const scalePriceY = (v: number) => priceBottom - (v / 100) * (priceBottom - priceTop);

const oscTop = 108;
const oscBottom = 235;
const scaleOscY = (v: number) => oscBottom - (v / 100) * (oscBottom - oscTop);
const scaleMacdY = (v: number) => oscBottom - ((v + 50) / 100) * (oscBottom - oscTop);

function pathFor(vals: number[], scale: (v: number) => number) {
  const step = (vbW - padX * 2) / (vals.length - 1);
  return vals.map((v, i) => `${i === 0 ? "M" : "L"}${padX + step * i} ${scale(v)}`).join(" ");
}
function xAt(i: number, n: number) {
  const step = (vbW - padX * 2) / (n - 1);
  return padX + step * i;
}

const RSI_PRICE = [40, 58, 80, 68, 50, 34, 48, 56, 28, 42, 58, 74];
const RSI = [48, 60, 78, 58, 40, 26, 42, 52, 33, 46, 57, 66];
const OVERBOUGHT_IDX = 2;
const OVERSOLD_IDX = 5;
const DIVERGENCE_IDX: [number, number] = [5, 8];

const MACD_PRICE = [30, 38, 50, 65, 78, 70, 58, 42, 28, 22, 30, 48];
const MACD_LINE = [-20, -5, 10, 25, 30, 20, 5, -15, -30, -25, -10, 15];
const MACD_SIGNAL = [-10, -12, -8, 5, 18, 25, 20, 8, -5, -20, -22, -15];
const BULL_CROSS_IDX = 2;
const BEAR_CROSS_IDX = 5;
const BULL_CROSS_IDX_2 = 11;

export default function MomentumIndicatorChart() {
  const [tab, setTab] = useState<"rsi" | "macd">("rsi");
  const [hover, setHover] = useState<string | null>(null);

  const dim = (key: string) => !!hover && hover !== key;

  const rsiChips = [
    { key: "overbought", label: "Overbought (>70)", color: "var(--red)" },
    { key: "oversold", label: "Oversold (<30)", color: "var(--mint)" },
    { key: "divergence", label: "Bullish Divergence", color: "var(--gold)" },
  ];
  const macdChips = [
    { key: "bullcross", label: "Bullish Crossover", color: "var(--mint)" },
    { key: "bearcross", label: "Bearish Crossover", color: "var(--red)" },
    { key: "histogram", label: "Histogram", color: "var(--cat-4)" },
  ];

  return (
    <div className="ms-chart-card glow-card">
      <div className="ms-tabs">
        <button
          type="button"
          className={`ms-tab${tab === "rsi" ? " active" : ""}`}
          style={tab === "rsi" ? { background: "var(--cat-4)", borderColor: "var(--cat-4)", color: "#1a1400" } : undefined}
          onClick={() => {
            setTab("rsi");
            setHover(null);
          }}
        >
          RSI
        </button>
        <button
          type="button"
          className={`ms-tab${tab === "macd" ? " active" : ""}`}
          style={tab === "macd" ? { background: "var(--cat-4)", borderColor: "var(--cat-4)", color: "#1a1400" } : undefined}
          onClick={() => {
            setTab("macd");
            setHover(null);
          }}
        >
          MACD
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === "rsi" ? (
          <motion.svg
            key="rsi"
            viewBox={`0 0 ${vbW} ${vbH}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <text x={8} y={10} fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--muted)">
              Price
            </text>
            <path d={pathFor(RSI_PRICE, scalePriceY)} stroke="var(--text)" strokeWidth="2" fill="none" opacity="0.85" />

            <g style={{ opacity: dim("overbought") ? 0.2 : 1, transition: "opacity 0.2s ease" }}>
              <circle cx={xAt(OVERBOUGHT_IDX, RSI_PRICE.length)} cy={scalePriceY(RSI_PRICE[OVERBOUGHT_IDX])} r="5" fill="var(--red)" />
            </g>
            <g style={{ opacity: dim("oversold") ? 0.2 : 1, transition: "opacity 0.2s ease" }}>
              <circle cx={xAt(OVERSOLD_IDX, RSI_PRICE.length)} cy={scalePriceY(RSI_PRICE[OVERSOLD_IDX])} r="5" fill="var(--mint)" />
            </g>

            <line x1={8} y1={oscTop - 4} x2={vbW - 8} y2={oscTop - 4} stroke="var(--line)" strokeWidth="1" />
            <text x={8} y={oscTop + 8} fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--cat-4)">
              RSI (14)
            </text>

            <line x1={8} y1={scaleOscY(70)} x2={vbW - 8} y2={scaleOscY(70)} stroke="var(--red)" strokeWidth="1" strokeDasharray="4 4" opacity="0.55" />
            <text x={vbW - 8} y={scaleOscY(70) - 4} textAnchor="end" fontFamily="var(--font-mono)" fontSize="9" fill="var(--red)">70</text>
            <line x1={8} y1={scaleOscY(30)} x2={vbW - 8} y2={scaleOscY(30)} stroke="var(--mint)" strokeWidth="1" strokeDasharray="4 4" opacity="0.55" />
            <text x={vbW - 8} y={scaleOscY(30) + 12} textAnchor="end" fontFamily="var(--font-mono)" fontSize="9" fill="var(--mint)">30</text>

            <motion.path
              d={pathFor(RSI, scaleOscY)}
              stroke="var(--cat-4)"
              strokeWidth="2.4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            />

            <g style={{ opacity: dim("overbought") ? 0.2 : 1, transition: "opacity 0.2s ease" }}>
              <circle cx={xAt(OVERBOUGHT_IDX, RSI.length)} cy={scaleOscY(RSI[OVERBOUGHT_IDX])} r="6" fill="var(--red)" />
            </g>
            <g style={{ opacity: dim("oversold") ? 0.2 : 1, transition: "opacity 0.2s ease" }}>
              <circle cx={xAt(OVERSOLD_IDX, RSI.length)} cy={scaleOscY(RSI[OVERSOLD_IDX])} r="6" fill="var(--mint)" />
            </g>
            <g style={{ opacity: dim("divergence") ? 0.2 : 1, transition: "opacity 0.2s ease" }}>
              <line
                x1={xAt(DIVERGENCE_IDX[0], RSI_PRICE.length)}
                y1={scalePriceY(RSI_PRICE[DIVERGENCE_IDX[0]])}
                x2={xAt(DIVERGENCE_IDX[1], RSI_PRICE.length)}
                y2={scalePriceY(RSI_PRICE[DIVERGENCE_IDX[1]])}
                stroke="var(--gold)"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <line
                x1={xAt(DIVERGENCE_IDX[0], RSI.length)}
                y1={scaleOscY(RSI[DIVERGENCE_IDX[0]])}
                x2={xAt(DIVERGENCE_IDX[1], RSI.length)}
                y2={scaleOscY(RSI[DIVERGENCE_IDX[1]])}
                stroke="var(--gold)"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              {DIVERGENCE_IDX.map((i) => (
                <circle key={i} cx={xAt(i, RSI.length)} cy={scaleOscY(RSI[i])} r="6" fill="var(--gold)" />
              ))}
            </g>
          </motion.svg>
        ) : (
          <motion.svg
            key="macd"
            viewBox={`0 0 ${vbW} ${vbH}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <text x={8} y={10} fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--muted)">
              Price
            </text>
            <path d={pathFor(MACD_PRICE, scalePriceY)} stroke="var(--text)" strokeWidth="2" fill="none" opacity="0.85" />

            <line x1={8} y1={oscTop - 4} x2={vbW - 8} y2={oscTop - 4} stroke="var(--line)" strokeWidth="1" />
            <text x={8} y={oscTop + 8} fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--cat-4)">
              MACD (12, 26, 9)
            </text>
            <line x1={8} y1={scaleMacdY(0)} x2={vbW - 8} y2={scaleMacdY(0)} stroke="var(--line)" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />

            <g style={{ opacity: dim("histogram") ? 0.15 : 0.7, transition: "opacity 0.2s ease" }}>
              {MACD_LINE.map((m, i) => {
                const diff = m - MACD_SIGNAL[i];
                const x = xAt(i, MACD_LINE.length);
                const yZero = scaleMacdY(0);
                const yVal = scaleMacdY(diff);
                return (
                  <rect
                    key={i}
                    x={x - 8}
                    y={Math.min(yZero, yVal)}
                    width={16}
                    height={Math.max(Math.abs(yVal - yZero), 2)}
                    fill={diff >= 0 ? "var(--mint)" : "var(--red)"}
                  />
                );
              })}
            </g>

            <motion.path
              d={pathFor(MACD_SIGNAL, scaleMacdY)}
              stroke="var(--muted)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            />
            <motion.path
              d={pathFor(MACD_LINE, scaleMacdY)}
              stroke="var(--cat-4)"
              strokeWidth="2.4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
            />

            <g style={{ opacity: dim("bullcross") ? 0.2 : 1, transition: "opacity 0.2s ease" }}>
              <circle cx={xAt(BULL_CROSS_IDX, MACD_LINE.length)} cy={scaleMacdY(MACD_LINE[BULL_CROSS_IDX])} r="6" fill="var(--mint)" />
              <circle cx={xAt(BULL_CROSS_IDX_2, MACD_LINE.length)} cy={scaleMacdY(MACD_LINE[BULL_CROSS_IDX_2])} r="6" fill="var(--mint)" />
            </g>
            <g style={{ opacity: dim("bearcross") ? 0.2 : 1, transition: "opacity 0.2s ease" }}>
              <circle cx={xAt(BEAR_CROSS_IDX, MACD_LINE.length)} cy={scaleMacdY(MACD_LINE[BEAR_CROSS_IDX])} r="6" fill="var(--red)" />
            </g>
          </motion.svg>
        )}
      </AnimatePresence>

      <div className="ms-chip-row">
        {(tab === "rsi" ? rsiChips : macdChips).map((c) => (
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
