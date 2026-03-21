export interface ArticleDto {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  content: string | null;
  createdAt: Date;
}

export interface GetArticlesParams {
  limit?: number;
  language?: string;
  pageKey?: string;
}
