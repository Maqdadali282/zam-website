"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FlowChain from "./FlowChain";

const flows = {
  hawkish: {
    label: "Hawkish Policy",
    color: "var(--mint)",
    steps: [
      { title: "Higher Interest Rates", sub: "Central bank hikes, or signals it will", color: "var(--mint)" },
      { title: "Higher Yield", sub: "Holding the currency pays more", color: "var(--mint)" },
      { title: "Potentially Stronger Currency", sub: "Yield-seeking capital flows in", color: "var(--mint)" },
    ],
  },
  dovish: {
    label: "Dovish Policy",
    color: "var(--red)",
    steps: [
      { title: "Lower Interest Rates", sub: "Central bank cuts, or signals it will", color: "var(--red)" },
      { title: "Lower Yield", sub: "Holding the currency pays less", color: "var(--red)" },
      { title: "Potentially Weaker Currency", sub: "Yield-seeking capital flows out", color: "var(--red)" },
    ],
  },
} as const;

export default function HawkishDovishFlow() {
  const [tab, setTab] = useState<keyof typeof flows>("hawkish");
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
              style={tab === key ? { background: flows[key].color } : undefined}
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
