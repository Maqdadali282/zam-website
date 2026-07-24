"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type PsychologyTrap = {
  id: string;
  term: string;
  def: string;
  accent: string;
  problem: string;
  effect: string;
  healthier: string;
};

function Chevron() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8">
      <path d="M1 1 L6 6 L11 1" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrapItem({ entry }: { entry: PsychologyTrap }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`accordion-item${open ? " open" : ""}`} style={{ borderLeftColor: entry.accent }}>
      <button type="button" className="accordion-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <div>
          <h4>{entry.term}</h4>
          <p>{entry.def}</p>
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
                <div className="ab-label">⚠ The Problem</div>
                <p>{entry.problem}</p>
              </div>
              <div className="accordion-block bearish">
                <div className="ab-label">😵 How It Affects Traders</div>
                <p>{entry.effect}</p>
              </div>
              <div className="accordion-block bullish">
                <div className="ab-label">✓ A Healthier Approach</div>
                <p>{entry.healthier}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PsychologyTrapGrid({ items }: { items: PsychologyTrap[] }) {
  return (
    <div className="accordion-list">
      {items.map((entry) => (
        <TrapItem entry={entry} key={entry.id} />
      ))}
    </div>
  );
}
