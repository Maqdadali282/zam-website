import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import IbCtaBand from "@/components/common/IbCtaBand";
import FaqSearch from "@/components/faq/FaqSearch";

export const metadata: Metadata = {
  title: "FAQ | Zam Forex",
  description:
    "Answers to common questions about Forex trading concepts, ZamForex's tools and live market data, and how our education platform and broker partnerships work.",
};

export default function FaqPage() {
  return (
    <>
      <SiteNav variant="more" />

      <div className="ta-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>FAQ</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow">Support</div>
        <h1>Frequently Asked Questions</h1>
        <p className="lead">
          Straight answers about trading concepts, our tools, live market
          data, and how ZamForex actually works.
        </p>
      </div>

      <section className="cat-section">
        <FaqSearch />
      </section>

      <IbCtaBand
        heading="Ready to put this into practice?"
        body="Our Forex Learning hub turns these answers into full lessons — from the basics to advanced strategy — and our tools help you size every trade correctly."
        learnMoreHref="/forex-learning"
        learnMoreLabel="Explore Forex Learning"
      />

      <SiteFooter variant="more" />
    </>
  );
}
