import { PAGE_KEYS } from "@/shared/constants/page-keys";
import { getPage, HomeView } from "@/features/page-content";
import type { HomePageJsonContent } from "@/entities/page-content/types";

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const content = await getPage<HomePageJsonContent>({ pageName: PAGE_KEYS.home, language: locale });
  return <HomeView content={content} />;
}
