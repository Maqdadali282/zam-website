export default function RiskRewardVisual({ ratio = 2 }: { ratio?: number }) {
  const clampedRatio = Math.min(4, Math.max(0.25, Number.isFinite(ratio) && ratio > 0 ? ratio : 2));
  const unit = 22;
  const rewardH = Math.min(64, unit * clampedRatio);
  const riskH = unit;
  const entryY = 20 + rewardH;
  const slY = entryY + riskH;

  return (
    <svg viewBox="0 0 180 140" className="tool-visual">
      <text x="90" y="12" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--mint)">
        TAKE PROFIT
      </text>
      <rect x="40" y="20" width="100" height={rewardH} fill="var(--mint)" opacity="0.16" />
      <line x1="40" y1="20" x2="140" y2="20" stroke="var(--mint)" strokeWidth="1.4" />
      <text x="20" y={20 + rewardH / 2 + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--mint)">
        Reward
      </text>

      <line x1="30" y1={entryY} x2="150" y2={entryY} stroke="var(--text)" strokeWidth="2" />
      <text x="90" y={entryY - 6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--text)">
        ENTRY
      </text>

      <rect x="40" y={entryY} width="100" height={riskH} fill="var(--red)" opacity="0.16" />
      <text x="20" y={entryY + riskH / 2 + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--red)">
        Risk
      </text>
      <line x1="40" y1={slY} x2="140" y2={slY} stroke="var(--red)" strokeWidth="1.4" />
      <text x="90" y={slY + 16} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--red)">
        STOP LOSS
      </text>
    </svg>
  );
}
