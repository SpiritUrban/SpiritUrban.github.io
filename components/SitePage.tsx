import { BlockRenderer } from "@/components/BlockRenderer";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import { getSiteContent } from "@/data/content";
import type { Locale } from "@/lib/i18n/config";

export function SitePage({ locale }: { locale: Locale }) {
  const { blocks } = getSiteContent(locale);

  return (
    <>
      <SetHtmlLang locale={locale} />
      <main>
        {blocks.map((block, index) => (
          <BlockRenderer key={`${block.type}-${index}`} block={block} />
        ))}
      </main>
    </>
  );
}