import { BlockRenderer } from "@/components/BlockRenderer";
import { siteContent } from "@/lib/content";

export default function Home() {
  return (
    <main>
      {siteContent.blocks.map((block, index) => (
        <BlockRenderer key={`${block.type}-${index}`} block={block} />
      ))}
    </main>
  );
}