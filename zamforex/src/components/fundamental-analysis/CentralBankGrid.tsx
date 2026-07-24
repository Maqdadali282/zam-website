"use client";

import { motion } from "framer-motion";

type Bank = {
  flag: string;
  name: string;
  abbr: string;
  currency: string;
  desc: string;
  color: string;
};

const banks: Bank[] = [
  { flag: "🇺🇸", name: "Federal Reserve", abbr: "Fed", currency: "USD", color: "var(--cat-1)", desc: "Sets US monetary policy via the FOMC — the single most-watched central bank in forex." },
  { flag: "🇪🇺", name: "European Central Bank", abbr: "ECB", currency: "EUR", color: "var(--cyan)", desc: "Sets policy for the entire Eurozone, balancing very different economies in one rate decision." },
  { flag: "🇬🇧", name: "Bank of England", abbr: "BoE", currency: "GBP", color: "var(--cat-1)", desc: "Votes on rates via the MPC — individual member votes are published and closely watched." },
  { flag: "🇯🇵", name: "Bank of Japan", abbr: "BoJ", currency: "JPY", color: "var(--cyan)", desc: "Long known for ultra-low rates; any shift toward tightening tends to move JPY sharply." },
  { flag: "🇦🇺", name: "Reserve Bank of Australia", abbr: "RBA", currency: "AUD", color: "var(--cat-1)", desc: "Policy closely tied to commodity demand, especially from China." },
  { flag: "🇨🇦", name: "Bank of Canada", abbr: "BoC", currency: "CAD", color: "var(--cyan)", desc: "One of the more proactive G7 banks — often first to signal a policy pivot." },
  { flag: "🇨🇭", name: "Swiss National Bank", abbr: "SNB", currency: "CHF", color: "var(--cat-1)", desc: "Manages a classic safe-haven currency; occasionally intervenes directly in FX markets." },
  { flag: "🇳🇿", name: "Reserve Bank of New Zealand", abbr: "RBNZ", currency: "NZD", color: "var(--cyan)", desc: "Was the first major central bank to adopt formal inflation targeting." },
];

export default function CentralBankGrid() {
  return (
    <div className="bank-grid">
      {banks.map((b, i) => (
        <motion.div
          key={b.abbr}
          className="bank-card glow-card"
          style={{ borderTopColor: b.color, borderTopWidth: "3px" }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: (i % 4) * 0.07, ease: "easeOut" }}
        >
          <div className="bc-flag">{b.flag}</div>
          <h4>{b.name}</h4>
          <div className="bc-currency">{b.abbr} · {b.currency}</div>
          <p>{b.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
