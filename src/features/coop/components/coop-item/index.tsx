import { Card, CardHeader, CardBody } from "@/shared/ui/components/hero-ui";

import type { CoopItemDto } from "@/entities/coop/types";

interface CoopItemProps {
  coop: CoopItemDto;
}

/**
 * Detailed view for a single cooperative.
 * Intended for coop detail pages.
 */
const CoopItem: React.FC<CoopItemProps> = ({ coop }) => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-start gap-1">
        <h1 className="text-2xl font-bold">{coop.name}</h1>
        <p className="text-xs font-mono text-default-500 break-all">
          {coop.address}
        </p>
      </CardHeader>
      <CardBody className="space-y-3">
        <p className="text-default-500 text-sm">{coop.description}</p>
      </CardBody>
    </Card>
  );
};

export default CoopItem;
