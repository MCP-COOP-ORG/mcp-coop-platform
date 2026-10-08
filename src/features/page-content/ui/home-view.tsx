import type { PageDto, HomePageJsonContent } from "@/entities/page-content/types";
import { HighlightedText } from "@/shared/ui/primitives";
import { EngineeringWatermark, AiChipWatermark } from "@/shared/ui/icons";
import { blueprintBackgroundStyle } from "@/shared/constants/styles";
import { ProjectsSection } from "./projects-section";
import { TeamSection } from "./team-section";
import { WorkflowSection } from "./workflow-section";
import { Link } from "@/core/configs/i18n/routing";

interface HomeViewProps {
  content: PageDto<HomePageJsonContent> | null;
}

export function HomeView({ content }: HomeViewProps) {
  if (!content) return null;

  const {
    hero,
    features,
    highlightWords,
    projectsSection,
    teamSection,
    workflowSection,
  } = content.jsonContent;

  const taglineParts = hero.tagline.split(/[\s\u00A0]{2,}/);
  const isMultiPartTagline = taglineParts.length > 1;

  return (
    <div className="w-full flex flex-col pt-[20px] gap-12 pb-[60px]">
      <section className="max-w-7xl mx-auto w-full px-[20px] flex flex-col justify-center">
        <h1
          className={`text-center text-[32px] sm:text-[38px] md:text-[42px] font-normal uppercase leading-tight ${
            isMultiPartTagline
              ? "flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"
              : ""
          }`}
        >
          {isMultiPartTagline ? (
            taglineParts.map((part, index) => (
              <span key={index} className="block">
                <HighlightedText
                  text={part}
                  words={highlightWords}
                />
              </span>
            ))
          ) : (
            <HighlightedText
              text={hero.tagline}
              words={highlightWords}
            />
          )}
        </h1>
        <h2 className="text-center text-[16px] sm:text-[20px] md:text-[24px] font-light uppercase mt-4 whitespace-pre-line leading-relaxed max-w-4xl mx-auto">
          {hero.subtitle}
        </h2>
      </section>
      <section className="w-full py-[60px] relative z-0 overflow-hidden" style={blueprintBackgroundStyle}>
        <div className="max-w-7xl mx-auto w-full px-[20px] grid grid-cols-1 md:grid-cols-3 md:gap-0 relative z-10">
          {features.map((feature, idx) => {
            const isLeft = feature.id === "web" || idx === 0;
            const isMiddle = feature.id === "ai" || idx === 1;

            return (
              <div
                key={feature.id}
                className={`
                  flex flex-col px-8 py-10 items-center text-center text-white relative group overflow-hidden
                  ${isMiddle ? "md:border-x-[2px] border-dashed border-white" : ""}
                `}
              >
                {isLeft && (
                  <EngineeringWatermark
                    className="absolute bottom-4 left-4 w-[200px] h-[200px] text-white/15 pointer-events-none transition-colors duration-700 ease-in-out group-hover:text-white/30 z-0"
                  />
                )}

                {isMiddle && (
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
                  <Link
                    href="/contact-us"
                    className="mt-auto inline-flex items-center justify-center bg-primary text-white rounded-medium hover:opacity-90 transition-opacity px-10 py-3.5 text-md font-medium tracking-wider uppercase shadow-md z-10 select-none"
                  >
                    {hero.buttonText}
                  </Link>
                ) : (
                  <div className="mt-auto h-[52px]" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {projectsSection && <ProjectsSection data={projectsSection} />}

      {teamSection && <TeamSection data={teamSection} />}

      {workflowSection && <WorkflowSection data={workflowSection} />}

      {/* SECTIONS TEMPORARILY COMMENTED OUT AS PER REPOSITIONING:
         - agentBuilderSection
         - roadmapSection
         - articlesSection
      */}
    </div>
  );
}
