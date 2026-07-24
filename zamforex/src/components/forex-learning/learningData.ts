export type LearningSection = {
  slug: string;
  href: string;
  name: string;
  shortName: string;
  description: string;
  keyTopics: string[];
  difficulty: string;
  accent: string;
  existing: boolean;
  cta: string;
};

/**
 * Single source of truth for the Forex Learning hub — the nav dropdown,
 * the hub page's cards, and the learning-path flow all read from this list
 * instead of redeclaring the same 9 sections three different times.
 */
export const LEARNING_SECTIONS: LearningSection[] = [
  {
    slug: "forex-basics",
    href: "/forex-basics",
    name: "Forex Basics",
    shortName: "Forex Basics",
    description:
      "Currency pairs, pips, lots, leverage, spreads, candlesticks, and order types — the vocabulary everything else in this academy builds on.",
    keyTopics: ["Currency Pairs", "Pips & Lots", "Spread", "Leverage", "Margin", "Long & Short"],
    difficulty: "Beginner",
    accent: "var(--mint)",
    existing: true,
    cta: "Continue Learning",
  },
  {
    slug: "technical-analysis",
    href: "/technical-analysis",
    name: "Technical Analysis",
    shortName: "Technical Analysis",
    description:
      "How traders study price charts, market structure, trends, patterns, and indicators to understand market behavior.",
    keyTopics: ["Candlesticks", "Support & Resistance", "Chart Patterns", "Indicators", "Fibonacci"],
    difficulty: "Beginner → Advanced",
    accent: "var(--cat-1)",
    existing: true,
    cta: "Continue Learning",
  },
  {
    slug: "fundamental-analysis",
    href: "/fundamental-analysis",
    name: "Fundamental Analysis",
    shortName: "Fundamental Analysis",
    description:
      "How interest rates, inflation, GDP, employment data, and central banks drive the currency moves that show up on a chart.",
    keyTopics: ["Interest Rates", "Inflation", "Central Banks", "Economic Calendar", "Market Sentiment"],
    difficulty: "Beginner → Advanced",
    accent: "var(--gold)",
    existing: true,
    cta: "Continue Learning",
  },
  {
    slug: "trading-psychology",
    href: "/forex-learning/trading-psychology",
    name: "Trading Psychology",
    shortName: "Trading Psychology",
    description:
      "Why fear, greed, FOMO, and overconfidence wreck good strategies — and the habits that build the discipline to stick to one.",
    keyTopics: ["Fear & Greed", "FOMO", "Revenge Trading", "Discipline", "Trading Journal"],
    difficulty: "Intermediate",
    accent: "var(--cat-5)",
    existing: false,
    cta: "Start Learning",
  },
  {
    slug: "risk-management",
    href: "/forex-learning/risk-management",
    name: "Risk Management",
    shortName: "Risk Management",
    description:
      "Risk per trade, position sizing, stop losses, and risk:reward — the discipline that decides whether an edge survives contact with the market.",
    keyTopics: ["Risk Per Trade", "Position Sizing", "Stop Loss", "Risk:Reward", "Drawdown"],
    difficulty: "Intermediate",
    accent: "var(--red)",
    existing: false,
    cta: "Start Learning",
  },
  {
    slug: "trading-strategies",
    href: "/forex-learning/trading-strategies",
    name: "Trading Strategies",
    shortName: "Trading Strategies",
    description:
      "Nine core approaches — from scalping to position trading — with how each actually works, and where each tends to break down.",
    keyTopics: ["Scalping", "Swing Trading", "Trend Following", "Breakout Trading", "Range Trading"],
    difficulty: "Intermediate → Advanced",
    accent: "var(--cat-3)",
    existing: false,
    cta: "Start Learning",
  },
  {
    slug: "glossary",
    href: "/forex-learning/glossary",
    name: "Forex Glossary",
    shortName: "Glossary",
    description:
      "A searchable reference for every term used across this academy — jump straight to a definition instead of hunting through a lesson.",
    keyTopics: ["Search & Filter", "A–Z Index", "Categories", "Related Terms"],
    difficulty: "All Levels",
    accent: "var(--cyan)",
    existing: false,
    cta: "Search the Glossary",
  },
  {
    slug: "beginner-guide",
    href: "/forex-learning/beginner-guide",
    name: "Beginner Guide",
    shortName: "Beginner Guide",
    description:
      "Never traded before? Start here — an 8-step path from \"what is forex\" through to writing your first trading plan.",
    keyTopics: ["What is Forex?", "Reading Charts", "Risk Management", "Practice", "Trading Plan"],
    difficulty: "Beginner",
    accent: "var(--mint)",
    existing: false,
    cta: "Start the Guide",
  },
  {
    slug: "advanced-guide",
    href: "/forex-learning/advanced-guide",
    name: "Advanced Guide",
    shortName: "Advanced Guide",
    description:
      "For traders past the basics — volatility, correlation, strategy development, backtesting, and the performance metrics that separate a real edge from luck.",
    keyTopics: ["Volatility", "Correlation", "Strategy Development", "Backtesting", "Performance Metrics"],
    difficulty: "Advanced",
    accent: "var(--cat-7)",
    existing: false,
    cta: "Go Advanced",
  },
  {
    slug: "frameworks",
    href: "/forex-learning/frameworks",
    name: "Frameworks",
    shortName: "Frameworks",
    description:
      "Turn analysis into a system — the ICT (Inner Circle Trader) concepts, plus the risk and process frameworks that keep you consistent when the market gets loud.",
    keyTopics: ["Liquidity", "Displacement", "Market Structure Shift", "Fair Value Gap", "Optimal Trade Entry"],
    difficulty: "Advanced",
    accent: "var(--gold)",
    existing: false,
    cta: "Explore Frameworks",
  },
];

export function getLearningSection(slug: string): LearningSection {
  const section = LEARNING_SECTIONS.find((s) => s.slug === slug);
  if (!section) throw new Error(`Unknown learning section slug: ${slug}`);
  return section;
}

export const LEARNING_PATH_STEPS = [
  "Forex Basics",
  "Technical Analysis",
  "Fundamental Analysis",
  "Risk Management",
  "Trading Psychology",
  "Trading Strategies",
  "Advanced Learning",
];
