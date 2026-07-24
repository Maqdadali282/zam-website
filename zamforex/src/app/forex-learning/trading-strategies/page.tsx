import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import StrategyAccordion from "@/components/forex-learning/StrategyAccordion";
import { strategies } from "@/components/forex-learning/strategiesData";
import LearningBreadcrumb from "@/components/forex-learning/LearningBreadcrumb";
import { getLearningSection } from "@/components/forex-learning/learningData";
import { COREPRIME_SIGNUP_URL } from "@/lib/affiliateLinks";

const section = getLearningSection("trading-strategies");

export const metadata: Metadata = {
  title: "Trading Strategies | Zam Forex Learning",
  description:
    "Scalping, day trading, swing trading, position trading, trend following, breakout, pullback, range, and momentum trading — how each works, its conditions, advantages, limitations, and risks.",
};

export default function TradingStrategiesPage() {
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
          Nine core approaches to trading the same market — none of them
          guarantee a profit. Each one fits certain conditions and a
          certain temperament better than others. Click a strategy to see
          the full breakdown.
        </p>
      </div>

      <section className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: section.accent, "--eyebrow-accent": section.accent } as CSSProperties}>
            Interactive Breakdown
          </div>
          <h2>How Each Strategy Actually Works</h2>
          <p>
            Every strategy is broken down the same way: how it works, a
            practical example, the market conditions it suits, its
            advantages, its limitations, and the specific risks to watch
            for.
          </p>
        </Reveal>
        <StrategyAccordion items={strategies} />
      </section>

      <div className="tool-disclaimer" style={{ maxWidth: "1400px" }}>
        <strong>Important:</strong> No trading strategy — including any
        described on this page — guarantees profit. Every approach above
        carries real risk of loss, and past performance of a style of
        trading is not indicative of future results. These descriptions are
        educational, not investment advice.
      </div>

      <Reveal className="market-pulse-banner" style={{ marginTop: "40px" }}>
        <Image
          src="/assets/diary/trading-strategies-desk.jpg"
          alt="A trading desk with a rising chart, a calculator, and notes on trading strategy"
          fill
          sizes="(max-width: 900px) 100vw, 1200px"
          style={{ objectFit: "cover" }}
        />
        <div className="market-pulse-banner-text">
          <div className="eyebrow">Strategy Meets Discipline</div>
          <h3>A strategy is a plan on paper until you run the numbers.</h3>
          <p>
            Every style above still needs the same math behind it — position
            size, risk per trade, and a plan for when it&apos;s wrong.
          </p>
          <a className="btn btn-primary" href={COREPRIME_SIGNUP_URL} target="_blank" rel="noopener">
            Open an Account →
          </a>
        </div>
      </Reveal>

      <IbCtaBand
        heading="A strategy is only as good as its risk management."
        body="Whichever style fits you, it still needs a position-sizing rule and a stop loss behind it — that's covered next."
        learnMoreHref="/forex-learning/risk-management"
        learnMoreLabel="Review Risk Management"
      />

      <SiteFooter variant="learning" />
    </>
  );
}
