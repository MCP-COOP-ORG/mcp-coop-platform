"use client";

import Link from "next/link";
import { Card, CardHeader, CardBody } from "@heroui/react";

import type { CoopItemDto } from "@/features/coop/actions/coops.actions";

interface CoopListProps {
  coops: CoopItemDto[];
}

/**
 * Reusable list of cooperatives.
 * Renders a responsive grid and links each coop by its address.
 */
const CoopList: React.FC<CoopListProps> = ({ coops }) => {
  if (!coops.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {coops.map((coop) => (
        <Link
          key={coop.id}
          href={`/coops/${encodeURIComponent(coop.address)}`}
        >
          <Card className="h-full hover:opacity-90 transition-opacity">
            <CardHeader className="flex flex-col items-start gap-1">
              <h2 className="text-xl font-semibold">{coop.name}</h2>
              <p className="text-xs font-mono text-default-500 truncate">
                {coop.address}
              </p>
            </CardHeader>
            <CardBody>
              <p className="text-default-500 text-sm line-clamp-3">
                {coop.description}
              </p>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CoopList;

