export interface HeaderComponentBaseProps {
  className?: string;
}

export interface MappedNavigationLink {
  key: string;
  href?: string;
  label: string;
  isActive: boolean;
  isGroupActive?: boolean;
  children?: MappedNavigationLink[];
}

export interface HeaderMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
