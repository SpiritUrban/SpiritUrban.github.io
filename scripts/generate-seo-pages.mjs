import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const slugs = [
  "dorobka-saitu",
  "pidtrimka-saitu",
  "rozibratisya-z-saitom",
  "poperednij-programist-propav",
  "seo-systems",
  "cases/my-transfer",
  "mentoring",
];

const template = (slug, locale) => `import { SeoPage } from "@/components/SeoPage";
import { getSeoPageMetadata } from "@/data/pages";

const SLUG = "${slug}" as const;

export const metadata = getSeoPageMetadata(SLUG, "${locale}");

export default function Page() {
  return <SeoPage slug={SLUG} locale="${locale}" />;
}
`;

for (const slug of slugs) {
  for (const locale of ["uk", "en"]) {
    const base = locale === "uk" ? "app" : join("app", "en");
    const dir = join(root, base, slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "page.tsx"), template(slug, locale));
  }
}

console.log("SEO pages generated.");