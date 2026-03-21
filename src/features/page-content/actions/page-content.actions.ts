"use server";

import { prisma } from "@/core/api/prisma";
import { Locales } from "@/shared/constants/locale";
import type { PageContentDto, GetPageContentParams } from "@/entities/page-content/types";

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
  const { page, language = Locales.EN } = params;

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

