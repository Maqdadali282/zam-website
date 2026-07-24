import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import TradingSessionsBoard from "@/components/markets/TradingSessionsBoard";
import IbCtaBand from "@/components/common/IbCtaBand";
import { getMarket } from "@/components/markets/marketsData";

const market = getMarket("trading-sessions");

export const metadata: Metadata = {
  title: "Trading Sessions | Zam Forex Markets",
  description:
    "Understand the major global Forex trading sessions and their overlapping market hours.",
};

export default function TradingSessionsPage() {
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
          Markets · Sessions
        </div>
        <h1>{market.name}</h1>
        <p className="lead">{market.description}</p>
      </div>

      <section className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: market.accent, "--eyebrow-accent": market.accent } as CSSProperties}>
            The Trading Day, Around the World
          </div>
          <h2>Sydney → Tokyo → London → New York</h2>
          <p>
            Forex trades 24 hours a day because these four major sessions
            hand off to each other — the live clocks and status table below
            are converted to your own device&apos;s current time and time
            zone automatically.
          </p>
        </Reveal>
        <TradingSessionsBoard />
      </section>

      <IbCtaBand
        heading="Know when the market is most active."
        body="Session overlaps are when spreads are tightest and moves are largest — have a live account ready before the next one starts."
        learnMoreHref="/markets/economic-calendar"
        learnMoreLabel="View Economic Calendar"
      />

      <SiteFooter variant="markets" />
    </>
  );
}
