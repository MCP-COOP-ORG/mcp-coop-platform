import { Card, CardHeader, CardBody } from "@heroui/react";
import Image from "next/image";

import { getArticles } from "@/app/actions/articles";
import ContentUnavailable from "@/components/ui/content-unavailable";

interface ArticlesLayoutProps {
  limit?: number;
}

const ArticlesLayout = async ({ limit = 6 }: ArticlesLayoutProps) => {
  let articles = [];

  try {
    articles = await getArticles({ limit });
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
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="h-full">
            <CardHeader className="flex flex-col items-start gap-1">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p className="text-default-500 text-sm">{article.subtitle}</p>
            </CardHeader>
            <CardBody className="space-y-3">
              {article.image && (
                <div className="relative w-full h-40 rounded-lg overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <p className="text-xs text-default-400">
                {article.createdAt.toLocaleDateString()}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArticlesLayout;

