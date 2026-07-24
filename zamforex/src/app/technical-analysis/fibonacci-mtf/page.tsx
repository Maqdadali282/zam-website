import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import FibonacciChart from "@/components/technical-analysis/FibonacciChart";
import MultiTimeframeChart from "@/components/technical-analysis/MultiTimeframeChart";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { fibonacciConcepts, mtfConcepts } from "@/components/technical-analysis/fibonacciMtfConcepts";

export const metadata: Metadata = {
  title: "Fibonacci & Multi-Timeframe Analysis | Zam Forex",
  description:
    "Learn Fibonacci retracement, the Golden Pocket, extensions, and Multi-Timeframe Analysis — top-down analysis, higher timeframe bias, and the entry timeframe — with interactive charts.",
};

export default function FibonacciMtfPage() {
  return (
    <>
      <SiteNav variant="technical" />

      <div className="ta-breadcrumb">
        <Link href="/technical-analysis">Technical Analysis Academy</Link>
        <span>/</span>
        <span>Fibonacci &amp; Multi-Timeframe Analysis</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: "var(--gold)", "--eyebrow-accent": "var(--gold)" } as CSSProperties}>
          Category 10–11 · Intermediate–Advanced
        </div>
        <h1>Fibonacci &amp; Multi-Timeframe Analysis</h1>
        <p className="lead">
          Fibonacci gives you precise pullback levels to time an entry.
          Multi-timeframe analysis makes sure that entry actually agrees with
          the bigger picture — the final piece that ties everything else in
          this academy together.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#fibonacci" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--gold)" }} />
          Fibonacci
        </Link>
        <Link href="#mtf" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-8)" }} />
          Multi-Timeframe Analysis
        </Link>
      </div>

      <section id="fibonacci" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--gold)", "--eyebrow-accent": "var(--gold)" } as CSSProperties}>
            Interactive Chart
          </div>
          <h2>Retracement Levels &amp; the Golden Pocket</h2>
          <p>
            Switch between a bullish and bearish retracement, then hover a
            chip to see exactly where the golden pocket sits.
          </p>
        </Reveal>

        <FibonacciChart />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={fibonacciConcepts} />
        </div>
      </section>

      <section id="mtf" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-8)", "--eyebrow-accent": "var(--cat-8)" } as CSSProperties}>
            Interactive Chart
          </div>
          <h2>Higher, Middle &amp; Lower Timeframe</h2>
          <p>
            Compare an aligned setup against a conflicting one, then hover a
            chip to isolate each timeframe.
          </p>
        </Reveal>

        <MultiTimeframeChart />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={mtfConcepts} />
        </div>
      </section>

      <IbCtaBand
        heading="That's the full academy."
        body="Structure, levels, zones, precise entries, candles, indicators, and now timing — eleven concepts, one consistent way of reading price. Open a live account and start putting it to work on a real chart."
        learnMoreHref="/technical-analysis"
        learnMoreLabel="← Back to the Academy"
      />

      <SiteFooter variant="technical" />
    </>
  );
}
