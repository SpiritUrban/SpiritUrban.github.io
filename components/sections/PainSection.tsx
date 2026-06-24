import type { PainBlock } from "@/data/types";
import "@/styles/sections/pain.css";

export function PainSection({ block }: { block: PainBlock }) {
  return (
    <section className="section pain-section">
      <div className="container">
        {block.label && <p className="eyebrow">{block.label}</p>}
        <h2>{block.title}</h2>
        <div className="pain-grid">
          {block.items.map((item) => (
            <article key={item} className="pain-card">
              <span className="pain-card__mark" aria-hidden="true">
                ✓
              </span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}