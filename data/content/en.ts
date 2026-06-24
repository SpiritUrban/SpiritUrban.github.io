import type { SiteContent } from "@/data/types";

const TELEGRAM = "https://t.me/SpiritUrban";

export const enContent: SiteContent = {
  meta: {
    title: "Vitalii Diachuk | Help with complex websites and web projects",
    description:
      "I help website owners understand complex situations, regain control over their project, and build a growth plan.",
  },
  blocks: [
    {
      type: "hero",
      label: "Specialist in complex web project development",
      title:
        "I help you understand <span>complex websites</span> and web projects",
      text: "When a site already exists but becomes harder to grow — I help find the problems, build a development plan, and bring the project to results.",
      image: "/assets/img/iam-2.png",
      imageAlt: "Vitalii Diachuk",
      actions: [
        {
          label: "Discuss your project",
          url: TELEGRAM,
          variant: "primary",
        },
      ],
    },
    {
      type: "pain",
      label: "Situation",
      title: "Sound familiar?",
      items: [
        "The previous developer disappeared",
        "Nobody understands the code",
        "It's scary to change anything",
        "New features cost too much",
        "Unclear what to do next",
      ],
    },
    {
      type: "solution",
      label: "Solution",
      title: "You don't always need a brand new website",
      text: "Often it's enough to understand what works, what blocks growth, and build a realistic plan for change.",
    },
    {
      type: "stats",
      label: "Case",
      title: "What a system looks like in practice",
      projectName: "My Transfer",
      text: "An international transfer service that grew with the business — from a regular website to a scalable SEO system with multiple languages.",
      items: [
        { value: "400+", label: "pages in the system" },
        { value: "5", label: "languages for clients" },
        { value: "SEO", label: "search-ready structure" },
        { value: "API", label: "service integrations" },
        { value: "∞", label: "growth without rebuild" },
      ],
      footerText:
        "The business grows — new cities, routes, languages, and pages are added. Without rebuilding the site from scratch.",
      action: {
        label: "View project",
        url: "https://my-transfer.com.ua/",
        variant: "primary",
      },
    },
    {
      type: "process",
      label: "Process",
      title: "How I work",
      steps: [
        {
          title: "Call",
          text: "You describe the situation in your own words.",
        },
        {
          title: "Analysis",
          text: "I figure out what's going on.",
        },
        {
          title: "Plan",
          text: "I propose solution options.",
        },
        {
          title: "Implementation",
          text: "We implement the most important changes.",
        },
      ],
    },
    {
      type: "pricing",
      label: "Pricing",
      title: "Collaboration formats",
      text: "You can start with a consultation, a mentoring session, or full development. The format depends on the task, scale, and level of responsibility.",
      items: [
        {
          title: "Mentoring",
          price: "500 UAH / hour",
          description: "Practical 1-on-1 sessions for developers.",
          features: [
            "React, Next.js, Node.js",
            "code review",
            "architecture",
            "interview prep",
            "real-world tasks",
          ],
          action: { label: "Book a session", url: TELEGRAM },
        },
        {
          title: "Consultation",
          price: "from 1000 UAH",
          description: "A quick technical review of your site, idea, or project.",
          features: [
            "site structure",
            "SEO logic",
            "architecture issues",
            "growth plan",
            "complexity estimate",
          ],
          action: { label: "Request a review", url: TELEGRAM },
          highlighted: true,
        },
        {
          title: "Development",
          price: "from 10 000 UAH",
          description:
            "Business websites, personal sites, SEO structures, and service pages.",
          features: [
            "design and structure",
            "responsive layout",
            "reliable technical foundation",
            "basic SEO",
            "ready to grow",
          ],
          action: { label: "Discuss a website", url: TELEGRAM },
        },
        {
          title: "Complex systems",
          price: "custom pricing",
          description:
            "Web services, dashboards, admin panels, APIs, SEO platforms, and long-term development.",
          features: [
            "APIs and integrations",
            "database",
            "user accounts",
            "page generation",
            "support and growth",
          ],
          action: { label: "Discuss a system", url: TELEGRAM },
        },
      ],
    },
    {
      type: "trust",
      label: "Trust",
      title: "Why people trust me",
      items: [
        "20 years in the web",
        "Hands-on experience",
        "Working with existing code",
        "I explain in plain language",
        "Direct contact available",
      ],
    },
    {
      type: "cta",
      title: "Have a complex situation with your site?",
      text: "Message me on Telegram — briefly describe your task. We'll figure out what's going on and what to do next.",
      action: {
        label: "Message @SpiritUrban",
        url: TELEGRAM,
      },
    },
  ],
};