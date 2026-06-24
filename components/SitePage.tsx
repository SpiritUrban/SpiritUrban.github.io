import { BlockRenderer } from "@/components/BlockRenderer";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import type { Locale } from "@/lib/i18n/config";
import { getSiteContent } from "@/lib/content";

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