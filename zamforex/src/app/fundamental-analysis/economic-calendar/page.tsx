import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import EconomicCalendarTable from "@/components/fundamental-analysis/EconomicCalendarTable";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { calendarConcepts } from "@/components/fundamental-analysis/calendarConcepts";

export const metadata: Metadata = {
  title: "Economic Calendar & News Analysis | Zam Forex",
  description:
    "Learn how to read a professional economic calendar — previous, forecast and actual data, impact levels, economic surprises, and high-impact news — with an interactive event table.",
};

export default function EconomicCalendarPage() {
  return (
    <>
      <SiteNav variant="fundamental" />

      <div className="ta-breadcrumb">
        <Link href="/fundamental-analysis">Fundamental Analysis Academy</Link>
        <span>/</span>
        <span>Economic Calendar &amp; News Analysis</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: "var(--gold)", "--eyebrow-accent": "var(--gold)" } as CSSProperties}>
          Category 06 · Application
        </div>
        <h1>Economic Calendar &amp; News Analysis</h1>
        <p className="lead">
          Every concept in this academy eventually shows up as a row on a
          calendar like this one. Click any event below to see how a trader
          would actually read it.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#calendar" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--gold)" }} />
          This Week&apos;s Calendar
        </Link>
        <Link href="#reading-news" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-1)" }} />
          Reading the News
        </Link>
      </div>

      <section id="calendar" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--gold)", "--eyebrow-accent": "var(--gold)" } as CSSProperties}>
            Interactive Calendar
          </div>
          <h2>An Illustrative Week of Releases</h2>
          <p>
            Green actuals beat forecast, red actuals missed it, gold marks an
            in-line result — click any row to expand the detail panel.
          </p>
        </Reveal>

        <EconomicCalendarTable />
      </section>

      <section id="reading-news" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-1)", "--eyebrow-accent": "var(--cat-1)" } as CSSProperties}>
            Concepts
          </div>
          <h2>Actual vs. Forecast &amp; the Economic Surprise</h2>
          <p>
            The five ideas that turn a calendar row into an actual trading
            decision.
          </p>
        </Reveal>

        <ConceptAccordion items={calendarConcepts} />
      </section>

      <IbCtaBand
        heading="Now separate the surprise from the expectation."
        body={'Next up: market expectations and risk sentiment — why "as expected" barely moves price, and how risk-on/risk-off reshapes the entire board.'}
        learnMoreHref="/fundamental-analysis"
        learnMoreLabel="← Back to the Academy"
      />

      <SiteFooter variant="fundamental" />
    </>
  );
}
