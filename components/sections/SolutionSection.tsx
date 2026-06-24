import type { SolutionBlock } from "@/data/types";

export function SolutionSection({ block }: { block: SolutionBlock }) {
  return (
    <section className="section section-accent">
      <div className="container narrow">
        {block.label && <p className="eyebrow">{block.label}</p>}
        <h2>{block.title}</h2>
        <p className="lead">{block.text}</p>
      </div>
    </section>
  );
}