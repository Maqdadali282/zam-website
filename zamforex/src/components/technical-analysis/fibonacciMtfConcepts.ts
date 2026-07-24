import type { ConceptEntry } from "./ConceptAccordion";

const FIB = "var(--gold)";
const MTF = "var(--cat-8)";

export const fibonacciConcepts: ConceptEntry[] = [
  {
    id: "retracement",
    term: "Fibonacci Retracement",
    def: "Horizontal levels (23.6%, 38.2%, 50%, 61.8%, 78.6%) plotted between a swing low and swing high, marking likely areas for a pullback to pause or reverse.",
    accent: FIB,
    how: "Draw the tool from the start of a swing to its end. The levels in between are believed to attract price during the pullback that typically follows any strong move.",
    bullish: "In an uptrend, price pulls back into the 50%–61.8% zone and finds buyers before resuming higher.",
    bearish: "In a downtrend, price pulls back into the 50%–61.8% zone and finds sellers before resuming lower.",
    mistake: "Drawing the tool on the wrong swing points — retracement only works from a clearly defined recent swing low to swing high (or vice versa).",
    tip: "Fib levels mean far more when they line up with an existing support/resistance zone, order block, or moving average — confluence is what makes a level worth watching.",
  },
  {
    id: "golden-pocket",
    term: "Golden Pocket",
    def: "The zone between the 61.8% and 78.6% retracement levels — widely treated as the highest-probability area for a pullback to reverse.",
    accent: FIB,
    how: "It sits deep enough into the retracement to filter out shallow pullbacks, but before the point where a pullback would fully retrace the original move.",
    bullish: "Price retraces into the golden pocket after a strong rally, prints a bullish reversal candle, and continues the uptrend.",
    bearish: "Price retraces into the golden pocket after a strong decline, prints a bearish reversal candle, and continues the downtrend.",
    mistake: "Buying or selling the instant price touches the golden pocket without waiting for any confirmation that it's actually holding.",
    tip: "Combine the golden pocket with a nearby order block or supply/demand zone — confluence like this is what most fib-based strategies are built around.",
  },
  {
    id: "extension",
    term: "Fibonacci Extension",
    def: "Levels beyond 100% (commonly 127.2%, 161.8%) projected from the same swing — used to estimate where a move might extend to once it continues past its origin.",
    accent: FIB,
    how: "Extensions use the same swing distance as the retracement but project it forward from the pullback's end, giving a target for the next leg of the move.",
    bullish: "After a pullback holds and price breaks the prior swing high, the 127.2% or 161.8% extension is often used as a take-profit target.",
    bearish: "After a pullback holds and price breaks the prior swing low, the 127.2% or 161.8% extension is often used as a take-profit target.",
    mistake: "Treating an extension level as a guaranteed reversal point rather than just one possible target among several.",
    tip: "Extensions are a target-setting tool, not an entry tool — retracement levels are what most traders use to time the entry itself.",
  },
];

export const mtfConcepts: ConceptEntry[] = [
  {
    id: "top-down-analysis",
    term: "Top-Down Analysis",
    def: "Starting on a higher timeframe to establish the overall trend, then stepping down through progressively lower timeframes to refine structure and time an entry.",
    accent: MTF,
    how: "Each timeframe answers a different question: the highest sets the bias, the middle one shows the structure to trade with, and the lowest times the actual entry.",
    bullish: "Weekly trend is up, the 4H shows a fresh Higher Low forming, and the 15-minute chart gives a clean entry trigger right at that HL.",
    bearish: "Weekly trend is down, the 4H shows a fresh Lower High forming, and the 15-minute chart gives a clean entry trigger right at that LH.",
    mistake: "Starting the analysis on the entry timeframe and working upward — this makes it easy to miss the bigger trend you're actually trading against.",
    tip: "A common split is 3 timeframes roughly 4x–6x apart, e.g. Daily for bias, 4H for structure, 15m for entry — the exact multiples matter less than the habit itself.",
  },
  {
    id: "htf-bias",
    term: "Higher Timeframe Bias",
    def: "The overall directional lean set by the highest timeframe you check — the filter every lower-timeframe trade idea has to pass through first.",
    accent: MTF,
    how: "Because higher timeframes represent more time and more participants, their trend is considered more reliable and slower to change than anything visible on a lower chart.",
    bullish: "HTF bias is bullish, so only long setups on lower timeframes are considered — shorts are skipped even if they look tempting.",
    bearish: "HTF bias is bearish, so only short setups on lower timeframes are considered — longs are skipped even if they look tempting.",
    mistake: "Letting a strong-looking lower-timeframe setup override a clearly opposing higher-timeframe trend.",
    tip: "When the HTF bias and a lower-timeframe setup point the same direction, that alignment is usually treated as a higher-confidence trade than either signal alone.",
  },
  {
    id: "entry-timeframe",
    term: "Entry Timeframe",
    def: "The lowest timeframe used in the analysis — where the actual trade trigger (a candlestick pattern, a BOS, an indicator signal) is confirmed and the position is opened.",
    accent: MTF,
    how: "Once the higher timeframes have defined the bias and the zone of interest, the entry timeframe is only used to fine-tune exactly when to click buy or sell.",
    bullish: "Price reaches an HTF demand zone; the entry timeframe then needs to show its own bullish confirmation (e.g. a CHoCH or engulfing candle) before entering long.",
    bearish: "Price reaches an HTF supply zone; the entry timeframe then needs to show its own bearish confirmation (e.g. a CHoCH or engulfing candle) before entering short.",
    mistake: "Using the entry timeframe to second-guess the higher-timeframe bias instead of just using it to time the trigger.",
    tip: "If the entry timeframe never gives a clean confirmation at the zone you were watching, that's a valid reason to skip the trade entirely.",
  },
];
