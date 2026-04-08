import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getCoopByIdAction } from "../api/get-coop-by-id.action";
import { Avatar, Card, CardBody, Chip } from "@/shared/ui/primitives";
import ContentUnavailable from "@/shared/ui/components/content-unavailable";
import { Contacts } from "@/shared/ui/components/contacts";
import { CryptoWallets } from "@/shared/ui/components/crypto-wallets";
import { CoopMembers } from "@/shared/ui/components/coop-members";
import { Activity, Star, Globe, Calendar, Fingerprint, ExternalLink } from "lucide-react";

import { dashedSeparator } from "@/shared/constants/styles";

interface CoopDetailProps {
  id: string;
}

/**
 * Parses the rich description object to extract text from paragraph blocks.
 */
function parseDescription(description: Record<string, unknown> | null): string {
  if (!description || !Array.isArray(description.blocks)) return "";
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paragraphs = description.blocks.filter((b: any) => b.type === "paragraph");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return paragraphs.map((p: any) => p.data?.text).filter(Boolean).join("\n\n");
}

/**
 * Formats an ISO date string to a human-readable format.
 */
function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", day: "numeric" }).format(d);
  } catch {
    return dateString;
  }
}

/**
 * RSC Smart Container — Cooperative Detail Page.
 *
 * Fetches cooperative data via server action and renders the full structural layout.
 */
export const CoopDetail = async ({ id }: CoopDetailProps) => {
  const t = await getTranslations("CoopDetail");
  const { data: coop, error } = await getCoopByIdAction(id);

  if (error || !coop) {
    return (
      <ContentUnavailable
        title={t("notFoundTitle")}
        description={error || t("notFoundDesc")}
      />
    );
  }

  const wallets = coop.wallets || {};
  const contacts = coop.contacts || {};
  const members = coop.members || [];
  const categories = coop.categories || [];
  const slides = coop.presentationSlides || [];

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* SECTION 1: General Information */}
      <section aria-labelledby="coop-info-heading" className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Column: Logo & Mini-card data */}
        <div className="flex flex-col gap-3 w-[240px] shrink-0 mx-auto md:mx-0">
          <Avatar
            src={coop.logoUrl || undefined}
            name={(coop.name || "").substring(0, 2).toUpperCase()}
            classNames={{
              base: "w-full h-auto aspect-square bg-default-50",
              img: "object-cover"
            }}
            className="text-5xl font-light"
            radius="none"
          />
          <div className="flex flex-col gap-2.5 w-full items-center">
            {Object.keys(contacts).length > 0 && (
              <Contacts contacts={contacts} />
            )}
            {(Object.keys(wallets).length > 0 || coop.onChainId) && (
              <CryptoWallets wallets={wallets} onChainId={coop.onChainId} />
            )}
          </div>
        </div>

        {/* Right Column: Coop Data */}
        <div className="flex-1 min-w-0 flex flex-col pt-2 w-full">
          <h1 id="coop-info-heading" className="text-3xl md:text-4xl font-normal tracking-tight text-foreground uppercase mb-6">
            {coop.name || t("unnamedCoop")}
          </h1>
          
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
            {/* Column 1: Status & Created At */}
            <div className="flex flex-col gap-5">
              {coop.status && (
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <dt className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-1">{t("status")}</dt>
                    <dd className="text-sm text-foreground flex items-center gap-2">
                       <Chip size="sm" color={coop.status === "ACTIVE" ? "success" : coop.status === "FROZEN" ? "warning" : "default"} variant="flat">
                         {coop.status}
                       </Chip>
                    </dd>
                  </div>
                </div>
              )}
              {coop.createdAt && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <dt className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-1">{t("createdAt")}</dt>
                    <dd className="text-sm text-foreground">{formatDate(coop.createdAt)}</dd>
                  </div>
                </div>
              )}
            </div>
            
            {/* Column 2: Website */}
            <div className="flex flex-col gap-5">
              {coop.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <dt className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-1">{t("website")}</dt>
                    <dd className="text-sm text-foreground flex items-center gap-1.5 break-all">
                      <a href={coop.website.startsWith("http") ? coop.website : `https://${coop.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {coop.website}
                      </a>
                      <ExternalLink className="w-3 h-3 text-foreground/50" />
                    </dd>
                  </div>
                </div>
              )}
            </div>
          </dl>

          {coop.shortDescription && (
            <div className={`mt-8 pt-6 ${dashedSeparator}`}>
              <p className="text-base text-foreground/80 leading-relaxed">
                {coop.shortDescription}
              </p>
            </div>
          )}

          {members && members.length > 0 && (
            <div className="mt-8 flex items-end gap-6">
              <h2 className="text-2xl md:text-3xl font-light text-foreground uppercase tracking-widest shrink-0 leading-none select-none pb-1">
                {t("members")}:
              </h2>
              <div className="shrink-0 w-max">
                <CoopMembers members={members} className="!w-max !gap-2" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: Description & Categories */}
      {(coop.description || categories.length > 0) && (
        <section aria-labelledby="about-heading" className="flex flex-col gap-2 w-full">
          <h4 id="about-heading" className="text-2xl font-normal uppercase text-center text-foreground tracking-wider">
            {t("about")}
          </h4>
          
          {coop.description && (
            <div className="text-base text-foreground/80 leading-relaxed w-full mt-2">
              <p className="whitespace-pre-wrap">{parseDescription(coop.description)}</p>
            </div>
          )}

          {categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
              {categories.map((cat) => (
                <Chip key={cat} size="sm" variant="flat" color="primary">{cat}</Chip>
              ))}
            </div>
          )}
        </section>
      )}



      {/* SECTION 4: Presentation Slides */}
      {slides && slides.length > 0 && (
        <section aria-labelledby="slides-heading" className="flex flex-col gap-2 mt-4">
          <h4 id="slides-heading" className="text-2xl font-normal uppercase text-center text-foreground tracking-wider mb-2">
            {t("slides")}
          </h4>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {slides.sort((a, b) => a.order - b.order).map((slide) => (
              <Card 
                key={slide.id} 
                shadow="none" 
                radius="none"
                className="bg-background shadow-[0_0_10px_rgba(0,0,0,0.08)] border border-default-200 overflow-hidden"
              >
                <div className="aspect-video w-full bg-default-100 flex items-center justify-center relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={slide.mediaUrl} alt={slide.title || "Slide"} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                {(slide.title || slide.description) && (
                  <CardBody className="p-3">
                    {slide.title && <h5 className="font-bold text-sm tracking-tight uppercase mb-1">{slide.title}</h5>}
                    {slide.description && <p className="text-xs text-foreground/80 leading-relaxed">{slide.description}</p>}
                  </CardBody>
                )}
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
