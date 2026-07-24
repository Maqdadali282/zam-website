import type { ReactNode } from "react";
import MiniFlow from "./MiniFlow";
import ProfitMovementVisual from "./ProfitMovementVisual";
import RiskRewardVisual from "./RiskRewardVisual";
import SpreadVisual from "./SpreadVisual";

/** Generic illustrative preview for each tool — used on dashboard/grid cards. */
export function getToolPreview(slug: string, accent: string): ReactNode {
  switch (slug) {
    case "position-size-calculator":
      return (
        <MiniFlow
          accent={accent}
          steps={[
            { label: "Account Balance", value: "$10,000" },
            { label: "Risk %", value: "1%" },
            { label: "Stop Loss", value: "30 pips" },
            { label: "Position Size", value: "0.33 lots" },
          ]}
        />
      );
    case "pip-calculator":
      return (
        <MiniFlow
          accent={accent}
          steps={[
            { label: "Price Movement", value: "1.0850 → 1.0880" },
            { label: "Pip Distance", value: "30 pips" },
            { label: "Pip Value", value: "$10.00 / pip" },
          ]}
        />
      );
    case "margin-calculator":
      return (
        <MiniFlow
          accent={accent}
          steps={[
            { label: "Account Capital", value: "$10,000" },
            { label: "Leverage", value: "1 : 100" },
            { label: "Required Margin", value: "$1,085" },
          ]}
        />
      );
    case "lot-size-calculator":
      return (
        <MiniFlow
          accent={accent}
          steps={[
            { label: "Risk Amount", value: "$100" },
            { label: "Stop Loss", value: "25 pips" },
            { label: "Recommended Lot Size", value: "0.40 lots" },
          ]}
        />
      );
    case "profit-calculator":
      return <ProfitMovementVisual positive />;
    case "risk-reward-calculator":
      return <RiskRewardVisual ratio={2} />;
    case "currency-converter":
      return (
        <MiniFlow
          accent={accent}
          steps={[
            { label: "USD", value: "1,000.00" },
            { label: "Exchange Rate", value: "0.9200" },
            { label: "EUR", value: "920.00" },
          ]}
        />
      );
    case "spread-calculator":
      return <SpreadVisual />;
    default:
      return null;
  }
}
