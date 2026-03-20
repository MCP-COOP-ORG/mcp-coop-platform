"use client";

import { useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import KanbanMicrofrontend from "@/features/kanban";
import { useTranslations, useLocale } from "next-intl";
import { WORKSPACE_TABS, WorkspaceTabKey } from "@/shared/constants/workspace";

export default function WorkspacePage() {
  const t = useTranslations("Workspace");
  const locale = useLocale();
  const [selectedTab, setSelectedTab] = useState<WorkspaceTabKey>("kanban");

  return (
    <div className="flex w-full flex-col gap-3 pt-3">
      <Tabs
        aria-label="Workspace Tabs"
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key as WorkspaceTabKey)}
        classNames={{
          base: "w-full flex justify-center",
          tabList: "mx-auto",
        }}
        items={WORKSPACE_TABS.map((id) => ({ id, label: t(id as never) }))}
      >
        {(item) => (
          <Tab key={item.id} title={item.label} />
        )}
      </Tabs>

      <div className="w-full px-4 max-w-[1400px] mx-auto pb-10">
        <div className="w-full">
          {selectedTab === "kanban" && <KanbanMicrofrontend locale={locale} />}
          {selectedTab === "coops" && <PlaceholderTab title={t("coops")} description={t("comingSoon")} />}
          {selectedTab === "finance" && <PlaceholderTab title={t("finance")} description={t("comingSoon")} />}
        </div>
      </div>
    </div>
  );
}

function PlaceholderTab({ title, description }: { title: string, description: string }) {
  return (
    <div className="w-full flex items-center justify-center p-12 border-2 border-dashed border-default-300 rounded-xl bg-default-50/50 h-48">
      <div className="flex flex-col items-center gap-2 text-default-500">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
