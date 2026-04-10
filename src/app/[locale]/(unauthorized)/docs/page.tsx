import { getPage } from "@/features/page-content";
import { DocsView } from "@/features/page-content/ui/docs-view";
import { DocumentPageJsonContent } from "@/entities/page-content/types";

export default async function DocsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  const content = await getPage<DocumentPageJsonContent>({ pageName: "docs", language: locale });

  return (
    <main className="max-w-7xl mx-auto pt-6 pb-12 px-6">
      <DocsView content={content?.jsonContent} />
    </main>
  );
}
