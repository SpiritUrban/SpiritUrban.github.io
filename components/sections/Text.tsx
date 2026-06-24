import type { TextBlock } from "@/lib/types";

export function Text({ block }: { block: TextBlock }) {
  return (
    <section className="section">
      <div className="container narrow">
        <p className="eyebrow">{block.label}</p>
        <h2>{block.title}</h2>
        <p className="lead">{block.text}</p>
      </div>
    </section>
  );
}