import { Card, CardBody } from "@/shared/ui/components/hero-ui";
import * as LucideIcons from "lucide-react";
import React from "react";

import { getArticles } from "@/features/articles/actions/articles.actions";
import type { ArticleDto } from "@/entities/article/types";
import ContentUnavailable from "@/shared/ui/components/content-unavailable";

interface ArticlesLayoutProps {
  limit?: number;
  language: string;
  pageKey: string;
}

/** Map an article.image string to a Lucide icon component. */
function getIconComponent(iconName: string): React.ElementType {
  const capitalizedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  const icons = LucideIcons as unknown as Record<string, React.ElementType>;
  return icons[capitalizedName] || LucideIcons.Layers;
}

export default async function ArticlesLayout({ limit = 6, language, pageKey }: ArticlesLayoutProps) {
  let articles: ArticleDto[];

  try {
    articles = await getArticles({ limit, language, pageKey });
  } catch (error) {
    console.error("Failed to load articles", { error });
    return (
      <ContentUnavailable
        title="Articles temporarily unavailable"
        description="We could not load the latest articles right now. Please try again later."
      />
    );
  }

  if (!articles.length) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const Icon = getIconComponent(article.image || "Layers");

          return (
            <Card
              key={article.id}
              className="p-6 shadow-none border border-default-200 bg-background flex flex-col items-start text-left h-full"
            >
              <CardBody className="flex flex-col p-0 h-full w-full gap-5 overflow-visible">
                {/* Header: Icon + Title & Subtitle */}
                <div className="flex gap-4 items-start w-full">
                  <div className="w-16 h-16 flex items-center justify-center border-2 border-primary rounded-xl text-primary flex-shrink-0">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-1 w-full overflow-hidden">
                    <h3 className="text-base font-bold text-primary/80 leading-tight">{article.title}</h3>
                    <p className="text-sm font-medium text-default-600 line-clamp-2">{article.subtitle}</p>
                  </div>
                </div>

                {/* Content Paragraph */}
                {article.content && (
                  <div className="text-sm text-foreground/90 flex-grow leading-relaxed">
                    <p>{article.content}</p>
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
