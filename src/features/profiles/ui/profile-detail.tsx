import React from "react";
import { getProfileByIdAction } from "../api/get-profile-by-id.action";
import { Avatar } from "@/shared/ui/components/hero-ui";
import { Chip } from "@/shared/ui/components/hero-ui";
import ContentUnavailable from "@/shared/ui/components/content-unavailable";

interface ProfileDetailProps {
  id: string;
}

/**
 * RSC Smart Container — Profile Detail Page.
 *
 * Fetches profile data via server action and renders all API fields
 * as a structured data dump alongside a "Coming Soon" design placeholder.
 */
export const ProfileDetail = async ({ id }: ProfileDetailProps) => {
  const { data: profile, error } = await getProfileByIdAction(id);

  if (error || !profile) {
    return (
      <ContentUnavailable
        title="Profile not found"
        description={error || "The requested profile could not be loaded."}
      />
    );
  }

  const wallets = profile.wallets || {};
  const contacts = profile.contacts || {};
  const skills = profile.skills || [];
  const categories = profile.categories || [];

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex items-start gap-5">
        <Avatar
          src={profile.avatarUrl || undefined}
          name={
            (profile.fullName || profile.username || "")
              .substring(0, 2)
              .toUpperCase()
          }
          className="w-20 h-20 shadow-md text-xl"
          isBordered
          color="primary"
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {profile.fullName || profile.username || "Unnamed Profile"}
          </h1>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-sm text-foreground/50">
              Rating: {profile.rating}/5
            </span>
          </div>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="flex flex-col items-center justify-center py-10 border border-dashed border-primary/30 rounded-2xl bg-primary/5">
        <p className="text-xl font-light text-primary/60 tracking-wider uppercase">
          🚧 Page Design — Coming Soon
        </p>
        <p className="text-sm text-foreground/40 mt-2">
          Raw API data displayed below for development purposes
        </p>
      </div>

      {/* Data Dump — all fields from API */}
      <div className="grid gap-6">

        {/* Basic Info */}
        <section className="border border-default-200 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">Basic Info</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="font-medium text-foreground/50">ID</dt>
              <dd className="text-foreground break-all mt-0.5">{profile.id}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground/50">Full Name</dt>
              <dd className="text-foreground mt-0.5">{profile.fullName || "N/A"}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground/50">Username</dt>
              <dd className="text-foreground mt-0.5">{profile.username || "N/A"}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground/50">Email</dt>
              <dd className="text-foreground break-all mt-0.5">{profile.email || "N/A"}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground/50">Availability</dt>
              <dd className="text-foreground mt-0.5">{profile.availabilityStatus || "N/A"}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground/50">Rating</dt>
              <dd className="text-foreground mt-0.5">{profile.rating}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground/50">Avatar URL</dt>
              <dd className="text-foreground break-all mt-0.5">{profile.avatarUrl || "N/A"}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground/50">Blockchain Account</dt>
              <dd className="text-foreground break-all font-mono text-xs mt-0.5">
                {profile.blockchainAccount || "N/A"}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-medium text-foreground/50">Description</dt>
              <dd className="text-foreground mt-0.5 whitespace-pre-wrap">
                {profile.description ? JSON.stringify(profile.description, null, 2) : "N/A"}
              </dd>
            </div>
          </dl>
        </section>

        {/* Categories */}
        <section className="border border-default-200 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Categories ({categories.length})
          </h2>
          {categories.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Chip key={cat} size="sm" variant="flat" color="primary">{cat}</Chip>
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground/40">No categories</p>
          )}
        </section>

        {/* Skills */}
        <section className="border border-default-200 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Skills ({skills.length})
          </h2>
          {skills.length > 0 ? (
            <div className="grid gap-3">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-3 p-3 rounded-lg bg-default-50 border border-default-100">
                  {skill.iconUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={skill.iconUrl} alt={skill.name} className="w-6 h-6 rounded" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{skill.name}</p>
                    <p className="text-xs text-foreground/50">{skill.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground/40">No skills</p>
          )}
        </section>

        {/* Contacts */}
        <section className="border border-default-200 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">Contacts</h2>
          {Object.keys(contacts).length > 0 ? (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {Object.entries(contacts).map(([key, value]) => (
                <div key={key}>
                  <dt className="font-medium text-foreground/50 capitalize">{key}</dt>
                  <dd className="text-foreground break-all mt-0.5">{String(value ?? "N/A")}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-sm text-foreground/40">No contacts</p>
          )}
        </section>

        {/* Wallets */}
        <section className="border border-default-200 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">Wallets</h2>
          {Object.keys(wallets).length > 0 ? (
            <dl className="grid grid-cols-1 gap-y-3 text-sm">
              {Object.entries(wallets).map(([network, wallet]) => (
                <div key={network} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <dt className="font-medium text-foreground/50 capitalize shrink-0 w-24">{network}</dt>
                  <dd className="text-foreground break-all font-mono text-xs">
                    {typeof wallet === "object" && wallet !== null
                      ? JSON.stringify(wallet)
                      : String(wallet ?? "N/A")}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-sm text-foreground/40">No wallets</p>
          )}
        </section>

      </div>
    </div>
  );
};
