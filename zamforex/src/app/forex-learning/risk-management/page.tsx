import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import FlowChain from "@/components/fundamental-analysis/FlowChain";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import ProfitMovementVisual from "@/components/tools/visuals/ProfitMovementVisual";
import LearningBreadcrumb from "@/components/forex-learning/LearningBreadcrumb";
import { sizingConcepts, controlConcepts } from "@/components/forex-learning/riskManagementConcepts";
import { getLearningSection } from "@/components/forex-learning/learningData";

const section = getLearningSection("risk-management");

export const metadata: Metadata = {
  title: "Risk Management | Zam Forex Learning",
  description:
    "Risk per trade, position sizing, stop loss, take profit, risk:reward ratio, drawdown, leverage risk, and overtrading — the discipline that decides whether an edge survives contact with the market.",
};

export default function RiskManagementPage() {
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
          A great trade idea with the wrong position size is still a bad
          trade. Risk management is the layer that decides whether your
          edge survives long enough to actually pay off.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#sizing" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--red)" }} />
          Sizing the Risk
        </Link>
        <Link href="#control" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--gold)" }} />
          Controlling the Damage
        </Link>
      </div>

      <section id="sizing" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--red)", "--eyebrow-accent": "var(--red)" } as CSSProperties}>
            The Core Chain
          </div>
          <h2>From Account Balance to Position Size</h2>
          <p>Every risk-based position size traces back through the same four steps.</p>
        </Reveal>
        <FlowChain
          steps={[
            { title: "Account Balance", sub: "Your total trading capital", color: "var(--red)" },
            { title: "Risk Percentage", sub: "Usually 0.5%–2% per trade", color: "var(--red)" },
            { title: "Stop Loss", sub: "Distance from entry, in pips", color: "var(--gold)" },
            { title: "Position Size", sub: "The lot size that fits the risk", color: "var(--mint)" },
          ]}
        />
        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={sizingConcepts} />
        </div>
      </section>

      <section id="control" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--gold)", "--eyebrow-accent": "var(--gold)" } as CSSProperties}>
            Keeping the Losses Survivable
          </div>
          <h2>Risk:Reward, Drawdown &amp; Leverage</h2>
          <p>
            Sizing one trade correctly is step one — these are the ideas
            that keep a whole strategy survivable over hundreds of trades.
          </p>
        </Reveal>
        <div className="edu-grid" style={{ marginBottom: "32px" }}>
          <div className="edu-block glow-card">
            <h3>What a Drawdown Recovery Actually Looks Like</h3>
            <p style={{ marginBottom: "16px" }}>
              A 10% loss only needs an 11% gain to recover. A 50% loss needs
              a 100% gain just to get back to even — this asymmetry is why
              limiting drawdown matters more than most traders expect.
            </p>
            <ProfitMovementVisual positive={false} />
          </div>
          <div className="edu-block glow-card">
            <h3>Try It Yourself</h3>
            <p style={{ marginBottom: "16px" }}>
              These concepts turn into real numbers fastest with a
              calculator in front of you — no need to do the arithmetic by
              hand.
            </p>
            <div className="hero-ctas" style={{ flexWrap: "wrap" }}>
              <Link className="btn btn-ghost" href="/tools/position-size-calculator">
                Position Size Calculator
              </Link>
              <Link className="btn btn-ghost" href="/tools/risk-reward-calculator">
                Risk Reward Calculator
              </Link>
              <Link className="btn btn-ghost" href="/tools/margin-calculator">
                Margin Calculator
              </Link>
            </div>
          </div>
        </div>
        <ConceptAccordion items={controlConcepts} />
      </section>

      <IbCtaBand
        heading="Rules only work if you can actually follow them."
        body="Next up: Trading Psychology — why traders break their own risk rules, and how to build the discipline to keep them."
        learnMoreHref="/forex-learning/trading-psychology"
        learnMoreLabel="Learn Trading Psychology"
      />

      <SiteFooter variant="learning" />
    </>
  );
}
