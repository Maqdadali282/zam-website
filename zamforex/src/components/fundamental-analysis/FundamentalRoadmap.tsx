"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/common/Reveal";

type RoadmapItem = {
  id: string;
  title: string;
  desc: string;
  accent: string;
  href: string;
  icon: ReactNode;
};

const icon = (paths: ReactNode) => <svg viewBox="0 0 60 60">{paths}</svg>;

const items: RoadmapItem[] = [
  {
    id: "central-banks",
    title: "Central Banks",
    desc: "The Fed, ECB, BoE and more — who sets monetary policy, and what hawkish vs. dovish actually means.",
    accent: "var(--cat-1)",
    href: "/fundamental-analysis/central-banks",
    icon: icon(
      <>
        <rect x="10" y="26" width="40" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M8 26 L30 10 L52 26" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <line x1="6" y1="50" x2="54" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      </>,
    ),
  },
  {
    id: "interest-rates",
    title: "Interest Rates",
    desc: "Rate hikes, cuts, and differentials — the single biggest driver of currency demand.",
    accent: "var(--mint)",
    href: "/fundamental-analysis/interest-rates-inflation",
    icon: icon(
      <>
        <path d="M10 44 L22 34 L32 40 L50 14" stroke="currentColor" strokeWidth="2.4" fill="none" />
        <path d="M40 14 H50 V24" stroke="currentColor" strokeWidth="2.4" fill="none" />
      </>,
    ),
  },
  {
    id: "inflation",
    title: "Inflation",
    desc: "CPI, Core CPI and PPI — how rising or falling prices reshape rate expectations.",
    accent: "var(--cat-2)",
    href: "/fundamental-analysis/interest-rates-inflation#inflation",
    icon: icon(
      <>
        <path d="M10 46 L22 32 L32 40 L50 12" stroke="currentColor" strokeWidth="2.4" fill="none" />
        <text x="30" y="55" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">CPI</text>
      </>,
    ),
  },
  {
    id: "employment",
    title: "Employment",
    desc: "NFP, unemployment, wage growth and jobless claims — the health check on a country's labor market.",
    accent: "var(--cat-7)",
    href: "/fundamental-analysis/employment-growth",
    icon: icon(
      <>
        <circle cx="22" cy="20" r="7" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M10 46 C10 34 34 34 34 46" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M36 46 C36 36 52 36 52 46" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      </>,
    ),
  },
  {
    id: "gdp",
    title: "GDP & Growth",
    desc: "Gross Domestic Product and the boom-bust cycle — the broadest scorecard of an economy.",
    accent: "var(--cat-3)",
    href: "/fundamental-analysis/employment-growth#growth",
    icon: icon(
      <>
        <rect x="10" y="34" width="8" height="14" fill="currentColor" />
        <rect x="24" y="24" width="8" height="24" fill="currentColor" />
        <rect x="38" y="12" width="8" height="36" fill="currentColor" opacity="0.85" />
      </>,
    ),
  },
  {
    id: "economic-calendar",
    title: "Economic Calendar",
    desc: "Reading a live release — previous, forecast, actual — and what counts as a high-impact surprise.",
    accent: "var(--gold)",
    href: "/fundamental-analysis/economic-calendar",
    icon: icon(
      <>
        <rect x="8" y="12" width="44" height="38" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <line x1="8" y1="24" x2="52" y2="24" stroke="currentColor" strokeWidth="2" />
        <line x1="18" y1="8" x2="18" y2="16" stroke="currentColor" strokeWidth="2.4" />
        <line x1="42" y1="8" x2="42" y2="16" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="20" cy="34" r="3" fill="currentColor" />
        <circle cx="32" cy="34" r="3" fill="currentColor" opacity="0.6" />
      </>,
    ),
  },
  {
    id: "market-expectations",
    title: "Market Expectations",
    desc: "Priced-in news, economic surprises, and repricing — why \"as expected\" barely moves price.",
    accent: "var(--cyan)",
    href: "/fundamental-analysis/market-expectations-risk-sentiment",
    icon: icon(
      <>
        <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M30 18 V30 L40 36" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </>,
    ),
  },
  {
    id: "risk-sentiment",
    title: "Risk Sentiment",
    desc: "Risk-on vs. risk-off — why safe havens like USD, JPY and CHF behave differently from commodity currencies.",
    accent: "var(--red)",
    href: "/fundamental-analysis/market-expectations-risk-sentiment#risk-sentiment",
    icon: icon(
      <>
        <path d="M30 10 C18 22 10 30 10 38 A20 20 0 0 0 50 38 C50 30 42 22 30 10 Z" fill="none" stroke="currentColor" strokeWidth="2.4" />
      </>,
    ),
  },
  {
    id: "geopolitical-commodities",
    title: "Geopolitical & Commodities",
    desc: "Elections, wars, and sanctions — plus how oil, gold and agriculture drive CAD, AUD and NZD.",
    accent: "var(--cat-8)",
    href: "/fundamental-analysis/geopolitical-commodities",
    icon: icon(
      <>
        <circle cx="30" cy="28" r="18" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M12 28 H48 M30 10 V46 M18 16 C26 24 34 24 42 16 M18 40 C26 32 34 32 42 40" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </>,
    ),
  },
  {
    id: "currency-strength",
    title: "Currency Strength",
    desc: "Combine every factor above into one dashboard — and compare two currencies head-to-head.",
    accent: "var(--cat-4)",
    href: "/fundamental-analysis/currency-strength",
    icon: icon(
      <>
        <rect x="8" y="38" width="30" height="8" rx="2" fill="currentColor" />
        <rect x="8" y="26" width="20" height="8" rx="2" fill="currentColor" opacity="0.7" />
        <rect x="8" y="14" width="10" height="8" rx="2" fill="currentColor" opacity="0.4" />
      </>,
    ),
  },
];

export default function FundamentalRoadmap() {
  return (
    <section id="roadmap">
      <Reveal className="section-head">
        <div className="eyebrow">Your Learning Path</div>
        <h2>Ten concepts, one macro story</h2>
        <p>
          Work through them in order, or jump straight to whatever&apos;s on
          the calendar today — every card links to a full interactive lesson.
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
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
