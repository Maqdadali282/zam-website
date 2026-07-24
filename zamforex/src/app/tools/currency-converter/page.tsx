import type { Metadata } from "next";
import CalculatorLayout from "@/components/tools/CalculatorLayout";
import CurrencyConverter from "@/components/tools/calculators/CurrencyConverter";
import EducationSection from "@/components/tools/EducationSection";
import RiskDisclaimer from "@/components/tools/RiskDisclaimer";
import { getTool } from "@/components/tools/toolsData";

const tool = getTool("currency-converter");

export const metadata: Metadata = {
  title: "Currency Converter | Zam Forex Tools",
  description: "Convert between major currencies using a rate you enter or confirm — never a hidden, unverifiable feed.",
};

export default function CurrencyConverterPage() {
  return (
    <CalculatorLayout
      toolName={tool.name}
      description="Convert an amount between major currencies using an exchange rate you confirm."
      accent={tool.accent}
    >
      <CurrencyConverter />
      <EducationSection
        content={{
          whatItDoes:
            "This tool multiplies an amount by an exchange rate to show what it's worth in another currency. Zam Forex doesn't operate a live FX data feed, so the rate field starts from an illustrative reference value and is fully editable — you confirm the real rate, we do the multiplication.",
          whyItMatters:
            "Quick currency conversion comes up constantly — sizing a trade in a foreign account currency, comparing prices, or just understanding a number quoted in a currency you don't use day to day.",
          inputs: [
            { name: "From Currency", desc: "The currency you're converting from." },
            { name: "To Currency", desc: "The currency you're converting into." },
            { name: "Amount", desc: "How much of the 'From' currency you want to convert." },
            { name: "Exchange Rate", desc: "How many units of the 'To' currency one unit of the 'From' currency buys — edit this to match the real current rate." },
          ],
          formula: "Converted Amount = Amount × Exchange Rate",
          formulaNote: "There is no simpler formula to hide here — accuracy depends entirely on the exchange rate you enter being current.",
          example: "Converting 1,000 USD to EUR at a rate of 0.92: Converted Amount = 1,000 × 0.92 = 920 EUR.",
          limitations: [
            "The starting rate shown is an illustrative reference value, not live market data — always replace it with the current rate from your broker or a trusted source.",
            "Real conversions at a broker or bank will include a spread or fee not reflected here.",
            "Exchange rates move continuously during market hours — a rate confirmed minutes ago may already be slightly stale.",
          ],
        }}
      />
      <RiskDisclaimer />
    </CalculatorLayout>
  );
}
