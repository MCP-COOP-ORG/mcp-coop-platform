export interface PageContentDto {
  page: string;
  language: string;
  title: string;
  subtitle?: string | null;
  description: string;
  image?: string | null;
  video?: string | null;
  jsonContent: unknown;
}

export interface GetPageContentParams {
  page: string;
  language?: string;
}

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
