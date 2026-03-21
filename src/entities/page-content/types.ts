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
