import type { PricingBlock } from "@/lib/types";
import "./pricing.css";

export function PricingSection({ block }: { block: PricingBlock }) {
  return (
    <section className="section pricing-section">
      <div className="container">
        {block.label && <p className="eyebrow">{block.label}</p>}
        <h2>{block.title}</h2>
        <p className="section-text">{block.text}</p>

        <div className="pricing-grid">
          {block.items.map((item) => (
            <article
              key={item.title}
              className={`pricing-card${item.highlighted ? " pricing-card--accent" : ""}`}
            >
              <h3>{item.title}</h3>
              <p className="pricing-card__price">{item.price}</p>
              <p className="pricing-card__desc">{item.description}</p>
              <ul className="pricing-card__features">
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className={`btn pricing-card__action${item.highlighted ? " primary" : ""}`}
                href={item.action.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.action.label}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}