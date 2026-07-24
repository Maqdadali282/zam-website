import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import CentralBankGrid from "@/components/fundamental-analysis/CentralBankGrid";
import HawkishDovishFlow from "@/components/fundamental-analysis/HawkishDovishFlow";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { centralBankConcepts, policyStanceConcepts } from "@/components/fundamental-analysis/centralBankConcepts";

export const metadata: Metadata = {
  title: "Central Banks & Monetary Policy | Zam Forex",
  description:
    "Learn how the Fed, ECB, BoE, BoJ, RBA, BoC, SNB and RBNZ set monetary policy, what hawkish and dovish mean, and how QE/QT and forward guidance move currencies.",
};

export default function CentralBanksPage() {
  return (
    <>
      <SiteNav variant="fundamental" />

      <div className="ta-breadcrumb">
        <Link href="/fundamental-analysis">Fundamental Analysis Academy</Link>
        <span>/</span>
        <span>Central Banks &amp; Monetary Policy</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: "var(--cat-1)", "--eyebrow-accent": "var(--cat-1)" } as CSSProperties}>
          Category 01 · Foundation
        </div>
        <h1>Central Banks &amp; Monetary Policy</h1>
        <p className="lead">
          Almost every fundamental catalyst eventually routes back to one
          question: what will the central bank do next? Start here, and the
          rest of this academy will make a lot more sense.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#banks" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-1)" }} />
          Central Banks of the World
        </Link>
        <Link href="#policy" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cyan)" }} />
          Monetary Policy
        </Link>
      </div>

      <section id="banks" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-1)", "--eyebrow-accent": "var(--cat-1)" } as CSSProperties}>
            The Eight Majors
          </div>
          <h2>Who actually sets the price of money</h2>
          <p>
            Every major currency has one institution behind it deciding the
            cost of borrowing — here&apos;s who to watch for each.
          </p>
        </Reveal>

        <CentralBankGrid />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={centralBankConcepts} />
        </div>
      </section>

      <section id="policy" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cyan)", "--eyebrow-accent": "var(--cyan)" } as CSSProperties}>
            Interactive Flow
          </div>
          <h2>Hawkish vs. Dovish — the whole chain in one glance</h2>
          <p>
            Toggle between the two policy stances to see how the same logic
            chain plays out in opposite directions.
          </p>
        </Reveal>

        <HawkishDovishFlow />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={policyStanceConcepts} />
        </div>
      </section>

      <IbCtaBand
        heading="Policy sets the direction. Rates and inflation set the size."
        body="Next up: how interest rate decisions and inflation data actually get made — and read — in real time."
        learnMoreHref="/fundamental-analysis"
        learnMoreLabel="← Back to the Academy"
      />

      <SiteFooter variant="fundamental" />
    </>
  );
}
