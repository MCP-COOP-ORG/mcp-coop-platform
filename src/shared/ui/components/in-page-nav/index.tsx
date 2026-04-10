"use client";

import React, { useState, useEffect } from "react";
import { InPageNavProps } from "@/entities/navigation/types";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export function InPageNav({ nodes, variant = "sidebar" }: InPageNavProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  // IntersectionObserver to auto-update the active section title on scroll
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h1[id], h2[id], h3[id]"));
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.textContent) {
            setActiveSection(entry.target.textContent);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" } 
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [activeSection]);

  const scrollToHeading = (id: string, label: string) => {
    setActiveSection(label);
    
    const el = document.getElementById(id);
    if (el) {
      window.history.pushState(null, "", `#${id}`);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!nodes || nodes.length === 0) return null;

  if (variant === "mobile") {
    return <MobileNav nodes={nodes} activeSection={activeSection} scrollToHeading={scrollToHeading} />;
  }

  return <DesktopNav nodes={nodes} scrollToHeading={scrollToHeading} />;
}
