import type { CardsBlock } from "@/lib/types";

export function Cards({ block }: { block: CardsBlock }) {
  return (
    <section className="section">
      <div className="container">
        {block.label && <p className="eyebrow">{block.label}</p>}
        <h2>{block.title}</h2>
        {block.text && <p className="section-text">{block.text}</p>}
        <div className="cards">
          {block.items.map((item) => (
            <article key={item.title} className="card">
              {item.kicker && <p className="card-kicker">{item.kicker}</p>}
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}