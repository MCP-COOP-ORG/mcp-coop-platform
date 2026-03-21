"use server";

import { prisma } from "@/core/api/prisma";
import { DEFAULT_ORDER_BY } from "@/shared/constants/query";
import type { ArticleDto, GetArticlesParams } from "@/entities/article/types";

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
    orderBy: DEFAULT_ORDER_BY.oldest,
    take: limit,
  });

  return articles.map((article) => ({
    id: article.id,
    title: article.title,
    subtitle: article.subtitle,
    image: article.image ?? "",
    content: (article.jsonContent as { content?: string })?.content || null,
    createdAt: article.createdAt,
  }));
}

