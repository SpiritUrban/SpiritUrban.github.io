export type Action = {
  label: string;
  url: string;
  variant?: "primary" | "";
};

export type HeroBlock = {
  type: "hero";
  label: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  actions: Action[];
};

export type PainBlock = {
  type: "pain";
  label?: string;
  title: string;
  items: string[];
};

export type SolutionBlock = {
  type: "solution";
  label?: string;
  title: string;
  text: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type StatsBlock = {
  type: "stats";
  label: string;
  title: string;
  projectName: string;
  text: string;
  items: StatItem[];
  footerText: string;
  action: Action;
};

export type ProcessStep = {
  title: string;
  text: string;
};

export type ProcessBlock = {
  type: "process";
  label?: string;
  title: string;
  steps: ProcessStep[];
};

export type PricingItem = {
  title: string;
  price: string;
  description: string;
  features: string[];
  action: Action;
  highlighted?: boolean;
};

export type PricingBlock = {
  type: "pricing";
  label?: string;
  title: string;
  text: string;
  items: PricingItem[];
};

export type TrustBlock = {
  type: "trust";
  label?: string;
  title: string;
  items: string[];
};

export type CTABlock = {
  type: "cta";
  title: string;
  text: string;
  action: Action;
};

export type Block =
  | HeroBlock
  | PainBlock
  | SolutionBlock
  | StatsBlock
  | ProcessBlock
  | PricingBlock
  | TrustBlock
  | CTABlock;

export type SiteMeta = {
  title: string;
  description: string;
};

export type SiteContent = {
  meta: SiteMeta;
  blocks: Block[];
};

export type SeoPageContent = {
  meta: SiteMeta;
  eyebrow: string;
  title: string;
  lead: string;
  problems: string[];
  helpTitle: string;
  helpItems: string[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
};