"use client";

import React from "react";
import { Avatar } from "@/shared/ui/primitives";

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

export const Contacts: React.FC<ContactsProps> = ({ contacts, className = "" }) => {
  const contactItems = [
    { id: "tg", iconUrl: "https://api.iconify.design/logos/telegram.svg", url: contacts?.telegram, name: "Telegram" },
    { id: "wa", iconUrl: "https://api.iconify.design/logos/whatsapp-icon.svg", url: contacts?.whatsapp, name: "WhatsApp" },
    { id: "vi", iconUrl: "https://cdn.simpleicons.org/viber/7360F2", url: contacts?.viber, name: "Viber" },
    { id: "ph", iconUrl: "https://api.iconify.design/mdi/phone.svg?color=%2310b981", url: contacts?.phone, name: "Phone" },
    { id: "em", iconUrl: "https://api.iconify.design/mdi/email.svg?color=%23ef4444", url: contacts?.email, name: "Email" },
    { id: "ig", iconUrl: "https://cdn.simpleicons.org/instagram/E4405F", url: contacts?.instagram, name: "Instagram" },
    { id: "fb", iconUrl: "https://cdn.simpleicons.org/facebook/1877F2", url: contacts?.facebook, name: "Facebook" },
    { id: "li", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg", url: contacts?.linkedin, name: "LinkedIn" },
  ];

  const activeContacts = contactItems.filter(item => !!item.url);

  if (activeContacts.length === 0) return null;

  return (
    <div className={`flex flex-row flex-wrap justify-end gap-1.5 ${className}`}>
      {activeContacts.map((item) => {
        return (
          <div
            key={item.id}
            className="rounded-full border-[0.5px] border-default-300 p-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] bg-default-50 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
            style={{ width: "1.75rem", height: "1.75rem" }}
            title={item.url || ""}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(item.url || "", "_blank", "noopener,noreferrer");
            }}
          >
            <Avatar
              src={item.iconUrl}
              name={item.name.substring(0, 2).toUpperCase()}
              classNames={{
                base: "w-full h-full bg-transparent",
                img: "object-contain scale-[0.80]",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
