export default function ProfitMovementVisual({ positive = true }: { positive?: boolean }) {
  const color = positive ? "var(--mint)" : "var(--red)";
  const linePath = positive ? "M10 66 L70 52 L130 34 L190 20" : "M10 20 L70 34 L130 52 L190 66";
  const areaPath = positive
    ? "M10 66 L70 52 L130 34 L190 20 L190 44 L10 44 Z"
    : "M10 20 L70 34 L130 52 L190 66 L190 44 L10 44 Z";

  return (
    <svg viewBox="0 0 200 90" className="tool-visual">
      <line x1="6" y1="44" x2="194" y2="44" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 4" />
      <path d={areaPath} fill={color} opacity="0.14" />
      <path d={linePath} stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy={positive ? 66 : 20} r="3.5" fill="var(--muted)" />
      <circle cx="190" cy={positive ? 20 : 66} r="4" fill={color} />
      <text x="10" y="80" fontFamily="var(--font-mono)" fontSize="9" fill="var(--muted)">
        Entry
      </text>
      <text x="190" y="80" textAnchor="end" fontFamily="var(--font-mono)" fontSize="9" fill={color}>
        Exit
      </text>
    </svg>
  );
}
