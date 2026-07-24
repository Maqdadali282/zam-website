import Link from "next/link";
import StatCounter from "@/components/home/StatCounter";
import AnimatedCandleChart from "./AnimatedCandleChart";

export default function TAHero() {
  return (
    <div className="hero" id="top">
      <div>
        <div className="eyebrow">Technical Analysis Academy</div>
        <h1>
          Master the <span className="line2">Language of Price</span>
        </h1>
        <p className="lead">
          Understand how price moves, where liquidity exists, and how traders
          identify potential market opportunities using technical analysis.
        </p>
        <div className="hero-ctas">
          <Link className="btn btn-primary" href="#roadmap">
            📈 Explore the Roadmap
          </Link>
          <Link className="btn btn-ghost" href="/technical-analysis/market-structure">
            Start with Market Structure →
          </Link>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <StatCounter value="11" className="num" />
            <span className="lbl">Core Concept Groups</span>
          </div>
          <div className="stat">
            <StatCounter value="7" className="num" />
            <span className="lbl">Interactive Lessons</span>
          </div>
          <div className="stat">
            <StatCounter value="50+" className="num" />
            <span className="lbl">Visual Diagrams</span>
          </div>
        </div>
      </div>

      <div className="chart-panel glow-card">
        <div className="tv-note">
          <span>Live-drawn candle sequence — hover any candle for its OHLC</span>
          <span>XAU/USD · Illustrative</span>
        </div>
        <AnimatedCandleChart />
      </div>
    </div>
  );
}
