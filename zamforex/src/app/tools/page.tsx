import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/common/Reveal";
import IbCtaBand from "@/components/common/IbCtaBand";
import ToolsHeroVisual from "@/components/tools/ToolsHeroVisual";
import FeaturedToolCard from "@/components/tools/FeaturedToolCard";
import ToolCard from "@/components/tools/ToolCard";
import { TOOLS, TOOL_CATEGORIES } from "@/components/tools/toolsData";

export const metadata: Metadata = {
  title: "Forex Trading Tools | Zam Forex",
  description:
    "Position size, pip value, margin, lot size, profit, risk:reward, currency conversion and spread calculators — a complete Forex trading toolkit.",
};

const featured = TOOLS.filter((t) => t.featured);

export default function ToolsPage() {
  return (
    <>
      <SiteNav variant="tools" />

      <section className="tools-hero">
        <Reveal>
          <div className="eyebrow">Trading Toolkit</div>
          <h1>Forex Trading Tools</h1>
          <p className="lead">
            Powerful tools to help you calculate risk, position size, pip
            value, margin, profit potential, and more.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="#featured">
              Explore the Tools →
            </Link>
            <Link className="btn btn-ghost" href="/tools/position-size-calculator">
              Start with Position Size
            </Link>
          </div>
        </Reveal>
        <Reveal>
          <ToolsHeroVisual />
        </Reveal>
      </section>

      <section id="featured" className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow">Featured Tools</div>
          <h2>Start with the three every trader needs</h2>
          <p>
            Position sizing and risk:reward are the foundation of survival —
            profit projection is how you plan the trade before you take it.
          </p>
        </Reveal>
        <div className="featured-tools-grid">
          {featured.map((tool, i) => (
            <FeaturedToolCard tool={tool} key={tool.slug} index={i} />
          ))}
        </div>
      </section>

      <section className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow">Complete Toolkit</div>
          <h2>Every calculator, in one place</h2>
          <p>Eight tools covering every number you need before, during, and after a trade.</p>
        </Reveal>
        <div className="tool-grid">
          {TOOLS.map((tool, i) => (
            <ToolCard tool={tool} key={tool.slug} index={i} />
          ))}
        </div>
      </section>

      <section className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow">Tool Categories</div>
          <h2>Organized around how you actually trade</h2>
        </Reveal>
        <div className="tool-categories-grid">
          {TOOL_CATEGORIES.map((cat) => (
            <div className="tool-category-card" key={cat.name}>
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
              <ul>
                {TOOLS.filter((t) => t.category === cat.name).map((t) => (
                  <li key={t.slug}>
                    <Link href={`/tools/${t.slug}`}>{t.name} →</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow">Why These Numbers Matter</div>
          <h2>A calculator doesn&apos;t replace a plan — it protects one</h2>
        </Reveal>
        <div className="edu-grid">
          <div className="edu-block glow-card">
            <h3>Consistency Over Guesswork</h3>
            <p>
              Two trades with the same setup but wildly different position
              sizes aren&apos;t following the same plan — they&apos;re
              gambling twice. These tools exist to make your risk the one
              constant across every trade, so your results reflect your
              edge, not your mood.
            </p>
          </div>
          <div className="edu-block glow-card">
            <h3>Do the Math Before, Not After</h3>
            <p>
              Every calculator here is built to be used <i>before</i> you
              click buy or sell — position size before entry, risk:reward
              before commitment, margin before you find out the hard way.
              Checking the number after a loss doesn&apos;t help you; checking
              it before does.
            </p>
          </div>
        </div>
      </section>

      <section className="cat-section">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--red)", "--eyebrow-accent": "var(--red)" } as React.CSSProperties}>
            Risk Management First
          </div>
          <h2>No calculator can protect an account that risks too much</h2>
          <p>
            These tools help you size a position correctly — they can&apos;t
            decide your risk tolerance for you. A widely used starting point
            among disciplined traders is risking no more than 1–2% of an
            account on any single idea, regardless of how confident it feels.
          </p>
        </Reveal>
        <div className="edu-block edu-block--wide glow-card">
          <h3>Before You Use Any Calculator Here</h3>
          <ul className="edu-limitations">
            <li>Decide your maximum risk per trade as a percentage, not a dollar figure, so it scales with your account.</li>
            <li>Always set a stop loss before you calculate a position size around it — the calculator needs that distance to mean anything.</li>
            <li>Spreads, slippage, swap, and commissions all eat into these estimates — treat every result as an estimate, not a guarantee.</li>
            <li>Leverage changes margin requirements, not risk itself — the risk on a trade is set by your stop loss and position size, not your leverage.</li>
          </ul>
        </div>
      </section>

      <IbCtaBand
        heading="Put the numbers to work."
        body="You've done the math — now open a live account and trade with real spreads and execution behind it."
        learnMoreHref="/technical-analysis"
        learnMoreLabel="Explore Technical Analysis"
      />

      <SiteFooter variant="tools" />
    </>
  );
}
