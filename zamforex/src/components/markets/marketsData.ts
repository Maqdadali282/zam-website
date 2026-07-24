export type MarketMeta = {
  slug: string;
  href: string;
  name: string;
  shortName: string;
  description: string;
  keyTopics: string[];
  accent: string;
  cta: string;
};

export const MARKETS: MarketMeta[] = [
  {
    slug: "economic-calendar",
    href: "/markets/economic-calendar",
    name: "Economic Calendar",
    shortName: "Calendar",
    description:
      "Track important economic events, announcements, and data releases that may influence currency markets.",
    keyTopics: ["High-impact events", "Previous vs. forecast vs. actual", "Event → reaction timeline"],
    accent: "var(--gold)",
    cta: "Explore Economic Calendar",
  },
  {
    slug: "currency-heat-map",
    href: "/markets/currency-heat-map",
    name: "Currency Heat Map",
    shortName: "Heat Map",
    description:
      "Visualize relative currency strength and weakness across major currency pairs.",
    keyTopics: ["8 major currencies", "Strength tiers", "Pair-vs-pair matrix"],
    accent: "var(--mint)",
    cta: "View Currency Heat Map",
  },
  {
    slug: "market-sentiment",
    href: "/markets/market-sentiment",
    name: "Market Sentiment",
    shortName: "Sentiment",
    description:
      "Understand how traders and market participants are positioned across the Forex market.",
    keyTopics: ["Bullish / Neutral / Bearish", "Positioning, not prediction", "Currency reactions"],
    accent: "var(--cyan)",
    cta: "Explore Market Sentiment",
  },
  {
    slug: "trading-sessions",
    href: "/markets/trading-sessions",
    name: "Trading Sessions",
    shortName: "Sessions",
    description:
      "Understand the major global Forex trading sessions and their overlapping market hours.",
    keyTopics: ["Sydney, Tokyo, London, New York", "Session overlaps", "Live session status"],
    accent: "var(--cat-7)",
    cta: "View Trading Sessions",
  },
];

export function getMarket(slug: string): MarketMeta {
  const market = MARKETS.find((m) => m.slug === slug);
  if (!market) throw new Error(`Unknown market slug: ${slug}`);
  return market;
}
