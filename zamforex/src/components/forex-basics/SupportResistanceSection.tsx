import Reveal from "@/components/common/Reveal";

export default function SupportResistanceSection() {
  return (
    <section id="support-resistance">
      <Reveal className="diagram-block glow-card">
        <div>
          <h3>Support &amp; Resistance</h3>
          <p>
            These are price levels the market keeps &quot;bouncing off.&quot;
            Support is a floor where buyers tend to step in; resistance is a
            ceiling where sellers tend to step in.
          </p>
          <ul>
            <li>
              <b>Support</b> A level price struggles to fall below.
            </li>
            <li>
              <b>Resistance</b> A level price struggles to rise above.
            </li>
            <li>
              <b>Breakout</b> When price finally punches through one of these
              levels.
            </li>
          </ul>
        </div>
        <svg viewBox="0 0 320 220">
          <line x1="10" y1="60" x2="310" y2="60" stroke="var(--red)" strokeWidth="1.5" strokeDasharray="6 6" />
          <text x="15" y="52" fontFamily="var(--font-mono)" fontSize="10" fill="var(--red)">
            Resistance
          </text>
          <line x1="10" y1="170" x2="310" y2="170" stroke="var(--mint)" strokeWidth="1.5" strokeDasharray="6 6" />
          <text x="15" y="188" fontFamily="var(--font-mono)" fontSize="10" fill="var(--mint)">
            Support
          </text>
          <path
            d="M20 150 L60 80 L100 155 L140 70 L180 160 L220 65 L260 60 L300 30"
            stroke="var(--text)"
            strokeWidth="2.2"
            fill="none"
          />
        </svg>
      </Reveal>
    </section>
  );
}
