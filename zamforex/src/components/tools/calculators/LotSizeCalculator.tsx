"use client";

import { useState } from "react";
import { findPair, ILLUSTRATIVE_PRICES, type CurrencyCode } from "@/lib/forex/pairs";
import { calcPositionSize } from "@/lib/forex/calculations";
import { formatMoney, formatNumber, formatLots, formatPips } from "@/lib/forex/format";
import CalculatorInput from "@/components/tools/CalculatorInput";
import CurrencyPairSelect from "@/components/tools/CurrencyPairSelect";
import CurrencySelect from "@/components/tools/CurrencySelect";
import { ResultHeadline, ResultMetric, ResultMetricGrid, ResultNote } from "@/components/tools/ResultPanel";
import MiniFlow from "@/components/tools/visuals/MiniFlow";

const ACCENT = "var(--cat-3)";

export default function LotSizeCalculator() {
  const [accountBalance, setAccountBalance] = useState<number | "">(5000);
  const [riskPercent, setRiskPercent] = useState<number | "">(2);
  const [pairSymbol, setPairSymbol] = useState("GBP/USD");
  const [entryPrice, setEntryPrice] = useState<number | "">(ILLUSTRATIVE_PRICES["GBP/USD"]);
  const [stopLossPrice, setStopLossPrice] = useState<number | "">(ILLUSTRATIVE_PRICES["GBP/USD"] - 0.0025);
  const [accountCurrency, setAccountCurrency] = useState<CurrencyCode>("USD");
  const [manualRate, setManualRate] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof calcPositionSize> | null>(null);

  const pair = findPair(pairSymbol);
  const needsManualRate = accountCurrency !== pair.base && accountCurrency !== pair.quote;

  function handleCalculate() {
    const fail = (message: string) => {
      setError(message);
      setResult(null);
    };
    if (accountBalance === "" || accountBalance <= 0) return fail("Enter an account balance greater than 0.");
    if (riskPercent === "" || riskPercent <= 0 || riskPercent > 100) return fail("Risk % should be between 0 and 100.");
    if (entryPrice === "" || entryPrice <= 0) return fail("Enter a valid entry price.");
    if (stopLossPrice === "" || stopLossPrice <= 0) return fail("Enter a valid stop-loss price.");
    if (entryPrice === stopLossPrice) return fail("Entry price and stop-loss price can't be the same.");
    if (needsManualRate && (manualRate === "" || manualRate <= 0)) return fail(`Enter a ${pair.quote}/${accountCurrency} conversion rate below.`);

    setError(null);
    setResult(
      calcPositionSize({
        accountBalance,
        riskPercent,
        pair,
        entryPrice,
        stopLossPrice,
        accountCurrency,
        manualQuoteToAccountRate: needsManualRate ? (manualRate as number) : undefined,
      }),
    );
  }

  return (
    <div className="calc-grid">
      <div className="calc-panel">
        <h2>Your Risk Details</h2>
        <CalculatorInput label="Account Balance" value={accountBalance} onChange={setAccountBalance} unit={accountCurrency} min={0} />
        <CalculatorInput label="Risk Percentage" value={riskPercent} onChange={setRiskPercent} unit="%" min={0} />
        <div className="calc-panel-row">
          <CurrencyPairSelect value={pairSymbol} onChange={setPairSymbol} />
          <CurrencySelect value={accountCurrency} onChange={setAccountCurrency} />
        </div>
        <div className="calc-panel-row">
          <CalculatorInput label="Entry Price" value={entryPrice} onChange={setEntryPrice} min={0} />
          <CalculatorInput label="Stop Loss Price" value={stopLossPrice} onChange={setStopLossPrice} min={0} />
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
          Calculate Lot Size →
        </button>
      </div>

      <div className="calc-panel">
        <h2>Results</h2>
        <ResultHeadline
          label="Recommended Lot Size"
          value={result ? `${formatLots(result.recommendedLots)} lots` : undefined}
          accent={ACCENT}
          placeholder="Enter your details and calculate"
        />
        <ResultMetricGrid>
          <ResultMetric label="Risk Amount" value={result ? formatMoney(result.riskAmount, accountCurrency) : "—"} />
          <ResultMetric label="Position Size (Units)" value={result ? formatNumber(result.recommendedUnits, 0) : "—"} />
          <ResultMetric label="Stop Loss Distance" value={result ? formatPips(result.stopLossPips) : "—"} />
        </ResultMetricGrid>
        {result && <ResultNote>{result.conversionNote}</ResultNote>}

        <div className="result-visual">
          <h4>How the result was built</h4>
          <MiniFlow
            accent={ACCENT}
            steps={[
              { label: "Risk Amount", value: result ? formatMoney(result.riskAmount, accountCurrency) : "—" },
              { label: "Stop Loss", value: result ? formatPips(result.stopLossPips) : "—" },
              { label: "Recommended Lot Size", value: result ? `${formatLots(result.recommendedLots)} lots` : "—" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
