"use client";

import { Card, CardBody } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import React, { useEffect, useState } from "react";

import { getArticles, type ArticleDto } from "@/features/articles/actions/articles.actions";
import ContentUnavailable from "@/shared/ui/components/content-unavailable";

interface ArticlesLayoutProps {
  limit?: number;
  language: string;
  pageKey: string;
}

export default function ArticlesLayout({ limit = 6, language, pageKey }: ArticlesLayoutProps) {
  const [articles, setArticles] = useState<ArticleDto[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles({ limit, language, pageKey })
      .then(setArticles)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [limit]);

  if (error) {
    console.error("Failed to load articles", { error });
    return (
      <ContentUnavailable
        title="Articles temporarily unavailable"
        description="We could not load the latest articles right now. Please try again later."
      />
    );
  }

  if (isLoading || !articles.length) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const iconName = article.image 
            ? article.image.charAt(0).toUpperCase() + article.image.slice(1) 
            : "Layers";
          const Icon = (LucideIcons as any)[iconName] || LucideIcons.Layers;

          return (
            <Card 
              key={article.id} 
              className="p-6 shadow-none border border-default-200 bg-background flex flex-col items-start text-left h-full"
            >
              <CardBody className="flex flex-col p-0 h-full w-full gap-5 overflow-visible">
                {/* Header: Icon + Title & Subtitle */}
                <div className="flex gap-4 items-start w-full overflow-hidden">
                  <div className="w-12 h-12 flex items-center justify-center border-2 border-primary rounded-xl text-primary flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-1 mt-0.5 overflow-hidden w-full">
                    <h3 className="text-xl font-bold text-primary/80 leading-tight truncate">{article.title}</h3>
                    <p className="text-sm font-medium text-default-600 truncate">{article.subtitle}</p>
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

