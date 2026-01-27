"use server";

import { prisma } from "@/lib/prisma";

export interface CoopItemDto {
  id: string;
  address: string;
  name: string;
  description: string;
  image: string;
}

/**
 * Fetch all cooperatives for the public coops list.
 */
export async function getCoops(): Promise<CoopItemDto[]> {
  const coops = await prisma.coopItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return coops.map((coop) => ({
    id: coop.id,
    address: coop.address,
    name: coop.name,
    description: coop.description,
    image: coop.image,
  }));
}

/**
 * Fetch single cooperative by its address (used as URL id).
 */
export async function getCoopByAddress(
  address: string,
): Promise<CoopItemDto | null> {
  const coop = await prisma.coopItem.findFirst({
    where: { address },
  });

  if (!coop) {
    return null;
  }

  return {
    id: coop.id,
    address: coop.address,
    name: coop.name,
    description: coop.description,
    image: coop.image,
  };
}

