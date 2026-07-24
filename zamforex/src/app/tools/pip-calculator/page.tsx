import type { Metadata } from "next";
import CalculatorLayout from "@/components/tools/CalculatorLayout";
import PipCalculator from "@/components/tools/calculators/PipCalculator";
import EducationSection from "@/components/tools/EducationSection";
import RiskDisclaimer from "@/components/tools/RiskDisclaimer";
import { getTool } from "@/components/tools/toolsData";

const tool = getTool("pip-calculator");

export const metadata: Metadata = {
  title: "Pip Calculator | Zam Forex Tools",
  description: "Find out exactly how much a single pip is worth for any pair, lot size, and account currency.",
};

export default function PipCalculatorPage() {
  return (
    <CalculatorLayout
      toolName={tool.name}
      description="Calculate the monetary value of a single pip for any currency pair, lot size, and account currency."
      accent={tool.accent}
    >
      <PipCalculator />
      <EducationSection
        content={{
          whatItDoes:
            "This calculator converts a price movement measured in pips into an actual dollar (or account-currency) figure — telling you exactly what one pip, or a whole move of several pips, is worth on your specific position.",
          whyItMatters:
            "A pip means nothing in isolation — 30 pips is a rounding error on a micro lot and a serious swing on ten standard lots. Knowing the cash value per pip is what makes a stop-loss distance or a target actually meaningful in money terms.",
          inputs: [
            { name: "Currency Pair", desc: "The pair you're trading — its quote currency and pip size (0.0001, or 0.01 for JPY pairs) drive the whole calculation." },
            { name: "Account Currency", desc: "The currency your account is denominated in — the pip value gets converted into this." },
            { name: "Lot Size", desc: "How large your position is, combined with the lot type (standard/mini/micro) below." },
            { name: "Number of Pips", desc: "The size of the price move you want to value, in pips." },
          ],
          formula:
            "Pip Value (quote currency) = Pip Size × Units Traded\nTotal Value = Pip Value × Number of Pips",
          formulaNote:
            "If your account currency isn't the pair's quote currency, that pip value is converted using the pair's own price (if your account currency is the base currency) or a rate you supply (for any other account currency).",
          example:
            "1 standard lot (100,000 units) of EUR/USD, USD account: Pip Value = 0.0001 × 100,000 = $10 per pip. A 30-pip move is worth 30 × $10 = $300.",
          limitations: [
            "This is the theoretical pip value from the raw position size — actual fills, spread, and broker rounding can shift the real number slightly.",
            "For JPY-quoted pairs the pip size is 0.01, not 0.0001 — this is handled automatically based on the pair you select.",
            "Cross-currency conversions without a live feed rely entirely on the rate you enter.",
          ],
        }}
      />
      <RiskDisclaimer />
    </CalculatorLayout>
  );
}
