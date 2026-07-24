import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import SingleCandlePatternChart from "@/components/technical-analysis/SingleCandlePatternChart";
import MultiCandlePatternChart from "@/components/technical-analysis/MultiCandlePatternChart";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { singleCandleConcepts, multiCandleConcepts } from "@/components/technical-analysis/candlestickConcepts";

export const metadata: Metadata = {
  title: "Candlestick Patterns | Zam Forex",
  description:
    "Learn Doji, Hammer, Shooting Star, Inverted Hammer, Bullish/Bearish Engulfing, Morning Star, and Evening Star — what each candle shape is telling you — with interactive charts.",
};

export default function CandlestickPatternsPage() {
  return (
    <>
      <SiteNav variant="technical" />

      <div className="ta-breadcrumb">
        <Link href="/technical-analysis">Technical Analysis Academy</Link>
        <span>/</span>
        <span>Candlestick Patterns</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: "var(--mint)", "--eyebrow-accent": "var(--mint)" } as CSSProperties}>
          Category 08 · Beginner
        </div>
        <h1>Candlestick Patterns</h1>
        <p className="lead">
          Every candle already told you a story before any indicator loaded —
          a single shape or a short sequence can flag exhaustion, indecision,
          or a change in who&apos;s in control.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#single-candle" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--mint)" }} />
          Single-Candle Patterns
        </Link>
        <Link href="#multi-candle" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-2)" }} />
          Multi-Candle Patterns
        </Link>
      </div>

      <section id="single-candle" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--mint)", "--eyebrow-accent": "var(--mint)" } as CSSProperties}>
            Interactive Candlestick Chart
          </div>
          <h2>Doji, Hammer, Shooting Star &amp; Inverted Hammer</h2>
          <p>
            Switch between patterns, then hover a chip to see exactly which
            candle in the sequence it refers to.
          </p>
        </Reveal>

        <SingleCandlePatternChart />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={singleCandleConcepts} />
        </div>
      </section>

      <section id="multi-candle" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-2)", "--eyebrow-accent": "var(--cat-2)" } as CSSProperties}>
            Interactive Candlestick Chart
          </div>
          <h2>Engulfing, Morning Star &amp; Evening Star</h2>
          <p>
            These take two or three candles working together, instead of just
            one — hover a chip to isolate each candle in the sequence.
          </p>
        </Reveal>

        <MultiCandlePatternChart />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={multiCandleConcepts} />
        </div>
      </section>

      <IbCtaBand
        heading="Candles tell you when. Indicators confirm it."
        body="Next up: RSI, MACD, Moving Averages, and Bollinger Bands — the toolkit traders layer on top of raw price."
        learnMoreHref="/technical-analysis"
        learnMoreLabel="← Back to the Academy"
      />

      <SiteFooter variant="technical" />
    </>
  );
}
