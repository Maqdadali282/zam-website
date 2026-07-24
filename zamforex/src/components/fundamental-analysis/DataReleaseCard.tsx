"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  unit?: string;
  previous: number;
  forecast: number;
  actual: number;
  color: string;
  lowerIsBetter?: boolean;
};

export default function DataReleaseCard({ title, unit = "", previous, forecast, actual, color, lowerIsBetter = false }: Props) {
  const max = Math.max(previous, forecast, actual, 1);
  const diff = actual - forecast;
  const better = lowerIsBetter ? diff < 0 : diff > 0;
  const inline = Math.abs(diff) < max * 0.01;
  const verdictColor = inline ? "var(--gold)" : better ? "var(--mint)" : "var(--red)";
  const verdictText = inline ? "In Line With Forecast" : better ? "Better Than Expected" : "Worse Than Expected";

  const bars = [
    { label: "Previous", value: previous, color: "var(--muted)" },
    { label: "Forecast", value: forecast, color: "var(--gold)" },
    { label: "Actual", value: actual, color },
  ];

  return (
    <div className="data-card glow-card">
      <div className="data-card-head">
        <h4>{title}</h4>
      </div>

      <div className="data-bars">
        {bars.map((b, i) => (
          <div className="data-bar-item" key={b.label}>
            <span className="data-bar-label">{b.label}</span>
            <span className="data-bar-value" style={{ color: b.color }}>
              {b.value.toLocaleString()}
              {unit}
            </span>
            <div className="data-bar-track">
              <motion.div
                className="data-bar-fill"
                style={{ background: b.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(Math.abs(b.value) / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      <span className="data-verdict" style={{ borderColor: verdictColor, color: verdictColor }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: verdictColor, display: "inline-block" }} />
        {verdictText}
      </span>
    </div>
  );
}
