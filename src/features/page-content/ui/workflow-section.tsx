"use client";

import type { WorkflowSection as WorkflowSectionType } from "@/entities/page-content/types";
import { Link } from "@/core/configs/i18n/routing";

export interface WorkflowSectionProps {
  data: WorkflowSectionType;
}

export function WorkflowSection({ data }: WorkflowSectionProps) {
  if (!data || !data.steps || data.steps.length === 0) {
    return null;
  }

  const isPrimaryExternal =
    data.cta.primaryButtonLink?.startsWith("http://") ||
    data.cta.primaryButtonLink?.startsWith("https://") ||
    data.cta.primaryButtonLink?.startsWith("//");

  const isSecondaryExternal =
    data.cta.secondaryButtonLink?.startsWith("http://") ||
    data.cta.secondaryButtonLink?.startsWith("https://") ||
    data.cta.secondaryButtonLink?.startsWith("//");

  return (
    <section className="w-full flex flex-col justify-center max-w-7xl mx-auto px-[20px]">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center mb-10">
        <h2 className="text-center text-[32px] font-light uppercase tracking-wide">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-center text-[16px] text-foreground/80 mt-2 max-w-2xl mx-auto whitespace-pre-line leading-relaxed">
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Unified Workflow & CTA Module */}
      <div className="w-full border-[2px] border-dashed border-foreground/20 rounded-medium bg-background p-5 sm:p-8 lg:p-10 relative overflow-hidden">
        {/* Technical Corner Crosshairs */}
        <span
          className="absolute top-2 left-2.5 font-mono text-foreground/40 text-[11px] select-none pointer-events-none leading-none"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute top-2 right-2.5 font-mono text-foreground/40 text-[11px] select-none pointer-events-none leading-none"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute bottom-2 left-2.5 font-mono text-foreground/40 text-[11px] select-none pointer-events-none leading-none"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute bottom-2 right-2.5 font-mono text-foreground/40 text-[11px] select-none pointer-events-none leading-none"
          aria-hidden="true"
        >
          +
        </span>

        {/* 4 Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {data.steps.map((step) => (
            <div
              key={step.id}
              className="p-5 border-[2px] border-dashed border-foreground/20 rounded-medium bg-background hover:border-primary/60 transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Micro-crosshairs in step card corners */}
              <span
                className="absolute top-1.5 left-2 font-mono text-foreground/30 text-[10px] select-none pointer-events-none group-hover:text-primary transition-colors leading-none"
                aria-hidden="true"
              >
                +
              </span>
              <span
                className="absolute top-1.5 right-2 font-mono text-foreground/30 text-[10px] select-none pointer-events-none group-hover:text-primary transition-colors leading-none"
                aria-hidden="true"
              >
                +
              </span>

              <div className="flex flex-col flex-grow">
                {/* Top Metadata Line */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[12px] tracking-wider text-primary font-medium uppercase px-2 py-0.5 border border-dashed border-primary/30 rounded bg-primary/5 shrink-0">
                    {step.stepNumber.startsWith("[") ? step.stepNumber : `[ ${step.stepNumber} ]`}
                  </span>
                  <span className="font-mono text-[11px] text-foreground/60 uppercase tracking-wider select-none text-right truncate">
                    {step.tag}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-[17px] font-medium mt-2 mb-2 text-foreground group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[14px] text-foreground/75 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Inner Blueprint Transition */}
        <div className="border-t border-dashed border-foreground/20 my-8 sm:my-10 relative">
          <span className="absolute -top-[9px] left-1/2 -translate-x-1/2 bg-background px-3 font-mono text-[11px] text-foreground/60 uppercase tracking-wider select-none whitespace-nowrap">
            {"// ACTION PROTOCOL //"}
          </span>
        </div>

        {/* Integrated CTA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading + Hints */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-xl sm:text-2xl font-medium uppercase tracking-wide text-foreground mb-1">
              {data.cta.title}
            </h3>
            {data.cta.subtitle && (
              <p className="text-[14px] sm:text-[15px] text-foreground/75 mb-5 leading-relaxed">
                {data.cta.subtitle}
              </p>
            )}

            <div className="font-mono text-[12px] text-primary tracking-wider uppercase mb-3 font-medium">
              {data.cta.checklistTitle}
            </div>
            <ul className="space-y-2.5">
              {data.cta.checklistItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span
                    className="font-mono text-primary text-[12px] font-bold select-none shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    [ + ]
                  </span>
                  <span className="text-[13px] sm:text-[14px] text-foreground/80 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {data.cta.checklistNote && (
              <p className="mt-4 text-[12px] text-foreground/60 font-mono italic">
                {data.cta.checklistNote}
              </p>
            )}
          </div>

          {/* Right Column: Response Badge & Action Buttons */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center gap-4">
            {data.cta.responseTimeBadge && (
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-primary bg-primary/5 border border-dashed border-primary/30 px-3.5 py-1.5 rounded-small select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                {data.cta.responseTimeBadge}
              </div>
            )}

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
              {data.cta.primaryButtonText &&
                (isPrimaryExternal ? (
                  <a
                    href={data.cta.primaryButtonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 font-medium px-8 py-3.5 rounded-medium tracking-wider uppercase text-sm shadow-md transition-all min-h-[44px] select-none text-center cursor-pointer"
                  >
                    {data.cta.primaryButtonText}
                  </a>
                ) : (
                  <Link
                    href={data.cta.primaryButtonLink}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 font-medium px-8 py-3.5 rounded-medium tracking-wider uppercase text-sm shadow-md transition-all min-h-[44px] select-none text-center cursor-pointer"
                  >
                    {data.cta.primaryButtonText}
                  </Link>
                ))}

              {data.cta.secondaryButtonText &&
                (isSecondaryExternal ? (
                  <a
                    href={data.cta.secondaryButtonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-[2px] border-dashed border-foreground/25 hover:border-primary text-foreground hover:text-primary hover:bg-primary/5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 font-medium px-8 py-3.5 rounded-medium tracking-wider uppercase text-sm transition-all min-h-[44px] select-none text-center cursor-pointer"
                  >
                    {data.cta.secondaryButtonText}
                  </a>
                ) : (
                  <Link
                    href={data.cta.secondaryButtonLink}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-[2px] border-dashed border-foreground/25 hover:border-primary text-foreground hover:text-primary hover:bg-primary/5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 font-medium px-8 py-3.5 rounded-medium tracking-wider uppercase text-sm transition-all min-h-[44px] select-none text-center cursor-pointer"
                  >
                    {data.cta.secondaryButtonText}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkflowSection;
