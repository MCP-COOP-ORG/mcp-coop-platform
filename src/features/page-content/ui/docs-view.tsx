"use client";

import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { InPageNav } from "@/shared/ui/components/in-page-nav";
import { NavigationNode } from "@/entities/navigation/types";
import { 
  DocumentPageJsonContent, 
  DocumentTree, 
  ContentBlock, 
  HeadingBlock, 
  ParagraphBlock, 
  CodeBlock, 
  AccordionBlock, 
  MarkdownBlock 
} from "@/entities/page-content/types";

// --- UTILS ---
function generateId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9а-яё]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

const sortOutline = (a: [string, unknown], b: [string, unknown]) => {
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

function mapDocumentTreeToNavNodes(tree: DocumentTree): NavigationNode[] {
  if (!tree) return [];
  
  return Object.entries(tree)
    .sort(sortOutline)
    .map(([heading, node]) => {
      const children = node.subSections ? mapDocumentTreeToNavNodes(node.subSections) : undefined;
      return {
        id: generateId(heading),
        label: heading,
        children: children?.length ? children : undefined,
      };
    });
}

// --- FLAT BLOCKS PARSER ---
function JsonBlocksRenderer({ blocks }: { blocks?: ContentBlock[] }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="flex flex-col gap-2 w-full mt-1">
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        switch (block.type) {
          case "heading": {
            const { level, text, id } = block as HeadingBlock;
            const className = level === 2
              ? "text-[18px] sm:text-[19px] font-bold mt-4 mb-1 scroll-mt-24 text-foreground"
              : "text-base sm:text-[17px] font-semibold mt-3 mb-1 scroll-mt-24 text-foreground";

            const domId = id || generateId(text);

            switch (level) {
              case 1: return <h1 key={key} id={domId} className={className}>{text}</h1>;
              case 2: return <h2 key={key} id={domId} className={className}>{text}</h2>;
              case 3: return <h3 key={key} id={domId} className={className}>{text}</h3>;
              case 4: return <h4 key={key} id={domId} className={className}>{text}</h4>;
              case 5: return <h5 key={key} id={domId} className={className}>{text}</h5>;
              default: return <h6 key={key} id={domId} className={className}>{text}</h6>;
            }
          }
          case "paragraph": {
            const { html, text } = block as ParagraphBlock;
            const content = html ?? text ?? "";
            return (
              <p
                key={key}
                className="w-full text-sm sm:text-[15px] leading-tight text-foreground whitespace-pre-wrap 
                           [&>a]:text-primary [&>a]:underline [&>a]:underline-offset-2 [&>a:hover]:text-primary-600"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            );
          }
          case "code": {
            const { code } = block as CodeBlock;
            return (
              <pre key={key} className="bg-default-50 p-4 rounded-xl text-xs sm:text-sm font-mono text-default-600 overflow-x-auto my-2 border border-default-200">
                {code}
              </pre>
            );
          }
          case "accordion": {
            const accBlock = block as AccordionBlock;
            return (
              <details key={key} className="group border border-default-200 rounded-xl overflow-hidden my-2">
                <summary className="font-semibold text-default-800 text-base cursor-pointer px-4 py-3 bg-default-50 hover:bg-default-100 transition-colors list-none [&::-webkit-details-marker]:hidden flex justify-between items-center outline-none">
                  {accBlock.title}
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 border-t border-default-200 bg-default-50/50">
                  <JsonBlocksRenderer blocks={accBlock.blocks} />
                </div>
              </details>
            );
          }
          case "markdown": {
            const { text } = block as MarkdownBlock;
            return (
              <div key={key} className="w-full prose max-w-none dark:prose-invert text-foreground
                           prose-headings:text-foreground prose-headings:font-bold
                           prose-h1:text-[20px] prose-h1:mt-6 prose-h1:mb-3 
                           prose-h2:text-[18px] prose-h2:mt-5 prose-h2:mb-2 
                           prose-h3:text-[16px] prose-h3:mt-4 prose-h3:mb-1 
                           prose-h4:text-[14px] prose-h4:mt-3 prose-h4:mb-1 
                           prose-p:text-sm sm:prose-p:text-[14px] prose-p:leading-tight prose-p:my-2 
                           prose-a:text-primary prose-a:no-underline hover:prose-a:underline 
                           prose-strong:text-foreground prose-strong:font-semibold 
                           prose-ul:list-disc prose-ul:pl-5 prose-ul:my-2 
                           prose-li:text-sm sm:prose-li:text-[14px] prose-li:my-1 prose-li:leading-tight 
                           prose-blockquote:border-l-3 prose-blockquote:border-default-300 prose-blockquote:pl-4 prose-blockquote:py-0.5 prose-blockquote:my-3 prose-blockquote:text-default-600 prose-blockquote:font-normal prose-blockquote:not-italic [&_blockquote_p::before]:content-none [&_blockquote_p::after]:content-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {text}
                </ReactMarkdown>
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}

// --- MAIN TREE CONTENT RENDERER ---
function DocumentTreeContentRenderer({ tree, level = 2 }: { tree: DocumentTree; level?: number }) {
  if (!tree || Object.keys(tree).length === 0) return null;

  return (
    <div className={`flex flex-col w-full ${level === 2 ? 'mb-10' : ''}`}>
      {Object.entries(tree).sort(sortOutline).map(([heading, node]) => {
        const id = generateId(heading);

        const headingClass = level === 2
          ? "text-[18px] sm:text-[19px] font-bold mb-1 mt-3 scroll-mt-28 text-foreground"
          : "text-base sm:text-[17px] font-semibold mb-1 mt-1 scroll-mt-28 text-foreground";

        return (
          <article key={id} className={`flex flex-col w-full ${level === 2 ? 'mt-4 gap-2' : 'mt-2 gap-1'} first:mt-0`}>
            {level === 2 && <h2 id={id} className={headingClass}>{heading}</h2>}
            {level === 3 && <h3 id={id} className={headingClass}>{heading}</h3>}
            {level > 3 && <h4 id={id} className="text-base font-medium mb-1 mt-1 scroll-mt-28 text-foreground">{heading}</h4>}

            {node.content && node.content.length > 0 && (
              <JsonBlocksRenderer blocks={node.content} />
            )}

            {node.subSections && Object.keys(node.subSections).length > 0 && (
              <div className="pl-[20px]">
                <DocumentTreeContentRenderer tree={node.subSections} level={level + 1} />
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

export function DocsView({ content }: { content?: DocumentPageJsonContent }) {
  const documentTree = content?.contentTree || {};
  const hasContent = Object.keys(documentTree).length > 0;
  const navNodes = mapDocumentTreeToNavNodes(documentTree);

  return (
    <div className="flex flex-col lg:flex-row gap-12 relative items-start">
      <section className="flex-1 min-w-0 w-full flex flex-col gap-10">
        
        {/* Page Header */}
        <div className="flex flex-col gap-3 w-full pb-2">
          {content?.hero?.title && (
            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-foreground antialiased">
              {content.hero.title}
            </h1>
          )}
          {content?.hero?.subtitle && (
            <p className="text-[15px] sm:text-base font-medium text-foreground leading-snug">
              {content.hero.subtitle}
            </p>
          )}
          {content?.hero?.description && (
            <p className="w-full text-sm sm:text-[15px] leading-tight text-foreground whitespace-pre-wrap mt-1">
              {content.hero.description}
            </p>
          )}
        </div>

        {!hasContent ? (
          <p className="text-default-500">Контент документации еще не добавлен.</p>
        ) : (
          <>
            <InPageNav nodes={navNodes} variant="mobile" />
            <DocumentTreeContentRenderer tree={documentTree} />
          </>
        )}
      </section>

      {hasContent && (
        <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-[114px] lg:self-start lg:max-h-[calc(100vh-114px-30px)] lg:overflow-y-auto overflow-x-hidden border-l-[1px] border-primary pl-4 hidden lg:block custom-scrollbar mt-2">
          <nav>
            <InPageNav nodes={navNodes} variant="sidebar" />
          </nav>
        </aside>
      )}
    </div>
  );
}
