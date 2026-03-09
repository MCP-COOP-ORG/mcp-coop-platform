"use server";

import { prisma } from "@/core/api/prisma";

export interface ArticleDto {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  createdAt: Date;
}

interface GetArticlesParams {
  limit?: number;
}

/**
 * Server Action to fetch latest articles for the home page.
 */
export async function getArticles(
  params: GetArticlesParams = {},
): Promise<ArticleDto[]> {
  const { limit = 6 } = params;

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return articles.map((article: any) => ({
    id: article.id,
    title: article.title,
    subtitle: article.subtitle,
    image: article.image,
    createdAt: article.createdAt,
  }));
}

