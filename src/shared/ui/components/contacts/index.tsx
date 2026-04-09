"use client";

import React from "react";
import * as Icons from "@/shared/ui/icons";
import type { MappedContacts } from "@/shared/mappers/primitives/types";
import { formatContactUrl } from "@/shared/utils/contact-formatters";

export interface ContactsProps {
  contacts?: MappedContacts;
  className?: string;
}

const CONTACT_ICONS_MAP: Record<keyof MappedContacts, React.ElementType> = {
  telegram: Icons.Telegram,
  whatsapp: Icons.WhatsApp,
  viber: Icons.Viber,
  phone: Icons.Phone,
  email: Icons.Gmail,
  instagram: Icons.Instagram,
  facebook: Icons.Facebook,
  linkedin: Icons.LinkedIn,
};

export const Contacts: React.FC<ContactsProps> = ({ contacts, className = "" }) => {
  if (!contacts) return null;

  const activeKeys = (Object.keys(CONTACT_ICONS_MAP) as Array<keyof MappedContacts>)
    .filter((key) => !!contacts[key]);

  if (activeKeys.length === 0) return null;

  return (
    <div className={`flex flex-row flex-wrap justify-end gap-1.5 ${className}`}>
      {activeKeys.map((key) => {
        const IconComponent = CONTACT_ICONS_MAP[key];
        const rawValue = contacts[key]!;
        const url = formatContactUrl(key, rawValue);

        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={rawValue}
            className="flex items-center justify-center transition-transform hover:scale-110 hover:opacity-100 opacity-90 cursor-pointer"
          >
            <IconComponent
              className="w-[20px] h-[20px] object-contain"
            />
          </a>
        );
      })}
    </div>
  );
};
