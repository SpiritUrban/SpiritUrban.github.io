import type { Locale } from "@/lib/i18n/config";
import { getSeoPagePath, type SeoPageSlug } from "@/data/pages";
import { getLocalePath } from "@/lib/i18n/routing";

export type SituationSlug = Exclude<
  SeoPageSlug,
  "cases/my-transfer" | "mentoring"
>;

export const situationSlugs: SituationSlug[] = [
  "dorobka-saitu",
  "pidtrimka-saitu",
  "poperednij-programist-propav",
  "rozibratisya-z-saitom",
  "seo-systems",
];

const situationLabels: Record<SituationSlug, Record<Locale, string>> = {
  "dorobka-saitu": { uk: "Доробити сайт", en: "Website enhancements" },
  "pidtrimka-saitu": { uk: "Підтримка сайту", en: "Website support" },
  "poperednij-programist-propav": {
    uk: "Попередній розробник зник",
    en: "Developer disappeared",
  },
  "rozibratisya-z-saitom": {
    uk: "Розібратися з сайтом",
    en: "Understand your site",
  },
  "seo-systems": { uk: "SEO-системи", en: "SEO systems" },
};

const TELEGRAM = "https://t.me/SpiritUrban";

export function getNavItems(locale: Locale) {
  const homePath = getLocalePath(locale);
  const isUk = locale === "uk";

  return {
    home: { label: isUk ? "Головна" : "Home", href: homePath },
    situations: {
      label: isUk ? "Ситуації" : "Situations",
      items: situationSlugs.map((slug) => ({
        slug,
        label: situationLabels[slug][locale],
        href: getSeoPagePath(slug, locale),
      })),
    },
    cases: {
      label: isUk ? "Кейси" : "Cases",
      href: getSeoPagePath("cases/my-transfer", locale),
    },
    mentoring: {
      label: isUk ? "Менторство" : "Mentoring",
      href: getSeoPagePath("mentoring", locale),
    },
    about: {
      label: isUk ? "Про мене" : "About",
      href: `${homePath}${homePath.endsWith("/") ? "" : "/"}#trust`,
    },
    contact: {
      label: isUk ? "Контакти" : "Contact",
      href: TELEGRAM,
      external: true,
    },
  };
}

export function isSituationPath(pathname: string): boolean {
  const normalized = pathname.replace(/\/$/, "");
  return situationSlugs.some((slug) => {
    const uk = `/${slug}`;
    const en = `/en/${slug}`;
    return normalized === uk || normalized === en;
  });
}