import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import TAHero from "@/components/technical-analysis/TAHero";
import RoadmapSection from "@/components/technical-analysis/RoadmapSection";
import { AURUM_SIGNUP_URL } from "@/lib/affiliateLinks";

export const metadata: Metadata = {
  title: "Technical Analysis Academy | Zam Forex",
  description:
    "An interactive Forex technical analysis academy — market structure, support & resistance, supply & demand, liquidity, order blocks, candlesticks, indicators, and Fibonacci, all with visual diagrams.",
};

export default function TechnicalAnalysisPage() {
  return (
    <>
      <SiteNav variant="technical" />
      <TAHero />
      <RoadmapSection />

      <Reveal className="market-pulse-banner" style={{ margin: "0 5% 40px", width: "auto" }}>
        <Image
          src="/assets/diary/technical-chart-annotated.jpg"
          alt="A trading chart annotated with trendlines and support and resistance levels"
          fill
          sizes="(max-width: 900px) 100vw, 1200px"
          style={{ objectFit: "cover" }}
        />
        <div className="market-pulse-banner-text">
          <div className="eyebrow">Read The Chart Yourself</div>
          <h3>Every line drawn here has a name and a reason.</h3>
          <p>
            Trendlines, levels, and structure aren&apos;t guesswork — this
            academy teaches you to mark them up with the same logic.
          </p>
          <a className="btn btn-primary" href={AURUM_SIGNUP_URL} target="_blank" rel="noopener">
            Start Trading Now →
          </a>
        </div>
      </Reveal>

      <IbCtaBand
        heading="Ready to see it on a live chart?"
        body="Every lesson here pairs a plain-English explanation with a chart you can read — open a live account so you can act on it the moment it clicks."
        learnMoreHref="/technical-analysis/market-structure"
        learnMoreLabel="Start Learning"
      />

      <SiteFooter variant="technical" />
    </>
  );
}
