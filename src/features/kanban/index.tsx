"use client";

import { withDynamicMfe } from "@/shared/ui/hoc/withDynamicMfe";

interface KanbanMicrofrontendProps {}

const KanbanMicrofrontend = withDynamicMfe<KanbanMicrofrontendProps>(() => ({
  url: process.env.NEXT_PUBLIC_KANBAN_MFE_URL || "",
  elementId: "kanban-mfe-root",
  name: "Kanban Board"
}));

export default KanbanMicrofrontend;
