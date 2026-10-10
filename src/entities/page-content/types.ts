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

export interface ProjectItem {
  id: string;
  specId: string; // "SYS-01", "MOD-02"
  title: string;
  description: string;
  imageUrl: string;
  categories: string[]; // ["ios", "mobile"], ["web", "ai"]
  techStack: string[];  // ["SwiftUI", "Combine"]
  links: {
    liveUrl?: string;
    githubUrl?: string;
  };
}

export interface ProjectsSection {
  title: string;
  subtitle?: string;
  categories: Array<{ id: string; label: string }>;
  projects: ProjectItem[];
}

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  experience: string;
  description?: string;
  photoUrl: string;
  techStack: string[];
  links: {
    github?: string;
    linkedin?: string;
    telegram?: string;
  };
}

export interface TeamSection {
  title: string;
  subtitle?: string;
  members: TeamMemberItem[];
}

export interface WorkflowStepItem {
  id: string;
  stepNumber: string; // "01", "02", "03", "04"
  tag: string;        // "СВЯЗЬ" / "CONTACT"
  title: string;
  description: string;
}

export interface WorkflowCta {
  title: string;
  subtitle?: string;
  checklistTitle: string;
  checklistItems: string[];
  checklistNote: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  responseTimeBadge: string;
}

export interface WorkflowSection {
  title: string;
  subtitle?: string;
  steps: WorkflowStepItem[];
  cta: WorkflowCta;
}

export interface HomePageJsonContent {
  highlightWords: string[];
  hero: { tagline: string; subtitle: string; buttonText: string; subtitleHighlightWords?: string[] };
  features: Array<{ id: string; title: string; description: string }>;
  projectsSection?: ProjectsSection;
  teamSection?: TeamSection;
  workflowSection?: WorkflowSection;
  roadmapSection?: {
    title: string;
    releaseDate: string;
    goals: Array<{
      id: string;
      goal: string;
      completed: boolean;
      endDate: string;
    }>;
  };
  agentBuilderSection?: {
    title: string;
    description: string;
    buttonText: string;
    highlightWords?: string[];
  };
  articlesSection?: {
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
