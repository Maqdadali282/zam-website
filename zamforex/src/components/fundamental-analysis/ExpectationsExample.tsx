"use client";

import { motion } from "framer-motion";

export default function ExpectationsExample() {
  return (
    <div className="data-card glow-card">
      <div className="data-card-head">
        <h4>Central Bank Rate Decision — Worked Example</h4>
      </div>

      <div className="data-bars">
        <div className="data-bar-item">
          <span className="data-bar-label">Expected</span>
          <span className="data-bar-value" style={{ color: "var(--gold)" }}>5.00%</span>
          <div className="data-bar-track">
            <motion.div
              className="data-bar-fill"
              style={{ background: "var(--gold)" }}
              initial={{ width: 0 }}
              whileInView={{ width: "88%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
        </div>
        <div className="data-bar-item">
          <span className="data-bar-label">Actual</span>
          <span className="data-bar-value" style={{ color: "var(--mint)" }}>5.25%</span>
          <div className="data-bar-track">
            <motion.div
              className="data-bar-fill"
              style={{ background: "var(--mint)" }}
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div>
          <span className="data-bar-label">Market Read</span>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", marginTop: "4px" }}>
            Unexpected Hawkish Surprise
          </div>
        </div>
        <span className="data-verdict" style={{ borderColor: "var(--mint)", color: "var(--mint)", width: "fit-content" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--mint)", display: "inline-block" }} />
          Potential Reaction: Currency Strength
        </span>
      </div>
    </div>
  );
}
