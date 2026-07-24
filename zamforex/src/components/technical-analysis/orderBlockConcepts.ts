import type { ConceptEntry } from "./ConceptAccordion";

const OB = "var(--cat-5)";
const FVG = "var(--cat-4)";

export const orderBlockConcepts: ConceptEntry[] = [
  {
    id: "bullish-ob",
    term: "Bullish Order Block",
    def: "The last down-candle right before a strong, fast move up — marked as the zone where large buy orders most likely entered.",
    accent: OB,
    how: "Institutions can't fill huge orders on one candle without moving price too far, so they're believed to build positions during that final down-candle before the displacement takes off.",
    bullish: "Price rallies away from the order block, later returns to retest it, and bounces — exactly like the chart above.",
    bearish: "If price returns to a bullish order block and closes clean through it instead of reacting, the zone has failed.",
    mistake: "Marking every down-candle as an order block — only the one immediately before a genuine displacement counts.",
    tip: "The strength of the displacement afterward is what validates the order block — no strong move, no meaningful zone.",
  },
  {
    id: "bearish-ob",
    term: "Bearish Order Block",
    def: "The last up-candle right before a strong, fast move down — marked as the zone where large sell orders most likely entered.",
    accent: OB,
    how: "Same logic as the bullish version, mirrored: institutions build short positions during that final up-candle before the displacement down begins.",
    bullish: "If price returns to a bearish order block and closes clean through it instead of reacting, the zone has failed.",
    bearish: "Price falls away from the order block, later returns to retest it, and gets rejected — exactly like the chart above.",
    mistake: "Shorting an order block the instant price touches it, without waiting for any actual rejection candle.",
    tip: "Order blocks that line up with a Fair Value Gap or a supply/demand zone (confluence) tend to react more reliably.",
  },
];

export const fvgConcepts: ConceptEntry[] = [
  {
    id: "fvg",
    term: "Fair Value Gap — FVG",
    def: "A three-candle imbalance where the middle candle moves so fast that its wick doesn't overlap with the wicks of the candle before and after it, leaving a visible gap.",
    accent: FVG,
    how: "Candle 1's high (or low) and candle 3's low (or high) don't touch — the untouched space between them is the gap, formed by candle 2's displacement.",
    bullish: "A bullish FVG forms during a strong up move; price often dips back to \"fill\" it before continuing higher.",
    bearish: "A bearish FVG forms during a strong down move; price often bounces back to \"fill\" it before continuing lower.",
    mistake: "Expecting every single FVG to get filled immediately — some stay open for a long time, or never fill at all.",
    tip: "Not every FVG needs to be 100% filled — many reactions happen from just the near edge of the gap.",
  },
  {
    id: "imbalance",
    term: "Imbalance",
    def: "The broader term for what an FVG represents — a stretch of price that traded through so fast, one side (buyers or sellers) never got a fair two-sided auction there.",
    accent: FVG,
    how: "Markets are generally considered inefficient about leaving these behind, and price often \"rebalances\" by trading back through the imbalanced area later.",
    bullish: "An imbalance left behind by a sharp rally often gets partially revisited before the uptrend resumes.",
    bearish: "An imbalance left behind by a sharp decline often gets partially revisited before the downtrend resumes.",
    mistake: "Using \"imbalance\" and \"FVG\" as if they're two completely different tools — in most frameworks they describe the same thing.",
    tip: "Think of the FVG as the visible marker on the chart, and \"imbalance\" as the underlying reason it's there.",
  },
  {
    id: "mitigation",
    term: "Mitigation",
    def: "What happens when price returns to an order block or FVG and partially or fully \"uses up\" the orders resting there.",
    accent: OB,
    how: "The first return to a zone consumes some of the original resting orders; each additional visit uses up more, weakening the zone over time — similar to how a tested supply/demand zone weakens.",
    bullish: "A bullish order block that's only been mitigated once is generally considered more reliable than one visited several times.",
    bearish: "A bearish order block that's only been mitigated once is generally considered more reliable than one visited several times.",
    mistake: "Trading a heavily mitigated zone with the same confidence as a fresh, untouched one.",
    tip: "\"Mitigation\" for order blocks/FVGs is the same underlying idea as a \"tested zone\" for supply and demand — just different vocabulary.",
  },
];
