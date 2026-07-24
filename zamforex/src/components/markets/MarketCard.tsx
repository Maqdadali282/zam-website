"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { MarketMeta } from "./marketsData";

export default function MarketCard({
  market,
  visual,
  index = 0,
}: {
  market: MarketMeta;
  visual: ReactNode;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link
        href={market.href}
        className="tool-card tool-card--featured glow-card"
        style={{ "--tool-accent": market.accent } as CSSProperties}
      >
        <span className="tool-card-featured-tag">{market.shortName}</span>
        <h3>{market.name}</h3>
        <p>{market.description}</p>
        <div className="learning-key-topics">
          {market.keyTopics.map((t) => (
            <span key={t} className="learning-key-topic-chip">
              {t}
            </span>
          ))}
        </div>
        <div className="tool-card-visual tool-card-visual--large">{visual}</div>
        <span className="tool-card-cta tool-card-cta--primary">{market.cta} →</span>
      </Link>
    </motion.div>
  );
}
