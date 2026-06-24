import type { Block } from "@/lib/types";
import { Hero } from "./sections/Hero";
import { Cards } from "./sections/Cards";
import { Stats } from "./sections/Stats";
import { Text } from "./sections/Text";
import { CTA } from "./sections/CTA";

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "hero":
      return <Hero block={block} />;
    case "cards":
      return <Cards block={block} />;
    case "stats":
      return <Stats block={block} />;
    case "text":
      return <Text block={block} />;
    case "cta":
      return <CTA block={block} />;
    default:
      return null;
  }
}