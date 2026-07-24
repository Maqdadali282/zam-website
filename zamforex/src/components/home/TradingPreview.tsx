import Image from "next/image";
import Reveal from "@/components/common/Reveal";
import { AURUM_SIGNUP_URL } from "@/lib/affiliateLinks";

export default function TradingPreview() {
  return (
    <section id="trading-preview">
      <Reveal className="app-preview">
        <div>
          <div className="eyebrow">Trade Anywhere</div>
          <h2>Your Entire Trading Desk, In Your Pocket</h2>
          <p className="lead">
            Every strategy you learn on Zam Forex is only as good as your
            ability to execute it. Our platform brings institutional-grade
            pricing, one-tap order execution, and transparent risk metrics
            straight to your phone — so you can act on a setup the moment it
            forms, not twenty minutes later at your desk.
          </p>
          <ul className="app-preview-points">
            <li>Live bid/ask spreads across 30+ currency pairs, updated in real time</li>
            <li>See your required margin and pip value before you place a single trade</li>
            <li>Set your Stop Loss and Take Profit in the same screen you execute from</li>
          </ul>
          <a
            className="btn btn-primary"
            href={AURUM_SIGNUP_URL}
            target="_blank"
            rel="noopener"
          >
            🚀 Start Trading Now
          </a>
        </div>
        <div className="app-preview-media glow-card">
          <Image
            src="/assets/home/trading-app-preview.png"
            alt="Zam Forex trading app showing a live watchlist and EUR/USD trade ticket"
            width={1008}
            height={1062}
            sizes="(max-width: 900px) 80vw, 360px"
          />
        </div>
      </Reveal>
    </section>
  );
}
