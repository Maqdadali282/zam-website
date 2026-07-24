import Reveal from "@/components/common/Reveal";

const steps = [
  {
    time: "08:29 AM",
    label: "Before",
    detail:
      "Economic calendar shows US Non-Farm Payrolls due in 1 minute, forecast at +180k jobs. EUR/USD is quiet, trading flat near 1.0850.",
  },
  {
    time: "08:30 AM",
    label: "Release",
    detail:
      "Actual NFP prints +285k — well above forecast. A strong labor market makes the Fed more likely to keep rates higher for longer.",
  },
  {
    time: "08:30–08:32 AM",
    label: "Reaction",
    detail:
      "Algorithms and traders instantly reprice USD demand. EUR/USD drops sharply as capital rotates toward the dollar's higher expected yield.",
  },
  {
    time: "08:35 AM+",
    label: "Aftermath",
    detail:
      "Volatility settles as the initial repricing finishes. The new data is now \"priced in\" — the market waits for the next catalyst.",
  },
];

export default function FundamentalExample() {
  return (
    <section id="fundamental-example">
      <Reveal className="section-head">
        <div className="eyebrow">Walkthrough</div>
        <h2>How one report moves a currency pair</h2>
        <p>A minute-by-minute look at a real Non-Farm Payrolls release.</p>
      </Reveal>
      <div className="term-grid">
        {steps.map((s) => (
          <Reveal className="term-card glow-card" key={s.time}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--gold)",
                marginBottom: "10px",
              }}
            >
              {s.time}
            </div>
            <h3>{s.label}</h3>
            <p>{s.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
