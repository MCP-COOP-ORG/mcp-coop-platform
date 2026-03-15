"use client";

import { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import KanbanMicrofrontend from "@/features/kanban";
import { useTranslations } from "next-intl";

const TABS = ["kanban", "personal", "coops", "management"] as const;

export default function WorkspacePage() {
  const t = useTranslations("Workspace");
  const [selectedTab, setSelectedTab] = useState<string>("kanban");

  return (
    <div className="flex w-full flex-col gap-6 pt-6">
      <Tabs 
        aria-label="Workspace Tabs" 
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key.toString())}
        classNames={{
          base: "w-full flex justify-center",
          tabList: "mx-auto",
        }}
        items={TABS.map((id) => ({ id, label: t(id) }))}
      >
        {(item) => (
          <Tab key={item.id} title={item.label} />
        )}
      </Tabs>

      <div className="w-full px-4 max-w-[1400px] mx-auto pb-10">
        <div className="w-full p-[20px]">
          {selectedTab === "kanban" && <KanbanMicrofrontend />}
          {selectedTab === "personal" && <PlaceholderTab title={t("personal")} description={t("comingSoon")} />}
          {selectedTab === "coops" && <PlaceholderTab title={t("coops")} description={t("comingSoon")} />}
          {selectedTab === "management" && <PlaceholderTab title={t("management")} description={t("comingSoon")} />}
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
