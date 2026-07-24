import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/common/Reveal";
import { AURUM_SIGNUP_URL } from "@/lib/affiliateLinks";

export default function MarketPulseSection() {
  return (
    <section id="market-pulse">
      <Reveal className="app-preview">
        <div>
          <div className="eyebrow">Live Markets</div>
          <h2>The Market Never Sleeps. Neither Does Your Edge.</h2>
          <p className="lead">
            Behind every candle on a chart is a real, moving market —
            Sydney handing off to Tokyo, Tokyo to London, London to New
            York. This is what that looks like in motion, and it&apos;s
            exactly what our Markets dashboard tracks live, 24 hours a day.
          </p>
          <ul className="app-preview-points">
            <li>Watch price actually move instead of reading about it after the fact</li>
            <li>The same data feeds our live Economic Calendar and Heat Map</li>
            <li>Pair what you see here with our Technical Analysis academy to read it yourself</li>
          </ul>
          <Link className="btn btn-primary" href="/markets">
            Explore Live Markets →
          </Link>
        </div>
        <div className="diary-video-media">
          <video
            src="/assets/diary/home-market-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Looping footage of live market charts in motion"
          />
        </div>
      </Reveal>

      <Reveal className="market-pulse-banner" style={{ marginTop: "40px" }}>
        <Image
          src="/assets/diary/trader-screen-presentation.jpg"
          alt="A trader reviewing live market charts on a large screen"
          fill
          sizes="(max-width: 900px) 100vw, 1200px"
          style={{ objectFit: "cover" }}
        />
        <div className="market-pulse-banner-text">
          <div className="eyebrow">Real Traders. Real Discipline.</div>
          <h3>Reading a chart is a skill — we teach it step by step.</h3>
          <p>
            No shortcuts, no signal-selling. Just the same structured
            process real traders use, broken down so anyone can learn it.
          </p>
          <a className="btn btn-primary" href={AURUM_SIGNUP_URL} target="_blank" rel="noopener">
            Start Your Journey →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
