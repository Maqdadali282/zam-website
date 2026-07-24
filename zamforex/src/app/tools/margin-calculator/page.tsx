import type { Metadata } from "next";
import CalculatorLayout from "@/components/tools/CalculatorLayout";
import MarginCalculator from "@/components/tools/calculators/MarginCalculator";
import EducationSection from "@/components/tools/EducationSection";
import RiskDisclaimer from "@/components/tools/RiskDisclaimer";
import { getTool } from "@/components/tools/toolsData";

const tool = getTool("margin-calculator");

export const metadata: Metadata = {
  title: "Margin Calculator | Zam Forex Tools",
  description: "See how much margin your broker will require to open a position at a given leverage.",
};

export default function MarginCalculatorPage() {
  return (
    <CalculatorLayout
      toolName={tool.name}
      description="Calculate the margin required to open a position, based on your trade size, leverage, and the current price."
      accent={tool.accent}
    >
      <MarginCalculator />
      <EducationSection
        content={{
          whatItDoes:
            "This calculator tells you how much of your own capital your broker will set aside — and lock — as collateral the moment you open a position at a given leverage.",
          whyItMatters:
            "Margin isn't a fee and it isn't your risk — it's capital that becomes unavailable for other trades while the position is open. Underestimating it is one of the most common ways traders get caught off guard by a margin call.",
          inputs: [
            { name: "Currency Pair", desc: "The pair you're trading — its price sets the notional value of your position." },
            { name: "Account Currency", desc: "The currency your account is denominated in." },
            { name: "Trade Size / Lot Size", desc: "The lot type (standard/mini/micro) and how many lots you're trading." },
            { name: "Leverage", desc: "The ratio your broker offers — e.g. 100 for 1:100 — which determines what fraction of the notional value you must post as margin." },
            { name: "Current Price", desc: "The pair's current market price, used to work out the position's total notional value." },
          ],
          formula: "Notional Value = Units × Price\nRequired Margin = Notional Value ÷ Leverage",
          formulaNote: "Notional value is converted into your account currency using the same rules as the other calculators on this page.",
          example:
            "1 standard lot (100,000 units) of EUR/USD at 1.0850 with 1:100 leverage: Notional = 100,000 × 1.0850 = $108,500. Margin = $108,500 ÷ 100 = $1,085.",
          limitations: [
            "Brokers may apply different margin tiers for larger position sizes or specific instruments — always confirm with your actual broker's margin schedule.",
            "This doesn't account for existing open positions, which reduce your free margin further.",
            "Margin requirements can change during high volatility or around major news events — check your broker's policy.",
          ],
        }}
      />
      <RiskDisclaimer />
    </CalculatorLayout>
  );
}
