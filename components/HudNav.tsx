"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavItems, isSituationPath } from "@/data/navigation";
import { localeLabels } from "@/lib/i18n/config";
import {
  getAlternateLocales,
  getLocaleFromPathname,
  getLocalePath,
  stripLocaleFromPathname,
} from "@/lib/i18n/routing";
import "@/styles/components/hud-nav.css";

function NavSeparator() {
  return (
    <span className="hud-nav__sep" aria-hidden="true">
      ·
    </span>
  );
}

export function HudNav() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const nav = getNavItems(locale);
  const path = stripLocaleFromPathname(pathname).replace(/\/$/, "") || "/";
  const isHome = path === "/" || path === "";

  return (
    <nav className="hud-nav" aria-label={locale === "uk" ? "Навігація" : "Navigation"}>
      <div className="container hud-nav__inner">
        <ul className="hud-nav__list">
          <li className="hud-nav__item">
            <Link
              href={nav.home.href}
              className={`hud-nav__link${isHome ? " hud-nav__link--active" : ""}`}
            >
              {nav.home.label}
            </Link>
          </li>

          <NavSeparator />

          <li className="hud-nav__item hud-nav__item--dropdown">
            <button
              type="button"
              className={`hud-nav__trigger${isSituationPath(pathname) ? " hud-nav__trigger--active" : ""}`}
              aria-haspopup="true"
            >
              {nav.situations.label}
              <span className="hud-nav__caret" aria-hidden="true">
                ▾
              </span>
            </button>
            <ul className="hud-nav__dropdown">
              {nav.situations.items.map((item) => {
                const itemPath = stripLocaleFromPathname(item.href).replace(
                  /\/$/,
                  "",
                );
                const isActive = path === itemPath;

                return (
                  <li key={item.slug}>
                    <Link
                      href={item.href}
                      className={`hud-nav__dropdown-link${isActive ? " hud-nav__dropdown-link--active" : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>

          <NavSeparator />

          <li className="hud-nav__item">
            <Link
              href={nav.cases.href}
              className={`hud-nav__link${
                path.includes("cases/my-transfer")
                  ? " hud-nav__link--active"
                  : ""
              }`}
            >
              {nav.cases.label}
            </Link>
          </li>

          <NavSeparator />

          <li className="hud-nav__item">
            <Link
              href={nav.mentoring.href}
              className={`hud-nav__link${
                path.includes("mentoring") ? " hud-nav__link--active" : ""
              }`}
            >
              {nav.mentoring.label}
            </Link>
          </li>

          <NavSeparator />

          <li className="hud-nav__item">
            <Link
              href={nav.about.href}
              className={`hud-nav__link${isHome ? "" : ""}`}
            >
              {nav.about.label}
            </Link>
          </li>

          <NavSeparator />

          <li className="hud-nav__item">
            <a
              href={nav.contact.href}
              className="hud-nav__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {nav.contact.label}
            </a>
          </li>
        </ul>

        <ul className="hud-nav__lang" aria-label="Language">
          {getAlternateLocales(locale).map((item) => (
            <li key={item}>
              <Link
                href={getLocalePath(item, pathname)}
                className="hud-nav__lang-link"
                hrefLang={item}
                lang={item}
              >
                {localeLabels[item]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}