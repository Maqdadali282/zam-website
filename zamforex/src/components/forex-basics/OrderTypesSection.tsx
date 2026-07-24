import Reveal from "@/components/common/Reveal";

export default function OrderTypesSection() {
  return (
    <section id="order-types">
      <Reveal className="section-head">
        <div className="eyebrow">Placing A Trade</div>
        <h2>Market order vs pending order</h2>
        <p>
          How you tell your platform exactly when and how to enter a trade.
        </p>
      </Reveal>
      <Reveal
        className="order-grid"
        style={{ gridTemplateColumns: "repeat(2,1fr)", marginBottom: "24px" }}
      >
        <div className="order-card glow-card">
          <span className="tag">Instant</span>
          <h4>Market Order</h4>
          <p>
            Buy or sell immediately at the current market price. Fastest way
            in, but you take whatever price is available right now.
          </p>
        </div>
        <div className="order-card glow-card">
          <span className="tag">Planned</span>
          <h4>Pending Order</h4>
          <p>
            Set now, executes later — only once price reaches a level you
            choose. Splits into four types depending on direction and price
            level, shown below.
          </p>
        </div>
      </Reveal>
      <Reveal className="diagram-block glow-card">
        <div>
          <h3>The 4 pending order types</h3>
          <p>
            Pending orders are named by where your target price sits
            compared to the current price.
          </p>
          <ul>
            <li>
              <b>Buy Limit</b> Buy below the current price — expecting a
              bounce up.
            </li>
            <li>
              <b>Sell Limit</b> Sell above the current price — expecting a
              drop down.
            </li>
            <li>
              <b>Buy Stop</b> Buy above the current price — expecting a
              breakout up.
            </li>
            <li>
              <b>Sell Stop</b> Sell below the current price — expecting a
              breakout down.
            </li>
          </ul>
        </div>
        <svg viewBox="0 0 320 220">
          <line x1="0" y1="110" x2="320" y2="110" stroke="var(--text)" strokeWidth="2" />
          <text x="10" y="102" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text)">
            Current Price
          </text>

          <line x1="0" y1="55" x2="320" y2="55" stroke="var(--mint)" strokeWidth="1.2" strokeDasharray="4 4" />
          <text x="10" y="47" fontFamily="var(--font-mono)" fontSize="10" fill="var(--mint)">
            Buy Stop
          </text>

          <line x1="0" y1="80" x2="320" y2="80" stroke="var(--red)" strokeWidth="1.2" strokeDasharray="4 4" />
          <text x="180" y="73" fontFamily="var(--font-mono)" fontSize="10" fill="var(--red)">
            Sell Limit
          </text>

          <line x1="0" y1="140" x2="320" y2="140" stroke="var(--mint)" strokeWidth="1.2" strokeDasharray="4 4" />
          <text x="180" y="153" fontFamily="var(--font-mono)" fontSize="10" fill="var(--mint)">
            Buy Limit
          </text>

          <line x1="0" y1="165" x2="320" y2="165" stroke="var(--red)" strokeWidth="1.2" strokeDasharray="4 4" />
          <text x="10" y="180" fontFamily="var(--font-mono)" fontSize="10" fill="var(--red)">
            Sell Stop
          </text>
        </svg>
      </Reveal>
    </section>
  );
}
