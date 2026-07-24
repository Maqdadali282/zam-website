import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import MarketStructureChart from "@/components/technical-analysis/MarketStructureChart";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { structureConcepts, priceActionConcepts } from "@/components/technical-analysis/marketStructureConcepts";

export const metadata: Metadata = {
  title: "Market Structure & Price Action | Zam Forex",
  description:
    "Learn Higher Highs, Higher Lows, Break of Structure, Change of Character, and price action concepts like momentum, pullbacks, and fakeouts — with an interactive chart.",
};

export default function MarketStructurePage() {
  return (
    <>
      <SiteNav variant="technical" />

      <div className="ta-breadcrumb">
        <Link href="/technical-analysis">Technical Analysis Academy</Link>
        <span>/</span>
        <span>Market Structure &amp; Price Action</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: "var(--cat-1)", "--eyebrow-accent": "var(--cat-1)" } as CSSProperties}>
          Category 01–02 · Beginner
        </div>
        <h1>Market Structure &amp; Price Action</h1>
        <p className="lead">
          Every other concept in this academy sits on top of this one skill:
          reading the swing-by-swing shape of a trend, and knowing the exact
          moment it changes. Switch the tabs on the chart below and hover any
          label to see it highlighted.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#market-structure" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-1)" }} />
          Market Structure
        </Link>
        <Link href="#price-action" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-2)" }} />
          Price Action
        </Link>
      </div>

      <section id="market-structure" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow">Interactive Chart</div>
          <h2>HH, HL, LH, LL, BOS &amp; CHoCH</h2>
          <p>
            Switch between structures below, then hover a chip to see exactly
            which swing point it refers to.
          </p>
        </Reveal>

        <MarketStructureChart />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={structureConcepts} />
        </div>
      </section>

      <section id="price-action" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-2)", "--eyebrow-accent": "var(--cat-2)" } as CSSProperties}>
            Reading Price Directly
          </div>
          <h2>Price Action</h2>
          <p>
            No indicators, no lagging signals — just what the candles
            themselves are telling you.
          </p>
        </Reveal>

        <ConceptAccordion items={priceActionConcepts} />
      </section>

      <IbCtaBand
        heading="Structure tells you the trend. Now find the levels."
        body="Next up: Support & Resistance and the chart patterns built on top of them — or open a live account and start applying structure right away."
        learnMoreHref="/technical-analysis"
        learnMoreLabel="← Back to the Academy"
      />

      <SiteFooter variant="technical" />
    </>
  );
}
