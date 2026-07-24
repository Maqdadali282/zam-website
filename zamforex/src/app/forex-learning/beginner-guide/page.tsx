import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import LearningBreadcrumb from "@/components/forex-learning/LearningBreadcrumb";
import { getLearningSection } from "@/components/forex-learning/learningData";

const section = getLearningSection("beginner-guide");

const steps = [
  {
    stage: "STEP 01",
    title: "What is Forex?",
    text: "The global market where currencies are traded against each other, 24 hours a day on weekdays — start here to understand what actually moves.",
    href: "/forex-basics",
    cta: "Read Forex Basics →",
  },
  {
    stage: "STEP 02",
    title: "Currency Pairs",
    text: "Every trade is one currency against another — learn how a pair like EUR/USD is quoted, and what \"base\" and \"quote\" currency mean.",
    href: "/forex-basics#core-terms",
    cta: "Learn the terms →",
  },
  {
    stage: "STEP 03",
    title: "Pips and Lots",
    text: "The units that measure a price move (pips) and a trade's size (lots) — the two numbers behind every profit and loss figure you'll see.",
    href: "/tools/pip-calculator",
    cta: "Try the Pip Calculator →",
  },
  {
    stage: "STEP 04",
    title: "Leverage and Margin",
    text: "Borrowed buying power that lets a small deposit control a much larger position — powerful, but it magnifies losses exactly as much as gains.",
    href: "/tools/margin-calculator",
    cta: "Try the Margin Calculator →",
  },
  {
    stage: "STEP 05",
    title: "Reading Charts",
    text: "Candlesticks, support and resistance, trends, and indicators — the skill of understanding what price is actually telling you.",
    href: "/technical-analysis",
    cta: "Explore Technical Analysis →",
  },
  {
    stage: "STEP 06",
    title: "Risk Management",
    text: "Before your first real trade, understand position sizing, stop losses, and risk:reward — the difference between one bad trade and one ruined account.",
    href: "/forex-learning/risk-management",
    cta: "Learn Risk Management →",
  },
  {
    stage: "STEP 07",
    title: "Practice",
    text: "Get comfortable with a real trading platform — MT4 or MT5 — on a demo account before any real capital is on the line.",
    href: "/apps",
    cta: "Get the Trading Apps →",
  },
  {
    stage: "STEP 08",
    title: "Trading Plan",
    text: "Write down your rules — entries, exits, risk per trade — before you need them. A plan made in a calm moment is what discipline leans on later.",
    href: "/forex-learning/trading-psychology#habits",
    cta: "Build Better Habits →",
  },
];

export const metadata: Metadata = {
  title: "Beginner Guide | Zam Forex Learning",
  description:
    "An 8-step path from \"what is forex\" through currency pairs, pips and lots, leverage and margin, reading charts, risk management, practice, and writing your first trading plan.",
};

export default function BeginnerGuidePage() {
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
          Never traded before? Start at step one and work down — each step
          links to the real lesson or tool, in the order it actually
          matters.
        </p>
      </div>

      <section className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: section.accent, "--eyebrow-accent": section.accent } as CSSProperties}>
            Connected Timeline
          </div>
          <h2>Eight Steps, In Order</h2>
        </Reveal>
        <Reveal className="path">
          {steps.map((s) => (
            <Link className="path-row glow-card" href={s.href} key={s.stage}>
              <div className="stage">{s.stage}</div>
              <div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
              <div className="go">{s.cta}</div>
            </Link>
          ))}
        </Reveal>
      </section>

      <IbCtaBand
        heading="Finished the basics?"
        body="The Advanced Guide picks up exactly where this one leaves off — volatility, correlation, strategy development, and backtesting."
        learnMoreHref="/forex-learning/advanced-guide"
        learnMoreLabel="Continue to Advanced Guide"
      />

      <SiteFooter variant="learning" />
    </>
  );
}
