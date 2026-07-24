import type { Metadata } from "next";
import CalculatorLayout from "@/components/tools/CalculatorLayout";
import SpreadCalculator from "@/components/tools/calculators/SpreadCalculator";
import EducationSection from "@/components/tools/EducationSection";
import RiskDisclaimer from "@/components/tools/RiskDisclaimer";
import { getTool } from "@/components/tools/toolsData";

const tool = getTool("spread-calculator");

export const metadata: Metadata = {
  title: "Spread Calculator | Zam Forex Tools",
  description: "Turn a broker's bid/ask quote into the real pip and cash cost of the spread on your position.",
};

export default function SpreadCalculatorPage() {
  return (
    <CalculatorLayout
      toolName={tool.name}
      description="Turn a bid/ask quote into the real pip and cash cost of the spread on your position."
      accent={tool.accent}
    >
      <SpreadCalculator />
      <EducationSection
        content={{
          whatItDoes:
            "This calculator measures the gap between a broker's bid and ask price — the spread — in pips, and converts that into what it actually costs you in cash terms on a given position size.",
          whyItMatters:
            "The spread is a cost you pay on every single trade the moment you open it, before the market has moved at all in your favor. Wider spreads mean the market has to move further just for a trade to break even.",
          inputs: [
            { name: "Bid Price", desc: "The price you can sell at — always the lower of the two quoted prices." },
            { name: "Ask Price", desc: "The price you can buy at — always the higher of the two quoted prices." },
            { name: "Position Size", desc: "Your lot size and lot type, which determine how much the spread actually costs in cash." },
            { name: "Currency Pair", desc: "The pair being quoted, which sets the pip size for the spread calculation." },
          ],
          formula: "Spread (price) = Ask − Bid\nSpread (pips) = Spread (price) ÷ Pip Size\nSpread Cost = Spread (price) × Units Traded",
          formulaNote: "The spread cost is converted into your account currency using the same rules as the other tools here.",
          example:
            "EUR/USD quoted at 1.08500 bid / 1.08512 ask, 1 standard lot: Spread = 0.00012 ÷ 0.0001 = 1.2 pips. Cost = 0.00012 × 100,000 = $12.",
          limitations: [
            "Spreads are not fixed for most brokers — they widen during news events and low-liquidity periods, so a single snapshot won't represent every moment of the trading day.",
            "This doesn't include any separate commission your broker may charge on top of the spread.",
            "Bid and ask prices here are whatever you enter — for a real trade, always check your platform's live quote.",
          ],
        }}
      />
      <RiskDisclaimer />
    </CalculatorLayout>
  );
}
