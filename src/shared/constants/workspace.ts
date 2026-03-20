export const WORKSPACE_TABS = ["kanban", "coops", "finance"] as const;
export type WorkspaceTabKey = typeof WORKSPACE_TABS[number];
