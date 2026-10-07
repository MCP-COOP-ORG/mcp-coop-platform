"use client";

import { useState, useRef } from "react";
import type { ProjectsSection as ProjectsSectionType } from "@/entities/page-content/types";
import { GitHub } from "@/shared/ui/icons";

export interface ProjectsSectionProps {
  data: ProjectsSectionType;
}

const DEFAULT_CATEGORIES = [
  { id: "all", label: "Все" },
  { id: "web", label: "Web" },
  { id: "ios", label: "iOS" },
  { id: "ai", label: "AI" },
  { id: "backend", label: "Backend" },
];

export function ProjectsSection({ data }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!data) return null;

  const rawCategories = data.categories && data.categories.length > 0 ? data.categories : DEFAULT_CATEGORIES;

  // Ensure "all" is available in the category filter bar
  const categories = rawCategories.some((c) => c.id.toLowerCase() === "all")
    ? rawCategories
    : [{ id: "all", label: "Все" }, ...rawCategories];

  const allProjects = data.projects || [];

  const filteredProjects =
    selectedCategory.toLowerCase() === "all"
      ? allProjects
      : allProjects.filter((project) =>
          project.categories?.some((cat) => cat.toLowerCase() === selectedCategory.toLowerCase())
        );

  const handleScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -420 : 420,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto w-full px-[20px] flex flex-col justify-center">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-center text-[32px] font-light uppercase tracking-wide">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-center text-[15px] text-foreground/70 mt-2 max-w-2xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Filter Tag Bar (Centered above slider) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
        {categories.map((category) => {
          const isSelected = selectedCategory.toLowerCase() === category.id.toLowerCase();
          const displayLabel = category.label.startsWith("#") ? category.label : `#${category.label}`;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`min-h-[38px] px-4 py-2 inline-flex items-center justify-center rounded-small font-mono text-[13px] tracking-wider uppercase transition-colors cursor-pointer select-none ${
                isSelected
                  ? "bg-primary text-white shadow-sm border border-primary font-medium"
                  : "bg-transparent border border-dashed border-default-300 hover:border-primary text-default-600 hover:text-primary"
              }`}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>

      {/* Engineering Control / Navigation Bar */}
      <div className="flex items-center justify-between mt-6 mb-3">
        <div className="font-mono text-[11px] text-default-400 uppercase tracking-widest select-none">
          {`// MODULES: ${filteredProjects.length.toString().padStart(2, "0")} UNITS //`}
        </div>

        {/* Blueprint Arrow Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            className="h-9 min-w-9 px-3 inline-flex items-center justify-center font-mono text-[13px] border border-dashed border-default-300 hover:border-primary hover:text-primary text-default-600 rounded-small transition-colors cursor-pointer select-none"
            aria-label="Previous projects"
          >
            [ &lt; ]
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            className="h-9 min-w-9 px-3 inline-flex items-center justify-center font-mono text-[13px] border border-dashed border-default-300 hover:border-primary hover:text-primary text-default-600 rounded-small transition-colors cursor-pointer select-none"
            aria-label="Next projects"
          >
            [ &gt; ]
          </button>
        </div>
      </div>

      {/* Content: Slider or Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="w-full my-6 p-12 border-[2px] border-dashed border-default-300/80 rounded-medium bg-default-50/50 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Micro-notches in corners */}
          <span className="absolute top-2 left-2 font-mono text-[12px] text-default-400 select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-[12px] text-default-400 select-none">+</span>
          <span className="absolute bottom-2 left-2 font-mono text-[12px] text-default-400 select-none">+</span>
          <span className="absolute bottom-2 right-2 font-mono text-[12px] text-default-400 select-none">+</span>

          <div className="font-mono text-[12px] uppercase tracking-widest text-primary mb-2">
            {"// STATUS: SPECIFICATION IN PROGRESS //"}
          </div>
          <h3 className="text-[18px] font-medium uppercase text-foreground mb-2">
            Проекты в разработке
          </h3>
          <p className="font-mono text-[13px] text-default-500 max-w-md">
            В данной категории модули и спецификации находятся на этапе проектирования. Обновления появятся в ближайших релизах.
          </p>
        </div>
      ) : (
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {filteredProjects.map((project) => {
            const formattedSpec = project.specId
              ? project.specId.includes("//")
                ? project.specId
                : `${project.specId} // PRODUCTION`
              : "SYS-00 // PRODUCTION";

            return (
              <article
                key={project.id}
                className="flex-shrink-0 w-[320px] sm:w-[380px] md:w-[420px] snap-start flex flex-col justify-between p-6 border-[2px] border-dashed border-default-200 rounded-medium bg-background hover:border-primary/50 transition-all duration-300 group relative"
              >
                <div className="flex flex-col flex-grow">
                  {/* Top Spec ID Plate */}
                  <div className="font-mono text-[12px] text-default-500 uppercase tracking-widest">
                    {formattedSpec}
                  </div>

                  {/* Blueprint Image Frame */}
                  <div className="aspect-video border border-dashed border-default-200/80 rounded-small overflow-hidden relative bg-default-100 my-4">
                    {/* Micro-crosshairs in corners */}
                    <span className="absolute top-1 left-1.5 font-mono text-[11px] text-default-400 select-none z-10 pointer-events-none leading-none">
                      +
                    </span>
                    <span className="absolute top-1 right-1.5 font-mono text-[11px] text-default-400 select-none z-10 pointer-events-none leading-none">
                      +
                    </span>
                    <span className="absolute bottom-1 left-1.5 font-mono text-[11px] text-default-400 select-none z-10 pointer-events-none leading-none">
                      +
                    </span>
                    <span className="absolute bottom-1 right-1.5 font-mono text-[11px] text-default-400 select-none z-10 pointer-events-none leading-none">
                      +
                    </span>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Title and Description */}
                  <div>
                    <h3 className="text-[20px] font-medium leading-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[14px] text-foreground/80 leading-relaxed mt-2 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="font-mono text-[12px] text-primary flex flex-wrap gap-1.5 mt-4">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 border border-dashed border-primary/30 rounded-small bg-primary/5"
                        >
                          #{tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Links */}
                <div className="mt-6 pt-4 border-t border-dashed border-default-200 flex items-center justify-between gap-3">
                  {project.links?.liveUrl ? (
                    <a
                      href={project.links.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[13px] text-primary hover:underline flex items-center gap-1.5 transition-colors group/link"
                    >
                      <span>Смотреть проект</span>
                      <span className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="font-mono text-[12px] text-default-400 select-none">
                      {"// INTERNAL //"}
                    </span>
                  )}

                  {project.links?.githubUrl && (
                    <a
                      href={project.links.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[13px] text-default-600 hover:text-primary flex items-center gap-1.5 transition-colors"
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <GitHub className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ProjectsSection;
