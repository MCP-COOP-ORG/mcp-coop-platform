"use client";

import React, { useRef, useState, useEffect } from "react";
import { Avatar, AvatarGroup, Tooltip } from "@/shared/ui/components/hero-ui";
import { ProfileCategories } from "@/shared/ui/components/profile-categories";
import { useRouter } from "@/core/configs/i18n/routing";

export interface CoopMemberItem {
  id: string;
  name: string;
  avatarUrl?: string | null;
  role?: string;
  isProposer?: boolean;
}

export interface CoopMembersProps {
  members: CoopMemberItem[];
  className?: string;
}

export const CoopMembers: React.FC<CoopMembersProps> = ({ members, className = "" }) => {
  const router = useRouter();
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
      {member.isProposer && <span className="text-xs text-warning leading-tight mt-0.5">Proposer</span>}
    </div>
  );

  // Separate proposers and others
  const proposers = members.filter((m) => m.isProposer);
  const others = members.filter((m) => !m.isProposer);

  // Avatar width is 36px (w-9), required horizontal gap is 10px plus divider space if applicable
  const dividerSpace = (proposers.length > 0 && others.length > 0) ? 20 : 0;
  const requiredWidth = members.length * 36 + (members.length - 1) * 10 + dividerSpace;
  
  // Determine if we need to overlap (fallback to a naive guess during SSR)
  const isOverlapping = mounted && containerWidth > 0 
    ? requiredWidth > containerWidth 
    : members.length > 5;

  // Aggregate unique roles from members
  const uniqueRoles = Array.from(new Set(members.map(m => m.role).filter(Boolean) as string[]));

  // Render a single avatar
  const renderAvatar = (member: CoopMemberItem) => (
    <Tooltip key={member.id} content={renderTooltipContent(member)} placement="top" offset={15}>
      <div 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push(`/members/${member.id}` as any);
        }}
        className="cursor-pointer transition-transform hover:z-20 hover:-translate-y-1 block"
      >
        <Avatar 
          isBordered
          color={member.isProposer ? "warning" : "default"}
          src={member.avatarUrl || undefined}
          name={member.name.substring(0, 2).toUpperCase()}
          classNames={avatarClasses}
        />
      </div>
    </Tooltip>
  );

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
      <div className="w-full relative">
        <div className="flex w-full justify-center items-center">
          
          {/* Proposers stand alone even if overlapping, but keep standard gap if not */}
          {proposers.length > 0 && (
            <div className={`flex items-center ${isOverlapping ? "-space-x-2" : "gap-2.5"}`}>
              {proposers.map(renderAvatar)}
            </div>
          )}

          {/* Divider if both groups exist */}
          {proposers.length > 0 && others.length > 0 && (
            <div className={`h-5 w-px bg-default-300 mx-2.5 ${isOverlapping ? "z-10" : ""}`} />
          )}

          {/* Others */}
          {others.length > 0 && (
            <>
              {!isOverlapping ? (
                <div className="flex items-center gap-2.5">
                  {others.map(renderAvatar)}
                </div>
              ) : (
                <AvatarGroup 
                  isBordered
                  max={others.length} // Show all avatars
                  className="justify-center inline-flex"
                >
                  {others.map(renderAvatar)}
                </AvatarGroup>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};
