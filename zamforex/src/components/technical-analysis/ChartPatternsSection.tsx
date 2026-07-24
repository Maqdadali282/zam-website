import type { CSSProperties, ReactNode } from "react";
import Reveal from "@/components/common/Reveal";

type Bias = "Bullish" | "Bearish" | "Either";

type ChartPattern = {
  id: string;
  name: string;
  accent: string;
  bias: Bias;
  structure: string;
  breakout: string;
  confirmation: string;
  mistake: string;
  svg: ReactNode;
};

const biasColor: Record<Bias, string> = {
  Bullish: "var(--mint)",
  Bearish: "var(--red)",
  Either: "var(--gold)",
};

const patterns: ChartPattern[] = [
  {
    id: "head-shoulders",
    name: "Head and Shoulders",
    accent: "var(--cat-1)",
    bias: "Bearish",
    structure:
      "Three peaks — a left shoulder, a taller head, and a right shoulder roughly level with the first. It forms after an uptrend and signals buyers are running out of strength.",
    breakout: "Downward, once the \"neckline\" connecting the two troughs is broken.",
    confirmation: "A candle closing below the neckline — not just a wick poking through it.",
    mistake: "Shorting as soon as the right shoulder forms, before the neckline actually breaks.",
    svg: (
      <svg viewBox="0 0 320 220">
        <line x1="20" y1="150" x2="300" y2="145" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="6 6" />
        <text x="24" y="140" fontFamily="var(--font-mono)" fontSize="10" fill="var(--gold)">Neckline</text>
        <path d="M20 170 L70 90 L110 150 L160 40 L210 150 L250 95 L300 175" stroke="var(--cat-1)" strokeWidth="2.4" fill="none" />
        <text x="70" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--muted)">L Shoulder</text>
        <text x="160" y="30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--cat-1)">Head</text>
        <text x="250" y="85" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--muted)">R Shoulder</text>
      </svg>
    ),
  },
  {
    id: "double-top",
    name: "Double Top",
    accent: "var(--cat-2)",
    bias: "Bearish",
    structure:
      "Two peaks at roughly the same resistance level — price tries twice to break higher and fails both times, then reverses down through the valley between them.",
    breakout: "Downward, through the low point between the two peaks.",
    confirmation: "A candle closing below the valley low that separates the two tops.",
    mistake: "Assuming the pattern is complete after just one rejection — it needs the second failed high.",
    svg: (
      <svg viewBox="0 0 320 220">
        <line x1="10" y1="40" x2="310" y2="40" stroke="var(--red)" strokeWidth="1.2" strokeDasharray="5 5" />
        <path d="M20 130 L80 45 L150 100 L220 45 L280 170" stroke="var(--cat-2)" strokeWidth="2.4" fill="none" />
        <text x="80" y="35" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--cat-2)">Top 1</text>
        <text x="220" y="35" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--cat-2)">Top 2</text>
        <text x="150" y="118" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--muted)">Valley</text>
      </svg>
    ),
  },
  {
    id: "double-bottom",
    name: "Double Bottom",
    accent: "var(--cat-3)",
    bias: "Bullish",
    structure:
      "Two troughs at roughly the same support level — price tries twice to break lower and fails both times, then reverses up through the peak between them.",
    breakout: "Upward, through the high point between the two troughs.",
    confirmation: "A candle closing above the peak high that separates the two bottoms.",
    mistake: "Buying the first bounce without waiting for the second successful defense of support.",
    svg: (
      <svg viewBox="0 0 320 220">
        <line x1="10" y1="180" x2="310" y2="180" stroke="var(--mint)" strokeWidth="1.2" strokeDasharray="5 5" />
        <path d="M20 90 L80 175 L150 120 L220 175 L280 50" stroke="var(--cat-3)" strokeWidth="2.4" fill="none" />
        <text x="80" y="198" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--cat-3)">Bottom 1</text>
        <text x="220" y="198" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--cat-3)">Bottom 2</text>
        <text x="150" y="108" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--muted)">Peak</text>
      </svg>
    ),
  },
  {
    id: "triangle",
    name: "Triangle",
    accent: "var(--cat-5)",
    bias: "Either",
    structure:
      "Price compresses between two converging trendlines. An ascending triangle (flat top, rising bottom) leans bullish; a descending triangle (flat bottom, falling top) leans bearish; a symmetrical triangle usually just continues the prior trend.",
    breakout: "Depends on the variant — ascending favors up, descending favors down, symmetrical favors the trend that was in place before it formed.",
    confirmation: "A candle closing cleanly outside the triangle's trendline, ideally with expanding momentum.",
    mistake: "Guessing the breakout direction while price is still compressing inside the triangle.",
    svg: (
      <svg viewBox="0 0 320 220">
        <line x1="20" y1="50" x2="300" y2="50" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="6 6" />
        <line x1="20" y1="170" x2="290" y2="70" stroke="var(--cat-5)" strokeWidth="1.5" strokeDasharray="6 6" />
        <path d="M20 170 L60 100 L100 130 L140 80 L180 110 L220 65 L260 90 L290 55" stroke="var(--text)" strokeWidth="2.2" fill="none" />
        <text x="150" y="42" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--gold)">Flat resistance</text>
        <text x="150" y="200" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--cat-5)">Rising support</text>
      </svg>
    ),
  },
  {
    id: "flag",
    name: "Flag",
    accent: "var(--cat-7)",
    bias: "Either",
    structure:
      "After a sharp, near-vertical move (the \"pole\"), price pauses and drifts in a tight, parallel channel against the trend (the \"flag\") before usually resuming the original direction.",
    breakout: "The same direction as the pole that formed before the flag.",
    confirmation: "A candle closing beyond the flag's channel in the direction of the original pole.",
    mistake: "Mistaking a flag for a full reversal and trading against the underlying trend.",
    svg: (
      <svg viewBox="0 0 320 220">
        <path d="M20 190 L90 40" stroke="var(--cat-7)" strokeWidth="2.6" fill="none" />
        <line x1="90" y1="40" x2="200" y2="75" stroke="var(--muted)" strokeWidth="1.3" strokeDasharray="5 5" />
        <line x1="95" y1="75" x2="200" y2="105" stroke="var(--muted)" strokeWidth="1.3" strokeDasharray="5 5" />
        <path d="M90 40 L120 60 L110 80 L140 65 L130 90 L160 78 L150 100 L200 90" stroke="var(--text)" strokeWidth="2" fill="none" />
        <path d="M200 90 L280 25" stroke="var(--cat-7)" strokeWidth="2.6" fill="none" />
        <text x="55" y="110" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--cat-7)">Pole</text>
        <text x="150" y="122" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--muted)">Flag</text>
      </svg>
    ),
  },
  {
    id: "wedge",
    name: "Wedge",
    accent: "var(--cat-4)",
    bias: "Either",
    structure:
      "Two converging trendlines that both slope the same direction. A Rising Wedge (both lines sloping up) is usually bearish; a Falling Wedge (both lines sloping down) is usually bullish — the opposite of what the slope might suggest.",
    breakout: "Rising Wedge → typically breaks down. Falling Wedge → typically breaks up.",
    confirmation: "A candle closing beyond the converging trendline, against the wedge's own slope.",
    mistake: "Assuming a rising wedge is bullish just because it's sloping upward — it's usually the opposite.",
    svg: (
      <svg viewBox="0 0 320 220">
        <line x1="20" y1="170" x2="290" y2="60" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="6 6" />
        <line x1="20" y1="195" x2="290" y2="90" stroke="var(--cat-4)" strokeWidth="1.5" strokeDasharray="6 6" />
        <path d="M20 185 L60 150 L90 165 L130 120 L160 140 L200 105 L230 120 L260 90" stroke="var(--text)" strokeWidth="2.2" fill="none" />
        <text x="150" y="52" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--gold)">Rising Wedge = Bearish</text>
      </svg>
    ),
  },
];

export default function ChartPatternsSection() {
  return (
    <section id="chart-patterns" className="cat-section">
      <Reveal className="section-head">
        <div className="eyebrow" style={{ color: "var(--cat-5)", "--eyebrow-accent": "var(--cat-5)" } as CSSProperties}>
          Built on Support &amp; Resistance
        </div>
        <h2>Chart Patterns</h2>
        <p>
          Shapes that form over many candles as buyers and sellers fight for
          control — each one links back to the same support/resistance ideas
          above.
        </p>
      </Reveal>

      {patterns.map((p) => (
        <Reveal className="diagram-block glow-card" key={p.id} style={{ borderTop: `3px solid ${p.accent}` } as CSSProperties}>
          <div>
            <span
              style={{
                display: "inline-block",
                fontFamily: "var(--font-mono)",
                fontSize: "10.5px",
                padding: "3px 10px",
                borderRadius: "20px",
                border: `1px solid ${biasColor[p.bias]}`,
                color: biasColor[p.bias],
                marginBottom: "12px",
              }}
            >
              {p.bias} Bias
            </span>
            <h3>{p.name}</h3>
            <p>{p.structure}</p>
            <ul>
              <li><b>Breakout</b> {p.breakout}</li>
              <li><b>Confirmation</b> {p.confirmation}</li>
              <li><b>Common Mistake</b> {p.mistake}</li>
            </ul>
          </div>
          {p.svg}
        </Reveal>
      ))}
    </section>
  );
}
