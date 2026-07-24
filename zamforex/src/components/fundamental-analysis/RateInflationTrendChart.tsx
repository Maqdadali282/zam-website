"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const vbW = 640;
const vbH = 230;
const padX = 24;
const baseline = 200;
const top = 18;

const periods = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"];

type Tab = "inflation" | "rates" | "currency";

const series: Record<Tab, { label: string; unit: string; color: string; values: number[]; refLine?: { value: number; label: string } }> = {
  inflation: {
    label: "CPI Inflation (YoY)",
    unit: "%",
    color: "var(--cat-2)",
    values: [3.2, 4.8, 6.5, 7.9, 7.1, 5.4, 3.8, 2.9],
    refLine: { value: 2, label: "2% Central Bank Target" },
  },
  rates: {
    label: "Benchmark Interest Rate",
    unit: "%",
    color: "var(--mint)",
    values: [0.5, 1.25, 2.5, 4.0, 5.0, 5.25, 5.25, 4.75],
  },
  currency: {
    label: "Currency Index Reaction",
    unit: "idx",
    color: "var(--cyan)",
    values: [96, 98, 103, 108, 110, 107, 104, 102],
  },
};

const tabs: { id: Tab; label: string }[] = [
  { id: "inflation", label: "Inflation Trend" },
  { id: "rates", label: "Interest Rate Trend" },
  { id: "currency", label: "Currency Reaction" },
];

export default function RateInflationTrendChart() {
  const [tab, setTab] = useState<Tab>("inflation");
  const data = series[tab];

  const domainVals = [...data.values, ...(data.refLine ? [data.refLine.value] : [])];
  const rawMin = Math.min(...domainVals);
  const rawMax = Math.max(...domainVals);
  const domainPad = (rawMax - rawMin) * 0.2 || 1;
  const domainMin = rawMin - domainPad;
  const domainMax = rawMax + domainPad;
  const scaleY = (v: number) => baseline - ((v - domainMin) / (domainMax - domainMin)) * (baseline - top);

  const step = (vbW - padX * 2) / (data.values.length - 1);
  const xAt = (i: number) => padX + step * i;
  const pathD = data.values.map((v, i) => `${i === 0 ? "M" : "L"}${xAt(i)} ${scaleY(v)}`).join(" ");

  return (
    <div className="ms-chart-card glow-card">
      <div className="ms-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`ms-tab${tab === t.id ? " active" : ""}`}
            style={tab === t.id ? { background: series[t.id].color, borderColor: series[t.id].color } : undefined}
            onClick={() => setTab(t.id)}
          >
            {t.label}
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
          <text x={8} y={14} fontFamily="var(--font-mono)" fontSize="10.5" fill={data.color}>
            {data.label}
          </text>

          {data.refLine && (
            <>
              <line
                x1={8}
                y1={scaleY(data.refLine.value)}
                x2={vbW - 8}
                y2={scaleY(data.refLine.value)}
                stroke="var(--gold)"
                strokeWidth="1.2"
                strokeDasharray="5 5"
                opacity="0.6"
              />
              <text x={vbW - 8} y={scaleY(data.refLine.value) - 6} textAnchor="end" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--gold)">
                {data.refLine.label}
              </text>
            </>
          )}

          <motion.path
            d={pathD}
            stroke={data.color}
            strokeWidth="2.6"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {data.values.map((v, i) => (
            <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}>
              <circle cx={xAt(i)} cy={scaleY(v)} r="4" fill={data.color} />
              <text x={xAt(i)} y={scaleY(v) - 12} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--muted)">
                {v}
                {data.unit === "%" ? "%" : ""}
              </text>
              <text x={xAt(i)} y={baseline + 16} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--muted)" opacity="0.7">
                {periods[i]}
              </text>
            </motion.g>
          ))}
        </motion.svg>
      </AnimatePresence>
    </div>
  );
}
