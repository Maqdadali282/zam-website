import Reveal from "@/components/common/Reveal";

export default function WhatIsFundamental() {
  return (
    <section id="what-is-fundamental">
      <Reveal className="diagram-block glow-card">
        <div>
          <h3>What is fundamental analysis?</h3>
          <p>
            Fundamental analysis studies the economic, financial, and
            political forces that determine what a currency is actually
            <i> worth</i>. A currency is really a proxy for the health of its
            economy — so when the data behind that economy changes, the
            currency&apos;s value changes with it.
          </p>
          <p>
            The logic chain is always the same: an event happens (a rate
            decision, a jobs report, an election) → it changes how investors
            expect money to flow in or out of that economy → that shifts
            demand for the currency → the price moves.
          </p>
          <ul>
            <li>
              <b>Example</b> The Federal Reserve raises interest rates by
              0.25%. Higher rates mean investors holding USD earn more
              interest, so global capital flows into US dollar assets to
              capture that yield. That extra demand pushes USD higher against
              nearly every other major currency — often within seconds of the
              announcement.
            </li>
            <li>
              <b>Compare</b> A trader watching only the EUR/USD chart sees a
              sharp green candle. A trader who read the Fed statement first
              knew it was coming and why.
            </li>
          </ul>
        </div>
        <svg viewBox="0 0 320 220">
          <circle cx="70" cy="110" r="42" fill="none" stroke="var(--gold)" strokeWidth="2" />
          <text x="70" y="105" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--gold)">
            Rate
          </text>
          <text x="70" y="119" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--gold)">
            Decision
          </text>
          <path d="M114 110 L176 110" stroke="var(--muted)" strokeWidth="2" markerEnd="url(#fArrow1)" />
          <circle cx="220" cy="110" r="42" fill="none" stroke="var(--mint)" strokeWidth="2" />
          <text x="220" y="105" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--mint)">
            Capital
          </text>
          <text x="220" y="119" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--mint)">
            Flows In
          </text>
          <path
            d="M20 190 L60 150 L100 175 L140 120 L180 160 L220 90 L260 130 L300 60"
            stroke="var(--text)"
            strokeWidth="2.2"
            fill="none"
          />
          <defs>
            <marker id="fArrow1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--muted)" />
            </marker>
          </defs>
        </svg>
      </Reveal>
    </section>
  );
}
