"use client";

import { useState } from "react";
import { findPair, ILLUSTRATIVE_PRICES, type CurrencyCode } from "@/lib/forex/pairs";
import { calcSpread, type LotType } from "@/lib/forex/calculations";
import { formatMoney, formatNumber } from "@/lib/forex/format";
import CalculatorInput from "@/components/tools/CalculatorInput";
import CurrencyPairSelect from "@/components/tools/CurrencyPairSelect";
import CurrencySelect from "@/components/tools/CurrencySelect";
import LotTypeSelect from "@/components/tools/LotTypeSelect";
import { ResultHeadline, ResultMetric, ResultMetricGrid, ResultNote } from "@/components/tools/ResultPanel";
import SpreadVisual from "@/components/tools/visuals/SpreadVisual";

const ACCENT = "var(--cat-7)";

export default function SpreadCalculator() {
  const [pairSymbol, setPairSymbol] = useState("EUR/USD");
  const [bid, setBid] = useState<number | "">(ILLUSTRATIVE_PRICES["EUR/USD"]);
  const [ask, setAsk] = useState<number | "">(Number((ILLUSTRATIVE_PRICES["EUR/USD"] + 0.00012).toFixed(5)));
  const [lots, setLots] = useState<number | "">(1);
  const [lotType, setLotType] = useState<LotType>("standard");
  const [accountCurrency, setAccountCurrency] = useState<CurrencyCode>("USD");
  const [manualRate, setManualRate] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof calcSpread> | null>(null);

  const pair = findPair(pairSymbol);
  const needsManualRate = accountCurrency !== pair.base && accountCurrency !== pair.quote;

  function handleCalculate() {
    const fail = (message: string) => {
      setError(message);
      setResult(null);
    };
    if (bid === "" || bid <= 0) return fail("Enter a valid bid price.");
    if (ask === "" || ask <= 0) return fail("Enter a valid ask price.");
    if (ask < bid) return fail("Ask price should be greater than or equal to the bid price.");
    if (lots === "" || lots <= 0) return fail("Enter a position size greater than 0.");
    if (needsManualRate && (manualRate === "" || manualRate <= 0)) return fail(`Enter a ${pair.quote}/${accountCurrency} conversion rate below.`);

    setError(null);
    setResult(
      calcSpread({
        pair,
        bid,
        ask,
        lots,
        lotType,
        accountCurrency,
        manualQuoteToAccountRate: needsManualRate ? (manualRate as number) : undefined,
      }),
    );
  }

  return (
    <div className="calc-grid">
      <div className="calc-panel">
        <h2>Quote Details</h2>
        <div className="calc-panel-row">
          <CurrencyPairSelect value={pairSymbol} onChange={setPairSymbol} />
          <CurrencySelect value={accountCurrency} onChange={setAccountCurrency} />
        </div>
        <div className="calc-panel-row">
          <CalculatorInput label="Bid Price" value={bid} onChange={setBid} min={0} />
          <CalculatorInput label="Ask Price" value={ask} onChange={setAsk} min={0} />
        </div>
        <div className="calc-panel-row">
          <CalculatorInput label="Position Size" value={lots} onChange={setLots} min={0} />
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
          Calculate Spread Cost →
        </button>
      </div>

      <div className="calc-panel">
        <h2>Results</h2>
        <ResultHeadline label="Spread" value={result ? `${formatNumber(result.spreadPips, 1)} pips` : undefined} accent={ACCENT} placeholder="Enter your details and calculate" />
        <ResultMetricGrid>
          <ResultMetric label="Estimated Spread Cost" value={result ? formatMoney(result.costAccount, accountCurrency) : "—"} />
          <ResultMetric label="Spread (Price)" value={result ? formatNumber(result.spreadPrice, pair.quote === "JPY" ? 3 : 5) : "—"} />
        </ResultMetricGrid>
        {result && <ResultNote>{result.conversionNote}</ResultNote>}

        <div className="result-visual">
          <h4>Bid / Ask Distance</h4>
          <SpreadVisual />
        </div>
      </div>
    </div>
  );
}
