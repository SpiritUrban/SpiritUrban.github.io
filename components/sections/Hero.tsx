import { HudNav } from "@/components/HudNav";
import type { HeroBlock } from "@/data/types";
import "@/styles/sections/hero.css";

export function Hero({ block }: { block: HeroBlock }) {
  return (
    <section className="hero">
      <HudNav />
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__copy-body">
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
        </div>
        <div className="hero__photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.image} alt={block.imageAlt} />
        </div>
      </div>
    </section>
  );
}