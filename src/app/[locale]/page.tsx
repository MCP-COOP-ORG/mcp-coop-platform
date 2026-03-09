import PageContentLayout from "@/shared/ui/layout/page-content";
import ArticlesLayout from "@/shared/ui/layout/articles";

export default function Home() {
  return (
    <>
      <PageContentLayout pageKey="home" language="en" />
      <ArticlesLayout />
    </>
  );
}
