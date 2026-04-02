import React from "react";
import { Card as HeroCard, CardHeader, CardBody, CardFooter, Avatar } from "@/shared/ui/components/hero-ui";
import { Contacts, ProfileContacts } from "@/shared/ui/components/contacts";
import { ProfileCategories } from "@/shared/ui/components/profile-categories";
import { CryptoWallets, CryptoWalletsProps } from "@/shared/ui/components/crypto-wallets";
import { Skills, SkillItem } from "@/shared/ui/components/skills";
import { CoopMembers, CoopMemberItem } from "@/shared/ui/components/coop-members";
import { CatalogType } from "@/shared/config/constants/catalog";
import { APP_INFO } from "@/shared/constants/app-info";

export interface CardData {
  id: string;
  name: string;
  avatarUrl?: string | null;
  description?: string;
  categories?: string[];
  contacts?: ProfileContacts;
  wallets?: CryptoWalletsProps["wallets"];
  skills?: SkillItem[];
  members?: CoopMemberItem[];
}

export interface CardProps {
  item: CardData;
  type: CatalogType;
}

export const Card: React.FC<CardProps> = ({ item, type }) => {
  const {
    name,
    avatarUrl,
    description = "",
    categories = [],
    contacts = {},
    wallets = {},
    skills = [],
    members = [],
  } = item;

  const bgImage = type === CatalogType.PROFILE ? APP_INFO.logo : avatarUrl;

  return (
    <HeroCard className="p-[20px] shadow-sm border border-default-200 flex flex-col justify-start h-full relative overflow-hidden">
      {bgImage && (
        <div 
          className="absolute -top-[40%] -left-[40%] w-[80%] pb-[80%] bg-no-repeat bg-contain opacity-5 pointer-events-none z-0 grayscale"
          style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
        />
      )}

      <CardHeader className="p-0 flex items-start gap-4 mb-[20px] relative z-10 w-full overflow-visible">
        <div className="shrink-0 w-16 h-16">
          <Avatar
            src={avatarUrl || undefined}
            name={name.substring(0, 2).toUpperCase()}
            className="w-full h-full shadow-[0px_4px_18px_rgba(0,0,0,0.08)] bg-transparent object-cover text-large"
            isBordered
            color="default"
          />
        </div>

        <div className="flex-1 flex flex-col items-start gap-1 min-w-0 pr-4">
          <h2 className="text-lg font-semibold tracking-tight truncate w-full text-left" title={name}>
            {name}
          </h2>

          {categories.length > 0 && (
            <div className="w-full mt-0.5 min-w-0">
              <ProfileCategories categories={categories} className="text-foreground" />
            </div>
          )}
        </div>

        <div className="shrink-0 flex flex-col items-end justify-start gap-3">
          <Contacts contacts={contacts} />
          <CryptoWallets wallets={wallets} />
        </div>
      </CardHeader>

      <CardBody className="p-0 overflow-visible relative z-10 mb-[25px]">
        <p className="text-[15px] leading-relaxed text-foreground/85 font-normal tracking-wide">
          {description}
        </p>
      </CardBody>

      {(skills.length > 0 || members.length > 0) && (
        <CardFooter className="p-0 flex flex-col items-center gap-2 w-full relative z-10 overflow-visible">
          {type === CatalogType.PROFILE && skills.length > 0 && (
            <Skills skills={skills} />
          )}

          {type === CatalogType.COOP && members.length > 0 && (
            <CoopMembers members={members} />
          )}
        </CardFooter>
      )}
    </HeroCard>
  );
};
