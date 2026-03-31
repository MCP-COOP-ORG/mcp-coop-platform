"use client";

import React, { useState, useEffect, useRef } from "react";

// Helper routines matching docs-sidebar
function generateId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9а-яё]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

const sortOutline = (a: [string, any], b: [string, any]) => {
  const getParts = (s: string) => (s.match(/^(\d+(?:\.\d+)*)/)?.[0] || "1000").split('.').map(Number);
  const aParts = getParts(a[0]);
  const bParts = getParts(b[0]);
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const na = aParts[i] || 0;
    const nb = bParts[i] || 0;
    if (na !== nb) return na - nb;
  }
  return 0;
};

export function MobileDocsNav({ tree }: { tree: Record<string, any> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Оглавление"); // Default fallback
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // IntersectionObserver to auto-update the active section title on scroll
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h2[id]"));
    if (!headings.length) return;

    if (activeSection === "Оглавление" && headings[0].textContent) {
      setActiveSection(headings[0].textContent);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find whichever intersecting heading is closest to the top
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.textContent) {
            setActiveSection(entry.target.textContent);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" } // Triggers when heading is near the top of viewport
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [activeSection]);

  if (!tree || Object.keys(tree).length === 0) return null;

  const handleLinkClick = (id: string, heading: string) => {
    setActiveSection(heading);
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      window.history.pushState(null, "", `#${id}`);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderNodes = (nodes: any, level = 0) => {
    return (
      <ul className={`flex flex-col ${level === 0 ? "gap-2" : "gap-1 pl-4 mt-1 mb-2 border-l-2 border-default-200"}`}>
        {Object.entries(nodes).sort(sortOutline).map(([heading, node]: any) => {
          const id = generateId(heading);
          const hasSub = node.subSections && Object.keys(node.subSections).length > 0;
          
          return (
            <li key={id} className="flex flex-col">
               <button 
                 type="button" 
                 onClick={() => handleLinkClick(id, heading)}
                 className={`text-left w-full block py-1.5 transition-colors hover:text-primary ${
                   level === 0 
                     ? "font-bold text-[15px] text-foreground" 
                     : "font-medium text-[14px] text-default-600"
                 }`}
               >
                 {heading}
               </button>
               {hasSub && renderNodes(node.subSections, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div 
      ref={menuRef} 
      // Adjusted top to sit right under the main nav bar. 
      // Z-index elevated to ensure it stays over markdown content.
      className="w-full sticky top-[64px] sm:top-[72px] z-[40] bg-background/95 backdrop-blur-md lg:hidden mb-6 py-2"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 px-4 bg-default-100 rounded-xl border border-default-300 hover:bg-default-200 transition-colors shadow-sm"
      >
        <div className="flex flex-col items-start overflow-hidden">
          <span className="text-[11px] font-bold text-primary uppercase tracking-wider mb-0.5">Раздел</span>
          <span className="font-semibold text-[14px] sm:text-[15px] truncate w-full text-foreground text-left">{activeSection}</span>
        </div>
        <svg className={`shrink-0 ml-3 transition-transform duration-300 text-default-600 ${isOpen ? 'rotate-180' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-default-300 rounded-2xl shadow-2xl max-h-[65vh] overflow-y-auto p-5 z-[50]">
          {renderNodes(tree)}
        </div>
      )}
    </div>
  );
}
