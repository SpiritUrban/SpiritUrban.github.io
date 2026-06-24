import type { StatsBlock } from "@/lib/types";

export function Stats({ block }: { block: StatsBlock }) {
  return (
    <section className="section section-accent">
      <div className="container">
        <p className="eyebrow">{block.label}</p>
        <h2>{block.title}</h2>

        <div className="case-intro">
          <p className="case-intro__name">{block.projectName}</p>
          <p className="section-text case-intro__text">{block.text}</p>
        </div>

        <div className="stats">
          {block.items.map((item) => (
            <div key={item.label} className="stat">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <p className="case-footer">{block.footerText}</p>

        <div className="case-actions">
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