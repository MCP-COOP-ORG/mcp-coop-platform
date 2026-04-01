"use client";

import React from "react";
import { Avatar, Tooltip } from "@/shared/ui/components/hero-ui";
import { ProfileCategories } from "@/shared/ui/components/profile-categories";

export interface SkillItem {
  id: string; // e.g. "react"
  name: string; // e.g. "React"
  iconUrl?: string; // Optional custom URL
  category?: string; // e.g. "Frontend" or "Design"
}

export interface SkillsProps {
  skills?: SkillItem[];
  className?: string;
}

// Known tech icons via Devicon CDN
const TECH_ICONS: Record<string, string> = {
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  angular: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg",
  next: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  nest: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
  node: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  googlecloud: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  nginx: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  go: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
};

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
      <div className="flex flex-nowrap gap-3 items-center justify-center overflow-x-auto py-2 px-[5px] w-full max-w-full 
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {skills.map((skill) => {
          const iconSrc = skill.iconUrl || TECH_ICONS[skill.id.toLowerCase()];
          
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
              showArrow
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
                  src={iconSrc}
                  name={skill.name.substring(0, 2).toUpperCase()}
                  classNames={{
                    base: "w-full h-full bg-transparent",
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
