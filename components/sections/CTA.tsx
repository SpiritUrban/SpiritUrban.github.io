import type { CTABlock } from "@/data/types";

export function CTA({ block }: { block: CTABlock }) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta">
          <h2>{block.title}</h2>
          <p>{block.text}</p>
          <a
            className="btn primary"
            href={block.action.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {block.action.label}
          </a>
        </div>
      </div>
    </section>
  );
}