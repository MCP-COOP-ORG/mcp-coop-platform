export const dynamic = "force-dynamic";

import KanbanMicrofrontend from "@/features/kanban";
import { getTranslations, getLocale } from "next-intl/server";
import { workspaceTabs, WorkspaceTabKey } from "@/shared/constants/workspace";
import WorkspaceTabs from "@/features/workspace-tabs";
import ContentUnavailable from "@/shared/ui/components/content-unavailable";

interface WorkspacePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WorkspacePage({ searchParams }: WorkspacePageProps) {
  const resolvedParams = await searchParams;
  const selectedTab = (resolvedParams.tab as WorkspaceTabKey) || workspaceTabs.kanban;

  const t = await getTranslations("Workspace");
  const locale = await getLocale();

  return (
    <div className="flex w-full flex-col gap-3 pt-3">
      <WorkspaceTabs initialTab={selectedTab} />

      <div className="w-full max-w-[1600px] mx-auto">
        <div className="w-full">
          {selectedTab === workspaceTabs.kanban && <KanbanMicrofrontend locale={locale} />}
          {selectedTab === workspaceTabs.coops && <ContentUnavailable title={t(workspaceTabs.coops)} description={t("comingSoon")} />}
          {selectedTab === workspaceTabs.finance && <ContentUnavailable title={t(workspaceTabs.finance)} description={t("comingSoon")} />}
        </div>
      </div>
    </div>
  );
}
