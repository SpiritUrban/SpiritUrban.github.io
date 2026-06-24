import { SeoPage } from "@/components/SeoPage";
import { getSeoPageMetadata } from "@/data/pages";

const SLUG = "seo-systems" as const;

export const metadata = getSeoPageMetadata(SLUG, "uk");

export default function Page() {
  return <SeoPage slug={SLUG} locale="uk" />;
}
