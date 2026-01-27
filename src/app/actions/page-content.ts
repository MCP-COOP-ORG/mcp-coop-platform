"use server";

import { prisma } from "@/lib/prisma";

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

interface GetPageContentParams {
  page: string;
  language?: string;
}

/**
 * Server Action to fetch static page content by page key and language.
 *
 * Uses the PageContent model from Prisma schema:
 * - page: unique page identifier (e.g. "docs", "coops", "blockchain-status")
 * - language: language code (e.g. "en", "ru")
 */
export async function getPageContent(
  params: GetPageContentParams,
): Promise<PageContentDto | null> {
  const { page, language = "en" } = params;

  const content = await prisma.pageContent.findFirst({
    where: {
      page,
      language,
    },
  });

  if (!content) {
    return null;
  }

  return {
    page: content.page,
    language: content.language,
    title: content.title,
    subtitle: content.subtitle,
    description: content.description,
    image: content.image,
    video: content.video,
    jsonContent: content.jsonContent,
  };
}

