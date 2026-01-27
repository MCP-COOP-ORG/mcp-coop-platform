import { notFound } from "next/navigation";

import { getCoopByAddress } from "@/app/actions/coops";
import CoopItem from "@/features/coop-item";

interface CoopDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function CoopDetailsPage({ params }: CoopDetailsPageProps) {
  const { id } = params;

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

