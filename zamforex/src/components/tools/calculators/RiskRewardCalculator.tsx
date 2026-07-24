"use client";

import { useState } from "react";
import { findPair, ILLUSTRATIVE_PRICES } from "@/lib/forex/pairs";
import { calcRiskReward, type TradeDirection } from "@/lib/forex/calculations";
import { formatNumber, formatPips } from "@/lib/forex/format";
import CalculatorInput from "@/components/tools/CalculatorInput";
import CurrencyPairSelect from "@/components/tools/CurrencyPairSelect";
import TradeDirectionToggle from "@/components/tools/TradeDirectionToggle";
import { ResultHeadline, ResultMetric, ResultMetricGrid, ResultNote } from "@/components/tools/ResultPanel";
import RiskRewardVisual from "@/components/tools/visuals/RiskRewardVisual";

const ACCENT = "var(--red)";

export default function RiskRewardCalculator() {
  const [pairSymbol, setPairSymbol] = useState("EUR/USD");
  const [direction, setDirection] = useState<TradeDirection>("buy");
  const [entryPrice, setEntryPrice] = useState<number | "">(ILLUSTRATIVE_PRICES["EUR/USD"]);
  const [stopLossPrice, setStopLossPrice] = useState<number | "">(ILLUSTRATIVE_PRICES["EUR/USD"] - 0.0025);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number | "">(ILLUSTRATIVE_PRICES["EUR/USD"] + 0.005);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof calcRiskReward> | null>(null);

  const pair = findPair(pairSymbol);

  function handleCalculate() {
    const fail = (message: string) => {
      setError(message);
      setResult(null);
    };
    if (entryPrice === "" || entryPrice <= 0) return fail("Enter a valid entry price.");
    if (stopLossPrice === "" || stopLossPrice <= 0) return fail("Enter a valid stop-loss price.");
    if (takeProfitPrice === "" || takeProfitPrice <= 0) return fail("Enter a valid take-profit price.");

    const r = calcRiskReward({ entryPrice, stopLossPrice, takeProfitPrice, direction, pair });
    if (!r.valid) {
      setError(r.issue ?? "Check that your stop loss and take profit sit on the correct sides of your entry.");
      setResult(null);
      return;
    }
    setError(null);
    setResult(r);
  }

  return (
    <div className="calc-grid">
      <div className="calc-panel">
        <h2>Your Trade Setup</h2>
        <CurrencyPairSelect value={pairSymbol} onChange={setPairSymbol} hint="Used only to show risk/reward in pips alongside price." />
        <TradeDirectionToggle value={direction} onChange={setDirection} />
        <CalculatorInput label="Entry Price" value={entryPrice} onChange={setEntryPrice} min={0} />
        <div className="calc-panel-row">
          <CalculatorInput label="Stop Loss Price" value={stopLossPrice} onChange={setStopLossPrice} min={0} />
          <CalculatorInput label="Take Profit Price" value={takeProfitPrice} onChange={setTakeProfitPrice} min={0} />
        </div>
        {error && (
          <p className="calc-field-error" role="alert" style={{ marginBottom: "14px" }}>
            {error}
          </p>
        )}
        <button type="button" className="btn btn-primary calc-submit" onClick={handleCalculate}>
          Check Risk : Reward →
        </button>
      </div>

      <div className="calc-panel">
        <h2>Results</h2>
        <ResultHeadline label="Risk-to-Reward Ratio" value={result?.ratioLabel} accent={ACCENT} placeholder="Enter your details and calculate" />
        <ResultMetricGrid>
          <ResultMetric label="Risk (Stop Loss)" value={result ? formatPips(result.riskPips ?? 0) : "—"} hint={result ? formatNumber(result.riskDistance, pair.quote === "JPY" ? 3 : 5) : undefined} />
          <ResultMetric label="Reward (Take Profit)" value={result ? formatPips(result.rewardPips ?? 0) : "—"} hint={result ? formatNumber(result.rewardDistance, pair.quote === "JPY" ? 3 : 5) : undefined} />
        </ResultMetricGrid>
        {result && (
          <ResultNote>
            {result.ratio >= 2
              ? "A ratio of 1:2 or better means you can be right less than half the time and still come out ahead — many traders treat this as a healthy minimum."
              : result.ratio >= 1
                ? "This setup risks roughly as much as it targets — it needs a high win rate to be profitable over time."
                : "This setup risks more than it targets — it needs a very high win rate just to break even."}
          </ResultNote>
        )}

        <div className="result-visual">
          <h4>Risk vs. Reward Zones</h4>
          <RiskRewardVisual ratio={result?.ratio ?? 2} />
        </div>
      </div>
    </div>
  );
}
