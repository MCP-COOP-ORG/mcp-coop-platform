import PageContentLayout from "@/shared/ui/layout/page-content";
import { PAGE_KEYS } from "@/shared/constants/page-keys";

export default async function BlockchainStatusPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  return <PageContentLayout pageKey={PAGE_KEYS.blockchainStatus} language={locale} />;
}

