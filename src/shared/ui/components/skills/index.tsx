"use client";

import React, { useState } from "react";
import { Avatar, Tooltip } from "@/shared/ui/primitives";

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
    <div className={`w-full flex flex-col gap-2 ${className}`}>
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
      <div className="flex flex-nowrap gap-3 items-center justify-center overflow-x-auto py-1 px-[5px] w-full max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                className={`flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-default shrink-0 ${
                  isHighlighted ? "scale-110" : ""
                } ${isDimmed ? "opacity-40" : ""}`}
              >
                <Avatar
                  src={skill.iconUrl || undefined}
                  name={skill.name.substring(0, 2).toUpperCase()}
                  radius="none"
                  classNames={{
                    base: "w-[30px] h-[30px] bg-transparent text-xs",
                    img: "object-contain",
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
