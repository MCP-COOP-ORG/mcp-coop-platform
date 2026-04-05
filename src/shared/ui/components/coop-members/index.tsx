"use client";

import React, { useState } from "react";
import { Avatar, Tooltip } from "@/shared/ui/components/hero-ui";
import { Link } from "@/core/configs/i18n/routing";

export interface CoopMemberItem {
  id: string;
  /** Profile UUID for linking to /members/[profileId]. Requires backend CoopMemberResponseDto.profileId */
  profileId?: string | null;
  name: string;
  avatarUrl?: string | null;
  competence?: string | null;
  isProposer?: boolean;
}

export interface CoopMembersProps {
  members: CoopMemberItem[];
  className?: string;
}

export const CoopMembers: React.FC<CoopMembersProps> = ({ members, className = "" }) => {
  const [hoveredCompetence, setHoveredCompetence] = useState<string | null>(null);

  if (!members || members.length === 0) return null;

  // Derive unique categories from member competences
  const uniqueCompetences = Array.from(
    new Set(members.map((m) => m.competence).filter(Boolean) as string[])
  );

  const avatarClasses = {
    base: "w-9 h-9",
    img: "object-cover",
  };

  const renderTooltipContent = (member: CoopMemberItem) => (
    <div className="flex flex-col items-center justify-center text-center px-1 py-0.5">
      <span className="font-medium text-sm leading-tight">{member.name}</span>
      {member.competence && <span className="text-xs text-foreground/70 leading-tight mt-0.5">{member.competence}</span>}
      {member.isProposer && <span className="text-xs text-warning leading-tight mt-0.5">Proposer</span>}
    </div>
  );

  const proposers = members.filter((m) => m.isProposer);
  const others = members.filter((m) => !m.isProposer);

  const renderAvatar = (member: CoopMemberItem, index: number) => {
    const isHighlighted = hoveredCompetence !== null && member.competence === hoveredCompetence;

    return (
      <Tooltip key={member.id} content={renderTooltipContent(member)} placement="top" offset={15}>
        <Link
          href={`/members/${member.profileId}`}
          className={`cursor-pointer transition-transform duration-200 hover:z-[100] hover:-translate-y-1 block shrink-0 rounded-full ${
            isHighlighted ? "z-[100] -translate-y-1" : ""
          }`}
          style={{ zIndex: isHighlighted ? 100 : 50 - index }}
        >
          <Avatar
            isBordered
            color={member.isProposer ? "warning" : "default"}
            src={member.avatarUrl || undefined}
            name={member.name.substring(0, 2).toUpperCase()}
            classNames={avatarClasses}
          />
        </Link>
      </Tooltip>
    );
  };

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      {/* Categories derived from member competences */}
      {uniqueCompetences.length > 0 && (
        <div className="truncate text-[14px] font-medium tracking-wide min-w-0 text-primary text-center w-full">
          {uniqueCompetences.map((competence, index) => (
            <React.Fragment key={`${index}-${competence}`}>
              <span
                className="cursor-pointer transition-opacity duration-150 hover:opacity-100"
                style={{ opacity: hoveredCompetence !== null && hoveredCompetence !== competence ? 0.4 : 1 }}
                onMouseEnter={() => setHoveredCompetence(competence)}
                onMouseLeave={() => setHoveredCompetence(null)}
              >
                {competence}
              </span>
              {index < uniqueCompetences.length - 1 && (
                <span className="opacity-50 mx-2 select-none">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Members avatars */}
      <div className="w-full flex flex-wrap justify-center items-center gap-y-3">
        {proposers.length > 0 && (
          <div className="flex items-center -space-x-3 mx-1 shrink-0">
            {proposers.map((p, i) => renderAvatar(p, i))}
          </div>
        )}

        {proposers.length > 0 && others.length > 0 && (
          <div className="h-5 w-px shrink-0 bg-default-300 mx-3" />
        )}

        {others.length > 0 && (
          <div className="flex items-center -space-x-3 mx-1 shrink-0">
            {others.map((o, i) => renderAvatar(o, i))}
          </div>
        )}
      </div>
    </div>
  );
};
