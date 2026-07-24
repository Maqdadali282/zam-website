import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import CurrencyStrengthMeter from "@/components/fundamental-analysis/CurrencyStrengthMeter";
import ComparisonTable from "@/components/fundamental-analysis/ComparisonTable";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { currencyStrengthConcepts } from "@/components/fundamental-analysis/currencyStrengthConcepts";

export const metadata: Metadata = {
  title: "Currency Strength & Fundamental Analysis | Zam Forex",
  description:
    "A currency strength dashboard for USD, EUR, GBP, JPY, CHF, AUD, CAD and NZD, plus a full fundamental comparison table walking through a USD vs. EUR example.",
};

export default function CurrencyStrengthPage() {
  return (
    <>
      <SiteNav variant="fundamental" />

      <div className="ta-breadcrumb">
        <Link href="/fundamental-analysis">Fundamental Analysis Academy</Link>
        <span>/</span>
        <span>Currency Strength &amp; Fundamental Analysis</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: "var(--cat-1)", "--eyebrow-accent": "var(--cat-1)" } as CSSProperties}>
          Category 09 · Synthesis
        </div>
        <h1>Currency Strength &amp; Fundamental Analysis</h1>
        <p className="lead">
          Everything in this academy feeds into one final skill: weighing
          every factor for two currencies at once, and deciding which side
          has the fundamental edge.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#strength-meter" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-1)" }} />
          Strength Meter
        </Link>
        <Link href="#comparison" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cyan)" }} />
          Head-to-Head Comparison
        </Link>
      </div>

      <section id="strength-meter" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-1)", "--eyebrow-accent": "var(--cat-1)" } as CSSProperties}>
            Interactive Dashboard
          </div>
          <h2>The Eight Majors, Ranked</h2>
          <p>
            An illustrative snapshot of relative strength across the majors —
            built by combining every factor from this academy into one
            score.
          </p>
        </Reveal>

        <CurrencyStrengthMeter />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={currencyStrengthConcepts} />
        </div>
      </section>

      <section id="comparison" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cyan)", "--eyebrow-accent": "var(--cyan)" } as CSSProperties}>
            Worked Example
          </div>
          <h2>Comparing Two Currencies Fundamentally</h2>
          <p>
            The same method works for any pair — line up every factor for
            both sides and see who wins on more of them.
          </p>
        </Reveal>

        <ComparisonTable />
      </section>

      <IbCtaBand
        heading="That's the full academy."
        body="Central banks, rates, inflation, employment, growth, the calendar, expectations, sentiment, geopolitics, commodities, and now currency strength — nine categories, one consistent way of reading price before the chart shows you."
        learnMoreHref="/technical-analysis"
        learnMoreLabel="📊 Learn Technical Analysis"
      />

      <SiteFooter variant="fundamental" />
    </>
  );
}
