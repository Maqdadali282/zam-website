import Reveal from "@/components/common/Reveal";

export default function AccountTerms() {
  return (
    <section id="account-terms">
      <Reveal className="section-head">
        <div className="eyebrow">Your Trading Account</div>
        <h2>Balance, Equity &amp; Margin</h2>
        <p>
          The four numbers on your account panel that actually tell you how
          much risk you&apos;re carrying.
        </p>
      </Reveal>
      <Reveal className="diagram-block glow-card">
        <div>
          <h3>How your account balance really breaks down</h3>
          <p>
            These four numbers move together, and understanding them stops
            you from getting an unexpected margin call.
          </p>
          <ul>
            <li>
              <b>Balance</b> The money in your account before any open trades.
            </li>
            <li>
              <b>Equity</b> Balance adjusted for the live profit/loss of open
              trades right now.
            </li>
            <li>
              <b>Used Margin</b> The portion of your funds locked up as a
              deposit for open trades.
            </li>
            <li>
              <b>Free Margin</b> Equity minus Used Margin — what&apos;s
              actually left to open new trades.
            </li>
          </ul>
        </div>
        <svg viewBox="0 0 320 200">
          <text x="10" y="24" fontFamily="var(--font-mono)" fontSize="11" fill="var(--muted)">
            Balance
          </text>
          <rect x="10" y="30" width="300" height="26" rx="4" fill="var(--chip-2)" stroke="var(--line)" />
          <rect x="10" y="30" width="300" height="26" rx="4" fill="none" stroke="var(--text)" strokeWidth="1.5" />

          <text x="10" y="80" fontFamily="var(--font-mono)" fontSize="11" fill="var(--muted)">
            Equity (Balance + floating P/L)
          </text>
          <rect x="10" y="86" width="300" height="26" rx="4" fill="var(--chip-2)" stroke="var(--line)" />
          <rect x="10" y="86" width="230" height="26" rx="4" fill="var(--mint)" opacity="0.75" />
          <rect x="10" y="86" width="230" height="26" rx="4" fill="none" stroke="var(--mint)" strokeWidth="1.5" />

          <text x="10" y="136" fontFamily="var(--font-mono)" fontSize="11" fill="var(--muted)">
            Used Margin vs Free Margin
          </text>
          <rect x="10" y="142" width="300" height="26" rx="4" fill="var(--chip-2)" stroke="var(--line)" />
          <rect x="10" y="142" width="90" height="26" rx="4" fill="var(--gold)" opacity="0.85" />
          <rect x="100" y="142" width="210" height="26" rx="4" fill="none" stroke="var(--mint-bright)" strokeWidth="1.5" />
          <text x="55" y="160" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--on-accent)">
            Used
          </text>
          <text x="205" y="160" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--mint-bright)">
            Free Margin
          </text>
        </svg>
      </Reveal>
    </section>
  );
}
