import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import DataReleaseCard from "@/components/fundamental-analysis/DataReleaseCard";
import EconomicCycleWheel from "@/components/fundamental-analysis/EconomicCycleWheel";
import ConceptAccordion from "@/components/technical-analysis/ConceptAccordion";
import { employmentConcepts, growthConcepts } from "@/components/fundamental-analysis/employmentGrowthConcepts";

export const metadata: Metadata = {
  title: "Employment & Economic Growth | Zam Forex",
  description:
    "Learn Non-Farm Payrolls, the unemployment rate, wage growth and jobless claims, plus GDP, GDP growth, recession and expansion — with live previous/forecast/actual data cards.",
};

export default function EmploymentGrowthPage() {
  return (
    <>
      <SiteNav variant="fundamental" />

      <div className="ta-breadcrumb">
        <Link href="/fundamental-analysis">Fundamental Analysis Academy</Link>
        <span>/</span>
        <span>Employment &amp; Economic Growth</span>
      </div>

      <div className="ta-page-head">
        <div className="eyebrow" style={{ color: "var(--cat-7)", "--eyebrow-accent": "var(--cat-7)" } as CSSProperties}>
          Category 04–05 · Foundation
        </div>
        <h1>Employment &amp; Economic Growth</h1>
        <p className="lead">
          Full employment and healthy growth are the other half of most
          central bank mandates, alongside price stability. This is the data
          that tells you how the underlying economy is actually doing.
        </p>
      </div>

      <div className="toc-pills" style={{ marginBottom: "8px" }}>
        <Link href="#employment" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-7)" }} />
          Employment
        </Link>
        <Link href="#growth" className="toc-pill">
          <span className="toc-dot" style={{ background: "var(--cat-3)" }} />
          Economic Growth
        </Link>
      </div>

      <section id="employment" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-7)", "--eyebrow-accent": "var(--cat-7)" } as CSSProperties}>
            Reading a Data Release
          </div>
          <h2>Previous, Forecast &amp; Actual</h2>
          <p>
            Every labor market release compares against what was expected —
            here&apos;s what a strong Non-Farm Payrolls beat looks like next
            to a soft unemployment print.
          </p>
        </Reveal>

        <div className="term-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <DataReleaseCard title="Non-Farm Payrolls" unit="K" previous={180} forecast={200} actual={285} color="var(--cat-7)" />
          <DataReleaseCard title="Unemployment Rate" unit="%" previous={4.1} forecast={4.0} actual={3.8} color="var(--cat-7)" lowerIsBetter />
        </div>

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={employmentConcepts} />
        </div>
      </section>

      <section id="growth" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--cat-3)", "--eyebrow-accent": "var(--cat-3)" } as CSSProperties}>
            Interactive Cycle
          </div>
          <h2>The Economic Growth Cycle</h2>
          <p>
            Every economy moves through the same four phases — click a stage
            or let it auto-advance to see where policy typically responds.
          </p>
        </Reveal>

        <EconomicCycleWheel />

        <div style={{ marginTop: "40px" }}>
          <ConceptAccordion items={growthConcepts} />
        </div>
      </section>

      <IbCtaBand
        heading="Now put every release on one calendar."
        body="Next up: reading a professional economic calendar — dates, impact levels, and how to spot a real surprise."
        learnMoreHref="/fundamental-analysis"
        learnMoreLabel="← Back to the Academy"
      />

      <SiteFooter variant="fundamental" />
    </>
  );
}
