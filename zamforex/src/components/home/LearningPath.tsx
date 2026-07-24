import Link from "next/link";
import Reveal from "@/components/common/Reveal";

const stages = [
  {
    stage: "STAGE 01",
    title: "Forex Basics",
    text: "Pips, lots, leverage, and how currency pairs actually move.",
    href: "/forex-basics",
    cta: "Start here →",
  },
  {
    stage: "STAGE 02",
    title: "Fundamental Analysis",
    text: "Reading economic data, news events, and central bank policy.",
    href: "/fundamental-analysis",
    cta: "Explore →",
  },
  {
    stage: "STAGE 03",
    title: "Technical Analysis",
    text: "Charts, price action, indicators, and market structure.",
    href: "/technical-analysis",
    cta: "Explore →",
  },
  {
    stage: "STAGE 04",
    title: "Trading Frameworks",
    text: "Turning analysis into a repeatable, rules-based system.",
    href: "/forex-learning/frameworks",
    cta: "Explore →",
  },
  {
    stage: "STAGE 05",
    title: "Choosing a Broker",
    text: "What actually matters — spreads, execution, regulation, and support.",
    href: "/best-brokers",
    cta: "Explore →",
  },
];

export default function LearningPath() {
  return (
    <section id="basics">
      <Reveal className="section-head">
        <div className="eyebrow">Curriculum</div>
        <h2>Your learning path</h2>
        <p>
          Structured the way real trading skill is built — in order, each
          stage compounding on the last.
        </p>
      </Reveal>
      <Reveal className="path">
        {stages.map((s) => (
          <Link className="path-row glow-card" href={s.href} key={s.stage}>
            <div className="stage">{s.stage}</div>
            <div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
            <div className="go">{s.cta}</div>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
