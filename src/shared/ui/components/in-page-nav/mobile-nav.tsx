"use client";

import React, { useState, useEffect, useRef } from "react";
import { NavigationNode } from "@/entities/navigation/types";

interface MobileNavProps {
  nodes: NavigationNode[];
  activeSection: string;
  scrollToHeading: (id: string, label: string) => void;
}

export function MobileNav({ nodes, activeSection, scrollToHeading }: MobileNavProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = (id: string, label: string) => {
    setIsMobileOpen(false);
    scrollToHeading(id, label);
  };

  const NavTree = ({ currentNodes, level = 0 }: { currentNodes: NavigationNode[]; level?: number }) => {
    return (
      <ul className={`flex flex-col ${level === 0 ? "gap-2" : "gap-1 pl-4 mt-1 mb-2 border-l border-primary"}`}>
        {currentNodes.map(node => {
          const hasSub = node.children && node.children.length > 0;
          return (
            <li key={node.id} className="flex flex-col">
              <button 
                type="button" 
                onClick={() => handleLinkClick(node.id, node.label)}
                className={`text-left w-full block py-1.5 transition-colors hover:text-primary ${
                  level === 0 
                    ? "font-bold text-[15px] text-foreground" 
                    : "font-medium text-[14px] text-foreground"
                }`}
              >
                {node.label}
              </button>
              {hasSub && <NavTree currentNodes={node.children!} level={level + 1} />}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div ref={menuRef} className="w-full sticky top-[64px] sm:top-[72px] z-[40] bg-background lg:hidden mb-6 border-b border-primary rounded-none">
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="flex items-center justify-between w-full py-4 px-2 hover:opacity-80 transition-opacity"
      >
        <div className="flex flex-col items-start overflow-hidden">
          <span className="text-[11px] font-bold text-primary uppercase tracking-wider mb-0.5">Раздел</span>
          <span className="font-semibold text-[14px] sm:text-[15px] truncate w-full text-foreground text-left">{activeSection || "Оглавление"}</span>
        </div>
        <svg className={`shrink-0 ml-3 transition-transform duration-300 text-primary ${isMobileOpen ? 'rotate-180' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isMobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-0 bg-background rounded-none shadow-none max-h-[65vh] overflow-y-auto p-5 z-[50]">
          <NavTree currentNodes={nodes} />
        </div>
      )}
    </div>
  );
}
