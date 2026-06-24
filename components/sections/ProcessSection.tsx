import type { ProcessBlock } from "@/data/types";
import "@/styles/sections/process.css";

export function ProcessSection({ block }: { block: ProcessBlock }) {
  return (
    <section className="section process-section">
      <div className="container">
        {block.label && <p className="eyebrow">{block.label}</p>}
        <h2>{block.title}</h2>
        <div className="process-grid">
          {block.steps.map((step, index) => (
            <article key={step.title} className="process-step">
              <span className="process-step__num">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}