"use client";

import type { WorkflowSection as WorkflowSectionType } from "@/entities/page-content/types";
import { blueprintBackgroundStyle, dashedSeparator } from "@/shared/constants/styles";
import Link from "next/link";

export interface WorkflowSectionProps {
  data: WorkflowSectionType;
}

export function WorkflowSection({ data }: WorkflowSectionProps) {
  if (!data || !data.steps || data.steps.length === 0) {
    return null;
  }

  return (
    <section className="w-full flex flex-col justify-center">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center px-[20px]">
        <h2 className="text-center text-[32px] font-light uppercase tracking-wide">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-center text-[16px] text-foreground/80 mt-2 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        )}
      </div>

      {/* 4 Process Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full px-[20px] mt-10">
        {data.steps.map((step) => (
          <article
            key={step.id}
            className="p-6 border-[2px] border-dashed border-default-200 rounded-medium bg-background hover:border-primary/50 transition-all duration-300 relative group flex flex-col justify-between"
          >
            {/* Micro-crosshairs in corners */}
            <span
              className="absolute top-2 left-2.5 font-mono text-default-300 text-[11px] select-none group-hover:text-primary transition-colors pointer-events-none leading-none"
              aria-hidden="true"
            >
              +
            </span>
            <span
              className="absolute top-2 right-2.5 font-mono text-default-300 text-[11px] select-none group-hover:text-primary transition-colors pointer-events-none leading-none"
              aria-hidden="true"
            >
              +
            </span>
            <span
              className="absolute bottom-2 left-2.5 font-mono text-default-300 text-[11px] select-none group-hover:text-primary transition-colors pointer-events-none leading-none"
              aria-hidden="true"
            >
              +
            </span>
            <span
              className="absolute bottom-2 right-2.5 font-mono text-default-300 text-[11px] select-none group-hover:text-primary transition-colors pointer-events-none leading-none"
              aria-hidden="true"
            >
              +
            </span>

            <div className="flex flex-col flex-grow">
              {/* Top Metadata Line */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="font-mono text-[12px] tracking-wider text-primary font-medium uppercase px-2 py-0.5 border border-dashed border-primary/30 rounded bg-primary/5">
                  {step.stepNumber.startsWith("[") ? step.stepNumber : `[ ${step.stepNumber} ]`}
                </span>
                <span className="font-mono text-[11px] text-default-500 uppercase tracking-widest">
                  {step.tag}
                </span>
              </div>

              {/* Step Title */}
              <h3 className="text-[18px] font-medium mt-4 mb-2 text-foreground group-hover:text-primary transition-colors">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-[14px] text-foreground/80 leading-relaxed">
                {step.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Dashed Separator */}
      <div className="max-w-7xl mx-auto w-full px-[20px] my-12">
        <div className={dashedSeparator} />
      </div>

      {/* Final CTA Container */}
      <div className="max-w-7xl mx-auto w-full px-[20px] mb-12">
        <div
          className="relative overflow-hidden rounded-medium p-8 sm:p-12 text-white shadow-xl"
          style={blueprintBackgroundStyle}
        >
          <div className="relative z-10">
            {/* CTA Header */}
            <h3 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-2 text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.2)]">
              {data.cta.title}
            </h3>
            {data.cta.subtitle && (
              <p className="text-white/90 text-[16px] sm:text-[17px] mb-8 max-w-3xl leading-relaxed [text-shadow:0_1px_4px_rgba(0,0,0,0.15)]">
                {data.cta.subtitle}
              </p>
            )}

            {/* Two-column Blueprint Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Checklist Hints */}
              <div className="lg:col-span-7">
                <div className="font-mono text-[13px] text-white/90 uppercase tracking-wider mb-4 border-b border-dashed border-white/30 pb-2">
                  {data.cta.checklistTitle}
                </div>
                <ul className="space-y-3">
                  {data.cta.checklistItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span
                        className="font-mono text-white text-[13px] font-bold select-none shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        [ + ]
                      </span>
                      <span className="text-[14px] sm:text-[15px] text-white/95 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                {data.cta.checklistNote && (
                  <p className="mt-4 text-[13px] text-white/85 font-mono border-t border-dashed border-white/20 pt-2 italic">
                    {data.cta.checklistNote}
                  </p>
                )}
              </div>

              {/* Right Column: Response Badge & Action Buttons */}
              <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center gap-4">
                {data.cta.responseTimeBadge && (
                  <div className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-white bg-black/15 border border-dashed border-white/40 px-3.5 py-1.5 rounded-small backdrop-blur-sm">
                    {data.cta.responseTimeBadge}
                  </div>
                )}
                {data.cta.primaryButtonText && (
                  <Link
                    href={data.cta.primaryButtonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#204a6e] hover:bg-white/90 font-medium px-8 py-3.5 rounded-medium tracking-wider uppercase text-md shadow-lg transition-all min-h-[44px]"
                  >
                    {data.cta.primaryButtonText}
                  </Link>
                )}
                {data.cta.secondaryButtonText && (
                  <Link
                    href={data.cta.secondaryButtonLink}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-[2px] border-white text-white hover:bg-white/10 font-medium px-8 py-3.5 rounded-medium tracking-wider uppercase text-md transition-all min-h-[44px]"
                  >
                    {data.cta.secondaryButtonText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkflowSection;
