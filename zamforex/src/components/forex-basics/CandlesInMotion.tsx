import Image from "next/image";
import Reveal from "@/components/common/Reveal";
import { COREPRIME_SIGNUP_URL } from "@/lib/affiliateLinks";

export default function CandlesInMotion() {
  return (
    <section id="candles-in-motion">
      <Reveal className="market-pulse-banner">
        <Image
          src="/assets/diary/candlestick-uptrend-closeup.jpg"
          alt="Close-up of a candlestick chart in a strong uptrend"
          fill
          sizes="(max-width: 900px) 100vw, 1200px"
          style={{ objectFit: "cover" }}
        />
        <div className="market-pulse-banner-text">
          <div className="eyebrow">From Theory to Chart</div>
          <h3>This is what a clean uptrend actually looks like.</h3>
          <p>
            Higher highs, higher lows, candle after candle — the same
            structure you&apos;ll learn to spot yourself in Technical
            Analysis.
          </p>
          <a className="btn btn-primary" href={COREPRIME_SIGNUP_URL} target="_blank" rel="noopener">
            Create Live Account →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
