import Reveal from "@/components/common/Reveal";
import FlowChain from "@/components/fundamental-analysis/FlowChain";

const steps = [
  { eyebrow: "START", title: "Forex Basics", sub: "Pips, lots, leverage, pairs", color: "var(--mint)" },
  { eyebrow: "LEARN", title: "Technical Analysis", sub: "Charts, structure, indicators", color: "var(--cat-1)" },
  { eyebrow: "LEARN", title: "Fundamental Analysis", sub: "Rates, data, central banks", color: "var(--gold)" },
  { eyebrow: "UNDERSTAND", title: "Risk Management", sub: "Position size, stop loss", color: "var(--red)" },
  { eyebrow: "UNDERSTAND", title: "Trading Psychology", sub: "Discipline over emotion", color: "var(--cat-5)" },
  { eyebrow: "PRACTICE", title: "Trading Strategies", sub: "Applying an edge live", color: "var(--cat-3)" },
  { eyebrow: "IMPROVE", title: "Advanced Learning", sub: "Backtesting, performance", color: "var(--cat-7)" },
];

export default function LearningPathSection() {
  return (
    <section id="learning-path" className="cat-section">
      <Reveal className="section-head">
        <div className="eyebrow">Your Learning Path</div>
        <h2>Start → Learn → Understand → Practice → Improve</h2>
        <p>
          Every stage compounds on the one before it — this is the order
          real trading skill actually gets built in, not just a list of
          topics.
        </p>
      </Reveal>
      <FlowChain steps={steps} />
    </section>
  );
}
