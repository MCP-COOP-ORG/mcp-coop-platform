import React, { ReactNode } from "react";
import { Card as HeroCard, CardHeader, CardBody, CardFooter, Avatar } from "@/shared/ui/components/hero-ui";
import { Link } from "@/core/configs/i18n/routing";

export interface BaseCardProps {
  bgImage?: string | null;
  children: ReactNode;
}

export interface BaseCardHeaderProps {
  avatarUrl?: string | null;
  name: string;
  title?: ReactNode;
  tags?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  href?: string;
}

export const BaseCardHeader: React.FC<BaseCardHeaderProps> = ({ avatarUrl, name, title, tags, actions, href, children }) => {
  return (
    <CardHeader className="p-0 flex items-start gap-4 mb-5 w-full overflow-visible">
      <div className="shrink-0 w-16 h-16 relative z-10 pointer-events-none">
        <Avatar
          src={avatarUrl || undefined}
          name={name ? name.substring(0, 2).toUpperCase() : ""}
          className="w-full h-full shadow-[0px_4px_18px_rgba(0,0,0,0.08)] bg-transparent object-cover text-large"
          isBordered
          color="default"
        />
      </div>

      <div className="flex-1 flex flex-col items-start gap-1 min-w-0 pr-4">
        {title ? title : (
          <h2 className="text-lg font-semibold tracking-tight truncate w-full text-left">
            {href ? (
              <Link href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md">
                <span className="absolute inset-0 z-0" aria-hidden="true" />
                <span className="relative z-10">{name}</span>
              </Link>
            ) : (
              <span className="relative z-10">{name}</span>
            )}
          </h2>
        )}
        
        {tags && (
          <div className="w-full mt-0.5 min-w-0 relative z-10 pointer-events-none select-none">
            {tags}
          </div>
        )}
      </div>

      {(actions || children) && (
        <div className="shrink-0 flex flex-col items-end justify-start gap-3 relative z-20 pointer-events-auto">
          {actions}
          {children}
        </div>
      )}
    </CardHeader>
  );
};
BaseCardHeader.displayName = "BaseCard.Header";

export interface BaseCardBodyProps {
  description?: string;
  children?: ReactNode;
}

export const BaseCardBody: React.FC<BaseCardBodyProps> = ({ description, children }) => {
  if (!description && !children) return null;
  
  return (
    <CardBody className="p-0 overflow-visible relative z-0 mb-6 pointer-events-none">
      {description ? (
        <p className="text-[15px] leading-relaxed text-foreground/85 font-normal tracking-wide">
          {description}
        </p>
      ) : null}
      <div className="relative z-10 pointer-events-auto">
        {children}
      </div>
    </CardBody>
  );
};
BaseCardBody.displayName = "BaseCard.Body";

export interface BaseCardFooterProps {
  children?: ReactNode;
}

export const BaseCardFooter: React.FC<BaseCardFooterProps> = ({ children }) => {
  if (!children) return null;
  
  return (
    <CardFooter className="p-0 flex flex-col items-center gap-2 w-full relative z-10 overflow-visible pointer-events-auto">
      {children}
    </CardFooter>
  );
};
BaseCardFooter.displayName = "BaseCard.Footer";

type BaseCardType = React.FC<BaseCardProps> & {
  Header: typeof BaseCardHeader;
  Body: typeof BaseCardBody;
  Footer: typeof BaseCardFooter;
};

export const BaseCard = (({ bgImage, children }) => {
  return (
    <HeroCard className="p-5 shadow-sm border border-default-200 flex flex-col justify-start h-full relative overflow-hidden">
      {bgImage && (
        <div 
          className="absolute top-[-40%] left-[-40%] w-[80%] pb-[80%] bg-no-repeat bg-contain opacity-5 pointer-events-none z-0 grayscale"
          style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
        />
      )}
      {children}
    </HeroCard>
  );
}) as BaseCardType;

BaseCard.Header = BaseCardHeader;
BaseCard.Body = BaseCardBody;
BaseCard.Footer = BaseCardFooter;

export default BaseCard;
