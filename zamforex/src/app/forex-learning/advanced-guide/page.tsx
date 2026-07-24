import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import FlowChain from "@/components/fundamental-analysis/FlowChain";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { advancedConcepts } from "@/components/forex-learning/advancedConcepts";
import LearningBreadcrumb from "@/components/forex-learning/LearningBreadcrumb";
import { getLearningSection } from "@/components/forex-learning/learningData";

const section = getLearningSection("advanced-guide");

const alreadyCovered = [
  { name: "Advanced Market Structure", href: "/technical-analysis/market-structure", desc: "HH, HL, LH, LL, Break of Structure, and Change of Character." },
  { name: "Price Action", href: "/technical-analysis/market-structure#price-action", desc: "Momentum, rejection, pullbacks, and fakeouts — reading candles with no indicators." },
  { name: "Liquidity Concepts", href: "/technical-analysis/supply-demand-liquidity#liquidity", desc: "Equal highs/lows, liquidity sweeps, and stop hunts." },
];

export const metadata: Metadata = {
  title: "Advanced Guide | Zam Forex Learning",
  description:
    "Volatility, correlation, advanced risk management, strategy development, backtesting, and performance metrics — the concepts that separate a tested edge from a guess.",
};

export default function AdvancedGuidePage() {
  return (
    <>
      <SiteNav variant="learning" />
      <LearningBreadcrumb current={section.name} />

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: section.accent, "--eyebrow-accent": section.accent } as CSSProperties}>
          Forex Learning · {section.difficulty}
        </div>
        <h1>{section.name}</h1>
        <p className="lead">
          For traders past the basics — this is the process that turns a
          trading idea into something tested, measured, and refined instead
          of just repeated on hope.
        </p>
      </div>

      <section className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: section.accent, "--eyebrow-accent": section.accent } as CSSProperties}>
            The Advanced Pipeline
          </div>
          <h2>From Foundation to Performance Improvement</h2>
        </Reveal>
        <FlowChain
          steps={[
            { title: "Foundation", sub: "Basics, charts, structure", color: "var(--mint)" },
            { title: "Analysis", sub: "Technical + fundamental read", color: "var(--cat-1)" },
            { title: "Strategy", sub: "Defined, repeatable rules", color: "var(--gold)" },
            { title: "Testing", sub: "Backtest before risking capital", color: "var(--cyan)" },
            { title: "Risk Management", sub: "Portfolio-level, not just per-trade", color: "var(--red)" },
            { title: "Performance Improvement", sub: "Metrics feed back into strategy", color: "var(--cat-7)" },
          ]}
        />
      </section>

      <section className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-1)", "--eyebrow-accent": "var(--cat-1)" } as CSSProperties}>
            Already Covered
          </div>
          <h2>Advanced Market Structure, Price Action &amp; Liquidity</h2>
          <p>
            These already exist as full interactive lessons in the
            Technical Analysis academy — no need to relearn them here.
          </p>
        </Reveal>
        <div className="term-grid">
          {alreadyCovered.map((item) => (
            <Link href={item.href} className="term-card glow-card" key={item.name} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <div className="ex">Continue in Technical Analysis →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-7)", "--eyebrow-accent": "var(--cat-7)" } as CSSProperties}>
            New Advanced Concepts
          </div>
          <h2>Volatility, Correlation &amp; Building a Real Edge</h2>
        </Reveal>
        <ConceptAccordion items={advancedConcepts} />
      </section>

      <IbCtaBand
        heading="That's the complete academy."
        body="Forex Basics, Technical Analysis, Fundamental Analysis, Trading Psychology, Risk Management, Trading Strategies, the Glossary, and both guides — one connected learning path. Now open a live account and put it to work."
        learnMoreHref="/tools"
        learnMoreLabel="Explore Trading Tools"
      />

      <SiteFooter variant="learning" />
    </>
  );
}
