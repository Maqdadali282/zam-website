import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import MiniFlow from "@/components/tools/visuals/MiniFlow";
import IbCtaBand from "@/components/common/IbCtaBand";
import EconomicCalendarWidget from "@/components/tradingview/EconomicCalendarWidget";
import { getMarket } from "@/components/markets/marketsData";

const market = getMarket("economic-calendar");

export const metadata: Metadata = {
  title: "Economic Calendar | Zam Forex Markets",
  description:
    "Track important economic events, announcements, and data releases that may influence currency markets.",
};

export default function EconomicCalendarMarketPage() {
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
          Markets · Data &amp; Events
        </div>
        <h1>{market.name}</h1>
        <p className="lead">{market.description}</p>
      </div>

      <section className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: market.accent, "--eyebrow-accent": market.accent } as CSSProperties}>
            How a Release Moves the Market
          </div>
          <h2>Event → Economic Data → Market Reaction</h2>
          <p>
            Every calendar entry follows the same chain — a scheduled event
            releases data, and the market reacts based on how that data
            compares to what was already expected.
          </p>
        </Reveal>
        <MiniFlow
          accent={market.accent}
          steps={[
            { label: "EVENT", value: "Scheduled release" },
            { label: "ECONOMIC DATA", value: "Previous vs. Forecast vs. Actual" },
            { label: "MARKET REACTION", value: "Currency moves on the surprise" },
          ]}
        />
      </section>

      <section className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: market.accent, "--eyebrow-accent": market.accent } as CSSProperties}>
            Upcoming &amp; Recent Events
          </div>
          <h2>High-Impact Releases Across Major Currencies</h2>
          <p>Click any row to see what happened and why it mattered.</p>
        </Reveal>
        <EconomicCalendarWidget />
        <div className="tool-disclaimer" style={{ padding: "20px 0 0", margin: 0 }}>
          Live data provided by TradingView. Always confirm exact release
          times with your broker before trading around a release.
        </div>
      </section>

      <IbCtaBand
        heading="Data moves markets. Context decides how much."
        body="See a high-impact release coming up? Have a live account ready so you can actually act on it."
        learnMoreHref="/markets/market-sentiment"
        learnMoreLabel="View Market Sentiment"
      />

      <SiteFooter variant="markets" />
    </>
  );
}
