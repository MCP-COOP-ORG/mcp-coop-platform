"use client";

import React from "react";
import * as Icons from "@/shared/ui/icons";

export interface ProfileContacts {
  telegram?: string | null;
  whatsapp?: string | null;
  viber?: string | null;
  phone?: string | null;
  email?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
}

export interface ContactsProps {
  contacts?: ProfileContacts;
  className?: string;
}

const CONTACT_ICONS_MAP = {
  tg: Icons.Telegram,
  wa: Icons.WhatsApp,
  vi: Icons.Viber,
  ph: Icons.Phone,
  em: Icons.Gmail,
  ig: Icons.Instagram,
  fb: Icons.Facebook,
  li: Icons.LinkedIn,
} as const;

export const Contacts: React.FC<ContactsProps> = ({ contacts, className = "" }) => {
  const contactItems = [
    { id: "tg" as const, url: contacts?.telegram, name: "Telegram" },
    { id: "wa" as const, url: contacts?.whatsapp, name: "WhatsApp" },
    { id: "vi" as const, url: contacts?.viber, name: "Viber" },
    { id: "ph" as const, url: contacts?.phone, name: "Phone" },
    { id: "em" as const, url: contacts?.email, name: "Email" },
    { id: "ig" as const, url: contacts?.instagram, name: "Instagram" },
    { id: "fb" as const, url: contacts?.facebook, name: "Facebook" },
    { id: "li" as const, url: contacts?.linkedin, name: "LinkedIn" },
  ];

  const activeContacts = contactItems.filter(item => !!item.url);

  if (activeContacts.length === 0) return null;

  return (
    <div className={`flex flex-row flex-wrap justify-end gap-1.5 ${className}`}>
      {activeContacts.map((item) => {
        const IconComponent = CONTACT_ICONS_MAP[item.id];
        
        return (
          <div
            key={item.id}
            className="rounded-full border-[0.5px] border-default-300 p-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] bg-default-50 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer overflow-hidden"
            style={{ width: "1.75rem", height: "1.75rem" }}
            title={item.url || ""}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(item.url || "", "_blank", "noopener,noreferrer");
            }}
          >
            <IconComponent 
              className="w-full h-full object-contain scale-[0.80]"
            />
          </div>
        );
      })}
    </div>
  );
};
