"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";

export type FlowStep = {
  eyebrow?: string;
  title: string;
  sub?: string;
  color: string;
  icon?: ReactNode;
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M4 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FlowChain({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flow-chain">
      {steps.map((step, i) => (
        <Fragment key={step.title}>
          <motion.div
            className="flow-step"
            style={{ borderTopColor: step.color, borderTopWidth: "3px" } as CSSProperties}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.12, ease: "easeOut" }}
          >
            {step.eyebrow && (
              <span className="fs-eyebrow" style={{ color: step.color }}>
                {step.eyebrow}
              </span>
            )}
            {step.icon}
            <span className="fs-title">{step.title}</span>
            {step.sub && <span className="fs-sub">{step.sub}</span>}
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              className="flow-arrow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.3, delay: i * 0.12 + 0.08 }}
            >
              <ArrowIcon />
            </motion.div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
