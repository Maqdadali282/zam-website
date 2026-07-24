import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import ForexLearningHero from "@/components/forex-learning/ForexLearningHero";
import LearningPathSection from "@/components/forex-learning/LearningPathSection";
import ExistingContentSection from "@/components/forex-learning/ExistingContentSection";
import NewLearningGrid from "@/components/forex-learning/NewLearningGrid";
import { AURUM_SIGNUP_URL } from "@/lib/affiliateLinks";

export const metadata: Metadata = {
  title: "Forex Learning Hub | Zam Forex",
  description:
    "A complete Forex education hub — Forex Basics, Technical Analysis, Fundamental Analysis, Trading Psychology, Risk Management, Trading Strategies, a searchable Glossary, and Beginner and Advanced guides.",
};

export default function ForexLearningPage() {
  return (
    <>
      <SiteNav variant="learning" />
      <ForexLearningHero />
      <LearningPathSection />
      <ExistingContentSection />
      <NewLearningGrid />

      <Reveal className="market-pulse-banner" style={{ margin: "0 5% 40px", width: "auto" }}>
        <Image
          src="/assets/diary/tablet-chart-analysis.jpg"
          alt="Annotating a live chart with a stylus on a tablet"
          fill
          sizes="(max-width: 900px) 100vw, 1200px"
          style={{ objectFit: "cover" }}
        />
        <div className="market-pulse-banner-text">
          <div className="eyebrow">Learn It, Then Mark It Up</div>
          <h3>The goal isn&apos;t to memorize lessons — it&apos;s to read charts.</h3>
          <p>
            Every academy here is built so you can put a name to what
            you&apos;re seeing, then find it yourself on the next chart.
          </p>
          <a className="btn btn-primary" href={AURUM_SIGNUP_URL} target="_blank" rel="noopener">
            Join Trading Today →
          </a>
        </div>
      </Reveal>

      <IbCtaBand
        heading="Knowledge is only half the job."
        body="Pair what you learn here with a live account — size your position, check risk:reward, and trade it while it's fresh."
        learnMoreHref="/forex-learning/beginner-guide"
        learnMoreLabel="Start the Beginner Guide"
      />

      <SiteFooter variant="learning" />
    </>
  );
}
