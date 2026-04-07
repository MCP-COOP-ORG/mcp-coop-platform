import * as LucideIcons from "lucide-react";
import React from "react";

/** Map an icon string name to a Lucide icon component. */
export function getLucideIcon(iconName: string): React.ElementType {
  const capitalizedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  const icons = LucideIcons as unknown as Record<string, React.ElementType>;
  return icons[capitalizedName] || LucideIcons.Layers;
}
