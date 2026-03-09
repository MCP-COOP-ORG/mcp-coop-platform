"use client";

import { withDynamicMfe } from "@/shared/ui/hoc/withDynamicMfe";

interface KanbanMicrofrontendProps {
  locale?: string;
}

const KanbanMicrofrontend = withDynamicMfe<KanbanMicrofrontendProps>((props) => ({
  url: process.env.NEXT_PUBLIC_KANBAN_MFE_URL || "",
  elementId: "kanban-mfe-root",
  name: "Kanban Board",
  locale: props.locale
}));

export default KanbanMicrofrontend;
