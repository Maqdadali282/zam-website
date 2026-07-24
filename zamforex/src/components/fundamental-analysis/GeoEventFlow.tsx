import FlowChain from "./FlowChain";

const steps = [
  { eyebrow: "01", title: "Global Event", sub: "Election, conflict, sanctions, trade dispute", color: "var(--cat-8)" },
  { eyebrow: "02", title: "Economic Impact", sub: "Trade routes, energy prices, growth outlook", color: "var(--cat-2)" },
  { eyebrow: "03", title: "Market Sentiment", sub: "Risk-on or risk-off mood shifts", color: "var(--gold)" },
  { eyebrow: "04", title: "Currency Movement", sub: "Safe havens or commodity currencies react", color: "var(--mint)" },
];

export default function GeoEventFlow() {
  return <FlowChain steps={steps} />;
}
