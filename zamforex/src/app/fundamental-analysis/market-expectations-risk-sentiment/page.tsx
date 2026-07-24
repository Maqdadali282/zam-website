import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import ExpectationsExample from "@/components/fundamental-analysis/ExpectationsExample";
import RiskToggleDashboard from "@/components/fundamental-analysis/RiskToggleDashboard";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { expectationsConcepts, riskConcepts } from "@/components/fundamental-analysis/expectationsRiskConcepts";

export const metadata: Metadata = {
  title: "Market Expectations & Risk Sentiment | Zam Forex",
  description:
    "Learn priced-in news, economic surprises, and repricing, plus risk-on and risk-off sentiment — with a worked hawkish-surprise example and an interactive risk toggle dashboard.",
};

export default function MarketExpectationsRiskSentimentPage() {
  return (
    <>
      <SiteNav variant="fundamental" />

      <div className="ta-breadcrumb">
        <Link href="/fundamental-analysis">Fundamental Analysis Academy</Link>
        <span>/</span>
        <span>Market Expectations &amp; Risk Sentiment</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: "var(--cyan)", "--eyebrow-accent": "var(--cyan)" } as CSSProperties}>
          Category 07 · Application
        </div>
        <h1>Market Expectations &amp; Risk Sentiment</h1>
        <p className="lead">
          Two ideas separate a beginner reading headlines from a trader
          reading the market: what was already expected, and what mood the
          whole market is in right now.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#expectations" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cyan)" }} />
          Market Expectations
        </Link>
        <Link href="#risk-sentiment" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--mint)" }} />
          Risk Sentiment
        </Link>
      </div>

      <section id="expectations" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cyan)", "--eyebrow-accent": "var(--cyan)" } as CSSProperties}>
            Worked Example
          </div>
          <h2>When &quot;As Expected&quot; Isn&apos;t What Happens</h2>
          <p>
            The market had already priced in a hold at 5.00%. Here&apos;s
            what happens when the actual decision comes in hotter.
          </p>
        </Reveal>

        <ExpectationsExample />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={expectationsConcepts} />
        </div>
      </section>

      <section id="risk-sentiment" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--mint)", "--eyebrow-accent": "var(--mint)" } as CSSProperties}>
            Interactive Dashboard
          </div>
          <h2>Risk-On vs. Risk-Off</h2>
          <p>
            Toggle the switch — watch which currencies flip from favored to
            out-of-favor as the whole board reacts to the mood change.
          </p>
        </Reveal>

        <RiskToggleDashboard />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={riskConcepts} />
        </div>
      </section>

      <IbCtaBand
        heading="Sentiment sets the mood. Headlines set the trigger."
        body="Next up: politics, geopolitics, and commodities — the events outside the economic calendar that can move currencies overnight."
        learnMoreHref="/fundamental-analysis"
        learnMoreLabel="← Back to the Academy"
      />

      <SiteFooter variant="fundamental" />
    </>
  );
}
