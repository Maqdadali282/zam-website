const usdPoints = ["Strong economic data", "Hawkish central bank", "Rising interest rate expectations"];
const eurPoints = ["Weak economic data", "Dovish central bank", "Falling rate expectations"];

const rows: { factor: string; usd: string; eur: string; edge: "USD" | "EUR" }[] = [
  { factor: "Interest Rate", usd: "5.25% (rising)", eur: "3.75% (holding)", edge: "USD" },
  { factor: "Inflation (CPI y/y)", usd: "3.6% — above target", eur: "2.2% — near target", edge: "USD" },
  { factor: "GDP Growth", usd: "+2.8% q/q ann.", eur: "+0.4% q/q ann.", edge: "USD" },
  { factor: "Employment", usd: "NFP beating forecasts", eur: "Unemployment ticking up", edge: "USD" },
  { factor: "Central Bank Policy", usd: "Hawkish", eur: "Dovish", edge: "USD" },
  { factor: "Economic Outlook", usd: "Resilient, above-trend", eur: "Sluggish, below-trend", edge: "USD" },
  { factor: "Risk Sentiment", usd: "Neutral-to-safe-haven demand", eur: "Limited safe-haven demand", edge: "USD" },
];

export default function ComparisonTable() {
  return (
    <div>
      <div className="term-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginBottom: "28px" }}>
        <div className="term-card glow-card" style={{ borderTop: "3px solid var(--cat-1)" }}>
          <h3 style={{ color: "var(--cat-1)" }}>USD</h3>
          <ul style={{ paddingLeft: "18px", color: "var(--muted)", fontSize: "13px", lineHeight: 1.8 }}>
            {usdPoints.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="term-card glow-card" style={{ borderTop: "3px solid var(--cyan)" }}>
          <h3 style={{ color: "var(--cyan)" }}>EUR</h3>
          <ul style={{ paddingLeft: "18px", color: "var(--muted)", fontSize: "13px", lineHeight: 1.8 }}>
            {eurPoints.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <p style={{ color: "var(--muted)", marginBottom: "20px" }}>
        <b style={{ color: "var(--text)" }}>Potential Result:</b> USD may have
        relative fundamental strength against EUR — every factor below is
        currently pointing the same direction.
      </p>

      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Factor</th>
              <th>USD</th>
              <th>EUR</th>
              <th>Edge</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.factor}>
                <td className="factor">{r.factor}</td>
                <td>{r.usd}</td>
                <td>{r.eur}</td>
                <td style={{ color: r.edge === "USD" ? "var(--cat-1)" : "var(--cyan)", fontWeight: 700 }}>{r.edge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
