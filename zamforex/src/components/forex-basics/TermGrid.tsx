import Reveal from "@/components/common/Reveal";

const terms = [
  {
    title: "Currency Pair",
    desc: "Forex is always traded in pairs, because you're buying one currency while selling another at the same time.",
    example: "e.g. EUR/USD, GBP/JPY",
    icon: (
      <svg viewBox="0 0 60 60">
        <circle cx="22" cy="30" r="16" fill="none" stroke="var(--mint)" strokeWidth="2.5" />
        <circle cx="38" cy="30" r="16" fill="none" stroke="var(--gold)" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    title: "Base & Quote Currency",
    desc: 'In EUR/USD, EUR is the "base" currency (the one you\'re buying/selling) and USD is the "quote" currency (what it\'s priced in).',
    example: "EUR/USD → EUR is base, USD is quote",
    icon: (
      <svg viewBox="0 0 60 60">
        <text x="8" y="26" fontFamily="var(--font-mono)" fontSize="13" fill="var(--mint)">
          BASE
        </text>
        <path d="M10 34 L50 34" stroke="var(--text)" strokeWidth="2" />
        <text x="8" y="50" fontFamily="var(--font-mono)" fontSize="13" fill="var(--gold)">
          QUOTE
        </text>
      </svg>
    ),
  },
  {
    title: "Exchange Rate",
    desc: "The price of one currency expressed in terms of another — how much of the quote currency you need to buy one unit of the base currency.",
    example: "EUR/USD 1.0850 = 1 EUR costs 1.0850 USD",
    icon: (
      <svg viewBox="0 0 60 60">
        <rect x="8" y="24" width="44" height="18" rx="4" fill="none" stroke="var(--gold)" strokeWidth="2" />
        <text x="30" y="37" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--gold)">
          1.0850
        </text>
      </svg>
    ),
  },
  {
    title: "Bid, Ask & Spread",
    desc: 'The "bid" is the price you can sell at; the "ask" is the price you can buy at. The tiny gap between them is the spread — the broker\'s built-in fee.',
    example: "Bid 1.0848 / Ask 1.0850 = 2 pip spread",
    icon: (
      <svg viewBox="0 0 60 60">
        <rect x="6" y="18" width="20" height="14" rx="3" fill="none" stroke="var(--red)" strokeWidth="2" />
        <text x="16" y="28" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--red)">
          BID
        </text>
        <rect x="34" y="18" width="20" height="14" rx="3" fill="none" stroke="var(--mint)" strokeWidth="2" />
        <text x="44" y="28" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--mint)">
          ASK
        </text>
      </svg>
    ),
  },
  {
    title: "Pip & Pipette",
    desc: "A pip is the smallest standard price move a pair makes — usually the 4th decimal place. A pipette is one-tenth of a pip (the 5th decimal), used for extra-precise pricing.",
    example: "1.08500 → 1.08501 = 1 pipette · 1.0850 → 1.0851 = 1 pip",
    icon: (
      <svg viewBox="0 0 60 60">
        <path d="M6 40 L54 40" stroke="var(--muted)" strokeWidth="1.5" />
        <path d="M20 34 L20 46" stroke="var(--mint)" strokeWidth="2" />
        <path d="M40 34 L40 46" stroke="var(--mint)" strokeWidth="2" />
        <path d="M20 34 L40 20" stroke="var(--gold)" strokeWidth="2" markerEnd="url(#pipArrow)" />
        <defs>
          <marker id="pipArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--gold)" />
          </marker>
        </defs>
      </svg>
    ),
  },
  {
    title: "Lot, Standard, Mini & Micro Lot",
    desc: 'A "lot" is the size of your trade. Standard, mini, and micro lots control exactly how much currency — and how much money — is actually on the line.',
    example: "Standard = 100,000 · Mini = 10,000 · Micro = 1,000 units",
    icon: (
      <svg viewBox="0 0 60 60">
        <rect x="8" y="42" width="10" height="8" fill="var(--mint)" />
        <rect x="24" y="30" width="10" height="20" fill="var(--mint)" />
        <rect x="40" y="12" width="10" height="38" fill="var(--gold)" />
      </svg>
    ),
  },
  {
    title: "Leverage",
    desc: "Borrowed buying power from your broker that lets you control a large position with a much smaller deposit. It multiplies both potential profit and potential loss.",
    example: "100:1 leverage → $100 controls $10,000",
    icon: (
      <svg viewBox="0 0 60 60">
        <path d="M10 30 L50 30" stroke="var(--text)" strokeWidth="3" />
        <circle cx="30" cy="30" r="5" fill="var(--gold)" />
        <rect x="6" y="42" width="12" height="8" fill="var(--mint)" />
        <rect x="42" y="16" width="12" height="8" fill="var(--gold)" />
      </svg>
    ),
  },
  {
    title: "Buy & Sell / Long & Short",
    desc: '"Buy" (going long) means you expect the price to rise. "Sell" (going short) means you expect it to fall — you can profit from prices dropping too.',
    example: "Long = betting up · Short = betting down",
    icon: (
      <svg viewBox="0 0 60 60">
        <path d="M18 46 L18 16" stroke="var(--mint)" strokeWidth="3" markerEnd="url(#upArr)" />
        <path d="M42 16 L42 46" stroke="var(--red)" strokeWidth="3" markerEnd="url(#downArr)" />
        <defs>
          <marker id="upArr" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
            <path d="M0,6 L4,0 L8,6 Z" fill="var(--mint)" />
          </marker>
          <marker id="downArr" markerWidth="8" markerHeight="8" refX="4" refY="0" orient="auto">
            <path d="M0,0 L4,6 L8,0 Z" fill="var(--red)" />
          </marker>
        </defs>
      </svg>
    ),
  },
  {
    title: "Open & Close Position",
    desc: '"Opening" a position is entering a trade. "Closing" it is exiting — either manually, or automatically via your Stop Loss/Take Profit.',
    example: "Open at 1.0850 → Close at 1.0900 = profit",
    icon: (
      <svg viewBox="0 0 60 60">
        <circle cx="18" cy="30" r="9" fill="none" stroke="var(--mint)" strokeWidth="2.5" />
        <path d="M30 30 L42 30" stroke="var(--muted)" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="42" cy="30" r="9" fill="var(--red)" opacity="0.85" />
      </svg>
    ),
  },
  {
    title: "Stop Loss (SL) & Take Profit (TP)",
    desc: "A Stop Loss automatically closes a losing trade before it gets worse. A Take Profit automatically locks in gains once price hits your target.",
    example: "Protects your account while you're away from the screen",
    icon: (
      <svg viewBox="0 0 60 60">
        <path d="M10 40 L20 26 L30 34 L50 14" stroke="var(--mint)" strokeWidth="2.5" fill="none" />
        <circle cx="30" cy="34" r="4" fill="var(--red)" />
        <circle cx="46" cy="18" r="4" fill="var(--gold)" />
      </svg>
    ),
  },
  {
    title: "Margin & Margin Call",
    desc: "Margin is the deposit your broker sets aside to open a leveraged position. If losses eat into it too far, you'll get a margin call — or the broker starts closing trades automatically.",
    example: "Margin level drops below 100% → margin call",
    icon: (
      <svg viewBox="0 0 60 60">
        <rect x="10" y="14" width="14" height="36" rx="2" fill="none" stroke="var(--mint)" strokeWidth="2" />
        <rect x="12" y="30" width="10" height="18" fill="var(--mint)" opacity="0.85" />
        <path d="M28 22 L52 22" stroke="var(--red)" strokeWidth="2" strokeDasharray="3 3" />
        <text x="52" y="18" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" fill="var(--red)">
          CALL
        </text>
      </svg>
    ),
  },
  {
    title: "Swap / Rollover",
    desc: "The interest paid or earned for holding a position open overnight, based on the interest-rate difference between the two currencies in the pair.",
    example: "Long AUD/JPY overnight → swap credited or charged",
    icon: (
      <svg viewBox="0 0 60 60">
        <circle cx="28" cy="30" r="15" fill="none" stroke="var(--gold)" strokeWidth="2" />
        <path d="M28 30 L28 20" stroke="var(--text)" strokeWidth="2" />
        <path d="M28 30 L35 34" stroke="var(--text)" strokeWidth="2" />
        <path d="M44 18 A18 18 0 0 1 44 42" stroke="var(--mint)" strokeWidth="2" fill="none" markerEnd="url(#swapArr)" />
        <defs>
          <marker id="swapArr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L6,4 L0,8 Z" fill="var(--mint)" />
          </marker>
        </defs>
      </svg>
    ),
  },
];

export default function TermGrid() {
  return (
    <section id="core-terms">
      <Reveal className="section-head">
        <div className="eyebrow">Start Here</div>
        <h2>Terms you&apos;ll see everywhere</h2>
        <p>
          Learn these first — almost every forex conversation and chart uses
          them.
        </p>
      </Reveal>
      <div className="term-grid">
        {terms.map((term) => (
          <Reveal className="term-card glow-card" key={term.title}>
            <div className="icon">{term.icon}</div>
            <h3>{term.title}</h3>
            <p>{term.desc}</p>
            <div className="ex">{term.example}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
