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

const TELEGRAM = "https://t.me/SpiritUrban";

type LocalizedLabel = Record<Locale, string>;

type NavDropdownChild = {
  id: string;
  label: LocalizedLabel;
  getHref: (locale: Locale) => string;
  matchPath: (path: string) => boolean;
};

type NavLinkEntry = {
  type: "link";
  id: string;
  label: LocalizedLabel;
  getHref: (locale: Locale) => string;
  external?: boolean;
  matchPath?: (path: string, isHome: boolean) => boolean;
};

type NavDropdownEntry = {
  type: "dropdown";
  id: string;
  label: LocalizedLabel;
  items: NavDropdownChild[];
  matchPath: (pathname: string) => boolean;
};

export type NavEntry = NavLinkEntry | NavDropdownEntry;

const situationLabels: Record<SituationSlug, LocalizedLabel> = {
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

function normalizePath(path: string): string {
  return path.replace(/\/$/, "") || "/";
}

function slugPath(slug: string): string {
  return `/${slug}`;
}

export const navEntries: NavEntry[] = [
  {
    type: "link",
    id: "home",
    label: { uk: "Головна", en: "Home" },
    getHref: (locale) => getLocalePath(locale),
    matchPath: (_path, isHome) => isHome,
  },
  {
    type: "dropdown",
    id: "situations",
    label: { uk: "Ситуації", en: "Situations" },
    matchPath: isSituationPath,
    items: situationSlugs.map((slug) => ({
      id: slug,
      label: situationLabels[slug],
      getHref: (locale) => getSeoPagePath(slug, locale),
      matchPath: (path) => normalizePath(path) === slugPath(slug),
    })),
  },
  {
    type: "link",
    id: "cases",
    label: { uk: "Кейси", en: "Cases" },
    getHref: (locale) => getSeoPagePath("cases/my-transfer", locale),
    matchPath: (path) => path.includes("cases/my-transfer"),
  },
  {
    type: "link",
    id: "mentoring",
    label: { uk: "Менторство", en: "Mentoring" },
    getHref: (locale) => getSeoPagePath("mentoring", locale),
    matchPath: (path) => path.includes("mentoring"),
  },
  {
    type: "link",
    id: "about",
    label: { uk: "Про мене", en: "About" },
    getHref: (locale) => {
      const homePath = getLocalePath(locale);
      return `${homePath}${homePath.endsWith("/") ? "" : "/"}#trust`;
    },
  },
  {
    type: "link",
    id: "contact",
    label: { uk: "Контакти", en: "Contact" },
    getHref: () => TELEGRAM,
    external: true,
  },
];

export function isSituationPath(pathname: string): boolean {
  const normalized = normalizePath(pathname);
  return situationSlugs.some((slug) => {
    const uk = slugPath(slug);
    const en = `/en${uk}`;
    return normalized === uk || normalized === en;
  });
}

export function getResolvedNavEntries(locale: Locale) {
  return navEntries.map((entry) => {
    if (entry.type === "dropdown") {
      return {
        ...entry,
        label: entry.label[locale],
        items: entry.items.map((item) => ({
          ...item,
          label: item.label[locale],
          href: item.getHref(locale),
        })),
      };
    }

    return {
      ...entry,
      label: entry.label[locale],
      href: entry.getHref(locale),
    };
  });
}