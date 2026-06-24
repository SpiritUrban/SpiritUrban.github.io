import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import { getLocalePath } from "@/lib/i18n/routing";
import type { SeoPageContent } from "@/data/types";

export const seoPageSlugs = [
  "dorobka-saitu",
  "pidtrimka-saitu",
  "rozibratisya-z-saitom",
  "poperednij-programist-propav",
  "seo-systems",
  "cases/my-transfer",
  "mentoring",
] as const;

export type SeoPageSlug = (typeof seoPageSlugs)[number];

const TELEGRAM = "https://t.me/SpiritUrban";

const pages: Record<SeoPageSlug, Record<Locale, SeoPageContent>> = {
  "dorobka-saitu": {
    uk: {
      meta: {
        title: "Доробити сайт | Віталій Дячук",
        description:
          "Допомагаю доробити існуючий сайт: зрозуміти що не так, побудувати план змін і реалізувати потрібні доопрацювання.",
      },
      eyebrow: "Доробка сайту",
      title: "Доробити сайт без хаосу і переплат",
      lead: "Коли сайт уже є, але не працює як треба — допомагаю розібратися, що саме потрібно змінити і в якому порядку.",
      problems: [
        "Сайт застарів або працює нестабільно",
        "Потрібні нові сторінки чи функції",
        "Незрозуміло скільки це коштує і з чого почати",
      ],
      helpTitle: "Що я роблю",
      helpItems: [
        "Розбираю поточний стан сайту",
        "Показую що критично, а що може почекати",
        "Пропоную реалістичний план доробок",
        "Беру в роботу найважливіші зміни",
      ],
      ctaTitle: "Потрібно доробити сайт?",
      ctaText: "Опиши ситуацію в Telegram — підкажу з чого почати.",
      ctaLabel: "Обговорити доробку",
    },
    en: {
      meta: {
        title: "Website enhancements | Vitalii Diachuk",
        description:
          "I help enhance existing websites: understand what's wrong, build a change plan, and implement the needed improvements.",
      },
      eyebrow: "Website enhancements",
      title: "Enhance your website without chaos or overpaying",
      lead: "When a site already exists but doesn't work as it should — I help figure out what to change and in what order.",
      problems: [
        "The site is outdated or unstable",
        "New pages or features are needed",
        "Unclear how much it costs and where to start",
      ],
      helpTitle: "What I do",
      helpItems: [
        "Review the current state of the site",
        "Show what's critical and what can wait",
        "Propose a realistic enhancement plan",
        "Implement the most important changes",
      ],
      ctaTitle: "Need to enhance your site?",
      ctaText: "Describe the situation on Telegram — I'll suggest where to start.",
      ctaLabel: "Discuss enhancements",
    },
  },
  "pidtrimka-saitu": {
    uk: {
      meta: {
        title: "Підтримка сайту | Віталій Дячук",
        description:
          "Підтримка та розвиток існуючого сайту. Допомагаю не втратити контроль над проєктом і впевнено вносити зміни.",
      },
      eyebrow: "Підтримка сайту",
      title: "Підтримка сайту, коли немає своєї команди",
      lead: "Беру на себе технічну частину — щоб ви могли розвивати бізнес, а не шукати розробника щоразу.",
      problems: [
        "Немає людини, яка підтримує сайт",
        "Боїшся, що зламається після змін",
        "Потрібні регулярні оновлення і доопрацювання",
      ],
      helpTitle: "Що входить у підтримку",
      helpItems: [
        "Виправлення помилок і дрібні доопрацювання",
        "Контроль стабільності сайту",
        "Планування наступних кроків розвитку",
        "Пояснення змін зрозумілою мовою",
      ],
      ctaTitle: "Потрібна підтримка сайту?",
      ctaText: "Напиши — розберемо, який формат підтримки вам підходить.",
      ctaLabel: "Обговорити підтримку",
    },
    en: {
      meta: {
        title: "Website support | Vitalii Diachuk",
        description:
          "Support and growth for existing websites. I help you keep control and make changes with confidence.",
      },
      eyebrow: "Website support",
      title: "Website support when you don't have your own team",
      lead: "I handle the technical side — so you can grow the business instead of searching for a developer every time.",
      problems: [
        "Nobody maintains the site",
        "Afraid something will break after changes",
        "Regular updates and improvements are needed",
      ],
      helpTitle: "What's included",
      helpItems: [
        "Bug fixes and small improvements",
        "Site stability monitoring",
        "Planning next development steps",
        "Clear explanations of every change",
      ],
      ctaTitle: "Need website support?",
      ctaText: "Message me — we'll find the right support format for you.",
      ctaLabel: "Discuss support",
    },
  },
  "rozibratisya-z-saitom": {
    uk: {
      meta: {
        title: "Розібратися з сайтом | Віталій Дячук",
        description:
          "Технічний аудит існуючого проєкту. Допомагаю зрозуміти стан сайту, ризики і варіанти розвитку.",
      },
      eyebrow: "Аудит проєкту",
      title: "Розібратися з сайтом і зрозуміти що далі",
      lead: "Коли сайт є, але ситуація незрозуміла — допомагаю побачити картину цілком і прийняти рішення без паніки.",
      problems: [
        "Незрозуміло в якому стані сайт",
        "Є сумніви щодо попередньої роботи",
        "Потрібна незалежна думка перед вкладеннями",
      ],
      helpTitle: "Що ви отримаєте",
      helpItems: [
        "Огляд структури і технічного стану",
        "Список проблем і ризиків",
        "Варіанти подальших дій",
        "Оцінку складності і пріоритетів",
      ],
      ctaTitle: "Потрібно розібратися з сайтом?",
      ctaText: "Напиши в Telegram — почнемо з короткого опису ситуації.",
      ctaLabel: "Замовити розбір",
    },
    en: {
      meta: {
        title: "Understand your website | Vitalii Diachuk",
        description:
          "Technical audit of an existing project. I help you understand the site's state, risks, and development options.",
      },
      eyebrow: "Project audit",
      title: "Understand your website and see what's next",
      lead: "When you have a site but the situation is unclear — I help you see the full picture and make decisions calmly.",
      problems: [
        "Unclear what state the site is in",
        "Doubts about previous work",
        "Need an independent opinion before investing",
      ],
      helpTitle: "What you get",
      helpItems: [
        "Overview of structure and technical state",
        "List of problems and risks",
        "Options for next steps",
        "Complexity and priority assessment",
      ],
      ctaTitle: "Need to understand your site?",
      ctaText: "Message me on Telegram — we'll start with a brief description.",
      ctaLabel: "Request a review",
    },
  },
  "poperednij-programist-propav": {
    uk: {
      meta: {
        title: "Попередній програміст зник | Віталій Дячук",
        description:
          "Допомагаю підхопити проєкт, коли попередній розробник недоступний. Відновлюю контроль і план дій.",
      },
      eyebrow: "Складна ситуація",
      title: "Попередній програміст зник — що робити далі",
      lead: "Підхоплюю проєкт, розбираюся в коді і допомагаю повернути контроль над сайтом без повної перебудови.",
      problems: [
        "Розробник не виходить на зв'язок",
        "Немає документації і пояснень",
        "Страшно щось змінювати самостійно",
      ],
      helpTitle: "Як я допомагаю",
      helpItems: [
        "Аналізую що вже зроблено",
        "Пояснюю стан проєкту простими словами",
        "Відновлюю доступи і стабільність",
        "Будую план подальших дій",
      ],
      ctaTitle: "Розробник зник і сайт завис?",
      ctaText: "Напиши — розберемо ситуацію і знайдемо вихід.",
      ctaLabel: "Отримати допомогу",
    },
    en: {
      meta: {
        title: "Previous developer disappeared | Vitalii Diachuk",
        description:
          "I help take over a project when the previous developer is unavailable. I restore control and a clear action plan.",
      },
      eyebrow: "Difficult situation",
      title: "Previous developer disappeared — what to do next",
      lead: "I take over the project, understand the code, and help you regain control without a full rebuild.",
      problems: [
        "Developer is unreachable",
        "No documentation or explanations",
        "Scared to change anything yourself",
      ],
      helpTitle: "How I help",
      helpItems: [
        "Analyze what's already been done",
        "Explain the project state in plain language",
        "Restore access and stability",
        "Build a plan for next steps",
      ],
      ctaTitle: "Developer gone and site stuck?",
      ctaText: "Message me — we'll review the situation and find a way forward.",
      ctaLabel: "Get help",
    },
  },
  "seo-systems": {
    uk: {
      meta: {
        title: "SEO-системи | Віталій Дячук",
        description:
          "Побудова SEO-систем для сайтів з великою кількістю сторінок: маршрути, міста, категорії, багатомовність.",
      },
      eyebrow: "SEO-системи",
      title: "SEO-система замість сотень ручних сторінок",
      lead: "Допомагаю будувати структуру, яка генерує і масштабує SEO-сторінки — без рутини і без хаосу.",
      problems: [
        "Багато сторінок створюються вручну",
        "Складно додавати нові міста чи напрямки",
        "SEO не масштабується разом із бізнесом",
      ],
      helpTitle: "Що входить у SEO-систему",
      helpItems: [
        "Структура URL і сторінок",
        "Шаблони для масових сторінок",
        "Мета-дані і перелінковка",
        "Багатомовність і розширення",
      ],
      ctaTitle: "Потрібна SEO-система?",
      ctaText: "Розкажи про свій проєкт — підкажу як це можна побудувати.",
      ctaLabel: "Обговорити SEO-систему",
    },
    en: {
      meta: {
        title: "SEO systems | Vitalii Diachuk",
        description:
          "Building SEO systems for sites with many pages: routes, cities, categories, multilingual support.",
      },
      eyebrow: "SEO systems",
      title: "An SEO system instead of hundreds of manual pages",
      lead: "I help build structures that generate and scale SEO pages — without routine and without chaos.",
      problems: [
        "Many pages are created manually",
        "Hard to add new cities or directions",
        "SEO doesn't scale with the business",
      ],
      helpTitle: "What's in an SEO system",
      helpItems: [
        "URL and page structure",
        "Templates for mass pages",
        "Metadata and internal linking",
        "Multilingual support and expansion",
      ],
      ctaTitle: "Need an SEO system?",
      ctaText: "Tell me about your project — I'll suggest how to build it.",
      ctaLabel: "Discuss SEO system",
    },
  },
  "cases/my-transfer": {
    uk: {
      meta: {
        title: "Кейс My Transfer | Віталій Дячук",
        description:
          "Кейс My Transfer — як сервіс трансферів виріс до SEO-системи з 400+ сторінок і 5 мовами.",
      },
      eyebrow: "Кейс",
      title: "My Transfer — розвиток існуючого бізнесу",
      lead: "Сервіс міжнародних трансферів, який виріс від звичайного сайту до масштабованої системи з SEO, багатомовністю та інтеграціями.",
      problems: [
        "Потрібно було масштабувати без перебудови",
        "Сотні маршрутів і сторінок для SEO",
        "Клієнти з різних країн і мов",
      ],
      helpTitle: "Результат",
      helpItems: [
        "400+ сторінок маршрутів у системі",
        "5 мовних версій для клієнтів",
        "SEO-структура під Google",
        "Інтеграції з сервісами через API",
        "Можливість додавати нові напрямки",
      ],
      ctaTitle: "Хочете подібний результат?",
      ctaText: "Подивіться проєкт або напишіть — обговоримо вашу задачу.",
      ctaLabel: "Переглянути проєкт",
    },
    en: {
      meta: {
        title: "Case: My Transfer | Vitalii Diachuk",
        description:
          "My Transfer case — how a transfer service grew into an SEO system with 400+ pages and 5 languages.",
      },
      eyebrow: "Case study",
      title: "My Transfer — growing an existing business",
      lead: "An international transfer service that grew from a regular website to a scalable system with SEO, multilingual support, and integrations.",
      problems: [
        "Needed to scale without rebuilding",
        "Hundreds of routes and pages for SEO",
        "Clients from different countries and languages",
      ],
      helpTitle: "Result",
      helpItems: [
        "400+ route pages in the system",
        "5 language versions for clients",
        "SEO structure for Google",
        "Service integrations via API",
        "Ability to add new directions",
      ],
      ctaTitle: "Want a similar result?",
      ctaText: "View the project or message me — let's discuss your task.",
      ctaLabel: "View project",
    },
  },
  mentoring: {
    uk: {
      meta: {
        title: "Менторство для розробників | Віталій Дячук",
        description:
          "Практичне менторство 1-на-1: код, архітектура, React, Next.js, Node.js, співбесіди. 500 грн/год.",
      },
      eyebrow: "Менторство",
      title: "Менторство для розробників",
      lead: "Практичні сесії 1-на-1 з реальними задачами — не теорія, а робота з кодом і ситуаціями з практики.",
      problems: [
        "Складно розібратися в архітектурі",
        "Потрібна підготовка до співбесіди",
        "Хочеш рости швидше з досвідченим наставником",
      ],
      helpTitle: "Що розбираємо",
      helpItems: [
        "React, Next.js, Node.js",
        "Розбір коду і рефакторинг",
        "Архітектура проєктів",
        "Підготовка до співбесід",
        "Реальні задачі з роботи",
      ],
      ctaTitle: "500 грн / година",
      ctaText: "Напиши в Telegram — підберемо формат і тему першої сесії.",
      ctaLabel: "Записатися",
    },
    en: {
      meta: {
        title: "Mentoring for developers | Vitalii Diachuk",
        description:
          "Practical 1-on-1 mentoring: code, architecture, React, Next.js, Node.js, interviews. 500 UAH/hour.",
      },
      eyebrow: "Mentoring",
      title: "Mentoring for developers",
      lead: "Practical 1-on-1 sessions with real tasks — not theory, but hands-on work with code and real situations.",
      problems: [
        "Hard to understand architecture",
        "Need interview preparation",
        "Want to grow faster with an experienced mentor",
      ],
      helpTitle: "What we cover",
      helpItems: [
        "React, Next.js, Node.js",
        "Code review and refactoring",
        "Project architecture",
        "Interview preparation",
        "Real work tasks",
      ],
      ctaTitle: "500 UAH / hour",
      ctaText: "Message me on Telegram — we'll pick the format and topic for the first session.",
      ctaLabel: "Book a session",
    },
  },
};

export function getSeoPageContent(
  slug: SeoPageSlug,
  locale: Locale,
): SeoPageContent {
  return pages[slug][locale];
}

export function getSeoPagePath(slug: SeoPageSlug, locale: Locale): string {
  const path = `/${slug}/`;
  return getLocalePath(locale, path);
}

export function getSeoPageMetadata(
  slug: SeoPageSlug,
  locale: Locale,
): Metadata {
  const { meta } = getSeoPageContent(slug, locale);
  const canonical = getSeoPagePath(slug, locale);

  const languages = Object.fromEntries(
    locales.map((item) => [item, getSeoPagePath(slug, item)]),
  );

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages,
    },
  };
}

export function getSeoPageCtaUrl(slug: SeoPageSlug): string {
  return slug === "cases/my-transfer"
    ? "https://my-transfer.com.ua/"
    : TELEGRAM;
}