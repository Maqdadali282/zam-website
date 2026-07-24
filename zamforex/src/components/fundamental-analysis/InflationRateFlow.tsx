"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FlowChain from "./FlowChain";

const flows = {
  rising: {
    label: "Inflation Rising",
    color: "var(--cat-2)",
    steps: [
      { title: "Inflation ↑", sub: "CPI prints hotter than forecast", color: "var(--cat-2)" },
      { title: "Central Bank May Raise Rates", sub: "Hawkish response likely", color: "var(--cat-2)" },
      { title: "Bond Yields May Rise", sub: "Debt pays more to compensate", color: "var(--gold)" },
      { title: "Currency Demand May Increase", sub: "Yield-seeking capital flows in", color: "var(--mint)" },
    ],
  },
  falling: {
    label: "Inflation Falling",
    color: "var(--cyan)",
    steps: [
      { title: "Inflation ↓", sub: "CPI prints cooler than forecast", color: "var(--cyan)" },
      { title: "Rate Cut Expectations", sub: "Dovish response likely", color: "var(--cyan)" },
      { title: "Currency Pressure", sub: "Yield advantage starts to fade", color: "var(--red)" },
    ],
  },
} as const;

export default function InflationRateFlow() {
  const [tab, setTab] = useState<keyof typeof flows>("rising");
  const flow = flows[tab];

  return (
    <div>
      <div className="sentiment-toggle-wrap">
        <div className="sentiment-toggle">
          {(Object.keys(flows) as (keyof typeof flows)[]).map((key) => (
            <button
              key={key}
              type="button"
              className={tab === key ? "active" : undefined}
              style={tab === key ? { background: flows[key].color, color: "#04140f" } : undefined}
              onClick={() => setTab(key)}
            >
              {flows[key].label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <FlowChain steps={[...flow.steps]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
