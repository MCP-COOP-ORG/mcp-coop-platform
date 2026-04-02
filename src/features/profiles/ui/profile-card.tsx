import React from "react";
import { BaseCard } from "@/shared/ui/components/card";
import { Contacts } from "@/shared/ui/components/contacts";
import { CryptoWallets } from "@/shared/ui/components/crypto-wallets";
import { Skills } from "@/shared/ui/components/skills";
import { ProfileCategories } from "@/shared/ui/components/profile-categories";
import { ProfileCardData } from "@/shared/types/card.types";
import { APP_INFO } from "@/shared/constants/app-info";

export interface ProfileCardProps {
  item: ProfileCardData;
  href?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ item, href }) => {
  return (
    <BaseCard bgImage={APP_INFO.logo}>
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
      {item.skills && item.skills.length > 0 ? (
        <BaseCard.Footer>
          <Skills skills={item.skills} />
        </BaseCard.Footer>
      ) : null}
    </BaseCard>
  );
};
