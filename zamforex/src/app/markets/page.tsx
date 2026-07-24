import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import MarketsHeroVisual from "@/components/markets/MarketsHeroVisual";
import MarketCard from "@/components/markets/MarketCard";
import MiniFlow from "@/components/tools/visuals/MiniFlow";
import { MARKETS } from "@/components/markets/marketsData";
import { COREPRIME_SIGNUP_URL } from "@/lib/affiliateLinks";

export const metadata: Metadata = {
  title: "Market Intelligence | Zam Forex",
  description:
    "Explore the key data, sentiment, currency relationships, and global trading sessions that shape the Forex market.",
};

const calendar = MARKETS.find((m) => m.slug === "economic-calendar")!;
const heatMap = MARKETS.find((m) => m.slug === "currency-heat-map")!;
const sentiment = MARKETS.find((m) => m.slug === "market-sentiment")!;
const sessions = MARKETS.find((m) => m.slug === "trading-sessions")!;

export default function MarketsPage() {
  return (
    <>
      <SiteNav variant="markets" />

      <section className="tools-hero">
        <Reveal>
          <div className="eyebrow">Markets</div>
          <h1>Market Intelligence</h1>
          <p className="lead">
            Explore the key data, sentiment, currency relationships, and
            global trading sessions that shape the Forex market.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="#overview">
              Explore Markets →
            </Link>
            <Link className="btn btn-ghost" href="/markets/economic-calendar">
              Start with the Calendar
            </Link>
          </div>
        </Reveal>
        <Reveal>
          <MarketsHeroVisual />
        </Reveal>
      </section>

      <section id="overview" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow">Four Ways to Read the Market</div>
          <h2>Data, strength, sentiment, and timing</h2>
          <p>
            Each card below is its own dashboard — together they cover what
            is happening, who is strong, how traders are positioned, and when
            the market is most active.
          </p>
        </Reveal>
        <div className="markets-grid">
          <MarketCard
            market={calendar}
            index={0}
            visual={
              <MiniFlow
                accent={calendar.accent}
                steps={[
                  { label: "EVENT" },
                  { label: "ECONOMIC DATA" },
                  { label: "MARKET REACTION" },
                ]}
              />
            }
          />
          <MarketCard
            market={heatMap}
            index={1}
            visual={
              <MiniFlow
                accent={heatMap.accent}
                steps={[
                  { label: "USD", value: "Strong" },
                  { label: "EUR", value: "Neutral" },
                  { label: "JPY", value: "Weak" },
                ]}
              />
            }
          />
          <MarketCard
            market={sentiment}
            index={2}
            visual={
              <MiniFlow
                accent={sentiment.accent}
                steps={[
                  { label: "Bullish" },
                  { label: "Neutral" },
                  { label: "Bearish" },
                ]}
              />
            }
          />
          <MarketCard
            market={sessions}
            index={3}
            visual={
              <MiniFlow
                accent={sessions.accent}
                steps={[
                  { label: "Sydney" },
                  { label: "Tokyo" },
                  { label: "London" },
                  { label: "New York" },
                ]}
              />
            }
          />
        </div>

        <Reveal className="market-pulse-banner" style={{ marginTop: "36px" }}>
          <Image
            src="/assets/diary/market-research-desk.jpg"
            alt="Backtested trading charts and market research spread across a desk"
            fill
            sizes="(max-width: 900px) 100vw, 1200px"
            style={{ objectFit: "cover" }}
          />
          <div className="market-pulse-banner-text">
            <div className="eyebrow">Data Before Decisions</div>
            <h3>Behind every good trade is research, not a hunch.</h3>
            <p>
              This dashboard exists so you check the calendar, the
              sentiment, and the sessions first — not after the trade is
              already open.
            </p>
            <a className="btn btn-primary" href={COREPRIME_SIGNUP_URL} target="_blank" rel="noopener">
              Open a Live Account →
            </a>
          </div>
        </Reveal>
      </section>

      <IbCtaBand
        heading="Markets move on data, mood, and timing."
        body="Now put that dashboard to use — open a live account and trade on what you're seeing, not after the fact."
        learnMoreHref="/markets/economic-calendar"
        learnMoreLabel="Explore Economic Calendar"
      />

      <SiteFooter variant="markets" />
    </>
  );
}
