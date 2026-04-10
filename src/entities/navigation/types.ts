export interface NavigationNode {
  id: string;
  label: string;
  children?: NavigationNode[];
}

export interface InPageNavProps {
  nodes: NavigationNode[];
  variant?: "sidebar" | "mobile";
}
