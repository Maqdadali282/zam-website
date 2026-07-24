"use client";

import { motion } from "framer-motion";

const links = [
  { icon: "🛢️", commodity: "Oil", currency: "CAD", color: "var(--brown)", desc: "Canada is a major oil exporter — crude prices and CAD are tightly correlated." },
  { icon: "⛏️", commodity: "Iron Ore & Metals", currency: "AUD", color: "var(--gold)", desc: "Australia's resource exports, especially to China, drive a big share of AUD demand." },
  { icon: "🌾", commodity: "Agriculture", currency: "NZD", color: "var(--cat-3)", desc: "Dairy and farm exports make up a large share of New Zealand's national income." },
  { icon: "🥇", commodity: "Gold", currency: "Risk Sentiment", color: "var(--gold)", desc: "A safe-haven barometer — gold often moves inversely to broad risk appetite." },
];

export default function CommodityCurrencyMap() {
  return (
    <div className="commodity-grid">
      {links.map((l, i) => (
        <motion.div
          key={l.commodity}
          className="commodity-card glow-card"
          style={{ borderTopColor: l.color, borderTopWidth: "3px" }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
        >
          <div className="cc-icon">{l.icon}</div>
          <div>{l.commodity}</div>
          <div className="cc-arrow">drives →</div>
          <div className="cc-currency" style={{ color: l.color }}>{l.currency}</div>
          <p>{l.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
