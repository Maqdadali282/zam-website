"use client";

import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ConceptEntry = {
  id: string;
  term: string;
  def: string;
  accent: string;
  how: string;
  bullish: string;
  bearish: string;
  mistake: string;
  tip: string;
};

function Chevron() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8">
      <path d="M1 1 L6 6 L11 1" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AccordionItem({ entry }: { entry: ConceptEntry }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`accordion-item${open ? " open" : ""}`} style={{ borderLeftColor: entry.accent } as CSSProperties}>
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
                <div className="ab-label">How It Works</div>
                <p>{entry.how}</p>
              </div>
              <div className="accordion-block bullish">
                <div className="ab-label">✓ Bullish Example</div>
                <p>{entry.bullish}</p>
              </div>
              <div className="accordion-block bearish">
                <div className="ab-label">✕ Bearish Example</div>
                <p>{entry.bearish}</p>
              </div>
              <div className="accordion-block mistake">
                <div className="ab-label">⚠ Common Mistake</div>
                <p>{entry.mistake}</p>
              </div>
              <div className="accordion-block tip">
                <div className="ab-label">💡 Important Tip</div>
                <p>{entry.tip}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ConceptAccordion({ items }: { items: ConceptEntry[] }) {
  return (
    <div className="accordion-list">
      {items.map((entry) => (
        <AccordionItem entry={entry} key={entry.id} />
      ))}
    </div>
  );
}
