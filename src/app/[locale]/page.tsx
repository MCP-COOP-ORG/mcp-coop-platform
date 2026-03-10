import PageContentLayout from "@/shared/ui/layout/page-content";

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  
  return (
    <PageContentLayout pageKey="home" language={params.locale} />
  );
}
