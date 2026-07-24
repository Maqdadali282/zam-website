import Reveal from "@/components/common/Reveal";
import CandleChart from "./CandleChart";
import {
  liquidityChart,
  displacementChart,
  marketStructureShiftChart,
  inducementChart,
  fairValueGapChart,
  optimalTradeEntryChart,
  balancedPriceRangeChart,
} from "./ictChartData";

type Concept = {
  id: string;
  title: string;
  body: string;
  bullets?: { term: string; desc: string }[];
  chart: () => { candles: ReturnType<typeof liquidityChart>["candles"]; overlay: React.ReactNode };
};

const concepts: Concept[] = [
  {
    id: "liquidity",
    title: "1. Liquidity",
    body: "Liquidity is where the stop-loss orders are sitting. Every old swing high has a cluster of short-sellers' stops resting just above it — that's buy-side liquidity. Every old swing low has long traders' stops resting just below it — that's sell-side liquidity. Price is drawn toward these pools because that's where the volume is that lets large orders get filled.",
    bullets: [
      { term: "Buy-side", desc: "Rests above old highs — fuel for a move up." },
      { term: "Sell-side", desc: "Rests below old lows — fuel for a move down." },
    ],
    chart: liquidityChart,
  },
  {
    id: "displacement",
    title: "2. Displacement",
    body: "Displacement is a sudden, one-directional burst of strong-bodied candles with barely any wicks — visible proof that one side (buyers or sellers) has taken control. It usually shows up right after a liquidity pool gets swept, and it almost always leaves two things behind: a Market Structure Shift and a Fair Value Gap.",
    chart: displacementChart,
  },
  {
    id: "market-structure-shift",
    title: "3. Market Structure Shift (MSS)",
    body: "An uptrend is just a series of higher highs and higher lows; a downtrend is the reverse. A Market Structure Shift is the moment that pattern breaks — an uptrend suddenly prints a lower low, or a downtrend prints a higher high. It's usually triggered by a Displacement, and it's the first real clue the trend may be turning.",
    chart: marketStructureShiftChart,
  },
  {
    id: "inducement",
    title: "4. Inducement",
    body: "Inducement is the fakeout before the real move — a minor swing that pokes just past an obvious level to trigger retail stop-losses, before price snaps back in the original direction. ICT treats these as Smart Money engineering liquidity on a lower time frame before continuing the higher time frame trend.",
    chart: inducementChart,
  },
  {
    id: "fair-value-gap",
    title: "5. Fair Value Gap (FVG)",
    body: "A Fair Value Gap is a three-candle imbalance: the middle candle moves so fast in one direction that its wick doesn't overlap with the wicks of the candles before and after it, leaving a visible gap in price. Markets tend to be inefficient about leaving these behind — and price often comes back to \"fill\" the gap before continuing on.",
    chart: fairValueGapChart,
  },
  {
    id: "optimal-trade-entry",
    title: "6. Optimal Trade Entry (OTE)",
    body: "After an impulse move, price rarely goes in a straight line — it pulls back first. ICT traders use Fibonacci retracement to define a specific pocket, typically the 61.8%–78.6% zone, as their preferred spot to enter in the direction of the original move once price retraces into it.",
    chart: optimalTradeEntryChart,
  },
  {
    id: "balanced-price-range",
    title: "7. Balanced Price Range (BPR)",
    body: "A Balanced Price Range forms when two Fair Value Gaps — created by two sharp displacements in opposite directions, close together in time — overlap. Price often chops between the edges of this range, revisiting both gaps, before eventually breaking out and resuming the larger trend.",
    chart: balancedPriceRangeChart,
  },
];

export default function IctStrategySection() {
  return (
    <section id="ict-strategy">
      <Reveal className="section-head">
        <div className="eyebrow">Advanced Framework</div>
        <h2>The ICT Trading Strategy</h2>
        <p>
          ICT (Inner Circle Trader) is a way of reading the market through the
          lens of institutional order flow rather than retail indicators. The
          core idea: large players need liquidity to fill big orders, so
          price is repeatedly drawn toward pools of resting stop-losses
          before reversing. Learn to spot those pools and the footprints
          they leave, and you start reading charts the way Smart Money moves
          them — instead of reacting a step behind.
        </p>
      </Reveal>

      {concepts.map((c) => {
        const { candles, overlay } = c.chart();
        return (
          <Reveal className="diagram-block diagram-block--chart glow-card" key={c.id}>
            <div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              {c.bullets && (
                <ul>
                  {c.bullets.map((b) => (
                    <li key={b.term}>
                      <b>{b.term}</b> {b.desc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <CandleChart candles={candles} overlay={overlay} />
          </Reveal>
        );
      })}
    </section>
  );
}
