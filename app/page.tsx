import { SitePage } from "@/components/SitePage";
import { getPageMetadata } from "@/lib/content";

export const metadata = getPageMetadata("uk");

export default function Home() {
  return <SitePage locale="uk" />;
}