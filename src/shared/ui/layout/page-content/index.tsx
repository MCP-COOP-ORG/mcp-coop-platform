"use client";

import { Card, CardHeader, CardBody, CardFooter, Snippet } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { getPageContent } from "@/features/page-content/actions/page-content.actions";
import ContentUnavailable from "@/shared/ui/components/content-unavailable";

import ArticlesLayout from "@/shared/ui/layout/articles";

interface PageContentLayoutProps {
  pageKey: string;
  language?: string;
}

export default function PageContentLayout({
  pageKey,
  language = "en",
}: PageContentLayoutProps) {
  const [content, setContent] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPageContent({ page: pageKey, language })
      .then(setContent)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [pageKey, language]);

  if (error) {
    console.error("Failed to load PageContent", {
      pageKey,
      language,
      error,
    });

    return (
      <ContentUnavailable
        title="Content temporarily unavailable"
        description={`We could not load content for page "${pageKey}" right now. Please try again later.`}
      />
    );
  }

  if (!isLoading && !content) {
    return (
      <ContentUnavailable
        title="Page not found"
        description={`The content for "${pageKey}" could not be found or has not been created yet.`}
      />
    );
  }

  if (isLoading) {
    return null;
  }

  const renderBlocks = () => {
    if (!content.jsonContent?.blocks || !Array.isArray(content.jsonContent.blocks)) {
      return null;
    }

    return content.jsonContent.blocks.map((block: any, index: number) => {
      switch (block.type) {
        case "heading":
          const Tag = `h${block.level || 2}` as keyof React.JSX.IntrinsicElements;
          return (
            <Tag key={index} className="text-3xl font-bold mb-8 mt-12">
              {block.text}
            </Tag>
          );
        case "articles":
          return (
            <div key={index} className="w-full">
              <ArticlesLayout language={language} pageKey={pageKey} />
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <Card className="relative overflow-visible">
        <Snippet 
          color="primary" 
          variant="flat" 
          hideCopyButton 
          hideSymbol 
          className="absolute top-6 left-6 z-10 font-medium"
        >
          Pre-Alpha Version
        </Snippet>
        <CardBody className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start p-8 pt-20">
          <div className="flex flex-col items-start gap-4 md:col-span-3">
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
              {content.title}
            </h1>
            {content.subtitle && (
              <p className="text-base text-default-600 font-semibold leading-relaxed">
                {content.subtitle}
              </p>
            )}
            {content.description && (
              <div className="flex flex-col gap-3 mt-4 w-full">
                {content.description
                  .split('.')
                  .map((sentence: string) => sentence.trim())
                  .filter((sentence: string) => sentence.length > 0)
                  .map((sentence: string, index: number) => (
                    <Card 
                      key={index} 
                      shadow="sm" 
                      className="bg-content2/50 backdrop-blur-md border border-default-200/50 hover:border-primary/50 transition-colors"
                    >
                      <CardBody className="flex flex-row items-start gap-4 p-4">
                        <div className="mt-1 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary">
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-base text-foreground/90 font-medium leading-relaxed">
                          {sentence}.
                        </p>
                      </CardBody>
                    </Card>
                  ))}
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex justify-center items-center h-full w-full min-h-[300px]">
            {content.image ? (
              <div className="relative w-full aspect-square max-w-md">
                <Image
                  src={content.image}
                  alt={content.title}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-full aspect-square max-w-md rounded-2xl bg-default-100 flex items-center justify-center">
                <span className="text-default-400">Image goes here</span>
              </div>
            )}
          </div>
        </CardBody>

        {content.video && (
          <CardFooter className="px-8 pb-8 pt-0">
            <a
              href={content.video}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline text-sm"
            >
              Watch related video
            </a>
          </CardFooter>
        )}
      </Card>

      { renderBlocks() }
    </div>
  );
}

