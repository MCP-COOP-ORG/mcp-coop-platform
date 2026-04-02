"use client";

import React from "react";
import { Avatar, Tooltip } from "@/shared/ui/components/hero-ui";
import { ProfileCategories } from "@/shared/ui/components/profile-categories";

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
  if (!skills.length) return null;

  // Aggregate unique categories from skills
  const uniqueCategories = Array.from(new Set(skills.map(s => s.category).filter(Boolean) as string[]));

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      {/* Aggregated Categories using ProfileCategories (Blue styling) */}
      {uniqueCategories.length > 0 && (
        <ProfileCategories
          categories={uniqueCategories}
          className="text-primary text-center w-full font-medium"
        />
      )}

      {/* Skills list */}
      <div className="flex flex-nowrap gap-3 items-center justify-center overflow-x-auto py-2 px-[5px] w-full max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {skills.map((skill) => {
          // Formulate tooltip text
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
                className="rounded-full border-[0.5px] border-default-300 p-0.5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] bg-default-50 flex items-center justify-center transition-transform hover:scale-110 cursor-default shrink-0"
                style={{ width: "2.5rem", height: "2.5rem" }} // 40px base circular boundary
              >
                <Avatar
                  src={skill.iconUrl || undefined}
                  name={skill.name.substring(0, 2).toUpperCase()}
                  classNames={{
                    base: "w-full h-full bg-transparent text-xs",
                    img: "object-contain scale-75", // scale-75 because logos usually touch edges
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
