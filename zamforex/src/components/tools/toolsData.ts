export type ToolCategory = "Risk Management" | "Trade Planning" | "Market Data";

export type ToolMeta = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  category: ToolCategory;
  accent: string;
  featured?: boolean;
  cta: string;
};

export const TOOLS: ToolMeta[] = [
  {
    slug: "position-size-calculator",
    name: "Position Size Calculator",
    shortName: "Position Size",
    description:
      "Calculate how much you should trade based on your account balance, risk percentage, and stop-loss distance.",
    category: "Risk Management",
    accent: "var(--mint)",
    featured: true,
    cta: "Calculate Position Size",
  },
  {
    slug: "pip-calculator",
    name: "Pip Calculator",
    shortName: "Pip Value",
    description:
      "Find out exactly how much a single pip is worth for any pair, lot size, and account currency.",
    category: "Market Data",
    accent: "var(--gold)",
    cta: "Calculate Pip Value",
  },
  {
    slug: "margin-calculator",
    name: "Margin Calculator",
    shortName: "Margin",
    description:
      "See how much margin your broker will require to open a position at a given leverage.",
    category: "Risk Management",
    accent: "var(--cat-1)",
    cta: "Calculate Margin",
  },
  {
    slug: "lot-size-calculator",
    name: "Lot Size Calculator",
    shortName: "Lot Size",
    description:
      "Turn your risk amount and stop-loss distance into a precise, ready-to-trade lot size.",
    category: "Risk Management",
    accent: "var(--cat-3)",
    cta: "Calculate Lot Size",
  },
  {
    slug: "profit-calculator",
    name: "Profit Calculator",
    shortName: "Profit / Loss",
    description:
      "Estimate the potential profit or loss on a trade before you enter it, in your own account currency.",
    category: "Trade Planning",
    accent: "var(--mint)",
    featured: true,
    cta: "Calculate Profit",
  },
  {
    slug: "risk-reward-calculator",
    name: "Risk Reward Calculator",
    shortName: "Risk : Reward",
    description:
      "Check whether a setup's reward actually justifies its risk before you ever place the trade.",
    category: "Trade Planning",
    accent: "var(--red)",
    featured: true,
    cta: "Check Risk : Reward",
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    shortName: "Converter",
    description:
      "Convert between major currencies using a rate you enter or confirm — never a hidden, unverifiable feed.",
    category: "Market Data",
    accent: "var(--cyan)",
    cta: "Convert Currency",
  },
  {
    slug: "spread-calculator",
    name: "Spread Calculator",
    shortName: "Spread",
    description:
      "Turn a broker's bid/ask quote into the real pip and cash cost of the spread on your position.",
    category: "Market Data",
    accent: "var(--cat-7)",
    cta: "Calculate Spread Cost",
  },
];

export function getTool(slug: string): ToolMeta {
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Unknown tool slug: ${slug}`);
  return tool;
}

export const TOOL_CATEGORIES: { name: ToolCategory; description: string }[] = [
  {
    name: "Risk Management",
    description: "Keep position size and exposure aligned with your account and your rules.",
  },
  {
    name: "Trade Planning",
    description: "Judge a setup's potential before you're in it, not after.",
  },
  {
    name: "Market Data",
    description: "Turn raw quotes — pips, spreads, exchange rates — into numbers you can act on.",
  },
];
