"use client";

import React, { useState } from "react";
import { Avatar, Tooltip } from "@/shared/ui/components/hero-ui";

export interface SkillItem {
  id: string;
  name: string;
  iconUrl?: string | null;
  category?: string;
}

export interface SkillsProps {
  skills?: SkillItem[];
  className?: string;
}

export const Skills: React.FC<SkillsProps> = ({ skills = [], className = "" }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  if (!skills.length) return null;

  // Aggregate unique categories from skills
  const uniqueCategories = Array.from(new Set(skills.map(s => s.category).filter(Boolean) as string[]));

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      {/* Aggregated categories */}
      {uniqueCategories.length > 0 && (
        <div className="truncate text-[14px] font-medium tracking-wide min-w-0 text-primary text-center w-full">
          {uniqueCategories.map((cat, index) => (
            <React.Fragment key={`${index}-${cat}`}>
              <span
                className="cursor-pointer transition-opacity duration-150 hover:opacity-100"
                style={{ opacity: hoveredCategory !== null && hoveredCategory !== cat ? 0.4 : 1 }}
                onMouseEnter={() => setHoveredCategory(cat)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {cat}
              </span>
              {index < uniqueCategories.length - 1 && (
                <span className="opacity-50 mx-2 select-none">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Skills list */}
      <div className="flex flex-nowrap gap-3 items-center justify-center overflow-x-auto py-2 px-[5px] w-full max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {skills.map((skill) => {
          const isHighlighted = hoveredCategory !== null && skill.category === hoveredCategory;
          const isDimmed = hoveredCategory !== null && skill.category !== hoveredCategory;

          const tooltipContent = (
            <div className="flex flex-col items-center justify-center text-center px-1 py-0.5">
              <span className="font-medium text-sm leading-tight">{skill.name}</span>
              {skill.category && <span className="text-xs text-foreground/70 leading-tight mt-0.5">{skill.category}</span>}
            </div>
          );

          return (
            <Tooltip 
              key={skill.id}
              content={tooltipContent}
              placement="top"
              offset={15}
            >
              <div 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className={`rounded-full border-[0.5px] border-default-300 p-0.5 bg-default-50 flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-default shrink-0 ${
                  isHighlighted ? "shadow-[0_4px_12px_rgba(34,197,94,0.4)] scale-110" : ""
                } ${isDimmed ? "opacity-40" : ""}`}
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <Avatar
                  src={skill.iconUrl || undefined}
                  name={skill.name.substring(0, 2).toUpperCase()}
                  classNames={{
                    base: "w-full h-full bg-transparent text-xs",
                    img: "object-contain scale-75",
                  }}
                />
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};
