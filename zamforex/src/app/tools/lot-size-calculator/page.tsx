import type { Metadata } from "next";
import CalculatorLayout from "@/components/tools/CalculatorLayout";
import LotSizeCalculator from "@/components/tools/calculators/LotSizeCalculator";
import EducationSection from "@/components/tools/EducationSection";
import RiskDisclaimer from "@/components/tools/RiskDisclaimer";
import { getTool } from "@/components/tools/toolsData";

const tool = getTool("lot-size-calculator");

export const metadata: Metadata = {
  title: "Lot Size Calculator | Zam Forex Tools",
  description: "Turn your risk amount and stop-loss distance into a precise, ready-to-trade lot size.",
};

export default function LotSizeCalculatorPage() {
  return (
    <CalculatorLayout
      toolName={tool.name}
      description="Turn your account risk and stop-loss distance into a precise, ready-to-trade lot size."
      accent={tool.accent}
    >
      <LotSizeCalculator />
      <EducationSection
        content={{
          whatItDoes:
            "This calculator uses the same risk-based sizing method as the Position Size Calculator, but is focused specifically on giving you a clean, ready-to-enter lot size for your broker's order ticket.",
          whyItMatters:
            "Brokers ultimately want a lot size, not a percentage — this bridges the gap between 'I want to risk 2%' and the actual number you type into the volume field before hitting buy or sell.",
          inputs: [
            { name: "Account Balance", desc: "Your current account balance, in your account currency." },
            { name: "Risk Percentage", desc: "The portion of that balance you're willing to risk on this trade." },
            { name: "Entry Price", desc: "The price you intend to enter at." },
            { name: "Stop Loss Price", desc: "Where your stop loss will sit — the distance to entry defines your per-unit risk." },
            { name: "Currency Pair", desc: "The instrument you're trading." },
            { name: "Account Currency", desc: "The currency your account is denominated in." },
          ],
          formula:
            "Risk Amount = Balance × Risk %\nStop-Loss Pips = |Entry − Stop Loss| ÷ Pip Size\nLot Size = Risk Amount ÷ (Stop-Loss Pips × Pip Value per Lot)",
          formulaNote: "The result is expressed directly in standard lots (1 lot = 100,000 units) so it maps straight onto most brokers' order tickets.",
          example:
            "A $5,000 account risking 2% ($100) on GBP/USD with a 25-pip stop loss and a $10 pip value per standard lot: Lot Size = $100 ÷ (25 × $10) = 0.40 lots.",
          limitations: [
            "Round down to your broker's minimum lot increment (often 0.01) rather than up — rounding up increases your risk beyond what you decided on.",
            "Doesn't include spread, commission, or swap, which will make the real risk slightly higher than calculated.",
            "Assumes you already know your stop-loss price — this tool sizes around a stop, it doesn't set one for you.",
          ],
        }}
      />
      <RiskDisclaimer />
    </CalculatorLayout>
  );
}
