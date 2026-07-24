"use client";

import { useState } from "react";
import { findPair, ILLUSTRATIVE_PRICES, type CurrencyCode } from "@/lib/forex/pairs";
import { calcProfit, type LotType, type TradeDirection } from "@/lib/forex/calculations";
import { formatMoney, formatNumber } from "@/lib/forex/format";
import CalculatorInput from "@/components/tools/CalculatorInput";
import CurrencyPairSelect from "@/components/tools/CurrencyPairSelect";
import CurrencySelect from "@/components/tools/CurrencySelect";
import LotTypeSelect from "@/components/tools/LotTypeSelect";
import TradeDirectionToggle from "@/components/tools/TradeDirectionToggle";
import { ResultHeadline, ResultMetric, ResultMetricGrid, ResultNote } from "@/components/tools/ResultPanel";
import ProfitMovementVisual from "@/components/tools/visuals/ProfitMovementVisual";

const ACCENT = "var(--mint)";

export default function ProfitCalculator() {
  const [pairSymbol, setPairSymbol] = useState("EUR/USD");
  const [direction, setDirection] = useState<TradeDirection>("buy");
  const [entryPrice, setEntryPrice] = useState<number | "">(ILLUSTRATIVE_PRICES["EUR/USD"]);
  const [exitPrice, setExitPrice] = useState<number | "">(ILLUSTRATIVE_PRICES["EUR/USD"] + 0.005);
  const [lots, setLots] = useState<number | "">(1);
  const [lotType, setLotType] = useState<LotType>("standard");
  const [accountCurrency, setAccountCurrency] = useState<CurrencyCode>("USD");
  const [manualRate, setManualRate] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof calcProfit> | null>(null);

  const pair = findPair(pairSymbol);
  const needsManualRate = accountCurrency !== pair.base && accountCurrency !== pair.quote;

  function handleCalculate() {
    const fail = (message: string) => {
      setError(message);
      setResult(null);
    };
    if (entryPrice === "" || entryPrice <= 0) return fail("Enter a valid entry price.");
    if (exitPrice === "" || exitPrice <= 0) return fail("Enter a valid exit price.");
    if (lots === "" || lots <= 0) return fail("Enter a lot size greater than 0.");
    if (needsManualRate && (manualRate === "" || manualRate <= 0)) return fail(`Enter a ${pair.quote}/${accountCurrency} conversion rate below.`);

    setError(null);
    setResult(
      calcProfit({
        pair,
        direction,
        entryPrice,
        exitPrice,
        lots,
        lotType,
        accountCurrency,
        manualQuoteToAccountRate: needsManualRate ? (manualRate as number) : undefined,
      }),
    );
  }

  const isProfit = result ? result.profitLossAccount >= 0 : true;

  return (
    <div className="calc-grid">
      <div className="calc-panel">
        <h2>Your Trade Details</h2>
        <div className="calc-panel-row">
          <CurrencyPairSelect value={pairSymbol} onChange={setPairSymbol} />
          <CurrencySelect value={accountCurrency} onChange={setAccountCurrency} />
        </div>
        <TradeDirectionToggle value={direction} onChange={setDirection} />
        <div className="calc-panel-row">
          <CalculatorInput label="Entry Price" value={entryPrice} onChange={setEntryPrice} min={0} />
          <CalculatorInput label="Exit Price" value={exitPrice} onChange={setExitPrice} min={0} />
        </div>
        <div className="calc-panel-row">
          <CalculatorInput label="Lot Size" value={lots} onChange={setLots} min={0} />
          <LotTypeSelect value={lotType} onChange={setLotType} />
        </div>
        {needsManualRate && (
          <CalculatorInput
            label={`${pair.quote}/${accountCurrency} Conversion Rate`}
            value={manualRate}
            onChange={setManualRate}
            hint="No live rate feed is connected — enter the current rate from your platform."
          />
        )}
        {error && (
          <p className="calc-field-error" role="alert" style={{ marginBottom: "14px" }}>
            {error}
          </p>
        )}
        <button type="button" className="btn btn-primary calc-submit" onClick={handleCalculate}>
          Calculate Profit / Loss →
        </button>
      </div>

      <div className="calc-panel">
        <h2>Results</h2>
        <ResultHeadline
          label={result ? (isProfit ? "Estimated Profit" : "Estimated Loss") : "Estimated Profit / Loss"}
          value={result ? formatMoney(Math.abs(result.profitLossAccount), accountCurrency) : undefined}
          accent={isProfit ? "var(--mint)" : "var(--red)"}
          placeholder="Enter your details and calculate"
        />
        <ResultMetricGrid>
          <ResultMetric label="Price Difference" value={result ? formatNumber(Math.abs(result.priceDifference), pair.quote === "JPY" ? 3 : 5) : "—"} />
          <ResultMetric label="Percentage Movement" value={result ? `${formatNumber(Math.abs(result.percentMove))}%` : "—"} />
          <ResultMetric label="Pips Moved" value={result ? formatNumber(Math.abs(result.pipsMoved), 1) : "—"} />
        </ResultMetricGrid>
        {result && <ResultNote>{result.conversionNote}</ResultNote>}

        <div className="result-visual">
          <h4>Entry to Exit</h4>
          <ProfitMovementVisual positive={isProfit} />
        </div>
      </div>
    </div>
  );
}
