export interface PageDto<T = unknown> {
  id: string;
  pageName: string;
  language: string;
  jsonContent: T;
}

export interface GetPageParams {
  pageName: string;
  language?: string;
}

export interface HomePageJsonContent {
  highlightWords: string[];
  hero: { tagline: string; subtitle: string; buttonText: string };
  features: Array<{ id: string; title: string; description: string }>;
  roadmapSection: {
    title: string;
    releaseDate: string;
    goals: Array<{
      id: string;
      goal: string;
      completed: boolean;
      endDate: string;
    }>;
  };
  articlesSection: {
    title: string;
    articles: Array<{ id: string; title: string; subtitle: string; icon: string; content: string }>;
  };
}

export interface ListingPageJsonContent {
  highlightWords?: string[];
  hero: {
    title: string;
    subtitle?: string;
    description: string;
  };
}

export type BlockType = "heading" | "paragraph" | "accordion" | "code" | "markdown";
export interface BaseBlock { type: BlockType; }
export interface HeadingBlock extends BaseBlock { type: "heading"; level: number; text: string; id?: string; }
export interface ParagraphBlock extends BaseBlock { type: "paragraph"; html?: string; text?: string; }
export interface CodeBlock extends BaseBlock { type: "code"; code: string; language?: string; }
export interface AccordionBlock extends BaseBlock { type: "accordion"; title: string; blocks: ContentBlock[]; }
export interface MarkdownBlock extends BaseBlock { type: "markdown"; text: string; }
export type ContentBlock = HeadingBlock | ParagraphBlock | CodeBlock | AccordionBlock | MarkdownBlock;

export interface BaseDocumentNode {
  content?: ContentBlock[];
  subSections?: Record<string, BaseDocumentNode>;
}

export type DocumentTree = Record<string, BaseDocumentNode>;

export interface DocumentPageJsonContent {
  hero: {
    title: string;
    subtitle?: string;
    description?: string;
  };
  contentTree: DocumentTree;
}
