"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import type { ProjectsSection as ProjectsSectionType } from "@/entities/page-content/types";
import { GitHub } from "@/shared/ui/icons";
import { blueprintCardClass, BLUEPRINT_CARD_SCROLL_STEP } from "@/shared/constants/styles";

export interface ProjectsSectionProps {
  data: ProjectsSectionType;
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
  const t = useTranslations("Projects");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Sort projects strictly by order (1, 2, 3...) from left to right, falling back to original index
  const allProjects = (data?.projects || [])
    .map((project, index) => ({ project, index }))
    .sort((a, b) => {
      const orderA = typeof a.project.order === "number" ? a.project.order : a.index;
      const orderB = typeof b.project.order === "number" ? b.project.order : b.index;
      return orderA - orderB;
    })
    .map(({ project }) => project);

  // Categories extracted from project data with item count, sorted ascending by count with 'all' first
  const categoryMap = new Map<string, { label: string; count: number }>();
  allProjects.forEach((project) => {
    project.categories?.forEach((cat) => {
      const trimmed = cat.trim();
      if (trimmed) {
        const lower = trimmed.toLowerCase();
        const existing = categoryMap.get(lower);
        if (existing) {
          existing.count += 1;
        } else {
          categoryMap.set(lower, { label: trimmed, count: 1 });
        }
      }
    });
  });

  const sortedCategories = Array.from(categoryMap.entries())
    .sort((a, b) => {
      if (a[1].count !== b[1].count) {
        return b[1].count - a[1].count;
      }
      return a[1].label.localeCompare(b[1].label);
    })
    .map(([id, { label }]) => ({
      id,
      label,
    }));

  const categories = [
    { id: "all", label: t("all") },
    ...sortedCategories,
  ];

  // Fallback to "all" if selected category is not present in available categories
  const activeCategory =
    selectedCategory.toLowerCase() === "all" ||
    categoryMap.has(selectedCategory.toLowerCase())
      ? selectedCategory.toLowerCase()
      : "all";

  const filteredProjects =
    activeCategory === "all"
      ? allProjects
      : allProjects.filter((project) =>
          project.categories?.some(
            (cat) => cat.trim().toLowerCase() === activeCategory
          )
        );

  const checkScrollability = useCallback(() => {
    const el = sliderRef.current;
    if (!el) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = el;
    if (scrollWidth <= clientWidth + 1) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      checkScrollability();
    });
    window.addEventListener("resize", checkScrollability);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [checkScrollability, filteredProjects]);

  const handleScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -BLUEPRINT_CARD_SCROLL_STEP : BLUEPRINT_CARD_SCROLL_STEP,
        behavior: "smooth",
      });
    }
  };

  if (!data) return null;

  return (
    <section className="max-w-7xl mx-auto w-full px-[20px] flex flex-col justify-center">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-center text-[32px] font-light uppercase tracking-wide">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-center text-[15px] text-foreground/70 mt-2 max-w-2xl mx-auto whitespace-pre-line leading-relaxed">
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Filter Tag Bar (Centered above slider) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
        {categories.map((category) => {
          const isSelected = activeCategory.toLowerCase() === category.id.toLowerCase();
          const displayLabel = category.label.startsWith("#") ? category.label : `#${category.label}`;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`min-h-[44px] px-4 py-2 inline-flex items-center justify-center rounded-small font-mono text-[13px] tracking-wider transition-colors cursor-pointer select-none ${
                isSelected
                  ? "bg-primary text-white shadow-sm border border-primary font-medium"
                  : "bg-transparent border border-dashed border-foreground/25 hover:border-primary text-foreground/75 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>

      {/* Engineering Control / Navigation Bar */}
      <div className="flex items-center justify-between mt-6 mb-3">
        <div className="font-mono text-[11px] text-foreground/60 uppercase tracking-widest select-none">
          {t("counterPrefix")}{" "}
          <span className="text-red-500 font-semibold">
            {filteredProjects.length.toString().padStart(2, "0")}
          </span>{" "}
          {t("counterSuffix")}
        </div>

        {/* Blueprint Arrow Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className="h-11 min-w-11 px-3.5 inline-flex items-center justify-center font-mono text-[13px] border border-dashed rounded-small transition-colors select-none border-foreground/25 hover:border-primary hover:text-primary text-foreground/75 hover:bg-primary/5 cursor-pointer disabled:opacity-20 disabled:border-foreground/15 disabled:text-foreground/25 disabled:cursor-not-allowed disabled:pointer-events-none"
            aria-label={t("prevProjects")}
          >
            [ &lt; ]
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className="h-11 min-w-11 px-3.5 inline-flex items-center justify-center font-mono text-[13px] border border-dashed rounded-small transition-colors select-none border-foreground/25 hover:border-primary hover:text-primary text-foreground/75 hover:bg-primary/5 cursor-pointer disabled:opacity-20 disabled:border-foreground/15 disabled:text-foreground/25 disabled:cursor-not-allowed disabled:pointer-events-none"
            aria-label={t("nextProjects")}
          >
            [ &gt; ]
          </button>
        </div>
      </div>

      {/* Content: Slider or Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="w-full my-6 p-12 border-[2px] border-dashed border-default-300/80 rounded-medium bg-default-50/50 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="font-mono text-[12px] uppercase tracking-widest text-primary mb-2">
            {t("emptyStatus")}
          </div>
          <h3 className="text-[18px] font-medium uppercase text-foreground mb-2">
            {t("emptyTitle")}
          </h3>
          <p className="font-mono text-[13px] text-default-500 max-w-md">
            {t("emptyDescription")}
          </p>
        </div>
      ) : (
        <div
          ref={sliderRef}
          onScroll={checkScrollability}
          className={`flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            canScrollLeft || canScrollRight ? "justify-start" : "justify-center"
          }`}
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
                className={`${blueprintCardClass} snap-start`}
              >
                <div className="flex flex-col flex-grow">
                  {/* Top Spec ID Plate */}
                  <div className="font-mono text-[11px] text-foreground/60 uppercase tracking-widest">
                    {formattedSpec}
                  </div>

                  {/* Blueprint Image Frame */}
                  <div className="w-full h-36 flex items-center justify-center my-3">
                    <div className="h-full w-fit max-w-full rounded-xl overflow-hidden relative flex items-center justify-center border border-black/10 dark:border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.4)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="block h-full w-auto max-w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Title and Description */}
                  <div>
                    <h3 className="text-[18px] font-medium leading-tight group-hover:text-primary transition-colors text-center">
                      {project.title}
                    </h3>
                    <p className="text-[13px] text-foreground/80 leading-relaxed mt-1.5">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="font-mono text-[11px] text-primary flex flex-wrap gap-1 mt-3 pt-2.5 border-t border-dashed border-foreground/15">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 border border-dashed border-primary/30 rounded-small bg-primary/5"
                        >
                          #{tech.replace(/^#/, "")}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Links */}
                <div className="mt-4 pt-3 border-t border-dashed border-foreground/20 flex items-center justify-between gap-3 flex-wrap">
                  {project.links?.items && project.links.items.length > 0 ? (
                    <div className="flex items-center gap-3 flex-wrap">
                      {project.links.items.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[12px] text-primary no-underline flex items-center gap-1.5 transition-colors group/link"
                        >
                          <span className="group-hover/link:underline underline-offset-4">{item.label}</span>
                          <span className="no-underline inline-block transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                            ↗
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : project.links?.liveUrl ? (
                    <a
                      href={project.links.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[12px] text-primary no-underline flex items-center gap-1.5 transition-colors group/link"
                    >
                      <span className="group-hover/link:underline underline-offset-4">
                        {project.links.liveLabel || t("viewProject")}
                      </span>
                      <span className="no-underline inline-block transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="font-mono text-[11px] text-foreground/40 select-none">
                      {t("internalProject")}
                    </span>
                  )}

                  {project.links?.githubUrl && (
                    <a
                      href={project.links.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[12px] text-foreground/70 hover:text-primary flex items-center gap-1.5 transition-colors"
                      aria-label={t("githubRepo", { title: project.title })}
                    >
                      <GitHub className="w-3.5 h-3.5" />
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
