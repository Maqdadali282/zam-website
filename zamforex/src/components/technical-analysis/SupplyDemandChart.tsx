"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Zone = { x: number; y: number; w: number; h: number; label: string; color: string };

const vbW = 640;
const vbH = 280;
const baseline = 245;
const top = 25;
const scaleY = (v: number) => baseline - (v / 100) * (baseline - top);

const DEMAND = "var(--cat-1)";
const SUPPLY = "var(--cat-7)";

const pricePoints = [
  { x: 20, v: 55 },
  { x: 90, v: 38 },
  { x: 160, v: 18 },
  { x: 230, v: 22 },
  { x: 300, v: 45 },
  { x: 380, v: 68 },
  { x: 450, v: 86 },
  { x: 500, v: 82 },
  { x: 560, v: 62 },
  { x: 620, v: 40 },
].map((p) => ({ x: p.x, y: scaleY(p.v) }));

const demandZone: Zone = { x: 20, y: scaleY(24), w: 220, h: scaleY(10) - scaleY(24), label: "Demand Zone", color: DEMAND };
const supplyZone: Zone = { x: 380, y: scaleY(92), w: 220, h: scaleY(78) - scaleY(92), label: "Supply Zone", color: SUPPLY };

const chips = [
  { label: "Demand Zone", color: DEMAND, match: "zone" as const, zone: demandZone },
  { label: "Price Reaction", color: DEMAND, match: "reaction" as const },
  { label: "Supply Zone", color: SUPPLY, match: "zone2" as const, zone: supplyZone },
  { label: "Price Rejection", color: SUPPLY, match: "rejection" as const },
];

export default function SupplyDemandChart() {
  const [hover, setHover] = useState<string | null>(null);
  const pathD = pricePoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");

  const dim = (key: string) => !!hover && hover !== key;

  return (
    <div className="ms-chart-card glow-card">
      <svg viewBox={`0 0 ${vbW} ${vbH}`}>
        <line x1={8} y1={baseline} x2={vbW - 8} y2={baseline} stroke="var(--line)" strokeWidth="1" />

        <motion.rect
          x={demandZone.x}
          y={demandZone.y}
          width={demandZone.w}
          height={demandZone.h}
          fill={DEMAND}
          initial={{ opacity: 0 }}
          animate={{ opacity: dim("zone") ? 0.08 : 0.22 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <text x={demandZone.x + 8} y={demandZone.y - 8} fontFamily="var(--font-mono)" fontSize="11" fill={DEMAND} fontWeight={hover === "zone" ? 700 : 400}>
          Demand Zone
        </text>

        <motion.rect
          x={supplyZone.x}
          y={supplyZone.y}
          width={supplyZone.w}
          height={supplyZone.h}
          fill={SUPPLY}
          initial={{ opacity: 0 }}
          animate={{ opacity: dim("zone2") ? 0.08 : 0.22 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        <text x={supplyZone.x + 8} y={supplyZone.y - 8} fontFamily="var(--font-mono)" fontSize="11" fill={SUPPLY} fontWeight={hover === "zone2" ? 700 : 400}>
          Supply Zone
        </text>

        <motion.path
          d={pathD}
          stroke="var(--text)"
          strokeWidth="2.4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />

        <g style={{ opacity: dim("reaction") ? 0.3 : 1, transition: "opacity 0.2s ease" }}>
          <circle cx={160} cy={scaleY(18)} r={hover === "reaction" ? 6.5 : 4.5} fill={DEMAND} style={{ transition: "r 0.2s ease" }} />
          <text x={160} y={scaleY(18) + 24} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={hover === "reaction" ? "12" : "10"} fontWeight={hover === "reaction" ? 700 : 400} fill={DEMAND}>
            Reaction ↑
          </text>
        </g>

        <g style={{ opacity: dim("rejection") ? 0.3 : 1, transition: "opacity 0.2s ease" }}>
          <circle cx={450} cy={scaleY(86)} r={hover === "rejection" ? 6.5 : 4.5} fill={SUPPLY} style={{ transition: "r 0.2s ease" }} />
          <text x={450} y={scaleY(86) - 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={hover === "rejection" ? "12" : "10"} fontWeight={hover === "rejection" ? 700 : 400} fill={SUPPLY}>
            Rejection ↓
          </text>
        </g>
      </svg>

      <div className="ms-chip-row">
        {chips.map((c) => (
          <div
            key={c.label}
            className={`ms-chip${hover === c.match ? " highlight" : ""}`}
            style={{ borderColor: hover === c.match ? c.color : undefined }}
            onMouseEnter={() => setHover(c.match)}
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
