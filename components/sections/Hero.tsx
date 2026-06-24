import Image from "next/image";
import type { HeroBlock } from "@/lib/types";

export function Hero({ block }: { block: HeroBlock }) {
  return (
    <section className="section hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{block.label}</p>
          <h1 dangerouslySetInnerHTML={{ __html: block.title }} />
          <p className="lead">{block.text}</p>
          <div className="actions">
            {block.actions.map((action) => (
              <a
                key={action.url}
                className={`btn ${action.variant || ""}`}
                href={action.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
        <div className="hero-card">
          <Image
            src={block.image}
            alt={block.imageAlt}
            width={600}
            height={760}
            priority
          />
          <div className="code-card">
            <pre>{block.code}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}