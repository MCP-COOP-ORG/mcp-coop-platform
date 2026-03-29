"use client";

import { withDynamicMfe } from "@/shared/ui/hoc/withDynamicMfe";
import { KANBAN_MFE } from "./constants";

interface KanbanMicrofrontendProps {
  locale?: string;
}

const KanbanMicrofrontend = withDynamicMfe<KanbanMicrofrontendProps>((props) => ({
  url: process.env.NEXT_PUBLIC_KANBAN_MFE_URL || "",
  elementId: KANBAN_MFE.ELEMENT_ID,
  name: KANBAN_MFE.NAME,
  locale: props.locale,
}));

export default KanbanMicrofrontend;
