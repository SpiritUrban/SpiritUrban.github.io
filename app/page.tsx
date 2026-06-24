import { SitePage } from "@/components/SitePage";
import { getPageMetadata } from "@/data/content";

export const metadata = getPageMetadata("uk");

export default function Home() {
  return <SitePage locale="uk" />;
}