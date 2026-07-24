import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import RateInflationTrendChart from "@/components/fundamental-analysis/RateInflationTrendChart";
import InflationRateFlow from "@/components/fundamental-analysis/InflationRateFlow";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { rateConcepts, inflationConcepts } from "@/components/fundamental-analysis/rateInflationConcepts";

export const metadata: Metadata = {
  title: "Interest Rates & Inflation | Zam Forex",
  description:
    "Learn interest rate decisions, hikes, cuts, rate differentials and rate expectations, plus CPI, Core CPI and PPI — and how inflation feeds into rate expectations and currency demand.",
};

export default function InterestRatesInflationPage() {
  return (
    <>
      <SiteNav variant="fundamental" />

      <div className="ta-breadcrumb">
        <Link href="/fundamental-analysis">Fundamental Analysis Academy</Link>
        <span>/</span>
        <span>Interest Rates &amp; Inflation</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: "var(--mint)", "--eyebrow-accent": "var(--mint)" } as CSSProperties}>
          Category 02–03 · Foundation
        </div>
        <h1>Interest Rates &amp; Inflation</h1>
        <p className="lead">
          Inflation is the data. Interest rates are the response. Together
          they form the single most important cause-and-effect chain in all
          of fundamental analysis.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#rates" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--mint)" }} />
          Interest Rates
        </Link>
        <Link href="#inflation" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-2)" }} />
          Inflation
        </Link>
      </div>

      <section id="rates" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--mint)", "--eyebrow-accent": "var(--mint)" } as CSSProperties}>
            Interactive Chart
          </div>
          <h2>Inflation, Rates &amp; the Currency Reaction</h2>
          <p>
            Switch tabs to see how the same eight quarters look through three
            different lenses — the underlying data doesn&apos;t change, only
            the chart you&apos;re reading.
          </p>
        </Reveal>

        <RateInflationTrendChart />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={rateConcepts} />
        </div>
      </section>

      <section id="inflation" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-2)", "--eyebrow-accent": "var(--cat-2)" } as CSSProperties}>
            Interactive Relationship
          </div>
          <h2>CPI, Core CPI &amp; PPI</h2>
          <p>
            Toggle between rising and falling inflation to see how each
            direction flows through to currency demand.
          </p>
        </Reveal>

        <InflationRateFlow />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={inflationConcepts} />
        </div>
      </section>

      <IbCtaBand
        heading="Rates set the direction. Data releases set the timing."
        body="Next up: employment and economic growth data — the other half of every central bank's mandate."
        learnMoreHref="/fundamental-analysis"
        learnMoreLabel="← Back to the Academy"
      />

      <SiteFooter variant="fundamental" />
    </>
  );
}
