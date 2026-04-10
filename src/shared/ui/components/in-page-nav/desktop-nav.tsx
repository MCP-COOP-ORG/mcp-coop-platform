"use client";

import React, { useState } from "react";
import { NavigationNode } from "@/entities/navigation/types";

interface DesktopNavProps {
  nodes: NavigationNode[];
  scrollToHeading: (id: string, label: string) => void;
}

export function DesktopNav({ nodes, scrollToHeading }: DesktopNavProps) {
  const [openNodeIds, setOpenNodeIds] = useState<Set<string>>(new Set());

  const toggleSidebarNode = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenNodeIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const NavTree = ({ currentNodes, level = 0 }: { currentNodes: NavigationNode[]; level?: number }) => {
    return (
      <ul className={`flex flex-col ${level === 0 ? "gap-1" : "gap-0 pl-3 py-1 mt-1"}`}>
        {currentNodes.map(node => {
          const hasSub = node.children && node.children.length > 0;
          const isOpen = openNodeIds.has(node.id);
          
          const headingClass = level === 0
            ? "block text-[15px] font-semibold text-foreground hover:text-primary transition-colors flex-1 w-full text-left"
            : "block text-sm font-medium text-foreground hover:text-primary transition-colors leading-tight flex-1 py-1 w-full text-left";

          return (
            <li key={node.id} className="flex flex-col">
              {hasSub ? (
                <details className="group marker:content-['']" open={isOpen}>
                  <summary 
                    className="flex items-start justify-between cursor-pointer list-none [&::-webkit-details-marker]:hidden outline-none -mx-1 p-1 w-full break-words"
                    onClick={(e) => toggleSidebarNode(node.id, e)}
                  >
                    <span className={headingClass} onClick={(e) => { e.stopPropagation(); scrollToHeading(node.id, node.label); }}>
                      {node.label}
                    </span>
                    <span className="shrink-0 ml-1 mt-[2px] transition-opacity" onClick={(e) => toggleSidebarNode(node.id, e)}>
                      <svg className={`${isOpen ? 'hidden' : 'block'} text-success`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      <svg className={`${isOpen ? 'block' : 'hidden'} text-danger`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </span>
                  </summary>
                  <NavTree currentNodes={node.children!} level={level + 1} />
                </details>
              ) : (
                <div className="flex items-start -mx-1 p-1 break-words">
                  <button type="button" onClick={() => scrollToHeading(node.id, node.label)} className={headingClass}>
                    {node.label}
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return <NavTree currentNodes={nodes} />;
}
