import type { Metadata } from "next";
import CalculatorLayout from "@/components/tools/CalculatorLayout";
import ProfitCalculator from "@/components/tools/calculators/ProfitCalculator";
import EducationSection from "@/components/tools/EducationSection";
import RiskDisclaimer from "@/components/tools/RiskDisclaimer";
import { getTool } from "@/components/tools/toolsData";

const tool = getTool("profit-calculator");

export const metadata: Metadata = {
  title: "Profit Calculator | Zam Forex Tools",
  description: "Estimate the potential profit or loss on a trade before you enter it, in your own account currency.",
};

export default function ProfitCalculatorPage() {
  return (
    <CalculatorLayout
      toolName={tool.name}
      description="Estimate the profit or loss on a trade idea before you ever place it."
      accent={tool.accent}
    >
      <ProfitCalculator />
      <EducationSection
        content={{
          whatItDoes:
            "This calculator projects the profit or loss of a trade based on your entry price, a hypothetical exit price, your position size, and which direction you're trading — so you can sanity-check an idea before risking real capital on it.",
          whyItMatters:
            "It's easy to eyeball '20 pips' and assume it's small — but 20 pips on 5 standard lots is a very different number than 20 pips on a micro lot. Seeing the actual cash figure keeps expectations grounded in reality.",
          inputs: [
            { name: "Currency Pair", desc: "The instrument you're trading, which sets the pip size and quote currency." },
            { name: "Trade Direction", desc: "Buy (long) profits when price rises; Sell (short) profits when price falls." },
            { name: "Entry Price", desc: "The price you entered, or plan to enter, the trade at." },
            { name: "Exit Price", desc: "A hypothetical or actual exit price to measure the move against." },
            { name: "Lot Size", desc: "Your position size, combined with the lot type below." },
            { name: "Account Currency", desc: "The currency your account is denominated in." },
          ],
          formula:
            "Directional Move = (Exit − Entry) × (+1 for Buy, −1 for Sell)\nProfit / Loss = Directional Move × Units Traded",
          formulaNote: "A positive result is a profit; a negative result is a loss — converted into your account currency using the same rules as the other tools here.",
          example:
            "Buying 1 standard lot of EUR/USD at 1.0850 and exiting at 1.0900 (a 50-pip gain): Profit = (1.0900 − 1.0850) × 100,000 = $500.",
          limitations: [
            "This doesn't include spread on entry, commission, or swap/rollover for overnight positions — the real fill will differ slightly.",
            "It's a projection based on prices you enter, not a live position — always confirm against your broker's actual platform.",
            "Slippage during fast-moving markets can change your real entry or exit price from what you planned.",
          ],
        }}
      />
      <RiskDisclaimer />
    </CalculatorLayout>
  );
}
