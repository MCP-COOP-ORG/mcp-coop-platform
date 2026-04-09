import React from "react";
import { getTranslations } from "next-intl/server";
import { getProfileByIdAction } from "../api/get-profile-by-id.action";
import { Avatar, Card, CardBody, Tooltip } from "@/shared/ui/primitives";
import ContentUnavailable from "@/shared/ui/components/content-unavailable";
import { Contacts } from "@/shared/ui/components/contacts";
import { CryptoWallets } from "@/shared/ui/components/crypto-wallets";
import { Skills } from "@/shared/ui/components/skills";
import { MapPin, Clock, Activity, Mail, Globe } from "lucide-react";

import { dashedSeparator } from "@/shared/constants/styles";

interface ProfileDetailProps {
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
 * Formats an ISO date string to a human-readable format (e.g., "Jun 2019").
 */
function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(d);
  } catch {
    return dateString;
  }
}

/**
 * RSC Smart Container — Profile Detail Page.
 *
 * Fetches profile data via server action and renders the full structural layout.
 */
export const ProfileDetail = async ({ id }: ProfileDetailProps) => {
  const t = await getTranslations("ProfileDetail");
  const { data: profile, error } = await getProfileByIdAction(id);

  if (error || !profile) {
    return (
      <ContentUnavailable
        title={t("notFoundTitle")}
        description={error || t("notFoundDesc")}
      />
    );
  }

  const wallets = profile.wallets || {};
  const contacts = profile.contacts || {};
  const skills = profile.skills || [];

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* SECTION 1: Personal Information */}
      <section aria-labelledby="personal-info-heading" className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Column: Avatar & Mini-card data */}
        <div className="flex flex-col gap-3 w-[240px] shrink-0 mx-auto md:mx-0">
          <Avatar
            src={profile.avatarUrl || undefined}
            name={(profile.fullName || profile.username || "").substring(0, 2).toUpperCase()}
            classNames={{
              base: "w-full h-auto aspect-4/5 border-[10px] border-white shadow-[0_0_10px_rgba(0,0,0,0.08)]",
              img: "object-cover"
            }}
            className="text-5xl font-light"
            radius="none"
          />
          <div className="flex flex-col gap-2.5 w-full items-center">
            {Object.keys(contacts).length > 0 && (
              <Contacts contacts={contacts} />
            )}
            {Object.keys(wallets).length > 0 && (
              <CryptoWallets wallets={wallets} onChainId={profile.blockchainAccount} />
            )}
          </div>
        </div>

        {/* Right Column: Personal Data */}
        <div className="flex-1 min-w-0 flex flex-col pt-2 w-full">
          <h1 id="personal-info-heading" className="text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-1">
            {profile.fullName || profile.username || t("unnamedProfile")}
          </h1>
          {profile.headline && (
            <p className="text-lg md:text-xl text-primary font-normal tracking-wide mb-6">
              {profile.headline}
            </p>
          )}
          
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
            {/* Column 1: Email & Availability */}
            <div className="flex flex-col gap-5">
              {profile.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <dt className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-1">{t("email")}</dt>
                    <dd className="text-sm text-foreground break-all">{profile.email}</dd>
                  </div>
                </div>
              )}
              {profile.availabilityStatus && (
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <dt className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-1">{t("availability")}</dt>
                    <dd className="text-sm text-foreground">{profile.availabilityStatus}</dd>
                  </div>
                </div>
              )}
            </div>
            
            {/* Column 2: Location & Timezone */}
            <div className="flex flex-col gap-5">
              {profile.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <dt className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-1">{t("location")}</dt>
                    <dd className="text-sm text-foreground">{profile.location}</dd>
                  </div>
                </div>
              )}
              {profile.timezone && (
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <dt className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-1">{t("timezone")}</dt>
                    <dd className="text-sm text-foreground">{profile.timezone}</dd>
                  </div>
                </div>
              )}
            </div>

            {/* Column 3: Languages */}
            <div className="flex flex-col gap-5">
              {profile.languages && profile.languages.length > 0 && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <dt className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-1">{t("languages")}</dt>
                    <dd className="text-sm text-foreground">
                      {profile.languages.join(", ")}
                    </dd>
                  </div>
                </div>
              )}
            </div>
          </dl>

          {profile.shortDescription && (
            <div className={`mt-8 pt-6 ${dashedSeparator}`}>
              <p className="text-base text-foreground/80 leading-relaxed">
                {profile.shortDescription}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: Description & Skills */}
      {(profile.description || skills.length > 0) && (
        <section aria-labelledby="skills-heading" className="flex flex-col gap-2 w-full">
          <h4 id="skills-heading" className="text-2xl font-normal uppercase text-center text-foreground tracking-wider">
            {t("aboutMe")}
          </h4>
          
          {/* Description */}
          {profile.description && (
            <div className="text-base text-foreground/80 leading-relaxed w-full">
              <p className="whitespace-pre-wrap">{parseDescription(profile.description)}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mt-2 flex flex-col items-center sm:items-start w-full">
              <Skills skills={skills} className="justify-start inline-flex w-full" />
            </div>
          )}
        </section>
      )}

      {/* SECTION 3: Experience */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section aria-labelledby="experience-heading" className="flex flex-col gap-2">
          <h4 id="experience-heading" className="text-2xl font-normal uppercase text-center text-foreground tracking-wider">
            {t("experience")}
          </h4>
          <div className="grid gap-2 mt-2">
            {profile.experiences.map((exp) => (
              <Card 
                key={exp.id} 
                shadow="none" 
                radius="none"
                className="bg-background shadow-[0_0_10px_rgba(0,0,0,0.08)] border border-default-200"
              >
                <CardBody className="p-5 flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-lg font-bold tracking-tight uppercase">{exp.companyName}</h3>
                      <div className="text-sm font-normal text-foreground/80">
                        <span className="text-foreground/50 mr-2">{t("projectRole")}</span>
                        <span>{exp.projectRole}</span>
                      </div>
                    </div>
                    
                    {/* Skills & Dates */}
                    <div className="flex items-center gap-4 shrink-0 mt-0.5">
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="hidden sm:block">
                          <Skills 
                            skills={exp.skills}
                            maxItems={7}
                            size="sm"
                            showCategories={false}
                            showTooltips={false}
                            className="!flex-row !w-auto justify-end inline-flex" 
                          />
                        </div>
                      )}
                      <div className="text-sm font-normal text-foreground whitespace-nowrap">
                        {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : t("now")}
                      </div>
                    </div>
                  </div>
                  
                  {exp.description && (
                    <div className="mt-1 pt-4 border-t border-default-100">
                      <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
