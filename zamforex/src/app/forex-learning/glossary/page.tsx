import type { Metadata } from "next";
import type { CSSProperties } from "react";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import IbCtaBand from "@/components/common/IbCtaBand";
import GlossarySearch from "@/components/forex-learning/GlossarySearch";
import LearningBreadcrumb from "@/components/forex-learning/LearningBreadcrumb";
import { getLearningSection } from "@/components/forex-learning/learningData";

const section = getLearningSection("glossary");

export const metadata: Metadata = {
  title: "Forex Glossary | Zam Forex Learning",
  description:
    "A searchable, categorized glossary of forex terms — from pips and lots to drawdown and correlation — each with a simple definition, an example, and related concepts.",
};

export default function GlossaryPage() {
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
          Every term used across this academy, in one searchable place.
          Filter by category, jump straight to a letter, or just start
          typing.
        </p>
      </div>

      <section className="cat-section">
        <GlossarySearch />
      </section>

      <IbCtaBand
        heading="Found the term. Now see it in context."
        body="Every glossary entry belongs to a full lesson somewhere in this academy — the Beginner Guide is the fastest way to see how they all connect."
        learnMoreHref="/forex-learning/beginner-guide"
        learnMoreLabel="Start the Beginner Guide"
      />

      <SiteFooter variant="learning" />
    </>
  );
}
