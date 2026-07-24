import AdvancedChart from "@/components/tradingview/AdvancedChart";
import StatCounter from "@/components/home/StatCounter";
import { AURUM_SIGNUP_URL } from "@/lib/affiliateLinks";

const WHATSAPP_URL =
  "https://chat.whatsapp.com/FgXc5L2unIiHiEN5koSfRR?mode=ems_wa_t";

export default function Hero() {
  return (
    <div className="hero" id="home">
      <div>
        <div className="eyebrow">Forex Education, From Zero to Execution</div>
        <h1>
          Precision Over
          <br />
          <span className="line2">Prediction.</span>
        </h1>
        <p className="lead">
          Your gateway to global forex markets — clear education, honest
          mentorship, and real-time tools, built for traders who want to
          understand the &quot;why,&quot; not just copy signals.
        </p>
        <div className="hero-ctas">
          <a
            className="btn btn-primary"
            href={AURUM_SIGNUP_URL}
            target="_blank"
            rel="noopener"
          >
            🚀 Start Trading Now
          </a>
          <a
            className="btn btn-ghost"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
          >
            💬 Join Our Community
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <StatCounter value="1000+" className="num" />
            <span className="lbl">Traders Guided</span>
          </div>
          <div className="stat">
            <StatCounter value="150+" className="num" />
            <span className="lbl">Currency Pairs</span>
          </div>
          <div className="stat">
            <StatCounter value="24/7" className="num" />
            <span className="lbl">Market Access</span>
          </div>
        </div>
      </div>

      <div className="chart-panel glow-card">
        <div className="tv-note">
          <span>
            Live chart — use the watchlist tab for majors, minors, cross
            pairs, metals, oil, gas &amp; DAX30
          </span>
          <span>Use the interval bar for M1 – Monthly</span>
        </div>
        <AdvancedChart />
      </div>
    </div>
  );
}
