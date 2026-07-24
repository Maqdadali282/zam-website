"use client";

import { motion } from "framer-motion";

type Tier = "Strong" | "Neutral" | "Weak";

const tierColor: Record<Tier, string> = {
  Strong: "var(--mint)",
  Neutral: "var(--gold)",
  Weak: "var(--red)",
};

const currencies: { code: string; score: number; tier: Tier }[] = [
  { code: "USD", score: 88, tier: "Strong" },
  { code: "CHF", score: 74, tier: "Strong" },
  { code: "GBP", score: 62, tier: "Neutral" },
  { code: "AUD", score: 55, tier: "Neutral" },
  { code: "CAD", score: 50, tier: "Neutral" },
  { code: "EUR", score: 44, tier: "Neutral" },
  { code: "NZD", score: 30, tier: "Weak" },
  { code: "JPY", score: 18, tier: "Weak" },
];

export default function CurrencyStrengthMeter() {
  return (
    <div className="strength-meter">
      {currencies.map((c, i) => (
        <div className="strength-row" key={c.code}>
          <span className="strength-code">{c.code}</span>
          <div className="strength-track">
            <motion.div
              className="strength-fill"
              style={{ background: tierColor[c.tier] }}
              initial={{ width: 0 }}
              whileInView={{ width: `${c.score}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
            />
          </div>
          <span className="strength-label" style={{ color: tierColor[c.tier] }}>
            {c.tier}
          </span>
        </div>
      ))}
    </div>
  );
}
