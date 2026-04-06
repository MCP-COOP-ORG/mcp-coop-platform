import { Button, Dropdown, HeroLink } from "@/shared/ui/primitives";
import { useHeaderNavigation } from "./hooks";
import type { HeaderComponentBaseProps } from "@/entities/header/types";

export function HeaderNav({ className = "" }: HeaderComponentBaseProps) {
  const { links } = useHeaderNavigation();

  return (
    <nav className={`flex items-center gap-8 antialiased ${className}`}>
      {links.map((link) => {
        if (link.children) {
          return (
            <Dropdown
              key={link.key}
              items={link.children.map(c => ({ key: c.key, label: c.label, href: c.href! }))}
            >
              <Button
                appVariant="nav-dropdown"
                className={`text-[20px] transition-colors ${link.isActive ? "text-primary" : "text-foreground hover:text-primary"}`}
              >
                {link.label}
              </Button>
            </Dropdown>
          );
        }

        return (
          <HeroLink 
            key={link.key} 
            href={link.href!} 
            appVariant="nav-item" 
            isActive={link.isActive}
            className={`text-[20px] transition-colors ${link.isActive ? "text-primary" : "text-foreground hover:text-primary"}`}
          >
            {link.label}
          </HeroLink>
        );
      })}
    </nav>
  );
}
