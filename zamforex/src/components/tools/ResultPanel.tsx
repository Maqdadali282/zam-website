import type { ReactNode } from "react";

export function ResultHeadline({
  label,
  value,
  accent,
  placeholder,
}: {
  label: string;
  value?: string;
  accent: string;
  placeholder?: string;
}) {
  return (
    <div className="result-headline">
      <span className="result-headline-label">{label}</span>
      <span className="result-headline-value" style={{ color: value ? accent : "var(--muted)" }}>
        {value ?? placeholder ?? "—"}
      </span>
    </div>
  );
}

export function ResultMetric({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return (
    <div className="result-metric">
      <span className="result-metric-label">{label}</span>
      <span className="result-metric-value">{value}</span>
      {hint && <span className="result-metric-hint">{hint}</span>}
    </div>
  );
}

export function ResultMetricGrid({ children }: { children: ReactNode }) {
  return <div className="result-metric-grid">{children}</div>;
}

export function ResultNote({ children }: { children: ReactNode }) {
  return <p className="result-note">{children}</p>;
}
