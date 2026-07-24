import type { Metadata } from "next";
import CalculatorLayout from "@/components/tools/CalculatorLayout";
import RiskRewardCalculator from "@/components/tools/calculators/RiskRewardCalculator";
import EducationSection from "@/components/tools/EducationSection";
import RiskDisclaimer from "@/components/tools/RiskDisclaimer";
import { getTool } from "@/components/tools/toolsData";

const tool = getTool("risk-reward-calculator");

export const metadata: Metadata = {
  title: "Risk Reward Calculator | Zam Forex Tools",
  description: "Check whether a setup's reward actually justifies its risk before you ever place the trade.",
};

export default function RiskRewardCalculatorPage() {
  return (
    <CalculatorLayout
      toolName={tool.name}
      description="Compare a trade's risk and reward distances to see if the setup is actually worth taking."
      accent={tool.accent}
    >
      <RiskRewardCalculator />
      <EducationSection
        content={{
          whatItDoes:
            "This calculator measures the distance from your entry to your stop loss (risk) against the distance from your entry to your take profit (reward), and expresses the relationship as a simple ratio like 1:2.",
          whyItMatters:
            "Win rate alone doesn't tell you if a strategy is profitable — a strategy that wins 40% of the time can still be very profitable if its average winner is twice its average loser. Risk:reward is the other half of that equation.",
          inputs: [
            { name: "Entry Price", desc: "The price you plan to enter the trade at." },
            { name: "Stop Loss Price", desc: "Where you'll exit if the trade goes against you." },
            { name: "Take Profit Price", desc: "Where you plan to exit if the trade goes in your favor." },
            { name: "Trade Direction", desc: "Buy or sell — this determines which side of entry the stop loss and take profit should sit on." },
          ],
          formula: "Risk Distance = |Entry − Stop Loss|\nReward Distance = |Take Profit − Entry|\nRatio = Reward Distance ÷ Risk Distance",
          formulaNote: "Expressed as \"1 : X\" — a ratio of 1:2 means the potential reward is twice the risk being taken.",
          example: "Risking 50 pips to target 100 pips: Ratio = 100 ÷ 50 = 2, shown as 1 : 2.00 — for every $1 risked, $2 is targeted.",
          limitations: [
            "A good ratio doesn't guarantee a profitable strategy — it has to be paired with a realistic win rate for that specific setup.",
            "This assumes your take profit is actually reachable given market structure — it doesn't evaluate whether the target is realistic.",
            "Spread effectively shifts your real entry slightly, which very tight stops can be more sensitive to than wide ones.",
          ],
        }}
      />
      <RiskDisclaimer />
    </CalculatorLayout>
  );
}
