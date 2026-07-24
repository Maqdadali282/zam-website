import Link from "next/link";
import Reveal from "@/components/common/Reveal";
import { AURUM_SIGNUP_URL } from "@/lib/affiliateLinks";

export default function FundamentalCtaBand() {
  return (
    <Reveal className="cta-band">
      <h2>Now pair it with the chart.</h2>
      <p>
        Fundamentals tell you <i>why</i> price should move. Technical
        analysis tells you <i>where</i> and <i>when</i> to act on it.
      </p>
      <div className="hero-ctas">
        <Link className="btn btn-primary" href="/technical-analysis">
          📊 Learn Technical Analysis →
        </Link>
        <a
          className="btn btn-ghost"
          href={AURUM_SIGNUP_URL}
          target="_blank"
          rel="noopener"
        >
          🚀 Start Trading Now
        </a>
      </div>
    </Reveal>
  );
}
