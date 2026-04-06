"use client";

import { forwardRef } from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand as HeroNavbarBrand,
  NavbarContent as HeroNavbarContent,
  NavbarItem as HeroNavbarItem,
  NavbarMenuToggle as HeroNavbarMenuToggle,
  NavbarMenu as HeroNavbarMenu,
  NavbarMenuItem as HeroNavbarMenuItem,
  NavbarProps as HeroNavbarProps,
} from "@heroui/react";

export type AppNavbarVariant = "default";

export interface NavbarProps extends HeroNavbarProps {
  appVariant?: AppNavbarVariant;
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ appVariant: _appVariant = "default", className = "", ...props }, ref) => {
    return <HeroNavbar ref={ref} className={className} {...props} />;
  }
);
Navbar.displayName = "Navbar";

export const NavbarBrand = HeroNavbarBrand;
export const NavbarContent = HeroNavbarContent;
export const NavbarItem = HeroNavbarItem;
export const NavbarMenuToggle = HeroNavbarMenuToggle;
export const NavbarMenu = HeroNavbarMenu;
export const NavbarMenuItem = HeroNavbarMenuItem;
