import Reveal from "@/components/common/Reveal";

export type EducationContent = {
  whatItDoes: string;
  whyItMatters: string;
  inputs: { name: string; desc: string }[];
  formula: string;
  formulaNote?: string;
  example: string;
  limitations: string[];
};

export default function EducationSection({ content }: { content: EducationContent }) {
  return (
    <section className="cat-section edu-section">
      <Reveal className="section-head">
        <div className="eyebrow">How This Calculator Works</div>
        <h2>Understand the numbers, not just the answer</h2>
      </Reveal>

      <div className="edu-grid">
        <div className="edu-block glow-card">
          <h3>What It Does</h3>
          <p>{content.whatItDoes}</p>
        </div>
        <div className="edu-block glow-card">
          <h3>Why It Matters</h3>
          <p>{content.whyItMatters}</p>
        </div>
      </div>

      <div className="edu-block edu-block--wide glow-card">
        <h3>Understanding the Inputs</h3>
        <dl className="edu-input-list">
          {content.inputs.map((i) => (
            <div className="edu-input-row" key={i.name}>
              <dt>{i.name}</dt>
              <dd>{i.desc}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="edu-grid">
        <div className="edu-block glow-card">
          <h3>The Formula</h3>
          <code className="edu-formula">{content.formula}</code>
          {content.formulaNote && <p className="edu-formula-note">{content.formulaNote}</p>}
        </div>
        <div className="edu-block glow-card">
          <h3>Worked Example</h3>
          <p>{content.example}</p>
        </div>
      </div>

      <div className="edu-block edu-block--wide glow-card">
        <h3>Limitations to Keep in Mind</h3>
        <ul className="edu-limitations">
          {content.limitations.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
