"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/common/Reveal";

type Difficulty = "Beginner" | "Intermediate" | "Advanced";

type RoadmapItem = {
  id: string;
  title: string;
  desc: string;
  difficulty: Difficulty;
  accent: string;
  href: string;
  icon: ReactNode;
};

const difficultyColor: Record<Difficulty, string> = {
  Beginner: "var(--mint)",
  Intermediate: "var(--gold)",
  Advanced: "var(--red)",
};

const icon = (paths: ReactNode) => (
  <svg viewBox="0 0 60 60">{paths}</svg>
);

const items: RoadmapItem[] = [
  {
    id: "market-structure",
    title: "Market Structure",
    desc: "The swing-by-swing shape of a trend — highs, lows, and the moment it changes.",
    difficulty: "Beginner",
    accent: "var(--cat-1)",
    href: "/technical-analysis/market-structure",
    icon: icon(
      <>
        <path d="M8 42 L20 28 L28 36 L38 16 L52 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="28" r="2.6" fill="currentColor" />
        <circle cx="38" cy="16" r="2.6" fill="currentColor" />
      </>,
    ),
  },
  {
    id: "price-action",
    title: "Price Action",
    desc: "Reading raw candles and swings with no indicators — just what price is actually doing.",
    difficulty: "Beginner",
    accent: "var(--cat-2)",
    href: "/technical-analysis/market-structure#price-action",
    icon: icon(
      <>
        <line x1="16" y1="14" x2="16" y2="24" stroke="currentColor" strokeWidth="2.2" />
        <rect x="10" y="24" width="12" height="16" fill="currentColor" opacity="0.85" />
        <line x1="16" y1="40" x2="16" y2="48" stroke="currentColor" strokeWidth="2.2" />
        <line x1="34" y1="10" x2="34" y2="20" stroke="currentColor" strokeWidth="2.2" />
        <rect x="28" y="20" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="34" y1="32" x2="34" y2="42" stroke="currentColor" strokeWidth="2.2" />
        <line x1="50" y1="18" x2="50" y2="26" stroke="currentColor" strokeWidth="2.2" />
        <rect x="44" y="26" width="12" height="20" fill="currentColor" opacity="0.85" />
      </>,
    ),
  },
  {
    id: "support-resistance",
    title: "Support & Resistance",
    desc: "The floors and ceilings price keeps reacting to — and what happens once one breaks.",
    difficulty: "Beginner",
    accent: "var(--gold)",
    href: "/technical-analysis/support-resistance",
    icon: icon(
      <>
        <line x1="8" y1="16" x2="52" y2="16" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="8" y1="44" x2="52" y2="44" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M10 40 L20 20 L30 38 L40 18 L50 34" stroke="currentColor" strokeWidth="2.2" fill="none" />
      </>,
    ),
  },
  {
    id: "supply-demand",
    title: "Supply & Demand",
    desc: "Zones where a sharp, one-sided move started — not just a single price line.",
    difficulty: "Intermediate",
    accent: "var(--cat-7)",
    href: "/technical-analysis/supply-demand-liquidity",
    icon: icon(
      <>
        <rect x="8" y="10" width="44" height="12" fill="currentColor" opacity="0.35" />
        <rect x="8" y="38" width="44" height="12" fill="currentColor" opacity="0.7" />
        <path d="M14 34 L30 22 L46 30" stroke="currentColor" strokeWidth="2.2" fill="none" />
      </>,
    ),
  },
  {
    id: "liquidity",
    title: "Liquidity",
    desc: "Where the stop-losses are sitting — and why price so often runs at them first.",
    difficulty: "Intermediate",
    accent: "var(--cat-3)",
    href: "/technical-analysis/supply-demand-liquidity#liquidity",
    icon: icon(
      <>
        <line x1="8" y1="18" x2="52" y2="18" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" />
        <circle cx="16" cy="18" r="2.2" fill="currentColor" />
        <circle cx="30" cy="18" r="2.2" fill="currentColor" />
        <circle cx="44" cy="18" r="2.2" fill="currentColor" />
        <path d="M12 44 C 20 30, 40 30, 48 44" stroke="currentColor" strokeWidth="2.2" fill="none" />
      </>,
    ),
  },
  {
    id: "order-blocks",
    title: "Order Blocks",
    desc: "The exact candles where large institutional orders most likely entered the market.",
    difficulty: "Advanced",
    accent: "var(--cat-5)",
    href: "/technical-analysis/order-blocks-fvg",
    icon: icon(
      <>
        <rect x="10" y="30" width="14" height="14" fill="currentColor" opacity="0.85" />
        <path d="M24 36 L52 14" stroke="currentColor" strokeWidth="2.2" fill="none" />
        <path d="M24 40 L52 44" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" fill="none" />
      </>,
    ),
  },
  {
    id: "fair-value-gaps",
    title: "Fair Value Gaps",
    desc: "A three-candle imbalance that price often comes back to \"fill\" before continuing.",
    difficulty: "Advanced",
    accent: "var(--cat-4)",
    href: "/technical-analysis/order-blocks-fvg#fvg",
    icon: icon(
      <>
        <rect x="8" y="32" width="10" height="12" fill="currentColor" opacity="0.6" />
        <rect x="25" y="14" width="10" height="26" fill="currentColor" />
        <rect x="42" y="20" width="10" height="12" fill="currentColor" opacity="0.6" />
        <rect x="18" y="24" width="24" height="8" fill="currentColor" opacity="0.25" />
      </>,
    ),
  },
  {
    id: "candlestick-patterns",
    title: "Candlestick Patterns",
    desc: "Doji, Hammer, Engulfing, and more — what a single candle's shape is telling you.",
    difficulty: "Beginner",
    accent: "var(--mint)",
    href: "/technical-analysis/candlestick-patterns",
    icon: icon(
      <>
        <line x1="22" y1="10" x2="22" y2="20" stroke="currentColor" strokeWidth="2.2" />
        <rect x="14" y="20" width="16" height="14" fill="currentColor" opacity="0.9" />
        <line x1="22" y1="34" x2="22" y2="50" stroke="currentColor" strokeWidth="2.2" />
      </>,
    ),
  },
  {
    id: "indicators",
    title: "Indicators",
    desc: "RSI, MACD, moving averages, and Bollinger Bands — the toolkit layered on top of price.",
    difficulty: "Intermediate",
    accent: "var(--cat-1)",
    href: "/technical-analysis/indicators",
    icon: icon(
      <>
        <path d="M8 30 Q 18 10, 28 30 T 48 30" stroke="currentColor" strokeWidth="2.4" fill="none" />
        <line x1="6" y1="14" x2="52" y2="14" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <line x1="6" y1="46" x2="52" y2="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      </>,
    ),
  },
  {
    id: "fibonacci",
    title: "Fibonacci",
    desc: "Retracement levels traders use to find high-probability pullback entries.",
    difficulty: "Intermediate",
    accent: "var(--gold)",
    href: "/technical-analysis/fibonacci-mtf",
    icon: icon(
      <>
        {[12, 20, 28, 36, 44].map((y, i) => (
          <line key={y} x1="8" y1={y} x2="52" y2={y} stroke="currentColor" strokeWidth="1.6" opacity={0.4 + i * 0.12} />
        ))}
        <path d="M14 46 L26 16 L38 34 L48 10" stroke="var(--text)" strokeWidth="2" fill="none" />
      </>,
    ),
  },
  {
    id: "multi-timeframe",
    title: "Multi-Timeframe Analysis",
    desc: "Zooming from the weekly down to the 15-minute chart to align trend, structure, and entry.",
    difficulty: "Advanced",
    accent: "var(--cat-8)",
    href: "/technical-analysis/fibonacci-mtf#mtf",
    icon: icon(
      <>
        <rect x="8" y="8" width="44" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="12" y="24" width="36" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.75" />
        <rect x="16" y="40" width="28" height="12" rx="2" fill="currentColor" opacity="0.5" />
      </>,
    ),
  },
];

export default function RoadmapSection() {
  return (
    <section id="roadmap">
      <Reveal className="section-head">
        <div className="eyebrow">Your Learning Path</div>
        <h2>Eleven concepts, one way of reading price</h2>
        <p>
          Work through them in order, or jump straight to whatever you&apos;re
          stuck on — every card links to a full interactive lesson.
        </p>
      </Reveal>

      <div className="roadmap-grid">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.08, ease: "easeOut" }}
          >
            <Link
              href={item.href}
              className="roadmap-card"
              style={{ "--rc-glow": item.accent } as CSSProperties}
            >
              <span className="rc-index">{String(i + 1).padStart(2, "0")}</span>
              <div className="rc-icon" style={{ background: `color-mix(in srgb, ${item.accent} 16%, transparent)`, color: item.accent }}>
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="rc-difficulty" style={{ borderColor: difficultyColor[item.difficulty] + "55" }}>
                <span className="dot" style={{ background: difficultyColor[item.difficulty] }} />
                {item.difficulty}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
