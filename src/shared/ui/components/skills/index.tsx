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
  showCategories?: boolean;
  maxItems?: number;
  showTooltips?: boolean;
  size?: "sm" | "md";
}

export const Skills: React.FC<SkillsProps> = ({ 
  skills = [], 
  className = "",
  showCategories = true,
  maxItems,
  showTooltips = true,
  size = "md"
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const displaySkills = maxItems ? skills.slice(0, maxItems) : skills;
  if (!displaySkills.length) return null;

  // Aggregate unique categories from skills
  const uniqueCategories = showCategories 
    ? Array.from(new Set(displaySkills.map(s => s.category).filter(Boolean) as string[]))
    : [];

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      {/* Aggregated categories */}
      {showCategories && uniqueCategories.length > 0 && (
        <div className="truncate text-[14px] font-medium tracking-wide min-w-0 text-primary text-center w-full">
          {uniqueCategories.map((cat, index) => (
            <React.Fragment key={`${index}-${cat}`}>
              <span
                className="pointer-events-auto cursor-pointer transition-opacity duration-150 hover:opacity-100"
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
        {displaySkills.map((skill) => {
          const isHighlighted = showCategories && hoveredCategory !== null && skill.category === hoveredCategory;
          const isDimmed = showCategories && hoveredCategory !== null && skill.category !== hoveredCategory;

          const tooltipContent = (
            <div className="flex flex-col items-center justify-center text-center px-1 py-0.5">
              <span className="font-medium text-sm leading-tight">{skill.name}</span>
              {skill.category && <span className="text-xs text-foreground/70 leading-tight mt-0.5">{skill.category}</span>}
            </div>
          );

          const AvatarComponent = (
            <div 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className={`pointer-events-auto flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-default shrink-0 ${
                isHighlighted ? "scale-110" : ""
              } ${isDimmed ? "opacity-40" : ""}`}
            >
              <Avatar
                src={skill.iconUrl || undefined}
                name={skill.name.substring(0, 2).toUpperCase()}
                radius="none"
                classNames={{
                  base: `${size === "sm" ? "w-6 h-6 text-[10px]" : "w-[30px] h-[30px] text-xs"} bg-transparent`,
                  img: "object-contain",
                }}
              />
            </div>
          );

          return showTooltips ? (
            <Tooltip 
              key={skill.id}
              content={tooltipContent}
              placement="top"
              offset={15}
            >
              {AvatarComponent}
            </Tooltip>
          ) : (
            <React.Fragment key={skill.id}>
              {AvatarComponent}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
