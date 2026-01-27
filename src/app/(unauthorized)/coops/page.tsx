import PageContentLayout from "@/components/layout/page-content";
import { getCoops } from "@/app/actions/coops";
import CoopList from "@/features/coop-list";

export default async function CoopsPage() {
  const coops = await getCoops();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      <PageContentLayout pageKey="coops" language="en" />
      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Cooperatives</h2>
        <p className="text-default-500 text-sm">
          Select a cooperative to view its on-chain details.
        </p>
        <CoopList coops={coops} />
      </section>
    </div>
  );
}

