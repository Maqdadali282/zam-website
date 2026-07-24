import Reveal from "@/components/common/Reveal";

const glossary = [
  {
    term: "Volatility",
    desc: "How fast and how much a price moves. High volatility = bigger, faster swings (and bigger risk).",
  },
  {
    term: "Margin Call",
    desc: "A warning from your broker that your account no longer has enough funds to keep a losing trade open.",
  },
  {
    term: "Drawdown",
    desc: "The drop from your account's highest value down to its current value — a key measure of risk.",
  },
  {
    term: "Demo vs Live Account",
    desc: "A demo account uses fake money to practice risk-free. A live account trades with real funds.",
  },
  {
    term: "Economic Calendar",
    desc: "A schedule of upcoming news events (interest rate decisions, jobs reports) that tend to move the market.",
  },
  {
    term: "Broker & Trading Platform",
    desc: "A broker gives you market access; the platform (like MT4/MT5) is the software you use to place trades.",
  },
  {
    term: "Swap / Rollover",
    desc: "A small interest fee (or credit) applied when you hold a position open overnight.",
  },
  {
    term: "Major, Minor & Exotic Pairs",
    desc: "Majors involve USD (EUR/USD); minors don't (EUR/GBP); exotics pair a major with an emerging-market currency (USD/TRY).",
  },
];

export default function GlossaryGrid() {
  return (
    <section id="glossary">
      <Reveal className="section-head">
        <div className="eyebrow">Quick Reference</div>
        <h2>A few more terms you&apos;ll run into</h2>
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
