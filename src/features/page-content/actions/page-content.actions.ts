"use server";

import { prisma } from "@/core/api/prisma";
import { Locales } from "@/shared/constants/locale";
import type { PageDto, GetPageParams } from "@/entities/page-content/types";

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
