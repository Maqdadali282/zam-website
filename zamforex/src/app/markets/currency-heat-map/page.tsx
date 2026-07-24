import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import ForexHeatMapWidget from "@/components/tradingview/ForexHeatMapWidget";
import { getMarket } from "@/components/markets/marketsData";

const market = getMarket("currency-heat-map");

export const metadata: Metadata = {
  title: "Currency Heat Map | Zam Forex Markets",
  description:
    "Visualize relative currency strength and weakness across major currency pairs.",
};

export default function CurrencyHeatMapPage() {
  return (
    <>
      <SiteNav variant="markets" />

      <div className="ta-breadcrumb">
        <Link href="/markets">Markets</Link>
        <span>/</span>
        <span>{market.name}</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: market.accent, "--eyebrow-accent": market.accent } as CSSProperties}>
          Markets · Sentiment &amp; Strength
        </div>
        <h1>{market.name}</h1>
        <p className="lead">{market.description}</p>
      </div>

      <section className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: market.accent, "--eyebrow-accent": market.accent } as CSSProperties}>
            Strength Overview
          </div>
          <h2>Relative Strength Across the 8 Majors</h2>
          <p>
            Each cell is a currency pair, colored and labeled by its live
            percentage move — darker green means stronger gains, darker red
            means stronger losses.
          </p>
        </Reveal>
        <ForexHeatMapWidget />
        <div className="tool-disclaimer" style={{ padding: "20px 0 0", margin: 0 }}>
          Live data provided by TradingView. Percentage moves update in
          real time during market hours.
        </div>
      </section>

      <IbCtaBand
        heading="Strength tells you where. Sentiment tells you why."
        body="Found a strong pair? Open a live account and trade it while the move is still on."
        learnMoreHref="/markets/market-sentiment"
        learnMoreLabel="View Market Sentiment"
      />

      <SiteFooter variant="markets" />
    </>
  );
}
