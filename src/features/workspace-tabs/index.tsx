"use client";

import { useCallback } from "react";
import { Tabs, Tab } from "@/shared/ui/components/hero-ui";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/core/configs/i18n/routing";
import { WORKSPACE_TABS, WorkspaceTabKey } from "@/shared/constants/workspace";

interface WorkspaceTabsProps {
  initialTab: WorkspaceTabKey;
}

export default function WorkspaceTabs({ initialTab }: WorkspaceTabsProps) {
  const t = useTranslations("Workspace");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectionChange = useCallback(
    (key: React.Key) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", key.toString());
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return (
    <Tabs
      aria-label="Workspace Tabs"
      selectedKey={initialTab}
      onSelectionChange={handleSelectionChange}
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
  );
}
