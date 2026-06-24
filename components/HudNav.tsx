"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getResolvedNavEntries } from "@/data/navigation";
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
  const items = getResolvedNavEntries(locale);
  const path = stripLocaleFromPathname(pathname).replace(/\/$/, "") || "/";
  const isHome = path === "/" || path === "";
  const lastIndex = items.length - 1;

  return (
    <nav
      className="hud-nav"
      aria-label={locale === "uk" ? "Навігація" : "Navigation"}
    >
      <div className="container hud-nav__inner">
        <ul className="hud-nav__list">
          {items.map((entry, index) => {
            const showSeparator = index < lastIndex;

            if (entry.type === "dropdown") {
              return (
                <li
                  key={entry.id}
                  className="hud-nav__item hud-nav__item--dropdown"
                >
                  <button
                    type="button"
                    className={`hud-nav__trigger${
                      entry.matchPath(pathname) ? " hud-nav__trigger--active" : ""
                    }`}
                    aria-haspopup="true"
                  >
                    {entry.label}
                    <span className="hud-nav__caret" aria-hidden="true">
                      ▾
                    </span>
                  </button>
                  {showSeparator && <NavSeparator />}
                  <ul className="hud-nav__dropdown">
                    {entry.items.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className={`hud-nav__dropdown-link${
                            item.matchPath(path)
                              ? " hud-nav__dropdown-link--active"
                              : ""
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li key={entry.id} className="hud-nav__item">
                {entry.external ? (
                  <a
                    href={entry.href}
                    className="hud-nav__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {entry.label}
                  </a>
                ) : (
                  <Link
                    href={entry.href}
                    className={`hud-nav__link${
                      entry.matchPath?.(path, isHome)
                        ? " hud-nav__link--active"
                        : ""
                    }`}
                  >
                    {entry.label}
                  </Link>
                )}
                {showSeparator && <NavSeparator />}
              </li>
            );
          })}
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