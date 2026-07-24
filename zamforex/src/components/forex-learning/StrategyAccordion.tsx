"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Strategy = {
  id: string;
  name: string;
  def: string;
  accent: string;
  how: string;
  example: string;
  conditions: string;
  advantages: string;
  limitations: string;
  risks: string;
};

function Chevron() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8">
      <path d="M1 1 L6 6 L11 1" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StrategyItem({ s }: { s: Strategy }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`accordion-item${open ? " open" : ""}`} style={{ borderLeftColor: s.accent }}>
      <button type="button" className="accordion-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <div>
          <h4>{s.name}</h4>
          <p>{s.def}</p>
        </div>
        <span className="accordion-chevron">
          <Chevron />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="accordion-body-inner">
              <div className="accordion-block how">
                <div className="ab-label">⚙ How It Works</div>
                <p>{s.how}</p>
              </div>
              <div className="accordion-block example">
                <div className="ab-label">💡 Example</div>
                <p>{s.example}</p>
              </div>
              <div className="accordion-block bullish">
                <div className="ab-label">✓ Advantages</div>
                <p>{s.advantages}</p>
              </div>
              <div className="accordion-block bearish">
                <div className="ab-label">⚠ Risk Considerations</div>
                <p>{s.risks}</p>
              </div>
              <div className="accordion-block mistake">
                <div className="ab-label">✕ Limitations</div>
                <p>{s.limitations}</p>
              </div>
              <div className="accordion-block tip">
                <div className="ab-label">🎯 Suitable Market Conditions</div>
                <p>{s.conditions}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StrategyAccordion({ items }: { items: Strategy[] }) {
  return (
    <div className="accordion-list">
      {items.map((s) => (
        <StrategyItem s={s} key={s.id} />
      ))}
    </div>
  );
}
