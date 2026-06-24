import type { SiteContent } from "@/lib/types";

export const enContent: SiteContent = {
  meta: {
    title: "Vitalii Diachuk | Fullstack Developer & Mentor",
    description:
      "20 years in the web. From design and 3D to Next.js, SEO systems, web services, and technical mentoring.",
  },
  blocks: [
    {
      type: "hero",
      label: "Fullstack Developer • SEO Architect • Mentor",
      title: "I build <span>web systems</span>, not just websites",
      text: "20 years in the web. From design and 3D to Next.js, SEO systems, web services, and technical mentoring.",
      image: "/assets/img/iam-2.png",
      imageAlt: "Vitalii Diachuk",
      code: `const project = {
  seo: true,
  scalable: true,
  maintainable: true,
  business: true
}`,
      actions: [
        {
          label: "Message on Telegram",
          url: "https://t.me/SpiritUrban",
          variant: "primary",
        },
        {
          label: "Portfolio",
          url: "https://spiriturban.github.io/projects/",
        },
      ],
    },
    {
      type: "stats",
      label: "Real project",
      title: "A real project example",
      projectName: "My Transfer",
      text: "My Transfer — a website for international transfers, built not as a single page but as a scalable SEO system.",
      items: [
        { value: "400+", label: "route pages" },
        { value: "5", label: "language versions" },
        { value: "SEO", label: "structure for Google" },
        { value: "API", label: "service integrations" },
        { value: "∞", label: "can expand further" },
      ],
      footerText:
        "This is not just a business card site. It is a system you can scale: add new cities, routes, languages, SEO pages, and integrations without rebuilding the site from scratch.",
      action: {
        label: "View project",
        url: "https://my-transfer.com.ua/",
        variant: "primary",
      },
    },
    {
      type: "cards",
      label: "Work",
      title: "How I can help",
      text: "I don't just sell hours. I help build a technical foundation that makes business sense.",
      items: [
        {
          kicker: "01",
          title: "SEO systems",
          text: "Routes, cities, categories, mass pages, structure, metadata, internal linking.",
        },
        {
          kicker: "02",
          title: "Web services",
          text: "Admin panels, dashboards, APIs, databases, integrations, business logic.",
        },
        {
          kicker: "03",
          title: "Enhancements",
          text: "I take over existing projects: optimization, redesign, refactoring, new features.",
        },
        {
          kicker: "04",
          title: "Mentoring",
          text: "React, Next.js, Node.js, architecture, interviews, real tasks, hands-on coding.",
        },
      ],
    },
    {
      type: "cards",
      label: "Approach",
      title: "Approach",
      items: [
        {
          title: "Architecture matters more than page count",
          text: "400 pages can be manual routine, or they can be a proper generation system.",
        },
        {
          title: "SEO should be built in from day one",
          text: "URLs, headings, structure, data, internal linking, and content blocks are the foundation.",
        },
        {
          title: "A project must live after launch",
          text: "A site should grow without a full rebuild every time.",
        },
      ],
    },
    {
      type: "text",
      label: "Mentoring",
      title: "Mentoring for developers",
      text: "Practical 1-on-1 sessions: code, architecture, React, Next.js, Node.js, interviews, real tasks. 500 UAH/hour.",
    },
    {
      type: "cta",
      title: "Need a website, service, or technical review?",
      text: "Message me on Telegram. Briefly describe your task — I'll tell you what actually needs to be done.",
      action: {
        label: "Message @SpiritUrban",
        url: "https://t.me/SpiritUrban",
      },
    },
  ],
};