import PageContentLayout from "@/shared/ui/layout/page-content";
import { PAGE_KEYS } from "@/shared/constants/page-keys";

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  
  return (
    <PageContentLayout pageKey={PAGE_KEYS.home} language={params.locale} />
  );
}
