import type { TrustBlock } from "@/data/types";
import "@/styles/sections/trust.css";

export function TrustSection({ block }: { block: TrustBlock }) {
  return (
    <section id="trust" className="section trust-section">
      <div className="container">
        {block.label && <p className="eyebrow">{block.label}</p>}
        <h2>{block.title}</h2>
        <ul className="trust-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}