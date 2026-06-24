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
  text: string;
  items: StatItem[];
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

export type Block =
  | HeroBlock
  | CardsBlock
  | StatsBlock
  | TextBlock
  | CTABlock;

export type SiteContent = {
  blocks: Block[];
};