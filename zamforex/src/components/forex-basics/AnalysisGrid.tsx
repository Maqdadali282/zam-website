import Link from "next/link";
import Reveal from "@/components/common/Reveal";

export default function AnalysisGrid() {
  return (
    <section id="analysis">
      <Reveal className="section-head">
        <div className="eyebrow">How Traders Decide</div>
        <h2>Technical vs fundamental analysis</h2>
      </Reveal>
      <Reveal className="analysis-grid">
        <Link
          href="/technical-analysis"
          className="analysis-card glow-card"
          style={{ display: "block", textDecoration: "none", color: "inherit" }}
        >
          <div className="icon">
            <svg viewBox="0 0 60 60">
              <path d="M8 46 L20 30 L32 38 L52 12" stroke="var(--mint)" strokeWidth="2.5" fill="none" />
              <line x1="8" y1="52" x2="52" y2="52" stroke="var(--muted)" strokeWidth="1.5" />
            </svg>
          </div>
          <h3>Technical Analysis</h3>
          <p>
            Studying price charts, patterns, and indicators (like moving
            averages or RSI) to predict where price is likely headed next —
            based purely on price behavior itself.
          </p>
        </Link>
        <Link
          href="/fundamental-analysis"
          className="analysis-card glow-card"
          style={{ display: "block", textDecoration: "none", color: "inherit" }}
        >
          <div className="icon">
            <svg viewBox="0 0 60 60">
              <rect x="10" y="14" width="40" height="32" rx="3" fill="none" stroke="var(--gold)" strokeWidth="2" />
              <line x1="16" y1="24" x2="44" y2="24" stroke="var(--gold)" strokeWidth="2" />
              <line x1="16" y1="32" x2="36" y2="32" stroke="var(--gold)" strokeWidth="2" />
            </svg>
          </div>
          <h3>Fundamental Analysis</h3>
          <p>
            Looking at the economic &quot;why&quot; behind price moves —
            interest rates, inflation, employment data, and central bank
            decisions that drive a currency&apos;s real value.
          </p>
        </Link>
      </Reveal>
    </section>
  );
}
