import type { Block } from "@/data/types";
import { Hero } from "./sections/Hero";
import { PainSection } from "./sections/PainSection";
import { SolutionSection } from "./sections/SolutionSection";
import { Stats } from "./sections/Stats";
import { ProcessSection } from "./sections/ProcessSection";
import { PricingSection } from "./sections/PricingSection";
import { TrustSection } from "./sections/TrustSection";
import { CTA } from "./sections/CTA";

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "hero":
      return <Hero block={block} />;
    case "pain":
      return <PainSection block={block} />;
    case "solution":
      return <SolutionSection block={block} />;
    case "stats":
      return <Stats block={block} />;
    case "process":
      return <ProcessSection block={block} />;
    case "pricing":
      return <PricingSection block={block} />;
    case "trust":
      return <TrustSection block={block} />;
    case "cta":
      return <CTA block={block} />;
    default:
      return null;
  }
}