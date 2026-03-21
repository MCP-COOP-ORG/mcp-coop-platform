import PageContentLayout from "@/shared/ui/layout/page-content";
import { PAGE_KEYS } from "@/shared/constants/page-keys";
import { getCoops } from "@/features/coop/actions/coops.actions";
import CoopList from "@/features/coop/components/coop-list";
import { getTranslations } from "next-intl/server";

export default async function CoopsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const coops = await getCoops();
  const navT = await getTranslations("Navigation");

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      <PageContentLayout pageKey={PAGE_KEYS.coops} language={locale} />
      <section className="space-y-3">
        <h2 className="text-2xl font-bold">{navT("cooperatives")}</h2>
        <p className="text-default-500 text-sm">
          {navT("cooperativesDescription")}
        </p>
        <CoopList coops={coops} />
      </section>
    </div>
  );
}
