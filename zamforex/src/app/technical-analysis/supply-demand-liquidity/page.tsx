import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import SupplyDemandChart from "@/components/technical-analysis/SupplyDemandChart";
import LiquidityChart from "@/components/technical-analysis/LiquidityChart";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { supplyDemandConcepts, liquidityConcepts } from "@/components/technical-analysis/supplyDemandLiquidityConcepts";

export const metadata: Metadata = {
  title: "Supply, Demand & Liquidity | Zam Forex",
  description:
    "Learn supply and demand zones, fresh vs tested zones, and liquidity concepts — buy-side/sell-side liquidity, equal highs/lows, liquidity sweeps, and stop hunts — with interactive charts.",
};

export default function SupplyDemandLiquidityPage() {
  return (
    <>
      <SiteNav variant="technical" />

      <div className="ta-breadcrumb">
        <Link href="/technical-analysis">Technical Analysis Academy</Link>
        <span>/</span>
        <span>Supply, Demand &amp; Liquidity</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: "var(--cat-7)", "--eyebrow-accent": "var(--cat-7)" } as CSSProperties}>
          Category 04–05 · Intermediate
        </div>
        <h1>Supply, Demand &amp; Liquidity</h1>
        <p className="lead">
          Zones are the area-based cousin of support and resistance.
          Liquidity explains why price so often runs at a level right before
          it reverses. Together, they&apos;re the bridge into Smart Money-style
          price action.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#supply-demand" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-7)" }} />
          Supply &amp; Demand
        </Link>
        <Link href="#liquidity" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-3)" }} />
          Liquidity
        </Link>
      </div>

      <section id="supply-demand" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-7)", "--eyebrow-accent": "var(--cat-7)" } as CSSProperties}>
            Interactive Chart
          </div>
          <h2>Demand Zones, Supply Zones &amp; the Reaction</h2>
          <p>
            Hover a chip to see exactly where price reacted from demand and
            got rejected from supply.
          </p>
        </Reveal>

        <SupplyDemandChart />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={supplyDemandConcepts} />
        </div>
      </section>

      <section id="liquidity" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-3)", "--eyebrow-accent": "var(--cat-3)" } as CSSProperties}>
            Interactive Chart
          </div>
          <h2>Equal Highs/Lows, Sweeps &amp; the Reversal</h2>
          <p>
            Switch between a buy-side and sell-side sweep, then hover a chip
            to see exactly what gets triggered and when.
          </p>
        </Reveal>

        <LiquidityChart />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={liquidityConcepts} />
        </div>
      </section>

      <IbCtaBand
        heading="Now get precise about where."
        body="Next up: Order Blocks and Fair Value Gaps — the exact candles Smart Money traders use to mark these zones down to the pip."
        learnMoreHref="/technical-analysis"
        learnMoreLabel="← Back to the Academy"
      />

      <SiteFooter variant="technical" />
    </>
  );
}
