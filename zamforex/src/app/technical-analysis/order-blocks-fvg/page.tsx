import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import OrderBlockChart from "@/components/technical-analysis/OrderBlockChart";
import FVGChart from "@/components/technical-analysis/FVGChart";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { orderBlockConcepts, fvgConcepts } from "@/components/technical-analysis/orderBlockConcepts";

export const metadata: Metadata = {
  title: "Order Blocks & Fair Value Gaps | Zam Forex",
  description:
    "Learn Bullish and Bearish Order Blocks, Fair Value Gaps, Imbalance, and Mitigation — the exact candles Smart Money traders use to mark zones — with interactive candlestick charts.",
};

export default function OrderBlocksFvgPage() {
  return (
    <>
      <SiteNav variant="technical" />

      <div className="ta-breadcrumb">
        <Link href="/technical-analysis">Technical Analysis Academy</Link>
        <span>/</span>
        <span>Order Blocks &amp; Fair Value Gaps</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: "var(--cat-5)", "--eyebrow-accent": "var(--cat-5)" } as CSSProperties}>
          Category 06–07 · Advanced
        </div>
        <h1>Order Blocks &amp; Fair Value Gaps</h1>
        <p className="lead">
          Supply/demand zones tell you the neighborhood. Order blocks and
          Fair Value Gaps get precise about the exact candles — the tools
          Smart Money-style price action traders use to mark entries down to
          the pip.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#order-blocks" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-5)" }} />
          Order Blocks
        </Link>
        <Link href="#fvg" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-4)" }} />
          Fair Value Gaps
        </Link>
      </div>

      <section id="order-blocks" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-5)", "--eyebrow-accent": "var(--cat-5)" } as CSSProperties}>
            Interactive Candlestick Chart
          </div>
          <h2>Displacement, the Order Block &amp; the Reaction</h2>
          <p>
            Toggle Bullish/Bearish, then hover a chip to see the exact candle
            each concept refers to.
          </p>
        </Reveal>

        <OrderBlockChart />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={orderBlockConcepts} />
        </div>
      </section>

      <section id="fvg" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-4)", "--eyebrow-accent": "var(--cat-4)" } as CSSProperties}>
            Interactive Candlestick Chart
          </div>
          <h2>The Three-Candle Imbalance &amp; the Fill</h2>
          <p>
            The same three-candle structure, in both directions — watch the
            gap get filled before price continues.
          </p>
        </Reveal>

        <FVGChart />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={fvgConcepts} />
        </div>
      </section>

      <IbCtaBand
        heading="Zones tell you where. Candles tell you when."
        body="Next up: the full Candlestick Patterns library — every major single, two, and three-candle formation with a live mini-chart."
        learnMoreHref="/technical-analysis"
        learnMoreLabel="← Back to the Academy"
      />

      <SiteFooter variant="technical" />
    </>
  );
}
