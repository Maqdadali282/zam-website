export type Candle = { o: number; h: number; l: number; c: number };

// Deterministic PRNG so the "random" noise is stable across server/client
// renders and every build — real Math.random() would risk a hydration
// mismatch and a different chart on every reload.
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Phase = {
  count: number;
  /** average per-candle change in SVG-y units; negative = price rises */
  drift: number;
  /** noise amplitude in SVG-y units */
  volatility: number;
};

const TOP = 14;
const BOTTOM = 204;

/**
 * Builds a dense, noisy sequence of candles across one or more "phases"
 * (a ranging phase, a sharp displacement phase, a retracement phase, etc.)
 * so a single chart can tell a specific structural story while still
 * looking like real, choppy price action rather than a clean sketch.
 */
export function buildCandles(seed: number, startY: number, phases: Phase[]): Candle[] {
  const rand = mulberry32(seed);
  const candles: Candle[] = [];
  let cursor = startY;
  for (const phase of phases) {
    for (let i = 0; i < phase.count; i++) {
      const open = cursor;
      const noise = (rand() - 0.5) * phase.volatility;
      let close = open + phase.drift + noise;
      close = Math.min(BOTTOM, Math.max(TOP, close));
      const bodyTop = Math.min(open, close);
      const bodyBottom = Math.max(open, close);
      const high = Math.max(TOP, bodyTop - rand() * phase.volatility * 0.7);
      const low = Math.min(BOTTOM, bodyBottom + rand() * phase.volatility * 0.7);
      candles.push({ o: open, h: high, l: low, c: close });
      cursor = close;
    }
  }
  return candles;
}

/** Splices hand-authored candles into a generated sequence at a fixed index. */
export function spliceCandles(base: Candle[], at: number, replacement: Candle[]): Candle[] {
  const next = base.slice();
  next.splice(at, replacement.length, ...replacement);
  return next;
}

export const highestPoint = (candles: Candle[], from = 0, to = candles.length) =>
  Math.min(...candles.slice(from, to).map((c) => c.h));

export const lowestPoint = (candles: Candle[], from = 0, to = candles.length) =>
  Math.max(...candles.slice(from, to).map((c) => c.l));

/**
 * Stretches whatever price range a generated sequence happens to occupy so
 * it fills the full chart height — without this, a chart whose random walk
 * only wandered through a narrow band renders as a tiny cluster of candles
 * surrounded by dead space. Returns the rescaled candles plus a `mapY`
 * function so overlay annotations (dashed lines, gap boxes, labels) computed
 * from the original values can be transformed the same way.
 */
export function fitToFrame(
  candles: Candle[],
  top = 10,
  bottom = 208,
): { candles: Candle[]; mapY: (y: number) => number } {
  const allY = candles.flatMap((c) => [c.h, c.l]);
  const min = Math.min(...allY);
  const max = Math.max(...allY);
  const span = max - min || 1;
  const target = bottom - top;
  const mapY = (y: number) => top + ((y - min) / span) * target;
  const scaled = candles.map((c) => ({ o: mapY(c.o), h: mapY(c.h), l: mapY(c.l), c: mapY(c.c) }));
  return { candles: scaled, mapY };
}
