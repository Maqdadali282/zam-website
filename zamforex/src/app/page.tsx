import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import TickerTape from "@/components/tradingview/TickerTape";
import Hero from "@/components/home/Hero";
import Promos from "@/components/home/Promos";
import WhyGrid from "@/components/home/WhyGrid";
import Testimonials from "@/components/home/Testimonials";
import MarketPulseSection from "@/components/home/MarketPulseSection";
import TradingPreview from "@/components/home/TradingPreview";
import ForexSessionsPreview from "@/components/home/ForexSessionsPreview";
import LearningPath from "@/components/home/LearningPath";
import ResultsMarquee from "@/components/home/ResultsMarquee";
import Faq from "@/components/home/Faq";
import CtaBand from "@/components/home/CtaBand";
import ScrollToTop from "@/components/home/ScrollToTop";

export default function Home() {
  return (
    <>
      <TickerTape />
      <SiteNav variant="home" />
      <Hero />
      <Promos />
      <WhyGrid />
      <Testimonials />
      <MarketPulseSection />
      <TradingPreview />
      <ForexSessionsPreview />
      <LearningPath />
      <ResultsMarquee />
      <Faq />
      <CtaBand />
      <ScrollToTop />
      <SiteFooter variant="home" />
    </>
  );
}
