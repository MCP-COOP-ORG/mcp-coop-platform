import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getPageContent } from "@/app/actions/page-content";
import ContentUnavailable from "@/components/ui/content-unavailable";

interface PageContentLayoutProps {
  pageKey: string;
  language?: string;
}

const PageContentLayout = async ({
  pageKey,
  language = "en",
}: PageContentLayoutProps) => {
  let content = null;

  try {
    content = await getPageContent({ page: pageKey, language });
  } catch (error) {
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

  if (!content) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <Card>
        <CardHeader className="flex flex-col items-start gap-1">
          <p className="text-xs uppercase text-default-500">
            {content.language}
          </p>
          <h1 className="text-3xl font-bold">{content.title}</h1>
          {content.subtitle && (
            <p className="text-default-500 text-sm">{content.subtitle}</p>
          )}
        </CardHeader>

        <CardBody className="space-y-4">
          {content.image && (
            <div className="relative w-full h-56 rounded-lg overflow-hidden">
              <Image
                src={content.image}
                alt={content.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <p className="text-sm leading-relaxed">{content.description}</p>
        </CardBody>

        {content.video && (
          <CardFooter>
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
    </div>
  );
};

export default PageContentLayout;

