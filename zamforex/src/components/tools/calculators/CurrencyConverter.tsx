"use client";

import { useState } from "react";
import { getIllustrativeRate, type CurrencyCode } from "@/lib/forex/pairs";
import { convertAmount } from "@/lib/forex/calculations";
import { formatMoney, formatNumber } from "@/lib/forex/format";
import CurrencySelect from "@/components/tools/CurrencySelect";
import CalculatorInput from "@/components/tools/CalculatorInput";
import { ResultHeadline, ResultMetric, ResultMetricGrid, ResultNote } from "@/components/tools/ResultPanel";
import MiniFlow from "@/components/tools/visuals/MiniFlow";

const ACCENT = "var(--cyan)";

export default function CurrencyConverter() {
  const [from, setFrom] = useState<CurrencyCode>("USD");
  const [to, setTo] = useState<CurrencyCode>("EUR");
  const [amount, setAmount] = useState<number | "">(1000);
  const [rate, setRate] = useState<number | "">(getIllustrativeRate("USD", "EUR"));
  const [rateEdited, setRateEdited] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  function handleCurrencyChange(nextFrom: CurrencyCode, nextTo: CurrencyCode) {
    setFrom(nextFrom);
    setTo(nextTo);
    if (!rateEdited) setRate(getIllustrativeRate(nextFrom, nextTo));
    setResult(null);
  }

  function handleCalculate() {
    if (amount === "" || amount < 0) {
      setError("Enter an amount of 0 or more.");
      setResult(null);
      return;
    }
    if (rate === "" || rate <= 0) {
      setError("Enter an exchange rate greater than 0.");
      setResult(null);
      return;
    }
    setError(null);
    setResult(convertAmount(amount, rate));
  }

  return (
    <div className="calc-grid">
      <div className="calc-panel">
        <h2>Conversion Details</h2>
        <div className="calc-panel-row">
          <CurrencySelect label="From Currency" value={from} onChange={(v) => handleCurrencyChange(v, to)} />
          <CurrencySelect label="To Currency" value={to} onChange={(v) => handleCurrencyChange(from, v)} />
        </div>
        <CalculatorInput label="Amount" value={amount} onChange={setAmount} unit={from} min={0} />
        <CalculatorInput
          label={`Exchange Rate (${from}/${to})`}
          value={rate}
          onChange={(v) => {
            setRateEdited(true);
            setRate(v);
          }}
          hint="Zam Forex doesn't run a live rate feed — this starts from an illustrative reference value. Edit it to match the rate on your platform for an accurate conversion."
        />
        {error && (
          <p className="calc-field-error" role="alert" style={{ marginBottom: "14px" }}>
            {error}
          </p>
        )}
        <button type="button" className="btn btn-primary calc-submit" onClick={handleCalculate}>
          Convert Currency →
        </button>
      </div>

      <div className="calc-panel">
        <h2>Results</h2>
        <ResultHeadline
          label="Converted Amount"
          value={result !== null ? `${formatMoney(result, to)}` : undefined}
          accent={ACCENT}
          placeholder="Enter your details and convert"
        />
        <ResultMetricGrid>
          <ResultMetric label="Exchange Rate" value={rate !== "" ? `1 ${from} = ${formatNumber(rate, 4)} ${to}` : "—"} />
          <ResultMetric label="Rate Source" value="Manual entry" hint="Not a live market feed" />
        </ResultMetricGrid>
        <ResultNote>
          This rate is not live market data. Always confirm the current rate on your trading platform before making any financial decision based on it.
        </ResultNote>

        <div className="result-visual">
          <h4>Conversion Flow</h4>
          <MiniFlow
            accent={ACCENT}
            steps={[
              { label: from, value: amount !== "" ? formatNumber(amount, 2) : "—" },
              { label: "Exchange Rate", value: rate !== "" ? formatNumber(rate, 4) : "—" },
              { label: to, value: result !== null ? formatNumber(result, 2) : "—" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
