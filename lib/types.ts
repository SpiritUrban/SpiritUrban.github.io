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
  code: string;
  actions: Action[];
};

export type CardItem = {
  kicker?: string;
  title: string;
  text: string;
};

export type CardsBlock = {
  type: "cards";
  label?: string;
  title: string;
  text?: string;
  items: CardItem[];
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

export type TextBlock = {
  type: "text";
  label: string;
  title: string;
  text: string;
};

export type CTABlock = {
  type: "cta";
  title: string;
  text: string;
  action: Action;
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

export type Block =
  | HeroBlock
  | CardsBlock
  | StatsBlock
  | TextBlock
  | PricingBlock
  | CTABlock;

export type SiteMeta = {
  title: string;
  description: string;
};

export type SiteContent = {
  meta: SiteMeta;
  blocks: Block[];
};