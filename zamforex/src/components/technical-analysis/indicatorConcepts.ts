import type { ConceptEntry } from "./ConceptAccordion";

const TREND = "var(--cat-1)";
const MOMENTUM = "var(--cat-4)";

export const trendConcepts: ConceptEntry[] = [
  {
    id: "moving-average",
    term: "Moving Average — MA",
    def: "The average price over a set number of past candles, plotted as a single smoothed line — an EMA weights recent candles more heavily than an SMA.",
    accent: TREND,
    how: "Each new point recalculates the average using the latest window of candles, so the line smooths out noise and reveals the underlying direction of price.",
    bullish: "Price holding above a rising moving average, using pullbacks into it as buying opportunities.",
    bearish: "Price holding below a falling moving average, using bounces into it as selling opportunities.",
    mistake: "Using a single MA setting for every market and timeframe — shorter MAs react faster but whipsaw more; longer MAs lag but filter more noise.",
    tip: "A moving average often acts as dynamic support in an uptrend and dynamic resistance in a downtrend, similar to a horizontal level.",
  },
  {
    id: "golden-death-cross",
    term: "Golden Cross / Death Cross",
    def: "A Golden Cross is a faster MA crossing above a slower MA (bullish signal). A Death Cross is the opposite — a faster MA crossing below a slower one (bearish signal).",
    accent: TREND,
    how: "Because the fast MA reacts to price quicker than the slow MA, a sustained shift in direction eventually pulls the fast line through the slow one.",
    bullish: "The fast MA crosses above the slow MA after a downtrend — many trend-followers treat this as confirmation a new uptrend has started.",
    bearish: "The fast MA crosses below the slow MA after an uptrend — many trend-followers treat this as confirmation a new downtrend has started.",
    mistake: "Treating every crossover as a fresh signal — in a choppy, sideways market, fast and slow MAs cross back and forth constantly, generating false signals.",
    tip: "Because MAs are lagging by nature, crossovers confirm a trend that's often already underway rather than calling the exact top or bottom.",
  },
  {
    id: "bollinger-bands",
    term: "Bollinger Bands",
    def: "A moving average (the basis) with an upper and lower band plotted a set number of standard deviations away — the bands widen when volatility rises and narrow when it falls.",
    accent: TREND,
    how: "Standard deviation measures how spread out recent price moves are, so the bands automatically expand during volatile stretches and contract during quiet ones.",
    bullish: "Price breaks out of a tight squeeze and starts \"walking\" the upper band — a sign of strong bullish momentum, not necessarily overbought.",
    bearish: "Price breaks out of a tight squeeze and starts \"walking\" the lower band — a sign of strong bearish momentum, not necessarily oversold.",
    mistake: "Assuming price touching the upper or lower band automatically means \"overbought\" or \"oversold\" and fading it — during a strong trend, price can ride a band for a long stretch.",
    tip: "A tight squeeze (bands pinching close together) often precedes a big directional move — it just doesn't tell you which direction until it breaks.",
  },
];

export const momentumConcepts: ConceptEntry[] = [
  {
    id: "rsi",
    term: "RSI — Relative Strength Index",
    def: "A 0–100 oscillator measuring the speed and size of recent price changes — readings above 70 are typically considered overbought, below 30 oversold.",
    accent: MOMENTUM,
    how: "RSI compares the average size of recent up-moves to the average size of recent down-moves over a lookback period (commonly 14), then scales the result to 0–100.",
    bullish: "RSI drops into oversold territory (below 30) and then curls back upward, often lining up with a support zone.",
    bearish: "RSI climbs into overbought territory (above 70) and then curls back downward, often lining up with a resistance zone.",
    mistake: "Selling the instant RSI touches 70 in a strong uptrend — RSI can stay overbought for a long stretch while price keeps climbing.",
    tip: "RSI works best combined with price structure — an oversold reading right at a demand zone is far more meaningful than one in the middle of a range.",
  },
  {
    id: "rsi-divergence",
    term: "RSI Divergence",
    def: "When price and RSI disagree — price makes a new high/low that RSI doesn't confirm — often an early warning that momentum is fading.",
    accent: MOMENTUM,
    how: "Momentum (RSI) often peaks before price does. If price pushes to a new extreme on weakening momentum, the oscillator prints a smaller high or a shallower low than the previous swing.",
    bullish: "Price makes a lower low, but RSI makes a higher low at the same time — a bullish divergence suggesting sellers are losing strength.",
    bearish: "Price makes a higher high, but RSI makes a lower high at the same time — a bearish divergence suggesting buyers are losing strength.",
    mistake: "Trading a divergence immediately without waiting for price to actually confirm the reversal with a structure break or a candlestick signal.",
    tip: "Divergence is a warning sign, not a trade signal on its own — treat it as a reason to pay closer attention, not an automatic entry.",
  },
  {
    id: "macd",
    term: "MACD",
    def: "Moving Average Convergence Divergence — plots the difference between two EMAs (the MACD line), a smoothed average of that line (the signal line), and the gap between them as a histogram.",
    accent: MOMENTUM,
    how: "When the faster EMA pulls away from the slower EMA, the MACD line rises; when they converge or the faster one falls behind, it drops back toward — and through — the signal line.",
    bullish: "The MACD line crosses above the signal line, and the histogram flips from red to green — momentum turning upward.",
    bearish: "The MACD line crosses below the signal line, and the histogram flips from green to red — momentum turning downward.",
    mistake: "Trading every MACD/signal crossover in a ranging market — like MA crossovers, these whipsaw frequently when there's no real trend.",
    tip: "The histogram shrinking while price keeps extending is the same divergence idea as RSI — momentum fading before price does.",
  },
];
