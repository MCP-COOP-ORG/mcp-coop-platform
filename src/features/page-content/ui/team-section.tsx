import type { TeamSection as TeamSectionType } from "@/entities/page-content/types";
import { GitHub, Telegram, LinkedIn } from "@/shared/ui/icons";

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
        <h2 className="text-center text-[32px] font-light uppercase">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-center text-[16px] text-foreground/80 mt-2 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Centered layout */}
      <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto w-full px-[20px] mt-10">
        {data.members.map((member) => {
          const hasLinks = Boolean(
            member.links?.telegram || member.links?.linkedin || member.links?.github
          );

          const formattedExp = member.experience
            ? member.experience.startsWith("[")
              ? member.experience
              : `[ ${member.experience} ]`
            : null;

          return (
            <article
              key={member.id}
              className="w-full max-w-[340px] sm:w-[320px] md:w-[340px] flex flex-col justify-between p-6 border-[2px] border-dashed border-default-200 rounded-medium bg-background hover:border-primary/50 transition-all duration-300 group relative"
            >
              <div className="flex flex-col flex-grow">
                {/* Photo frame */}
                <div className="aspect-square border border-dashed border-default-200/80 rounded-small overflow-hidden relative bg-default-100 mb-5">
                  {/* Micro-crosshairs in corners */}
                  <span className="absolute top-1 left-1.5 font-mono text-[11px] text-default-400 select-none z-10 pointer-events-none leading-none">
                    +
                  </span>
                  <span className="absolute top-1 right-1.5 font-mono text-[11px] text-default-400 select-none z-10 pointer-events-none leading-none">
                    +
                  </span>
                  <span className="absolute bottom-1 left-1.5 font-mono text-[11px] text-default-400 select-none z-10 pointer-events-none leading-none">
                    +
                  </span>
                  <span className="absolute bottom-1 right-1.5 font-mono text-[11px] text-default-400 select-none z-10 pointer-events-none leading-none">
                    +
                  </span>

                  {/* Experience Badge */}
                  {formattedExp && (
                    <div className="absolute bottom-2 right-2 z-10 bg-background/80 backdrop-blur-sm px-2 py-0.5 text-[11px] font-mono border border-dashed border-default-300 rounded text-foreground/90 select-none">
                      {formattedExp}
                    </div>
                  )}

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Information Block */}
                <div>
                  <h3 className="text-[20px] font-medium leading-tight group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <div className="font-mono text-[13px] text-primary uppercase tracking-wider mt-1.5">
                    {member.role}
                  </div>
                </div>

                {/* Tech Stack */}
                {member.techStack && member.techStack.length > 0 && (
                  <div className="font-mono text-[12px] text-default-600 flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-dashed border-default-200/60">
                    {member.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 border border-dashed border-default-300/80 rounded-small bg-default-100/50"
                      >
                        #{tech.replace(/^#/, "")}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Contacts and Socials */}
              <div className="flex items-center justify-between gap-3 mt-6 pt-3 border-t border-dashed border-default-200">
                <span className="font-mono text-[11px] text-default-400 select-none tracking-wider">
                  {"// CONTACTS //"}
                </span>

                <div className="flex items-center gap-2.5">
                  {member.links?.telegram && (
                    <a
                      href={member.links.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-default-500 hover:text-primary transition-colors p-1"
                      aria-label={`${member.name} Telegram`}
                    >
                      <Telegram className="w-4 h-4" />
                    </a>
                  )}
                  {member.links?.linkedin && (
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-default-500 hover:text-primary transition-colors p-1"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <LinkedIn className="w-4 h-4" />
                    </a>
                  )}
                  {member.links?.github && (
                    <a
                      href={member.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-default-500 hover:text-primary transition-colors p-1"
                      aria-label={`${member.name} GitHub`}
                    >
                      <GitHub className="w-4 h-4" />
                    </a>
                  )}
                  {!hasLinks && (
                    <span className="font-mono text-[11px] text-default-400 select-none">
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
