"use client";

import { forwardRef } from "react";
import {
  Card as HeroCard,
  CardHeader as HeroCardHeader,
  CardBody as HeroCardBody,
  CardFooter as HeroCardFooter,
  CardProps as HeroCardProps,
} from "@heroui/react";

export type AppCardVariant = "default";

export interface CardProps extends HeroCardProps {
  appVariant?: AppCardVariant;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ appVariant: _appVariant = "default", className = "", ...props }, ref) => {
    return <HeroCard ref={ref} className={className} shadow="sm" {...props} />;
  }
);
Card.displayName = "Card";

export const CardHeader = HeroCardHeader;
export const CardBody = HeroCardBody;
export const CardFooter = HeroCardFooter;
