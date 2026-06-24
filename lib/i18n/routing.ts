import { defaultLocale, locales, type Locale } from "./config";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function stripLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isLocale(first) && first !== defaultLocale) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return pathname || "/";
}

export function getLocalePath(locale: Locale, pathname = "/"): string {
  const pathWithoutLocale = stripLocaleFromPathname(pathname);
  const suffix = pathWithoutLocale === "/" ? "" : pathWithoutLocale;

  if (locale === defaultLocale) {
    return suffix || "/";
  }

  return `/${locale}${suffix}`;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];

  if (segment && isLocale(segment) && segment !== defaultLocale) {
    return segment;
  }

  return defaultLocale;
}

export function getAlternateLocales(locale: Locale): Locale[] {
  return locales.filter((item) => item !== locale);
}