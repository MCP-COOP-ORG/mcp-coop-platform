"use client";

import React, { useRef, useState, useEffect } from "react";
import { Avatar, AvatarGroup, Tooltip } from "@/shared/ui/components/hero-ui";
import { ProfileCategories } from "@/shared/ui/components/profile-categories";

export interface CoopMemberItem {
  id: string;
  name: string;
  avatarUrl?: string | null;
  role?: string;
}

export interface CoopMembersProps {
  members: CoopMemberItem[];
  className?: string;
}

export const CoopMembers: React.FC<CoopMembersProps> = ({ members, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!members || members.length === 0) return null;

  const avatarClasses = {
    base: "w-9 h-9",
    img: "object-cover",
  };

  const renderTooltipContent = (member: CoopMemberItem) => (
    <div className="flex flex-col items-center justify-center text-center px-1 py-0.5">
      <span className="font-medium text-sm leading-tight">{member.name}</span>
      {member.role && <span className="text-xs text-foreground/70 leading-tight mt-0.5">{member.role}</span>}
    </div>
  );

  // Avatar width is 36px (w-9), required horizontal gap is 10px (px-[5px] margin equivalent)
  const requiredWidth = members.length * 36 + (members.length - 1) * 10;
  
  // Determine if we need to overlap (fallback to a naive guess during SSR)
  const isOverlapping = mounted && containerWidth > 0 
    ? requiredWidth > containerWidth 
    : members.length > 5;

  // Aggregate unique roles from members
  const uniqueRoles = Array.from(new Set(members.map(m => m.role).filter(Boolean) as string[]));

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`} ref={containerRef}>
      {/* Aggregated Roles using ProfileCategories (Blue styling) */}
      {uniqueRoles.length > 0 && (
        <ProfileCategories
          categories={uniqueRoles}
          className="text-primary text-center w-full font-medium"
        />
      )}

      {/* Avatars */}
      <div className="w-full">
        {!isOverlapping ? (
          <div className="flex w-full justify-center items-center gap-2.5">
            {members.map((member) => (
              <Tooltip key={member.id} content={renderTooltipContent(member)} placement="top" showArrow>
                <div className="cursor-pointer transition-transform hover:-translate-y-1">
                  <Avatar 
                    isBordered
                    src={member.avatarUrl || undefined}
                    name={member.name.substring(0, 2).toUpperCase()}
                    classNames={avatarClasses}
                  />
                </div>
              </Tooltip>
            ))}
          </div>
        ) : (
          <AvatarGroup 
            isBordered
            max={members.length} // Show all avatars, no +N limit
            className="justify-center inline-flex w-full"
          >
            {members.map((member) => (
              <Tooltip key={member.id} content={renderTooltipContent(member)} placement="top" showArrow>
                <div className="cursor-pointer transition-transform hover:z-20 hover:-translate-y-1">
                  <Avatar 
                    src={member.avatarUrl || undefined}
                    name={member.name.substring(0, 2).toUpperCase()}
                    classNames={avatarClasses}
                  />
                </div>
              </Tooltip>
            ))}
          </AvatarGroup>
        )}
      </div>
    </div>
  );
};
