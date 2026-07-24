import type { ConceptEntry } from "@/components/technical-analysis/ConceptAccordion";

const CS = "var(--cat-1)";

export const currencyStrengthConcepts: ConceptEntry[] = [
  {
    id: "currency-strength-meter",
    term: "Currency Strength Meter",
    def: "A tool that ranks major currencies from strongest to weakest by combining their recent performance against every other major currency, not just one pair.",
    accent: CS,
    how: "A currency can look strong on one chart and weak on another — a strength meter averages performance across many pairs to find its true relative standing.",
    bullish: "A currency showing up as the strongest on the meter is often the best candidate to pair against the weakest currency for a higher-conviction trend trade.",
    bearish: "A currency sitting in the 'weak' zone across most pairs confirms broad selling pressure, not just weakness against one counterpart.",
    mistake: "Judging a currency's overall strength from a single pair — USD can be weak against EUR while still strong against JPY at the same time.",
    tip: "Pairing the strongest currency against the weakest (rather than two currencies both in the 'neutral' zone) tends to produce cleaner, more directional trends.",
  },
  {
    id: "relative-strength-comparison",
    term: "Relative Strength Comparison",
    def: "Forex pairs always measure one currency against another — so 'strength' only ever means anything in comparison, never in isolation.",
    accent: CS,
    how: "Line up the same fundamental factors — rates, inflation, growth, central bank stance — for both currencies side by side, and see which side has more of them working in its favor.",
    bullish: "A currency winning on most factors (higher rates, stronger growth, more hawkish bank) against its counterpart tends to have the fundamental edge in that pair.",
    bearish: "A currency losing on most factors against its counterpart tends to be fundamentally the weaker side of that pair.",
    mistake: "Assuming a currency with 'good' fundamentals in isolation must be strong — it still depends entirely on how the other side of the pair compares.",
    tip: "When the factors are mixed (some favor each side), the market usually leans on whichever factor is most in focus that week — often interest rate expectations.",
  },
  {
    id: "combining-factors",
    term: "Combining Multiple Factors",
    def: "No single data point decides a currency's fundamental direction — real analysis weighs rates, inflation, growth, jobs, and sentiment together.",
    accent: CS,
    how: "Factors can conflict (strong growth but dovish central bank, for example) — weighing them together, rather than reacting to just one, gives a much more complete picture.",
    bullish: "When most factors point the same direction (hawkish bank, strong growth, positive risk sentiment), the fundamental case for that currency is at its strongest.",
    bearish: "When most factors point the same direction against a currency, the fundamental case for weakness is similarly strongest.",
    mistake: "Building a whole thesis around one headline release while ignoring everything else already known about that economy.",
    tip: "Use this academy's earlier lessons as your checklist — central bank stance, rates, inflation, growth, and sentiment — before forming a fundamental view.",
  },
];
