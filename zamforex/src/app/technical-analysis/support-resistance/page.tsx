import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import SupportResistanceChart from "@/components/technical-analysis/SupportResistanceChart";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { supportResistanceConcepts } from "@/components/technical-analysis/supportResistanceConcepts";
import ChartPatternsSection from "@/components/technical-analysis/ChartPatternsSection";

export const metadata: Metadata = {
  title: "Support, Resistance & Chart Patterns | Zam Forex",
  description:
    "Learn support, resistance, key levels, breakouts, retests, and the six most important chart patterns — Head & Shoulders, Double Top/Bottom, Triangle, Flag, and Wedge — with interactive diagrams.",
};

export default function SupportResistancePage() {
  return (
    <>
      <SiteNav variant="technical" />

      <div className="ta-breadcrumb">
        <Link href="/technical-analysis">Technical Analysis Academy</Link>
        <span>/</span>
        <span>Support, Resistance &amp; Chart Patterns</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: "var(--gold)" } as CSSProperties}>
          Category 03 · Beginner
        </div>
        <h1>Support, Resistance &amp; Chart Patterns</h1>
        <p className="lead">
          The floors and ceilings price keeps reacting to, what happens once
          one finally breaks — and the six chart shapes built directly on top
          of that idea.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#support-resistance" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--gold)" }} />
          Support &amp; Resistance
        </Link>
        <Link href="#chart-patterns" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-5)" }} />
          Chart Patterns
        </Link>
      </div>

      <section id="support-resistance" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow">Interactive Chart</div>
          <h2>Breakout, Retest &amp; the Support/Resistance Flip</h2>
          <p>
            Switch between a bullish breakout and a bearish breakdown, then
            hover a chip to see exactly where the flip happens.
          </p>
        </Reveal>

        <SupportResistanceChart />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={supportResistanceConcepts} />
        </div>
      </section>

      <ChartPatternsSection />

      <IbCtaBand
        heading="Levels tell you where. Zones tell you why."
        body="Next up: Supply & Demand zones and the liquidity concepts that explain why price runs at certain levels — or open a live account and start trading the levels you already know."
        learnMoreHref="/technical-analysis"
        learnMoreLabel="← Back to the Academy"
      />

      <SiteFooter variant="technical" />
    </>
  );
}
