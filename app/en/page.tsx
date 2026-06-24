import { SitePage } from "@/components/SitePage";
import { getPageMetadata } from "@/lib/content";

export const metadata = getPageMetadata("en");

export default function EnglishHome() {
  return <SitePage locale="en" />;
}