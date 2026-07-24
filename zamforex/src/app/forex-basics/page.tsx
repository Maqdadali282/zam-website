import type { Metadata } from "next";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import BasicsHero from "@/components/forex-basics/BasicsHero";
import TermGrid from "@/components/forex-basics/TermGrid";
import AccountTerms from "@/components/forex-basics/AccountTerms";
import CandlestickSection from "@/components/forex-basics/CandlestickSection";
import CandlesInMotion from "@/components/forex-basics/CandlesInMotion";
import SupportResistanceSection from "@/components/forex-basics/SupportResistanceSection";
import OrderTypesSection from "@/components/forex-basics/OrderTypesSection";
import AnalysisGrid from "@/components/forex-basics/AnalysisGrid";
import GlossaryGrid from "@/components/forex-basics/GlossaryGrid";
import BasicsCtaBand from "@/components/forex-basics/BasicsCtaBand";

export const metadata: Metadata = {
  title: "Forex Basics for Beginners | Zam Forex",
  description:
    "Learn forex trading from scratch — currency pairs, pips, lots, leverage, spreads, candlesticks, support & resistance, order types, and more, explained simply with diagrams.",
};

export default function ForexBasicsPage() {
  return (
    <>
      <SiteNav variant="basics" />
      <BasicsHero />
      <TermGrid />
      <AccountTerms />
      <CandlestickSection />
      <CandlesInMotion />
      <SupportResistanceSection />
      <OrderTypesSection />
      <AnalysisGrid />
      <GlossaryGrid />
      <BasicsCtaBand />
      <SiteFooter variant="basics" />
    </>
  );
}
