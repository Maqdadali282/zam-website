import type { ReactNode } from "react";
import { candleX, candleWidth } from "./CandleChart";
import { buildCandles, highestPoint, lowestPoint, fitToFrame, type Candle } from "./candleUtils";

const last = (candles: Candle[]) => candles[candles.length - 1].c;

function Dashed({ y, color, label, labelBelow = true }: { y: number; color: string; label: string; labelBelow?: boolean }) {
  return (
    <>
      <line x1="2" y1={y} x2="318" y2={y} stroke={color} strokeWidth="1.2" strokeDasharray="5 5" />
      <text x="5" y={labelBelow ? y + 12 : y - 6} fontFamily="var(--font-mono)" fontSize="9.5" fill={color}>
        {label}
      </text>
    </>
  );
}

export function liquidityChart(): { candles: Candle[]; overlay: ReactNode } {
  const raw = buildCandles(11, 110, [
    { count: 11, drift: 3.4, volatility: 6 },
    { count: 9, drift: -4.4, volatility: 6 },
    { count: 10, drift: 3.2, volatility: 6 },
    { count: 8, drift: -3.8, volatility: 5 },
    { count: 6, drift: 1, volatility: 4 },
  ]);
  const top = highestPoint(raw);
  const bottom = lowestPoint(raw);

  const { candles, mapY } = fitToFrame(raw);
  const overlay = (
    <>
      <Dashed y={mapY(top)} color="var(--mint)" label="Buy-side Liquidity" labelBelow />
      <Dashed y={mapY(bottom)} color="var(--red)" label="Sell-side Liquidity" labelBelow={false} />
    </>
  );
  return { candles, overlay };
}

export function displacementChart(): { candles: Candle[]; overlay: ReactNode } {
  const choppy = buildCandles(21, 140, [{ count: 20, drift: 0.3, volatility: 5 }]);
  const burst = buildCandles(22, last(choppy), [{ count: 7, drift: -13, volatility: 2 }]);
  const raw = [...choppy, ...burst];
  const n = raw.length;
  const from = choppy.length;
  const boxTop = highestPoint(raw, from, n) - 6;
  const boxBottom = lowestPoint(raw, from, n) + 6;
  const x1 = candleX(from, n) - 3;
  const x2 = candleX(n - 1, n) + candleWidth(n) + 3;

  const { candles, mapY } = fitToFrame(raw);
  const boxY = mapY(boxTop);
  const boxH = mapY(boxBottom) - boxY;
  const overlay = (
    <>
      <rect x={x1} y={boxY} width={x2 - x1} height={boxH} fill="var(--gold)" opacity="0.12" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" />
      <text x={(x1 + x2) / 2} y={boxY - 8} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--gold)">
        Displacement
      </text>
    </>
  );
  return { candles, overlay };
}

export function marketStructureShiftChart(): { candles: Candle[]; overlay: ReactNode } {
  const leg1 = buildCandles(31, 175, [{ count: 8, drift: -8, volatility: 4 }]);
  const pull1 = buildCandles(32, last(leg1), [{ count: 5, drift: 5, volatility: 3 }]);
  const leg2 = buildCandles(33, last(pull1), [{ count: 8, drift: -9, volatility: 4 }]);
  const pull2 = buildCandles(34, last(leg2), [{ count: 6, drift: 5, volatility: 3 }]);
  const reversal = buildCandles(35, last(pull2), [{ count: 9, drift: 8, volatility: 4 }]);
  const raw = [...leg1, ...pull1, ...leg2, ...pull2, ...reversal];
  const n = raw.length;

  const leg2Start = leg1.length + pull1.length;
  const pull2Start = leg2Start + leg2.length;
  const pull2End = pull2Start + pull2.length;
  const priorLow = lowestPoint(raw, pull2Start, pull2End);
  const reversalLowIdx =
    raw.slice(pull2End).reduce((worstIdx, c, i, arr) => (c.l > arr[worstIdx].l ? i : worstIdx), 0) + pull2End;
  const newLow = raw[reversalLowIdx].l;
  const hh = highestPoint(raw, leg2Start, pull2Start);

  const { candles, mapY } = fitToFrame(raw);
  const priorLowY = mapY(priorLow);
  const overlay = (
    <>
      <line x1={candleX(pull2Start, n)} y1={priorLowY} x2="318" y2={priorLowY} stroke="var(--muted)" strokeWidth="1" strokeDasharray="4 4" />
      <text x={candleX(pull2End + 2, n)} y={priorLowY - 6} fontFamily="var(--font-mono)" fontSize="9" fill="var(--muted)">
        prior low
      </text>
      <text x={candleX(leg2Start + leg2.length / 2, n)} y={mapY(hh) - 10} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--gold)">
        Higher High
      </text>
      <text x={Math.max(4, candleX(reversalLowIdx, n) - 55)} y={mapY(newLow) + 15} fontFamily="var(--font-mono)" fontSize="10" fill="var(--red)">
        Lower Low = MSS
      </text>
    </>
  );
  return { candles, overlay };
}

export function inducementChart(): { candles: Candle[]; overlay: ReactNode } {
  const rise1 = buildCandles(41, 175, [{ count: 14, drift: -6, volatility: 4 }]);
  const swingLevel = last(rise1);
  const dip = buildCandles(42, swingLevel, [{ count: 3, drift: 4, volatility: 3 }]);
  const rise2 = buildCandles(43, last(dip), [{ count: 13, drift: -8.5, volatility: 4 }]);
  const raw = [...rise1, ...dip, ...rise2];
  const n = raw.length;

  const dipStart = rise1.length;
  const dipEnd = dipStart + dip.length;
  const inducementLow = lowestPoint(raw, dipStart, dipEnd);

  const { candles, mapY } = fitToFrame(raw);
  const swingY = mapY(swingLevel);
  const inducementLowY = mapY(inducementLow);
  const overlay = (
    <>
      <line x1={candleX(Math.max(0, dipStart - 6), n)} y1={swingY} x2="318" y2={swingY} stroke="var(--muted)" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx={candleX(dipStart + 1, n)} cy={inducementLowY} r="4" fill="none" stroke="var(--red)" strokeWidth="1.6" />
      <text x={Math.max(4, candleX(dipStart + 1, n) - 12)} y={inducementLowY + 18} fontFamily="var(--font-mono)" fontSize="10" fill="var(--red)">
        Inducement
      </text>
      <text x={candleX(dipEnd + 3, n)} y={mapY(highestPoint(raw, dipEnd, n)) - 8} fontFamily="var(--font-mono)" fontSize="10" fill="var(--mint)">
        Real Move
      </text>
    </>
  );
  return { candles, overlay };
}

export function fairValueGapChart(): { candles: Candle[]; overlay: ReactNode } {
  const noise1 = buildCandles(51, 150, [{ count: 11, drift: 1, volatility: 5 }]);
  const anchor = last(noise1);
  const gapCandles: Candle[] = [
    { o: anchor, c: anchor - 10, h: anchor - 11, l: anchor + 1 },
    { o: anchor - 10, c: anchor - 32, h: anchor - 33, l: anchor - 9 },
    { o: anchor - 32, c: anchor - 40, h: anchor - 41, l: anchor - 31 },
  ];
  const noise2 = buildCandles(52, anchor - 40, [{ count: 11, drift: -0.4, volatility: 5 }]);
  const raw = [...noise1, ...gapCandles, ...noise2];
  const n = raw.length;

  const from = noise1.length;
  const to = from + gapCandles.length;
  const gapTop = anchor - 31;
  const gapBottom = anchor - 11;
  const x1 = candleX(from, n) - 2;
  const x2 = candleX(to - 1, n) + candleWidth(n) + 2;

  const { candles, mapY } = fitToFrame(raw);
  const y1 = mapY(gapTop);
  const y2 = mapY(gapBottom);
  const overlay = (
    <>
      <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} fill="var(--gold)" opacity="0.24" />
      <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--gold)">
        FVG
      </text>
    </>
  );
  return { candles, overlay };
}

export function optimalTradeEntryChart(): { candles: Candle[]; overlay: ReactNode } {
  const impulseStart = 185;
  const impulse = buildCandles(61, impulseStart, [{ count: 15, drift: -9, volatility: 4 }]);
  const impulseEnd = last(impulse);
  const retrace = buildCandles(62, impulseEnd, [{ count: 10, drift: 5.5, volatility: 3 }]);
  const cont = buildCandles(63, last(retrace), [{ count: 10, drift: -7, volatility: 4 }]);
  const raw = [...impulse, ...retrace, ...cont];
  const n = raw.length;

  const range = impulseStart - impulseEnd;
  const fib618 = impulseEnd + 0.618 * range;
  const fib786 = impulseEnd + 0.786 * range;

  const { candles, mapY } = fitToFrame(raw);
  const y618 = mapY(fib618);
  const y786 = mapY(fib786);
  const overlay = (
    <>
      <Dashed y={y618} color="var(--gold)" label="61.8%" labelBelow={false} />
      <Dashed y={y786} color="var(--gold)" label="78.6%" labelBelow />
      <rect x="2" y={Math.min(y618, y786)} width="316" height={Math.abs(y786 - y618)} fill="var(--gold)" opacity="0.14" />
      <text x={candleX(impulse.length + 3, n)} y={(y618 + y786) / 2 + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text)">
        OTE Zone
      </text>
    </>
  );
  return { candles, overlay };
}

export function balancedPriceRangeChart(): { candles: Candle[]; overlay: ReactNode } {
  const noise1 = buildCandles(71, 100, [{ count: 10, drift: 0.5, volatility: 5 }]);
  const anchor1 = last(noise1);
  const down: Candle[] = [
    { o: anchor1, c: anchor1 + 10, h: anchor1 - 1, l: anchor1 + 11 },
    { o: anchor1 + 10, c: anchor1 + 34, h: anchor1 + 9, l: anchor1 + 35 },
    { o: anchor1 + 34, c: anchor1 + 44, h: anchor1 + 33, l: anchor1 + 45 },
  ];
  const chop = buildCandles(72, anchor1 + 44, [{ count: 6, drift: -0.3, volatility: 3 }]);
  const anchor2 = last(chop);
  const up: Candle[] = [
    { o: anchor2, c: anchor2 - 10, h: anchor2 - 11, l: anchor2 + 1 },
    { o: anchor2 - 10, c: anchor2 - 34, h: anchor2 - 35, l: anchor2 - 9 },
    { o: anchor2 - 34, c: anchor2 - 42, h: anchor2 - 43, l: anchor2 - 33 },
  ];
  const noise2 = buildCandles(73, anchor2 - 42, [{ count: 11, drift: 0.3, volatility: 4 }]);
  const raw = [...noise1, ...down, ...chop, ...up, ...noise2];
  const n = raw.length;

  const downGap: [number, number] = [anchor1 + 11, anchor1 + 33];
  const upGap: [number, number] = [anchor2 - 43, anchor2 - 9];
  let overlapTop = Math.max(downGap[0], upGap[0]);
  let overlapBottom = Math.min(downGap[1], upGap[1]);
  if (overlapBottom <= overlapTop) {
    const mid = (overlapTop + overlapBottom) / 2;
    overlapTop = mid - 4;
    overlapBottom = mid + 4;
  }

  const upEndIdx = noise1.length + down.length + chop.length + up.length;
  const x1 = candleX(noise1.length, n) - 2;
  const x2 = candleX(upEndIdx - 1, n) + candleWidth(n) + 2;

  const { candles, mapY } = fitToFrame(raw);
  const y1 = mapY(overlapTop);
  const y2 = mapY(overlapBottom);
  const overlay = (
    <>
      <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} fill="var(--mint)" opacity="0.18" />
      <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--mint)">
        BPR
      </text>
    </>
  );
  return { candles, overlay };
}
