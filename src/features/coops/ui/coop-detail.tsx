import React from "react";
import { getCoopByIdAction } from "../api/get-coop-by-id.action";
import { Avatar } from "@/shared/ui/components/hero-ui";
import { Chip } from "@/shared/ui/components/hero-ui";
import ContentUnavailable from "@/shared/ui/components/content-unavailable";

interface CoopDetailProps {
  id: string;
}

/**
 * RSC Smart Container — Cooperative Detail Page.
 *
 * Fetches cooperative data via server action and renders all API fields
 * as a structured data dump alongside a "Coming Soon" design placeholder.
 */
export const CoopDetail = async ({ id }: CoopDetailProps) => {
  const { data: coop, error } = await getCoopByIdAction(id);

  if (error || !coop) {
    return (
      <ContentUnavailable
        title="Cooperative not found"
        description={error || "The requested cooperative could not be loaded."}
      />
    );
  }

  const wallets = coop.wallets || {};
  const contacts = coop.contacts || {};
  const members = coop.members || [];
  const categories = coop.categories || [];

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex items-start gap-5">
        <Avatar
          src={coop.logoUrl || undefined}
          name={coop.name ? coop.name.substring(0, 2).toUpperCase() : ""}
          className="w-20 h-20 shadow-md text-xl"
          isBordered
          color="primary"
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {coop.name}
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <Chip
              size="sm"
              color={coop.status === "ACTIVE" ? "success" : coop.status === "FROZEN" ? "warning" : "danger"}
              variant="flat"
            >
              {coop.status}
            </Chip>
            <span className="text-sm text-foreground/50">
              Rating: {coop.rating}/5
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
              <dd className="text-foreground break-all mt-0.5">{coop.id}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground/50">On-Chain ID</dt>
              <dd className="text-foreground break-all mt-0.5">{coop.onChainId}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground/50">Status</dt>
              <dd className="text-foreground mt-0.5">{coop.status}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground/50">Rating</dt>
              <dd className="text-foreground mt-0.5">{coop.rating}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground/50">Website</dt>
              <dd className="text-foreground mt-0.5">{coop.website || "N/A"}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground/50">Logo URL</dt>
              <dd className="text-foreground break-all mt-0.5">{coop.logoUrl || "N/A"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-medium text-foreground/50">Description</dt>
              <dd className="text-foreground mt-0.5 whitespace-pre-wrap">
                {coop.description ? JSON.stringify(coop.description, null, 2) : coop.shortDescription || "N/A"}
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

        {/* Members */}
        <section className="border border-default-200 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Members ({members.length})
          </h2>
          {members.length > 0 ? (
            <div className="grid gap-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-default-50 border border-default-100">
                  <Avatar
                    src={member.avatarUrl || undefined}
                    name={member.name ? member.name.substring(0, 2).toUpperCase() : ""}
                    className="w-10 h-10 text-sm"
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                    <p className="text-xs text-foreground/50">{member.isProposer ? "Proposer" : "Member"}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {member.isProposer && (
                      <Chip size="sm" variant="flat" color="warning">Proposer</Chip>
                    )}
                    <span className="text-xs text-foreground/40 font-mono break-all max-w-[120px] truncate" title={member.onChainId}>
                      {member.onChainId}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground/40">No members</p>
          )}
        </section>

        {/* Timestamps */}
        <section className="border border-default-200 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">Timestamps</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="font-medium text-foreground/50">Created At</dt>
              <dd className="text-foreground mt-0.5">{coop.createdAt}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground/50">Updated At</dt>
              <dd className="text-foreground mt-0.5">{coop.updatedAt}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground/50">On-Chain Created At</dt>
              <dd className="text-foreground mt-0.5">{coop.onChainCreatedAt || "N/A"}</dd>
            </div>
          </dl>
        </section>

      </div>
    </div>
  );
};
