import type { PageDto, HomePageJsonContent } from "@/entities/page-content/types";
import { HighlightedText } from "@/shared/ui/primitives";
import { EngineeringWatermark, AiChipWatermark } from "@/shared/ui/icons";
import { blueprintBackgroundStyle, getArticleCardClasses } from "@/shared/constants/styles";
import { GetStartedButton } from "./get-started-button";
import { getLucideIcon } from "@/shared/helpers/icon.helper";

interface HomeViewProps {
  content: PageDto<HomePageJsonContent> | null;
}

export function HomeView({ content }: HomeViewProps) {
  if (!content) return null;

  const { hero, features, highlightWords, articlesSection, roadmapSection } = content.jsonContent;

  return (
    <main className="w-full flex flex-col pt-[20px] gap-12 pb-[60px]">
      <section className="max-w-7xl mx-auto w-full px-[20px] flex flex-col justify-center">
        <h1 className="text-center text-[42px] font-normal uppercase">
          <HighlightedText
            text={hero.tagline}
            words={highlightWords}
          />
        </h1>
        <h2 className="text-center text-[32px] font-light uppercase mt-4">
          {hero.subtitle}
        </h2>
      </section>
      <section className="w-full py-[60px] relative z-0 overflow-hidden" style={blueprintBackgroundStyle}>
        <div className="max-w-7xl mx-auto w-full px-[20px] grid grid-cols-1 md:grid-cols-3 md:gap-0 relative z-10">
          {features.map((feature, idx) => {
            const isMiddle = idx === 1;

            return (
              <div
                key={feature.id}
                className={`
                  flex flex-col px-8 py-10 items-center text-center text-white relative group overflow-hidden
                  ${isMiddle ? "md:border-x-[2px] border-dashed border-white" : ""}
                `}
              >
                {idx === 0 && (
                  <EngineeringWatermark
                    className="absolute bottom-4 left-4 w-[200px] h-[200px] text-white/15 pointer-events-none transition-colors duration-700 ease-in-out group-hover:text-white/30 z-0"
                  />
                )}

                {idx === 2 && (
                  <AiChipWatermark
                    className="absolute bottom-4 right-4 w-[200px] h-[200px] text-white/15 pointer-events-none transition-colors duration-700 ease-in-out group-hover:text-white/30 z-0"
                  />
                )}

                <h3 className="text-2xl font-medium uppercase mb-6 tracking-wide [text-shadow:0_1px_4px_rgba(0,0,0,0.15)] relative z-10">
                  {feature.title}
                </h3>
                <p className="text-white font-normal text-[17px] mb-10 flex-grow leading-relaxed [text-shadow:0_1px_4px_rgba(0,0,0,0.15)] relative z-10">
                  {feature.description}
                </p>

                {isMiddle ? (
                  <GetStartedButton label={hero.buttonText} />
                ) : (
                  <div className="mt-auto h-[72px]" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-[20px] flex flex-col justify-center">
        <h2 className="text-center text-[32px] font-light uppercase mt-4">
          {roadmapSection.title}
        </h2>
        <div className="w-full flex flex-col mt-4 mb-8 text-foreground/80">
          <div className="w-full py-4 relative border-b border-primary/30">
            <div className="absolute bottom-0 left-0 w-full text-center translate-y-1/2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-primary px-4 bg-background">
                {roadmapSection.releaseDate}
              </span>
            </div>
          </div>

          {roadmapSection.goals.map((goal) => (
            <div
              key={goal.id}
              className={`w-full py-4 flex items-center justify-center text-center relative border-b transition-colors ${goal.completed ? "border-success/30 text-success" : "border-default-200/50 text-default-500"
                }`}
            >
              <h3 className="font-medium text-[17px] tracking-wide">{goal.goal}</h3>

              <div className="absolute bottom-0 left-0 w-full text-center translate-y-1/2">
                <span className={`text-[11px] font-mono uppercase tracking-widest px-4 bg-background ${goal.completed ? "text-success" : "text-default-500"
                  }`}>
                  {goal.endDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-[20px] flex flex-col justify-center">
        <h2 className="text-center text-[32px] font-light uppercase mt-4">
          {articlesSection.title}
        </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 mt-12">
          {articlesSection.articles.map((article, idx, arr) => {
            const cardClasses = getArticleCardClasses(idx, arr.length);
            const Icon = getLucideIcon(article.icon);

            return (
              <div key={article.id} className={cardClasses}>
                <div className="flex items-center gap-[14px]">
                  {Icon ? (
                    <Icon className="w-[26px] h-[26px] text-primary flex-shrink-0" />
                  ) : (
                    <div className="w-[26px] h-[26px] rounded bg-white/10 flex-shrink-0" />
                  )}
                  <div className="flex flex-col">
                    <h3 className="text-[17px] font-medium text-primary leading-tight">{article.title}</h3>
                    <p className="text-[13px] text-foreground mt-0.5">{article.subtitle}</p>
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-foreground/80 mt-1">
                  {article.content}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
