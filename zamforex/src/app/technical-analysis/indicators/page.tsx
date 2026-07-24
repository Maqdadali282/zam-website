import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import TrendIndicatorChart from "@/components/technical-analysis/TrendIndicatorChart";
import MomentumIndicatorChart from "@/components/technical-analysis/MomentumIndicatorChart";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { trendConcepts, momentumConcepts } from "@/components/technical-analysis/indicatorConcepts";

export const metadata: Metadata = {
  title: "Indicators — RSI, MACD, Moving Averages & Bollinger Bands | Zam Forex",
  description:
    "Learn Moving Averages, Golden/Death Cross, Bollinger Bands, RSI, RSI Divergence, and MACD — the indicator toolkit layered on top of raw price — with interactive charts.",
};

export default function IndicatorsPage() {
  return (
    <>
      <SiteNav variant="technical" />

      <div className="ta-breadcrumb">
        <Link href="/technical-analysis">Technical Analysis Academy</Link>
        <span>/</span>
        <span>Indicators</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: "var(--cat-1)", "--eyebrow-accent": "var(--cat-1)" } as CSSProperties}>
          Category 09 · Intermediate
        </div>
        <h1>Indicators</h1>
        <p className="lead">
          Indicators don&apos;t replace price — they summarize it. Trend tools
          smooth price out; momentum tools measure how fast it&apos;s moving.
          Used together, they confirm what the chart is already showing you.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#trend" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-1)" }} />
          Trend Indicators
        </Link>
        <Link href="#momentum" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-4)" }} />
          Momentum Indicators
        </Link>
      </div>

      <section id="trend" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-1)", "--eyebrow-accent": "var(--cat-1)" } as CSSProperties}>
            Interactive Chart
          </div>
          <h2>Moving Averages &amp; Bollinger Bands</h2>
          <p>
            Switch between the two, then hover a chip to see exactly where
            the signal fires on the chart.
          </p>
        </Reveal>

        <TrendIndicatorChart />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={trendConcepts} />
        </div>
      </section>

      <section id="momentum" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-4)", "--eyebrow-accent": "var(--cat-4)" } as CSSProperties}>
            Interactive Chart
          </div>
          <h2>RSI &amp; MACD</h2>
          <p>
            The price panel on top, the oscillator below it — hover a chip to
            see how the two connect.
          </p>
        </Reveal>

        <MomentumIndicatorChart />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={momentumConcepts} />
        </div>
      </section>

      <IbCtaBand
        heading="The toolkit is only half the picture. Now find your entry."
        body="Next up: Fibonacci retracements and Multi-Timeframe Analysis — the final piece for lining up trend, structure, and entry."
        learnMoreHref="/technical-analysis"
        learnMoreLabel="← Back to the Academy"
      />

      <SiteFooter variant="technical" />
    </>
  );
}
