import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import { getLocalePath } from "@/lib/i18n/routing";
import type { SiteContent } from "@/lib/types";
import { enContent } from "./en";
import { ukContent } from "./uk";

const contentByLocale: Record<Locale, SiteContent> = {
  uk: ukContent,
  en: enContent,
};

export function getSiteContent(locale: Locale): SiteContent {
  return contentByLocale[locale];
}

export function getPageMetadata(locale: Locale): Metadata {
  const { meta } = getSiteContent(locale);

  const languages = Object.fromEntries(
    locales.map((item) => [item, getLocalePath(item)]),
  );

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: getLocalePath(locale),
      languages,
    },
  };
}