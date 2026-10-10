import type { TeamSection as TeamSectionType } from "@/entities/page-content/types";
import { GitHub, Telegram, LinkedIn } from "@/shared/ui/icons";
import { Globe } from "lucide-react";
import { blueprintCardClass } from "@/shared/constants/styles";

export interface TeamSectionProps {
  data: TeamSectionType;
}

export function TeamSection({ data }: TeamSectionProps) {
  if (!data || !data.members || data.members.length === 0) {
    return null;
  }

  return (
    <section className="w-full flex flex-col justify-center">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center px-[20px]">
        <h2 className="text-center text-[32px] font-light uppercase tracking-wide">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-center text-[16px] text-foreground/80 mt-2 max-w-2xl mx-auto whitespace-pre-line leading-relaxed">
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Centered layout */}
      <div className="flex flex-wrap justify-center gap-5 sm:gap-6 max-w-7xl mx-auto w-full px-[20px] mt-8">
        {data.members.map((member) => {
          const hasLinks = Boolean(
            member.links?.website || member.links?.telegram || member.links?.linkedin || member.links?.github
          );

          const formattedExp = member.experience
            ? member.experience.startsWith("[")
              ? member.experience
              : `[ ${member.experience} ]`
            : null;

          return (
            <article
              key={member.id}
              className={blueprintCardClass}
            >
              <div className="flex flex-col flex-grow">
                {/* Photo frame */}
                <div className="w-full aspect-[4/3] border border-dashed border-foreground/20 rounded-small overflow-hidden relative bg-default-100/50 mb-3.5">

                  {/* Experience Badge */}
                  {formattedExp && (
                    <div className="absolute bottom-2 right-2 z-10 bg-primary text-white font-mono text-[11px] font-medium tracking-wide px-2 py-0.5 border border-white/20 rounded shadow-md select-none">
                      {formattedExp}
                    </div>
                  )}

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Information Block */}
                <div>
                  <h3 className="text-[18px] font-medium leading-tight group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <div
                    className="font-mono text-[10px] sm:text-[11px] text-primary uppercase tracking-tight font-medium mt-1 whitespace-nowrap overflow-hidden text-ellipsis"
                    title={member.role}
                  >
                    {member.role}
                  </div>
                  {member.description && (
                    <p className="text-[13px] text-foreground/80 leading-relaxed mt-2.5">
                      {member.description}
                    </p>
                  )}
                </div>

                {/* Tech Stack */}
                {member.techStack && member.techStack.length > 0 && (
                  <div className="font-mono text-[11px] text-primary flex flex-wrap gap-1 mt-3 pt-2.5 border-t border-dashed border-foreground/15">
                    {member.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 border border-dashed border-primary/30 rounded-small bg-primary/5"
                      >
                        #{tech.replace(/^#/, "")}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Contacts and Socials */}
              <div className="flex items-center justify-between gap-2 mt-4 pt-2.5 border-t border-dashed border-foreground/20">
                <span className="font-mono text-[10px] text-foreground/60 select-none tracking-wider">
                  {"// CONTACTS //"}
                </span>

                <div className="flex items-center gap-1">
                  {member.links?.website && (
                    <a
                      href={member.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-primary transition-transform hover:scale-110 p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded"
                      aria-label={`${member.name} Website`}
                    >
                      <Globe className="w-[18px] h-[18px]" />
                    </a>
                  )}
                  {member.links?.telegram && (
                    <a
                      href={member.links.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-primary transition-transform hover:scale-110 p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded"
                      aria-label={`${member.name} Telegram`}
                    >
                      <Telegram className="w-[18px] h-[18px]" />
                    </a>
                  )}
                  {member.links?.linkedin && (
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-primary transition-transform hover:scale-110 p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <LinkedIn className="w-[18px] h-[18px]" />
                    </a>
                  )}
                  {member.links?.github && (
                    <a
                      href={member.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-primary transition-transform hover:scale-110 p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded"
                      aria-label={`${member.name} GitHub`}
                    >
                      <GitHub className="w-[18px] h-[18px]" />
                    </a>
                  )}
                  {!hasLinks && (
                    <span className="font-mono text-[10px] text-foreground/40 select-none">
                      {"// N/A //"}
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default TeamSection;
