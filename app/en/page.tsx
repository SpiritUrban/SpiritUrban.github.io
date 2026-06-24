import { SitePage } from "@/components/SitePage";
import { getPageMetadata } from "@/data/content";

export const metadata = getPageMetadata("en");

export default function EnglishHome() {
  return <SitePage locale="en" />;
}