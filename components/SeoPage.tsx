import Link from "next/link";
import { HudNav } from "@/components/HudNav";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import {
  getSeoPageContent,
  getSeoPageCtaUrl,
  type SeoPageSlug,
} from "@/data/pages";
import type { Locale } from "@/lib/i18n/config";
import { getLocalePath } from "@/lib/i18n/routing";
import "@/styles/sections/seo-page.css";

export function SeoPage({
  slug,
  locale,
}: {
  slug: SeoPageSlug;
  locale: Locale;
}) {
  const content = getSeoPageContent(slug, locale);
  const ctaUrl = getSeoPageCtaUrl(slug);
  const homeLabel = locale === "uk" ? "На головну" : "Back to home";

  return (
    <>
      <SetHtmlLang locale={locale} />
      <main className="seo-page">
        <HudNav />
        <section className="section seo-page-hero">
          <div className="container narrow">
            <Link href={getLocalePath(locale)} className="seo-page-back">
              ← {homeLabel}
            </Link>
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="lead">{content.lead}</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>
              {locale === "uk" ? "Знайома ситуація?" : "Sound familiar?"}
            </h2>
            <ul className="seo-page-list">
              {content.problems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section-accent">
          <div className="container">
            <h2>{content.helpTitle}</h2>
            <ul className="seo-page-list seo-page-list--accent">
              {content.helpItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="cta">
              <h2>{content.ctaTitle}</h2>
              <p>{content.ctaText}</p>
              <a
                className="btn primary"
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.ctaLabel}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}