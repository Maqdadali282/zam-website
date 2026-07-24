import type { MetadataRoute } from "next";

const BASE_URL = "https://www.zamforex.com";

const hubs = [
  "/technical-analysis",
  "/fundamental-analysis",
  "/forex-learning",
  "/markets",
  "/tools",
  "/forex-basics",
];

const lessons = [
  "/technical-analysis/market-structure",
  "/technical-analysis/support-resistance",
  "/technical-analysis/supply-demand-liquidity",
  "/technical-analysis/order-blocks-fvg",
  "/technical-analysis/candlestick-patterns",
  "/technical-analysis/indicators",
  "/technical-analysis/fibonacci-mtf",
  "/fundamental-analysis/market-expectations-risk-sentiment",
  "/fundamental-analysis/economic-calendar",
  "/fundamental-analysis/central-banks",
  "/fundamental-analysis/currency-strength",
  "/fundamental-analysis/geopolitical-commodities",
  "/fundamental-analysis/interest-rates-inflation",
  "/fundamental-analysis/employment-growth",
  "/forex-learning/beginner-guide",
  "/forex-learning/risk-management",
  "/forex-learning/trading-psychology",
  "/forex-learning/advanced-guide",
  "/forex-learning/glossary",
  "/forex-learning/trading-strategies",
  "/forex-learning/frameworks",
];

const marketPages = [
  "/markets/market-sentiment",
  "/markets/economic-calendar",
  "/markets/currency-heat-map",
  "/markets/trading-sessions",
];

const toolPages = [
  "/tools/position-size-calculator",
  "/tools/pip-calculator",
  "/tools/margin-calculator",
  "/tools/lot-size-calculator",
  "/tools/profit-calculator",
  "/tools/risk-reward-calculator",
  "/tools/currency-converter",
  "/tools/spread-calculator",
];

const utility = ["/best-brokers", "/apps", "/contact", "/faq"];

const legal = [
  "/privacy-policy",
  "/terms-conditions",
  "/risk-disclosure",
  "/cookie-policy",
  "/disclaimer",
];

function entries(
  paths: string[],
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number
): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...entries(marketPages, "hourly", 0.8),
    ...entries(hubs, "weekly", 0.8),
    ...entries(lessons, "monthly", 0.7),
    ...entries(toolPages, "monthly", 0.7),
    ...entries(utility, "monthly", 0.5),
    ...entries(legal, "yearly", 0.3),
  ];
}
