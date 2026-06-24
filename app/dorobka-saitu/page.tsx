import { SeoPage } from "@/components/SeoPage";
import { getSeoPageMetadata } from "@/data/pages";

const SLUG = "dorobka-saitu" as const;

export const metadata = getSeoPageMetadata(SLUG, "uk");

export default function Page() {
  return <SeoPage slug={SLUG} locale="uk" />;
}
