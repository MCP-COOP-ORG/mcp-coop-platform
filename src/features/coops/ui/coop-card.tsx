import React from "react";
import { BaseCard } from "@/shared/ui/components/card";
import { Contacts } from "@/shared/ui/components/contacts";
import { CryptoWallets } from "@/shared/ui/components/crypto-wallets";
import { CoopMembers } from "@/shared/ui/components/coop-members";
import { ProfileCategories } from "@/shared/ui/components/profile-categories";
import { CoopCardData } from "@/shared/types/card.types";

export interface CoopCardProps {
  item: CoopCardData;
  href?: string;
}

export const CoopCard: React.FC<CoopCardProps> = ({ item, href }) => {
  return (
    <BaseCard bgImage={item.avatarUrl || null}>
      <BaseCard.Header
        href={href}
        avatarUrl={item.avatarUrl}
        name={item.name}
        tags={
          item.categories && item.categories.length > 0 ? (
            <ProfileCategories categories={item.categories} className="text-foreground" />
          ) : null
        }
        actions={
          <>
            <Contacts contacts={item.contacts || {}} />
            <CryptoWallets wallets={item.wallets || {}} />
          </>
        }
      />
      <BaseCard.Body description={item.description} />
      {item.members && item.members.length > 0 ? (
        <BaseCard.Footer>
          <CoopMembers members={item.members} />
        </BaseCard.Footer>
      ) : null}
    </BaseCard>
  );
};
