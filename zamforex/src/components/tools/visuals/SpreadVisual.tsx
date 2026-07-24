export default function SpreadVisual() {
  return (
    <svg viewBox="0 0 180 110" className="tool-visual">
      <text x="90" y="16" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--red)">
        ASK PRICE
      </text>
      <line x1="30" y1="24" x2="150" y2="24" stroke="var(--red)" strokeWidth="1.6" />

      <rect x="70" y="24" width="40" height="52" fill="var(--gold)" opacity="0.16" />
      <line x1="90" y1="24" x2="90" y2="76" stroke="var(--gold)" strokeWidth="1.4" strokeDasharray="3 3" />
      <text x="120" y="54" fontFamily="var(--font-mono)" fontSize="9" fill="var(--gold)">
        SPREAD
      </text>

      <line x1="30" y1="76" x2="150" y2="76" stroke="var(--mint)" strokeWidth="1.6" />
      <text x="90" y="96" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--mint)">
        BID PRICE
      </text>
    </svg>
  );
}
