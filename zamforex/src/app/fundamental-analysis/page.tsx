import type { Metadata } from "next";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import FundamentalHero from "@/components/fundamental-analysis/FundamentalHero";
import WhatIsFundamental from "@/components/fundamental-analysis/WhatIsFundamental";
import MacroFlowSection from "@/components/fundamental-analysis/MacroFlowSection";
import FundamentalRoadmap from "@/components/fundamental-analysis/FundamentalRoadmap";
import FundamentalExample from "@/components/fundamental-analysis/FundamentalExample";
import FundamentalGlossary from "@/components/fundamental-analysis/FundamentalGlossary";
import FundamentalCtaBand from "@/components/fundamental-analysis/FundamentalCtaBand";

export const metadata: Metadata = {
  title: "Fundamental Analysis Academy | Zam Forex",
  description:
    "An interactive Forex fundamental analysis academy — central banks, interest rates, inflation, employment, GDP, the economic calendar, market expectations, risk sentiment, geopolitics, commodities, and currency strength.",
};

export default function FundamentalAnalysisPage() {
  return (
    <>
      <SiteNav variant="fundamental" />
      <FundamentalHero />
      <WhatIsFundamental />
      <MacroFlowSection />
      <FundamentalRoadmap />
      <FundamentalExample />
      <FundamentalGlossary />
      <FundamentalCtaBand />
      <SiteFooter variant="fundamental" />
    </>
  );
}
