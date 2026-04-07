import type { PageDto, ListingPageJsonContent } from "@/entities/page-content/types";
import { HighlightedText } from "@/shared/ui/primitives";

interface DefaultViewProps {
  content: PageDto<ListingPageJsonContent> | null;
  fallbackTitle: string;
  fallbackDescription: string;
}

export function DefaultView({ content, fallbackTitle, fallbackDescription }: DefaultViewProps) {
  const hero = content?.jsonContent?.hero;

  return (
    <section className="w-full flex flex-col justify-center mb-8">
      <h1 className="text-center text-[42px] font-normal uppercase">
        {hero?.title || fallbackTitle}
      </h1>
      <h2 className="text-center text-[32px] font-light uppercase mt-4 whitespace-pre-wrap text-foreground/90">
        <HighlightedText
          text={hero?.subtitle || fallbackDescription}
          words={content?.jsonContent?.highlightWords || []}
        />
      </h2>
    </section>
  );
}
