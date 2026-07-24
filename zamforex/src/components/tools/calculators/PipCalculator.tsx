"use client";

import { useState } from "react";
import { findPair, ILLUSTRATIVE_PRICES, type CurrencyCode } from "@/lib/forex/pairs";
import { calcPipValue, lotsToUnits, LOT_UNITS, type LotType } from "@/lib/forex/calculations";
import { formatMoney, formatNumber } from "@/lib/forex/format";
import CalculatorInput from "@/components/tools/CalculatorInput";
import CurrencyPairSelect from "@/components/tools/CurrencyPairSelect";
import CurrencySelect from "@/components/tools/CurrencySelect";
import LotTypeSelect from "@/components/tools/LotTypeSelect";
import { ResultHeadline, ResultMetric, ResultMetricGrid, ResultNote } from "@/components/tools/ResultPanel";
import MiniFlow from "@/components/tools/visuals/MiniFlow";

const ACCENT = "var(--gold)";

type Result = {
  pipValue: number;
  pipValuePerStandardLot: number;
  totalValue: number;
  note: string;
};

export default function PipCalculator() {
  const [pairSymbol, setPairSymbol] = useState("EUR/USD");
  const [accountCurrency, setAccountCurrency] = useState<CurrencyCode>("USD");
  const [lots, setLots] = useState<number | "">(1);
  const [lotType, setLotType] = useState<LotType>("standard");
  const [numberOfPips, setNumberOfPips] = useState<number | "">(30);
  const [price, setPrice] = useState<number | "">(ILLUSTRATIVE_PRICES["EUR/USD"]);
  const [manualRate, setManualRate] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const pair = findPair(pairSymbol);
  const needsPrice = accountCurrency === pair.base;
  const needsManualRate = accountCurrency !== pair.base && accountCurrency !== pair.quote;

  function handleCalculate() {
    const fail = (message: string) => {
      setError(message);
      setResult(null);
    };

    if (lots === "" || lots <= 0) return fail("Enter a lot size greater than 0.");
    if (numberOfPips === "" || numberOfPips <= 0) return fail("Enter a number of pips greater than 0.");
    if (needsPrice && (price === "" || price <= 0)) return fail("Enter the current price to convert into your account currency.");
    if (needsManualRate && (manualRate === "" || manualRate <= 0)) return fail(`Enter a ${pair.quote}/${accountCurrency} conversion rate below.`);

    setError(null);
    const units = lotsToUnits(lots, lotType);
    const priceForConversion = (price as number) || 1;
    const pv = calcPipValue(pair, units, accountCurrency, priceForConversion, needsManualRate ? (manualRate as number) : undefined);
    const pvStandard = calcPipValue(pair, LOT_UNITS.standard, accountCurrency, priceForConversion, needsManualRate ? (manualRate as number) : undefined);

    setResult({
      pipValue: pv.pipValueAccountCcy,
      pipValuePerStandardLot: pvStandard.pipValueAccountCcy,
      totalValue: pv.pipValueAccountCcy * numberOfPips,
      note: pv.note,
    });
  }

  return (
    <div className="calc-grid">
      <div className="calc-panel">
        <h2>Your Position Details</h2>
        <div className="calc-panel-row">
          <CurrencyPairSelect value={pairSymbol} onChange={setPairSymbol} />
          <CurrencySelect value={accountCurrency} onChange={setAccountCurrency} />
        </div>
        <div className="calc-panel-row">
          <CalculatorInput label="Lot Size" value={lots} onChange={setLots} min={0} />
          <LotTypeSelect value={lotType} onChange={setLotType} />
        </div>
        <CalculatorInput label="Number of Pips" value={numberOfPips} onChange={setNumberOfPips} unit="pips" min={0} />
        {needsPrice && (
          <CalculatorInput
            label={`Current ${pair.symbol} Price`}
            value={price}
            onChange={setPrice}
            hint="Needed to convert the pip value into your account currency."
          />
        )}
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
          Calculate Pip Value →
        </button>
      </div>

      <div className="calc-panel">
        <h2>Results</h2>
        <ResultHeadline
          label="Pip Value (this position)"
          value={result ? formatMoney(result.pipValue, accountCurrency) : undefined}
          accent={ACCENT}
          placeholder="Enter your details and calculate"
        />
        <ResultMetricGrid>
          <ResultMetric label="Value Per Standard Lot" value={result ? formatMoney(result.pipValuePerStandardLot, accountCurrency) : "—"} />
          <ResultMetric
            label="Total Pip Movement Value"
            value={result ? formatMoney(result.totalValue, accountCurrency) : "—"}
            hint={numberOfPips !== "" ? `for a ${numberOfPips}-pip move` : undefined}
          />
        </ResultMetricGrid>
        {result && <ResultNote>{result.note}</ResultNote>}

        <div className="result-visual">
          <h4>How the result was built</h4>
          <MiniFlow
            accent={ACCENT}
            steps={[
              { label: "Price Movement", value: numberOfPips !== "" ? `${numberOfPips} pips` : "—" },
              { label: "Pip Distance", value: `${formatNumber(pair.quote === "JPY" ? 0.01 : 0.0001, pair.quote === "JPY" ? 2 : 4)} per pip` },
              { label: "Pip Value", value: result ? formatMoney(result.pipValue, accountCurrency) : "—" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
