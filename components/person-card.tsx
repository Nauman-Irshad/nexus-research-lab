import Image from "next/image";
import {
  GitHubIcon,
  GlobeIcon,
  LinkedInIcon,
  MailIcon,
  OrcidIcon,
  ResearchGateIcon,
  ScholarIcon,
} from "@/components/icons";
import type { Person } from "@/lib/types";
import { cn, initials, seededValue } from "@/lib/utils";

function Avatar({ person, className }: { person: Person; className?: string }) {
  const hue = seededValue(person.id);
  const angle = Math.round(120 + hue * 110);

  if (person.photo) {
    return (
      <Image
        src={person.photo}
        alt={person.name}
        width={132}
        height={132}
        sizes="132px"
        loading="lazy"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "flex h-full w-full items-center justify-center font-[family-name:var(--font-display)] text-xl font-semibold text-white",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, #0B1F3A 0%, #133055 55%, #00A86B 145%)`,
      }}
    >
      {initials(person.name)}
    </span>
  );
}

const profileLinks = [
  { key: "email", label: "Email", Icon: MailIcon, prefix: "mailto:" },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon, prefix: "" },
  { key: "scholar", label: "Google Scholar", Icon: ScholarIcon, prefix: "" },
  { key: "researchgate", label: "ResearchGate", Icon: ResearchGateIcon, prefix: "" },
  { key: "github", label: "GitHub", Icon: GitHubIcon, prefix: "" },
  { key: "orcid", label: "ORCID", Icon: OrcidIcon, prefix: "" },
  { key: "website", label: "Website", Icon: GlobeIcon, prefix: "" },
] as const;

export function PersonCard({
  person,
  featured = false,
}: {
  person: Person;
  featured?: boolean;
}) {
  const photoHref = person.links.linkedin ?? person.links.scholar;
  const avatarSize = featured ? "h-[7rem] w-[7rem]" : "h-[5.25rem] w-[5.25rem]";

  return (
    <article
      className={cn(
        "surface-card hover-lift group flex h-full flex-col rounded-2xl",
        featured ? "p-7 md:p-9" : "p-6",
      )}
    >
      <div className={cn("flex items-start", featured ? "gap-7" : "gap-5")}>
        <div className="relative shrink-0">
          <span
            aria-hidden
            className="bg-emerald-nrl/25 absolute -inset-1 rounded-2xl opacity-0 blur-[10px] transition-opacity duration-500 group-hover:opacity-100"
          />
          {photoHref ? (
            <a
              href={photoHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the LinkedIn profile of ${person.name}`}
              title={`${person.name} on LinkedIn`}
              className={cn(
                "relative block overflow-hidden rounded-2xl ring-1 ring-black/5 transition-transform duration-500 group-hover:-translate-y-0.5 dark:ring-white/10",
                avatarSize,
              )}
            >
              <Avatar person={person} />
            </a>
          ) : (
            <span
              className={cn(
                "relative block overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10",
                avatarSize,
              )}
            >
              <Avatar person={person} />
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h3
            className={cn(
              "leading-snug font-semibold",
              featured ? "text-xl md:text-2xl" : "text-[1.02rem]",
            )}
          >
            {person.name}
          </h3>
          <p
            className={cn(
              "text-emerald-deep dark:text-emerald-soft mt-1 font-medium",
              featured ? "text-[0.92rem]" : "text-[0.8rem]",
            )}
          >
            {person.role}
          </p>
          <p
            className={cn("mt-1.5 leading-snug", featured ? "text-[0.85rem]" : "text-[0.76rem]")}
            style={{ color: "var(--text-muted)" }}
          >
            {person.affiliation}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <p
          className="text-[0.66rem] font-semibold uppercase tracking-[0.16em]"
          style={{ color: "var(--text-muted)" }}
        >
          Association with NRL
        </p>
        <p
          className="mt-2 text-[0.82rem] leading-relaxed"
          style={{ color: "var(--text-body)" }}
        >
          {person.association}
        </p>
      </div>

      <div className="mt-5">
        <p
          className="text-[0.66rem] font-semibold uppercase tracking-[0.16em]"
          style={{ color: "var(--text-muted)" }}
        >
          Research interests
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {person.interests.map((interest) => (
            <li
              key={interest}
              className="rounded-full border px-2.5 py-1 text-[0.7rem]"
              style={{ color: "var(--text-body)", backgroundColor: "var(--surface-muted)" }}
            >
              {interest}
            </li>
          ))}
        </ul>
      </div>

      <p
        className="mt-4 flex-1 text-[0.84rem] leading-relaxed"
        style={{ color: "var(--text-body)" }}
      >
        {person.bio}
      </p>

      {person.alumniNote && (
        <p className="mt-3 text-[0.78rem] font-medium" style={{ color: "var(--text-muted)" }}>
          Currently: {person.alumniNote}
        </p>
      )}

      <ul className="mt-5 flex flex-wrap items-center gap-2 border-t pt-4">
        {profileLinks.map(({ key, label, Icon, prefix }) => {
          const value = person.links[key];
          if (!value) return null;
          return (
            <li key={key}>
              <a
                href={`${prefix}${value}`}
                {...(prefix === "" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={`${label} — ${person.name}`}
                title={label}
                className="hover:border-emerald-nrl hover:text-emerald-deep dark:hover:text-emerald-soft inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-300"
                style={{ color: "var(--text-muted)" }}
              >
                <Icon className="h-[0.95rem] w-[0.95rem]" />
              </a>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
