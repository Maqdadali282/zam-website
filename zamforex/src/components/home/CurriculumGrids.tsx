import Reveal from "@/components/common/Reveal";

export function FrameworksSection() {
  return (
    <section id="frameworks">
      <Reveal className="section-head">
        <div className="eyebrow">Frameworks</div>
        <h2>Turn analysis into a system</h2>
        <p>
          A framework is what keeps decisions consistent when emotions run
          high.
        </p>
      </Reveal>
      <Reveal className="broker-grid">
        <div className="broker-card glow-card">
          <h4>Risk Management</h4>
          <p>
            Position sizing, stop-loss placement, and risk-to-reward —
            protecting capital before chasing profit.
          </p>
          <div className="broker-tags">
            <span>Position Sizing</span>
            <span>Stop-Loss</span>
          </div>
        </div>
        <div className="broker-card glow-card">
          <h4>Trading Plans</h4>
          <p>
            Entry rules, exit rules, and a journal — the difference between a
            hobby and a discipline.
          </p>
          <div className="broker-tags">
            <span>Journaling</span>
            <span>Rules-Based</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
