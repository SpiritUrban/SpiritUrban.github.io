import type { SiteContent } from "@/lib/types";

export const ukContent: SiteContent = {
  meta: {
    title: "Віталій Дячук | Fullstack Developer & Mentor",
    description:
      "20 років у вебі. Від дизайну і 3D до Next.js, SEO-систем, веб-сервісів і технічного наставництва.",
  },
  blocks: [
    {
      type: "hero",
      label: "Fullstack Developer • SEO Architect • Mentor",
      title: "Я будую <span>веб-системи</span>, а не просто сайти",
      text: "20 років у вебі. Від дизайну і 3D до Next.js, SEO-систем, веб-сервісів і технічного наставництва.",
      image: "/assets/img/iam-2.png",
      imageAlt: "Віталій Дячук",
      code: `const project = {
  seo: true,
  scalable: true,
  maintainable: true,
  business: true
}`,
      actions: [
        {
          label: "Написати в Telegram",
          url: "https://t.me/SpiritUrban",
          variant: "primary",
        },
        {
          label: "Портфоліо",
          url: "https://spiriturban.github.io/projects/",
        },
      ],
    },
    {
      type: "stats",
      label: "Реальний проєкт",
      title: "Приклад реального проєкту",
      projectName: "My Transfer",
      text: "My Transfer — сайт для міжнародних трансферів, який побудований не як одна сторінка, а як масштабована SEO-система.",
      items: [
        { value: "400+", label: "сторінок маршрутів" },
        { value: "5", label: "мовних версій" },
        { value: "SEO", label: "структура під Google" },
        { value: "API", label: "інтеграції з сервісами" },
        { value: "∞", label: "можна розширювати далі" },
      ],
      footerText:
        "Це не просто візитка для бізнесу. Це система, яку можна масштабувати: додавати нові міста, маршрути, мови, SEO-сторінки та інтеграції без перебудови сайту з нуля.",
      action: {
        label: "Переглянути проєкт",
        url: "https://my-transfer.com.ua/",
        variant: "primary",
      },
    },
    {
      type: "cards",
      label: "Work",
      title: "Чим я корисний",
      text: "Не продаю просто години. Допомагаю будувати технічну основу, яка має сенс для бізнесу.",
      items: [
        {
          kicker: "01",
          title: "SEO-системи",
          text: "Маршрути, міста, категорії, масові сторінки, структура, мета-дані, перелінковка.",
        },
        {
          kicker: "02",
          title: "Веб-сервіси",
          text: "Адмінки, кабінети, API, бази даних, інтеграції, бізнес-логіка.",
        },
        {
          kicker: "03",
          title: "Доопрацювання",
          text: "Підхоплюю існуючі проєкти: оптимізація, редизайн, рефакторинг, нові функції.",
        },
        {
          kicker: "04",
          title: "Менторство",
          text: "React, Next.js, Node.js, архітектура, співбесіди, реальні задачі, робота з кодом.",
        },
      ],
    },
    {
      type: "cards",
      label: "Approach",
      title: "Підхід",
      items: [
        {
          title: "Архітектура важливіша за кількість сторінок",
          text: "400 сторінок можуть бути ручною рутиною, а можуть бути нормальною системою генерації.",
        },
        {
          title: "SEO треба закладати одразу",
          text: "URL, заголовки, структура, дані, перелінковка і контентні блоки — це фундамент.",
        },
        {
          title: "Проєкт має жити після запуску",
          text: "Сайт повинен розширюватися без повної перебудови кожного разу.",
        },
      ],
    },
    {
      type: "text",
      label: "Mentoring",
      title: "Наставництво для розробників",
      text: "Практичні сесії 1-на-1: код, архітектура, React, Next.js, Node.js, співбесіди, реальні задачі. 500 грн/год.",
    },
    {
      type: "cta",
      title: "Потрібен сайт, сервіс або технічний розбір?",
      text: "Напиши в Telegram. Коротко покажи задачу — я скажу, що реально потрібно робити.",
      action: {
        label: "Написати @SpiritUrban",
        url: "https://t.me/SpiritUrban",
      },
    },
  ],
};