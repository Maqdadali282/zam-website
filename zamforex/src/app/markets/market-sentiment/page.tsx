import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import MarketSentimentDashboard from "@/components/markets/MarketSentimentDashboard";
import { getMarket } from "@/components/markets/marketsData";

const market = getMarket("market-sentiment");

export const metadata: Metadata = {
  title: "Market Sentiment | Zam Forex Markets",
  description:
    "Understand how traders and market participants are positioned across the Forex market.",
};

export default function MarketSentimentPage() {
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
            Positioning Dashboard
          </div>
          <h2>Bullish, Neutral, or Bearish</h2>
          <p>
            Toggle between the three states to see how typical positioning
            and currency reactions differ.
          </p>
        </Reveal>
        <MarketSentimentDashboard />
      </section>

      <IbCtaBand
        heading="Mood shifts fast. Plans shouldn't."
        body="Turn a sentiment read into a real position — open a live account and trade it with proper execution."
        learnMoreHref="/markets/trading-sessions"
        learnMoreLabel="View Trading Sessions"
      />

      <SiteFooter variant="markets" />
    </>
  );
}
