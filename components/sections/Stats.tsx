import type { StatsBlock } from "@/lib/types";

export function Stats({ block }: { block: StatsBlock }) {
  return (
    <section className="section section-accent">
      <div className="container">
        <p className="eyebrow">{block.label}</p>
        <h2>{block.title}</h2>
        <p className="section-text">{block.text}</p>
        <div className="stats">
          {block.items.map((item) => (
            <div key={item.label} className="stat">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}