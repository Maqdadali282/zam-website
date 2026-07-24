import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import FlowChain from "@/components/fundamental-analysis/FlowChain";
import LearningBreadcrumb from "@/components/forex-learning/LearningBreadcrumb";
import PsychologyTrapGrid from "@/components/forex-learning/PsychologyTrapCard";
import { psychologyTraps, psychologyHabits } from "@/components/forex-learning/psychologyData";
import { getLearningSection } from "@/components/forex-learning/learningData";

const section = getLearningSection("trading-psychology");

export const metadata: Metadata = {
  title: "Trading Psychology | Zam Forex Learning",
  description:
    "Fear, greed, FOMO, revenge trading, overconfidence, confirmation bias, and loss aversion explained — plus the discipline and habits that build a healthier trading approach.",
};

export default function TradingPsychologyPage() {
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
          A profitable strategy still fails in the hands of an undisciplined
          trader. This is the half of trading that has nothing to do with
          the chart.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#traps" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--red)" }} />
          Psychological Traps
        </Link>
        <Link href="#habits" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--mint)" }} />
          Building Better Habits
        </Link>
      </div>

      <section className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--red)", "--eyebrow-accent": "var(--red)" } as CSSProperties}>
            Two Very Different Chains
          </div>
          <h2>The same trader, two different reactions</h2>
          <p>Which chain a trade follows usually comes down to one thing: whether there was a plan before the emotion showed up.</p>
        </Reveal>
        <FlowChain
          steps={[
            { title: "Emotion", sub: "Fear, greed, FOMO takes over", color: "var(--red)" },
            { title: "Impulsive Decision", sub: "No plan, no checklist", color: "var(--red)" },
            { title: "Poor Execution", sub: "Oversized, mistimed, unplanned", color: "var(--red)" },
          ]}
        />
        <div style={{ height: "24px" }} />
        <FlowChain
          steps={[
            { title: "Trading Plan", sub: "Rules set in advance", color: "var(--mint)" },
            { title: "Discipline", sub: "Follow the plan anyway", color: "var(--mint)" },
            { title: "Consistency", sub: "Results reflect the edge", color: "var(--mint)" },
          ]}
        />
      </section>

      <section id="traps" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--red)", "--eyebrow-accent": "var(--red)" } as CSSProperties}>
            Interactive Cards
          </div>
          <h2>Seven Traps Every Trader Falls Into</h2>
          <p>Click a card to see the problem, how it actually plays out, and a healthier way to handle it.</p>
        </Reveal>
        <PsychologyTrapGrid items={psychologyTraps} />
      </section>

      <section id="habits" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--mint)", "--eyebrow-accent": "var(--mint)" } as CSSProperties}>
            The Other Side
          </div>
          <h2>Building Better Habits</h2>
          <p>None of these are personality traits you either have or don&apos;t — they&apos;re habits, built the same way any habit is.</p>
        </Reveal>
        <div className="term-grid">
          {psychologyHabits.map((h) => (
            <Reveal className="term-card glow-card" key={h.title}>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
              <div className="ex">{h.example}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <IbCtaBand
        heading="Discipline needs rules to enforce."
        body="Next up: Risk Management — the concrete rules (position size, stop loss, risk:reward) that make discipline actually enforceable."
        learnMoreHref="/forex-learning/risk-management"
        learnMoreLabel="Learn Risk Management"
      />

      <SiteFooter variant="learning" />
    </>
  );
}
