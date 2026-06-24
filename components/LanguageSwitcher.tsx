"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels } from "@/lib/i18n/config";
import {
  getAlternateLocales,
  getLocaleFromPathname,
  getLocalePath,
} from "@/lib/i18n/routing";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);

  return (
    <nav className="lang-switcher" aria-label="Language">
      {getAlternateLocales(currentLocale).map((locale) => (
        <Link
          key={locale}
          href={getLocalePath(locale, pathname)}
          className="lang-switcher__link"
          hrefLang={locale}
          lang={locale}
        >
          {localeLabels[locale]}
        </Link>
      ))}
    </nav>
  );
}