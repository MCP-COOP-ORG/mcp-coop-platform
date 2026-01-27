import PageContentLayout from "@/components/layout/page-content";
import ArticlesLayout from "@/components/layout/articles";

export default function Home() {
  return (
    <>
      <PageContentLayout pageKey="home" language="en" />
      <ArticlesLayout />
    </>
  );
}
