import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import LearningBreadcrumb from "@/components/forex-learning/LearningBreadcrumb";
import { getLearningSection } from "@/components/forex-learning/learningData";
import { FrameworksSection } from "@/components/home/CurriculumGrids";
import IctStrategySection from "@/components/frameworks/IctStrategySection";
import { COREPRIME_SIGNUP_URL } from "@/lib/affiliateLinks";

const section = getLearningSection("frameworks");

export const metadata: Metadata = {
  title: "Trading Frameworks | Zam Forex Learning",
  description:
    "Turn analysis into a system — the ICT (Inner Circle Trader) concepts, plus the risk management and process frameworks that keep you consistent when the market gets loud.",
};

export default function FrameworksPage() {
  return (
    <>
      <SiteNav variant="learning" />
      <LearningBreadcrumb current={section.name} />

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: section.accent, "--eyebrow-accent": section.accent } as CSSProperties}>
          Forex Learning · {section.difficulty}
        </div>
        <h1>{section.name}</h1>
        <p className="lead">
          Knowing what a chart is telling you isn&apos;t the same as knowing
          what to do about it. A framework is the bridge — fixed rules for
          position sizing, risk, entries, and exits that keep you consistent
          when the market gets loud and your emotions get louder. This is how
          discipline stops being a personality trait and becomes a process
          anyone can follow.
        </p>
      </div>

      <IctStrategySection />

      <Reveal className="market-pulse-banner" style={{ margin: "0 5% 40px", width: "auto" }}>
        <Image
          src="/assets/diary/candlestick-abstract-dark.jpg"
          alt="Abstract close-up of a candlestick chart against a dark background"
          fill
          sizes="(max-width: 900px) 100vw, 1200px"
          style={{ objectFit: "cover" }}
        />
        <div className="market-pulse-banner-text">
          <div className="eyebrow">Every Candle Tells a Story</div>
          <h3>The concepts above aren&apos;t theory — they&apos;re in every chart.</h3>
          <p>
            Liquidity, displacement, structure shifts — once you know what
            to look for, you&apos;ll see it everywhere.
          </p>
          <a className="btn btn-primary" href={COREPRIME_SIGNUP_URL} target="_blank" rel="noopener">
            Create Your Account →
          </a>
        </div>
      </Reveal>

      <FrameworksSection />

      <IbCtaBand
        heading="A framework only pays off once you trade it."
        body="Open a live account and put your risk rules, position sizing, and trading plan to work in the real market."
        learnMoreHref="/forex-learning/risk-management"
        learnMoreLabel="Review Risk Management"
      />

      <SiteFooter variant="learning" />
    </>
  );
}
