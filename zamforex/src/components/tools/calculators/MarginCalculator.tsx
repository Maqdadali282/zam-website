"use client";

import { useState } from "react";
import { findPair, ILLUSTRATIVE_PRICES, type CurrencyCode } from "@/lib/forex/pairs";
import { calcMargin, type LotType } from "@/lib/forex/calculations";
import { formatMoney, formatNumber } from "@/lib/forex/format";
import CalculatorInput from "@/components/tools/CalculatorInput";
import CurrencyPairSelect from "@/components/tools/CurrencyPairSelect";
import CurrencySelect from "@/components/tools/CurrencySelect";
import LotTypeSelect from "@/components/tools/LotTypeSelect";
import { ResultHeadline, ResultMetric, ResultMetricGrid, ResultNote } from "@/components/tools/ResultPanel";
import MiniFlow from "@/components/tools/visuals/MiniFlow";

const ACCENT = "var(--cat-1)";

export default function MarginCalculator() {
  const [pairSymbol, setPairSymbol] = useState("EUR/USD");
  const [accountCurrency, setAccountCurrency] = useState<CurrencyCode>("USD");
  const [lots, setLots] = useState<number | "">(1);
  const [lotType, setLotType] = useState<LotType>("standard");
  const [leverage, setLeverage] = useState<number | "">(100);
  const [price, setPrice] = useState<number | "">(ILLUSTRATIVE_PRICES["EUR/USD"]);
  const [manualRate, setManualRate] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof calcMargin> | null>(null);

  const pair = findPair(pairSymbol);
  const needsManualRate = accountCurrency !== pair.base && accountCurrency !== pair.quote;

  function handleCalculate() {
    const fail = (message: string) => {
      setError(message);
      setResult(null);
    };
    if (lots === "" || lots <= 0) return fail("Enter a lot size greater than 0.");
    if (leverage === "" || leverage <= 0) return fail("Enter a leverage ratio greater than 0.");
    if (price === "" || price <= 0) return fail("Enter the current price for this pair.");
    if (needsManualRate && (manualRate === "" || manualRate <= 0)) return fail(`Enter a ${pair.quote}/${accountCurrency} conversion rate below.`);

    setError(null);
    setResult(
      calcMargin({
        pair,
        accountCurrency,
        lots,
        lotType,
        leverage,
        price,
        manualQuoteToAccountRate: needsManualRate ? (manualRate as number) : undefined,
      }),
    );
  }

  return (
    <div className="calc-grid">
      <div className="calc-panel">
        <h2>Your Trade Details</h2>
        <div className="calc-panel-row">
          <CurrencyPairSelect value={pairSymbol} onChange={setPairSymbol} />
          <CurrencySelect value={accountCurrency} onChange={setAccountCurrency} />
        </div>
        <div className="calc-panel-row">
          <CalculatorInput label="Lot Size (Trade Size)" value={lots} onChange={setLots} min={0} />
          <LotTypeSelect value={lotType} onChange={setLotType} />
        </div>
        <div className="calc-panel-row">
          <CalculatorInput label="Leverage" value={leverage} onChange={setLeverage} unit=": 1" hint="E.g. 100 for 1:100 leverage." min={0} />
          <CalculatorInput label={`Current ${pair.symbol} Price`} value={price} onChange={setPrice} min={0} />
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
          Calculate Margin →
        </button>
      </div>

      <div className="calc-panel">
        <h2>Results</h2>
        <ResultHeadline
          label="Required Margin"
          value={result ? formatMoney(result.requiredMargin, accountCurrency) : undefined}
          accent={ACCENT}
          placeholder="Enter your details and calculate"
        />
        <ResultMetricGrid>
          <ResultMetric label="Notional Value" value={result ? formatMoney(result.notionalValueAccount, accountCurrency) : "—"} />
          <ResultMetric label="Units Traded" value={result ? formatNumber(result.units, 0) : "—"} />
          <ResultMetric label="Leverage Effect" value={leverage !== "" ? `1 : ${leverage}` : "—"} hint="Margin is 1 ÷ leverage of the notional value" />
        </ResultMetricGrid>
        {result && <ResultNote>{result.conversionNote}</ResultNote>}

        <div className="result-visual">
          <h4>How the result was built</h4>
          <MiniFlow
            accent={ACCENT}
            steps={[
              { label: "Account Capital", value: result ? formatMoney(result.notionalValueAccount, accountCurrency) : "—" },
              { label: "Leverage", value: leverage !== "" ? `1 : ${leverage}` : "—" },
              { label: "Required Margin", value: result ? formatMoney(result.requiredMargin, accountCurrency) : "—" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
