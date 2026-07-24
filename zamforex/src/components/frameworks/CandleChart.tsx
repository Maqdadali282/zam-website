import type { ReactNode } from "react";
import type { Candle } from "./candleUtils";

const VIEW_WIDTH = 320;
const VIEW_HEIGHT = 220;
const MARGIN = 6;
const BODY_RATIO = 0.68; // fraction of each candle's allotted slot used by its body

/** Horizontal step per candle when `count` candles must fill the frame. */
export function candleStep(count: number) {
  return (VIEW_WIDTH - MARGIN * 2) / count;
}
/** x-position for candle index i out of `count` total — for lining up overlays. */
export function candleX(i: number, count: number) {
  return MARGIN + i * candleStep(count);
}
/** Candle body width for a chart with `count` total candles. */
export function candleWidth(count: number) {
  return candleStep(count) * BODY_RATIO;
}

export default function CandleChart({
  candles,
  overlay,
  baseline = true,
}: {
  candles: Candle[];
  overlay?: ReactNode;
  baseline?: boolean;
}) {
  const count = candles.length;
  const w = candleWidth(count);

  return (
    <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}>
      {baseline && (
        <line x1="2" y1={VIEW_HEIGHT - 4} x2={VIEW_WIDTH - 2} y2={VIEW_HEIGHT - 4} stroke="var(--line)" strokeWidth="1" />
      )}
      <g>
        {candles.map((c, i) => {
          const up = c.c < c.o;
          const color = up ? "var(--mint)" : "var(--red)";
          const x = candleX(i, count);
          const bodyTop = Math.min(c.o, c.c);
          const bodyHeight = Math.max(1.4, Math.abs(c.c - c.o));
          return (
            <g key={i}>
              <line
                x1={x + w / 2}
                x2={x + w / 2}
                y1={c.h}
                y2={c.l}
                stroke={color}
                strokeWidth={Math.max(1, w * 0.22)}
                opacity="0.9"
              />
              <rect x={x} y={bodyTop} width={w} height={bodyHeight} fill={color} />
            </g>
          );
        })}
      </g>
      {overlay}
    </svg>
  );
}
