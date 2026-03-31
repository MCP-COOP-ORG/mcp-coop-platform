"use client";

import React from "react";

// Types extracted to match the parent
type BlockType = "heading" | "paragraph" | "accordion" | "code" | "markdown";
interface BaseBlock { type: BlockType; }
interface HeadingBlock extends BaseBlock { type: "heading"; level: number; text: string; id?: string; }
interface ParagraphBlock extends BaseBlock { type: "paragraph"; html?: string; text?: string; }
interface CodeBlock extends BaseBlock { type: "code"; code: string; language?: string; }
interface AccordionBlock extends BaseBlock { type: "accordion"; title: string; blocks: ContentBlock[]; }
interface MarkdownBlock extends BaseBlock { type: "markdown"; text: string; }
type ContentBlock = HeadingBlock | ParagraphBlock | CodeBlock | AccordionBlock | MarkdownBlock;

interface DocumentNode {
  content?: ContentBlock[];
  subSections?: Record<string, DocumentNode>;
}

type DocumentTree = Record<string, DocumentNode>;

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


export function DocsSidebar({ tree, level = 0 }: { tree: DocumentTree; level?: number }) {
  const [openNodeId, setOpenNodeId] = React.useState<string | null>(null);

  if (!tree || Object.keys(tree).length === 0) return null;

  return (
    <ul className={`flex flex-col ${level === 0 ? "gap-1" : "gap-0 pl-3 py-1 mt-1"}`}>
      {Object.entries(tree).sort(sortOutline).map(([heading, node]) => {
        const id = generateId(heading);
        const hasSubSections = node.subSections && Object.keys(node.subSections).length > 0;
        
        const headingClass = level === 0
          ? "block text-[15px] font-semibold text-foreground hover:text-primary transition-colors flex-1 w-full text-left"
          : "block text-sm font-medium text-foreground hover:text-primary transition-colors leading-tight flex-1 py-1 w-full text-left";

        const scrollToHeading = () => {
          const el = document.getElementById(id);
          if (el) {
            window.history.pushState(null, "", `#${id}`);
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        };

        return (
          <li key={id} className="flex flex-col">
            {hasSubSections ? (
              <details 
                className="group marker:content-['']" 
                open={openNodeId === id}
              >
                <summary 
                  className="flex items-start justify-between cursor-pointer list-none [&::-webkit-details-marker]:hidden outline-none -mx-1 p-1 w-full break-words"
                  onClick={(e) => {
                    e.preventDefault(); 
                    setOpenNodeId(prev => prev === id ? null : id);
                    scrollToHeading();
                  }}
                >
                  <span className={headingClass}>
                    {heading}
                  </span>
                  <span className="shrink-0 ml-1 mt-[2px] transition-opacity">
                    <svg className="block group-open:hidden text-success" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <svg className="hidden group-open:block text-danger" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                </summary>
                <DocsSidebar tree={node.subSections!} level={level + 1} />
              </details>
            ) : (
              <div className="flex items-start -mx-1 p-1 break-words">
                <button type="button" onClick={scrollToHeading} className={headingClass}>
                  {heading}
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
