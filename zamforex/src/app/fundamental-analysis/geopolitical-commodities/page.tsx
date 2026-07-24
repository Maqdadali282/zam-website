import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import GeoEventFlow from "@/components/fundamental-analysis/GeoEventFlow";
import CommodityCurrencyMap from "@/components/fundamental-analysis/CommodityCurrencyMap";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { politicalConcepts, commodityConcepts } from "@/components/fundamental-analysis/geoCommodityConcepts";

export const metadata: Metadata = {
  title: "Political, Geopolitical & Commodity Factors | Zam Forex",
  description:
    "Learn elections, political instability, trade wars and sanctions, plus how oil, gold, iron ore and agriculture drive CAD, AUD, NZD and risk sentiment.",
};

export default function GeopoliticalCommoditiesPage() {
  return (
    <>
      <SiteNav variant="fundamental" />

      <div className="ta-breadcrumb">
        <Link href="/fundamental-analysis">Fundamental Analysis Academy</Link>
        <span>/</span>
        <span>Political, Geopolitical &amp; Commodity Factors</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: "var(--cat-8)", "--eyebrow-accent": "var(--cat-8)" } as CSSProperties}>
          Category 08 · Advanced
        </div>
        <h1>Political, Geopolitical &amp; Commodity Factors</h1>
        <p className="lead">
          Not everything that moves a currency is on the economic calendar.
          Elections, conflicts, sanctions, and raw commodity prices can shift
          demand overnight, with no scheduled warning at all.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#geopolitical" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-8)" }} />
          Political &amp; Geopolitical
        </Link>
        <Link href="#commodities" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--gold)" }} />
          Commodities
        </Link>
      </div>

      <section id="geopolitical" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-8)", "--eyebrow-accent": "var(--cat-8)" } as CSSProperties}>
            Interactive Flow
          </div>
          <h2>From Headline to Currency Move</h2>
          <p>
            Unscheduled events still follow a logical chain — they just skip
            the calendar and go straight to sentiment.
          </p>
        </Reveal>

        <GeoEventFlow />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={politicalConcepts} />
        </div>
      </section>

      <section id="commodities" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--gold)", "--eyebrow-accent": "var(--gold)" } as CSSProperties}>
            Currency Relationships
          </div>
          <h2>What Commodity Drives Which Currency</h2>
          <p>
            A handful of major currencies are closely tied to specific raw
            materials — know the link, and the correlation stops being a
            mystery.
          </p>
        </Reveal>

        <CommodityCurrencyMap />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={commodityConcepts} />
        </div>
      </section>

      <IbCtaBand
        heading="Now combine every factor into one view."
        body="Last stop: the currency strength dashboard — where every category in this academy comes together into one comparison."
        learnMoreHref="/fundamental-analysis"
        learnMoreLabel="← Back to the Academy"
      />

      <SiteFooter variant="fundamental" />
    </>
  );
}
