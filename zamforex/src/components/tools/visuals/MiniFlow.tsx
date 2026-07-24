export type MiniFlowStep = { label: string; value?: string };

export default function MiniFlow({ steps, accent }: { steps: MiniFlowStep[]; accent: string }) {
  return (
    <div className="mini-flow">
      {steps.map((step, i) => (
        <div className="mini-flow-step" key={step.label}>
          <div className="mini-flow-row">
            <span className="mini-flow-label">{step.label}</span>
            {step.value && (
              <span className="mini-flow-value" style={{ color: accent }}>
                {step.value}
              </span>
            )}
          </div>
          {i < steps.length - 1 && (
            <svg className="mini-flow-arrow" viewBox="0 0 24 24" style={{ color: accent }}>
              <path d="M12 4v14M12 18l-5-5M12 18l5-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
