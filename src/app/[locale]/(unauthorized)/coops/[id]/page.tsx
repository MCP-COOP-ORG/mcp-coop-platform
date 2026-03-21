import { notFound } from "next/navigation";

import { getCoopByAddress } from "@/features/coop/actions/coops.actions";
import CoopItem from "@/features/coop/components/coop-item";

interface CoopDetailsPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function CoopDetailsPage({ params }: CoopDetailsPageProps) {
  const { id } = await params;
  const coop = await getCoopByAddress(id);

  if (!coop) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-4">
      <CoopItem coop={coop} />
    </div>
  );
}


