import PageContentLayout from "@/shared/ui/layout/page-content";
import KanbanMicrofrontend from "@/features/kanban";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full h-full min-h-[500px]">
      <PageContentLayout pageKey="dashboard" language="en" />
      <div className="w-full mt-4 flex-1">
        <KanbanMicrofrontend />
      </div>
    </div>
  );
}
