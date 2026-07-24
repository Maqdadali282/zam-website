import type { Metadata } from "next";
import CalculatorLayout from "@/components/tools/CalculatorLayout";
import PositionSizeCalculator from "@/components/tools/calculators/PositionSizeCalculator";
import EducationSection from "@/components/tools/EducationSection";
import RiskDisclaimer from "@/components/tools/RiskDisclaimer";
import { getTool } from "@/components/tools/toolsData";

const tool = getTool("position-size-calculator");

export const metadata: Metadata = {
  title: "Position Size Calculator | Zam Forex Tools",
  description:
    "Calculate the appropriate position size based on your account balance, risk percentage, and stop-loss distance.",
};

export default function PositionSizeCalculatorPage() {
  return (
    <CalculatorLayout
      toolName={tool.name}
      description="Calculate the appropriate position size based on your account balance, risk percentage, and stop-loss distance."
      accent={tool.accent}
    >
      <PositionSizeCalculator />
      <EducationSection
        content={{
          whatItDoes:
            "This calculator works backward from how much you're willing to risk to tell you exactly how big a position to open — in lots and in units — so a hit stop loss costs you precisely the amount you decided on, not more.",
          whyItMatters:
            "The same 30-pip stop loss can mean a 0.5% loss or a 10% loss depending purely on how many lots you traded. Position size — not the stop loss itself — is what actually controls how much a losing trade costs you.",
          inputs: [
            { name: "Account Balance", desc: "The total balance in your trading account, in your account currency." },
            { name: "Risk Percentage", desc: "The share of your account you're willing to lose if this specific trade hits its stop loss." },
            { name: "Currency Pair", desc: "The pair you're trading — this determines the pip size and how pip value converts into your account currency." },
            { name: "Entry Price", desc: "The price you plan to enter the trade at." },
            { name: "Stop Loss Price", desc: "The price your stop loss sits at — the distance between this and entry is your risk per unit." },
            { name: "Account Currency", desc: "The currency your trading account is denominated in." },
          ],
          formula:
            "Risk Amount = Balance × Risk %\nStop-Loss Pips = |Entry − Stop Loss| ÷ Pip Size\nPosition Size (lots) = Risk Amount ÷ (Stop-Loss Pips × Pip Value per Lot)",
          formulaNote:
            "Pip value per lot is converted into your account currency automatically when the pair's quote or base currency matches it — otherwise you'll be asked for the conversion rate directly.",
          example:
            "A $10,000 account risking 1% ($100) on EUR/USD with a 30-pip stop loss and a pip value of $10 per standard lot: Position Size = $100 ÷ (30 × $10) = 0.33 lots.",
          limitations: [
            "This estimates lot size from your stated risk — it doesn't know your broker's minimum lot increment, so round down if needed.",
            "Spread, slippage, and commissions aren't included, so actual risk on a live fill can be slightly higher than calculated.",
            "For account currencies that aren't the pair's base or quote currency, accuracy depends entirely on the conversion rate you enter.",
          ],
        }}
      />
      <RiskDisclaimer />
    </CalculatorLayout>
  );
}
