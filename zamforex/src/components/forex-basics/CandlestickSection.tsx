import Reveal from "@/components/common/Reveal";

export default function CandlestickSection() {
  return (
    <section id="candlestick">
      <Reveal className="section-head">
        <div className="eyebrow">Reading A Chart</div>
        <h2>Candlestick anatomy</h2>
        <p>
          Almost every trading platform uses candlesticks by default —
          here&apos;s exactly what each part means.
        </p>
      </Reveal>

      <Reveal className="diagram-block glow-card">
        <svg viewBox="0 0 320 260">
          <line x1="20" y1="20" x2="20" y2="240" stroke="var(--line)" strokeWidth="1" />
          <line x1="20" y1="240" x2="300" y2="240" stroke="var(--line)" strokeWidth="1" />

          {/* bullish candle */}
          <line x1="110" y1="40" x2="110" y2="90" stroke="var(--mint)" strokeWidth="2" />
          <rect x="90" y="90" width="40" height="80" fill="var(--mint)" opacity="0.85" />
          <line x1="110" y1="170" x2="110" y2="210" stroke="var(--mint)" strokeWidth="2" />

          {/* bearish candle */}
          <line x1="220" y1="30" x2="220" y2="70" stroke="var(--red)" strokeWidth="2" />
          <rect x="200" y="70" width="40" height="70" fill="none" stroke="var(--red)" strokeWidth="2" />
          <line x1="220" y1="140" x2="220" y2="190" stroke="var(--red)" strokeWidth="2" />

          <text x="110" y="30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--muted)">
            High
          </text>
          <text x="110" y="228" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--muted)">
            Low
          </text>
          <text x="140" y="95" fontFamily="var(--font-mono)" fontSize="10" fill="var(--mint)">
            Close
          </text>
          <text x="140" y="165" fontFamily="var(--font-mono)" fontSize="10" fill="var(--mint)">
            Open
          </text>
          <text x="248" y="75" fontFamily="var(--font-mono)" fontSize="10" fill="var(--red)">
            Open
          </text>
          <text x="248" y="145" fontFamily="var(--font-mono)" fontSize="10" fill="var(--red)">
            Close
          </text>

          <text x="110" y="255" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--mint)">
            Bullish
          </text>
          <text x="220" y="255" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--red)">
            Bearish
          </text>
        </svg>
        <div>
          <h3>One candle = one time period</h3>
          <p>
            Each candlestick shows four prices for whatever period
            you&apos;re viewing (1 minute, 1 hour, 1 day...): where price
            opened, where it closed, and the highest and lowest points it
            touched.
          </p>
          <ul>
            <li>
              <b>Body</b> The thick part — the range between open and close.
            </li>
            <li>
              <b>Wick</b> The thin lines — the high and low extremes for that
              period.
            </li>
            <li>
              <b>Green/filled</b> Price closed higher than it opened
              (bullish).
            </li>
            <li>
              <b>Red/hollow</b> Price closed lower than it opened (bearish).
            </li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
