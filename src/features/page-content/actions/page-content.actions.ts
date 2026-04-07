"use server";

import { prisma } from "@/core/api/prisma";
import { Locales } from "@/shared/constants/locale";
import type { PageContentDto, GetPageContentParams, PageDto, GetPageParams } from "@/entities/page-content/types";

/**
 * Server Action to fetch generic Page data by pageName and language.
 */
export async function getPage<T = unknown>(
  params: GetPageParams,
): Promise<PageDto<T> | null> {
  const { pageName, language = Locales.EN } = params;

  const content = await prisma.page.findFirst({
    where: {
      pageName,
      language,
    },
  });

  if (!content) {
    return null;
  }

  return {
    id: content.id,
    pageName: content.pageName,
    language: content.language,
    jsonContent: content.jsonContent as T,
  };
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

