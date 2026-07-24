import Reveal from "@/components/common/Reveal";

const glossary = [
  {
    term: "Hawkish / Dovish",
    desc: "Hawkish means a central bank leans toward raising rates (fighting inflation). Dovish means it leans toward cutting rates (supporting growth).",
  },
  {
    term: "Quantitative Easing (QE)",
    desc: "A central bank buying assets to pump money into the economy — usually weakens the currency by increasing its supply.",
  },
  {
    term: "CPI vs PPI",
    desc: "CPI tracks prices consumers pay; PPI tracks prices producers pay. PPI often moves first and can hint at where CPI is headed.",
  },
  {
    term: "Risk-On / Risk-Off",
    desc: "Risk-on: investors chase higher-yielding, riskier assets. Risk-off: investors flee to safe havens like USD, JPY, and CHF.",
  },
  {
    term: "Safe-Haven Currency",
    desc: "A currency (USD, JPY, CHF) that tends to strengthen during global uncertainty as capital seeks stability over yield.",
  },
  {
    term: "Central Bank Policy Statement",
    desc: "The written explanation accompanying a rate decision — often moves markets more than the rate decision itself.",
  },
];

export default function FundamentalGlossary() {
  return (
    <section id="fundamental-glossary">
      <Reveal className="section-head">
        <div className="eyebrow">Quick Reference</div>
        <h2>Fundamental analysis glossary</h2>
      </Reveal>
      <Reveal className="glossary-grid">
        {glossary.map((item) => (
          <div className="glossary-item" key={item.term}>
            <h4>{item.term}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
