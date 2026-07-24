import Reveal from "@/components/common/Reveal";
import FlowChain from "./FlowChain";

const steps = [
  { eyebrow: "01", title: "Economic Data", sub: "CPI, NFP, GDP, PMI releases", color: "var(--gold)" },
  { eyebrow: "02", title: "Central Bank Expectations", sub: "Hawkish or dovish reaction", color: "var(--cat-1)" },
  { eyebrow: "03", title: "Interest Rate Expectations", sub: "Hike, hold, or cut priced in", color: "var(--mint)" },
  { eyebrow: "04", title: "Currency Demand", sub: "Yield-seeking capital flows", color: "var(--cyan)" },
  { eyebrow: "05", title: "Forex Price Movement", sub: "The chart reacts, last", color: "var(--red)" },
];

export default function MacroFlowSection() {
  return (
    <section id="macro-flow" className="cat-section">
      <Reveal className="section-head">
        <div className="eyebrow">The Core Logic Chain</div>
        <h2>Every currency move starts as a number on a screen</h2>
        <p>
          The chart is always the last thing to move — everything above it
          happens first. This is the chain fundamental analysis exists to
          read.
        </p>
      </Reveal>

      <FlowChain steps={steps} />
    </section>
  );
}
