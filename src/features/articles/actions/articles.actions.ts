"use server";

import { prisma } from "@/core/api/prisma";

export interface ArticleDto {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  content: string | null;
  createdAt: Date;
}

interface GetArticlesParams {
  limit?: number;
  language?: string;
  pageKey?: string;
}

/**
 * Server Action to fetch latest articles for the home page.
 */
export async function getArticles(
  params: GetArticlesParams = {},
): Promise<ArticleDto[]> {
  const { limit = 6, language, pageKey } = params;

  const articles = await prisma.article.findMany({
    where: {
      ...(language ? { language } : {}),
      ...(pageKey ? { pageContent: { page: pageKey } } : {}),
    },
    orderBy: { createdAt: "asc" },
    take: limit,
  });

  return articles.map((article: any) => ({
    id: article.id,
    title: article.title,
    subtitle: article.subtitle,
    image: article.image,
    content: article.jsonContent?.content || null,
    createdAt: article.createdAt,
  }));
}

