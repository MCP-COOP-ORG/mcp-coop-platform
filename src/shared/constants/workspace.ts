export const workspaceTabs = {
  kanban: "kanban",
  coops: "coops",
  finance: "finance",
} as const;

export type WorkspaceTabKey = typeof workspaceTabs[keyof typeof workspaceTabs];

export const WORKSPACE_TABS: readonly WorkspaceTabKey[] = [
  workspaceTabs.kanban,
  workspaceTabs.coops,
  workspaceTabs.finance,
];
