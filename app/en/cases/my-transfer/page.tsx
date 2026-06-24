import { SeoPage } from "@/components/SeoPage";
import { getSeoPageMetadata } from "@/data/pages";

const SLUG = "cases/my-transfer" as const;

export const metadata = getSeoPageMetadata(SLUG, "en");

export default function Page() {
  return <SeoPage slug={SLUG} locale="en" />;
}
