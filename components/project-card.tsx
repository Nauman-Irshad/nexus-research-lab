import Image from "next/image";
import Link from "next/link";
import { CitationActions } from "@/components/citation-actions";
import { CodeIcon, DatabaseIcon, FileIcon, GlobeIcon } from "@/components/icons";
import { Badge, MetaItem } from "@/components/ui";
import { doiUrl, toBibTeX, toIeee } from "@/lib/citation";
import { getPerson } from "@/lib/data/people";
import { getPublications } from "@/lib/data/publications";
import { areaTitle } from "@/lib/data/research";
import type { Person, Project } from "@/lib/types";
import { initials, seededValue } from "@/lib/utils";

const statusTone: Record<Project["status"], "accent" | "neutral" | "outline"> = {
  Ongoing: "accent",
  Completed: "neutral",
  "Under review": "outline",
  Planned: "outline",
};

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const supervisor = getPerson(project.supervisorId);
  const team = project.teamIds
    .map((id) => getPerson(id))
    .filter((person): person is Person => Boolean(person));
  const publications = getPublications(project.publicationIds);

  const peopleShown = (() => {
    const seen = new Set<string>();
    const list: Person[] = [];
    if (supervisor) {
      seen.add(supervisor.id);
      list.push(supervisor);
    }
    for (const member of team) {
      if (seen.has(member.id)) continue;
      seen.add(member.id);
      list.push(member);
    }
    return list;
  })();

  return (
    <article
      id={project.id}
      className="surface-card hover-lift scroll-mt-32 overflow-hidden rounded-2xl"
    >
      <div className="grid lg:grid-cols-5">
        <div className="relative aspect-16/10 lg:col-span-2 lg:aspect-auto">
          <Image
            src={project.image}
            alt={`${project.title} project imagery`}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            loading={index < 2 ? "eager" : "lazy"}
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 lg:hidden"
            style={{ background: "linear-gradient(to top, rgba(5,15,28,0.5), transparent 60%)" }}
          />
        </div>

        <div className="p-6 md:p-8 lg:col-span-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={statusTone[project.status]}>{project.status}</Badge>
            <Link href={`/research/${project.area}`}>
              <Badge>{areaTitle(project.area)}</Badge>
            </Link>
            {(project.relatedAreas ?? []).slice(0, 2).map((area) => (
              <Link key={area} href={`/research/${area}`} className="hidden sm:inline-flex">
                <Badge tone="outline">{areaTitle(area)}</Badge>
              </Link>
            ))}
            <span className="ml-auto text-[0.75rem]" style={{ color: "var(--text-muted)" }}>
              {project.start} – {project.end}
            </span>
          </div>

          <h3 className="mt-4 text-xl leading-snug font-semibold">{project.title}</h3>
          <p className="mt-3 text-[0.9rem] leading-relaxed" style={{ color: "var(--text-body)" }}>
            {project.description}
          </p>

          <dl className="mt-6">
            <MetaItem
              label="Publications"
              value={
                publications.length > 0 ? (
                  <ul className="space-y-1">
                    {publications.map((item) => (
                      <li key={item.id}>
                        <Link href={`/publications#${item.id}`} className="link-underline">
                          {item.venueShort ?? item.venue} {item.year}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  "In preparation"
                )
              }
            />
          </dl>

          <div className="mt-6">
            <p
              className="text-[0.65rem] font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--text-muted)" }}
            >
              Supervisor & research team
            </p>
            <p className="mt-1 text-[0.78rem]" style={{ color: "var(--text-muted)" }}>
              Click a photo to open LinkedIn
            </p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {peopleShown.map((person) => (
                <li key={person.id}>
                  <PersonPhotoLink
                    person={person}
                    badge={person.id === project.supervisorId ? "Supervisor" : "Team"}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <p
              className="text-[0.65rem] font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--text-muted)" }}
            >
              Technology stack
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border px-2 py-1 font-mono text-[0.68rem]"
                  style={{ color: "var(--text-body)", backgroundColor: "var(--surface-muted)" }}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {publications.length > 0 && (
            <div className="mt-6 space-y-4 border-t pt-5">
              <p
                className="text-[0.65rem] font-semibold uppercase tracking-[0.16em]"
                style={{ color: "var(--text-muted)" }}
              >
                Paper · download & cite
              </p>
              {publications.map((publication) => {
                const doi = doiUrl(publication.doi);
                return (
                  <div key={publication.id} className="flex flex-wrap items-center gap-2">
                    {publication.links?.pdf && (
                      <ProjectLink
                        href={publication.links.pdf}
                        icon={<FileIcon className="h-3.5 w-3.5" />}
                        download
                      >
                        Download PDF
                      </ProjectLink>
                    )}
                    {doi && (
                      <ProjectLink href={doi} icon={<GlobeIcon className="h-3.5 w-3.5" />}>
                        DOI
                      </ProjectLink>
                    )}
                    {publication.links?.github && (
                      <ProjectLink
                        href={publication.links.github}
                        icon={<CodeIcon className="h-3.5 w-3.5" />}
                      >
                        GitHub
                      </ProjectLink>
                    )}
                    {publication.links?.dataset && (
                      <ProjectLink
                        href={publication.links.dataset}
                        icon={<DatabaseIcon className="h-3.5 w-3.5" />}
                      >
                        Dataset
                      </ProjectLink>
                    )}
                    <CitationActions
                      bibtex={toBibTeX(publication)}
                      citation={toIeee(publication)}
                      compact
                    />
                  </div>
                );
              })}
            </div>
          )}

          {(project.links?.github || project.links?.demo || project.links?.dataset) && (
            <div
              className={`flex flex-wrap gap-2 ${publications.length ? "mt-3" : "mt-6 border-t pt-5"}`}
            >
              {project.links?.github && (
                <ProjectLink href={project.links.github} icon={<CodeIcon className="h-3.5 w-3.5" />}>
                  Repository
                </ProjectLink>
              )}
              {project.links?.demo && (
                <ProjectLink href={project.links.demo} icon={<GlobeIcon className="h-3.5 w-3.5" />}>
                  Live demo
                </ProjectLink>
              )}
              {project.links?.dataset && (
                <ProjectLink
                  href={project.links.dataset}
                  icon={<DatabaseIcon className="h-3.5 w-3.5" />}
                >
                  Dataset
                </ProjectLink>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function PersonPhotoLink({ person, badge }: { person: Person; badge: string }) {
  const linkedin = person.links.linkedin;
  const hue = seededValue(person.id);
  const angle = Math.round(120 + hue * 110);
  const avatar = (
    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[var(--border)]">
      {person.photo ? (
        <Image
          src={person.photo}
          alt=""
          width={48}
          height={48}
          sizes="48px"
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          aria-hidden
          className="flex h-full w-full items-center justify-center text-[0.65rem] font-semibold text-white"
          style={{
            backgroundImage: `linear-gradient(${angle}deg, #0B1F3A 0%, #133055 55%, #00A86B 145%)`,
          }}
        >
          {initials(person.name)}
        </span>
      )}
    </span>
  );

  const body = (
    <>
      {avatar}
      <span className="min-w-0">
        <span className="block truncate text-[0.8rem] font-semibold leading-tight">
          {person.name}
        </span>
        <span className="block text-[0.68rem]" style={{ color: "var(--text-muted)" }}>
          {badge}
        </span>
      </span>
    </>
  );

  if (linkedin) {
    return (
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        title={`Open ${person.name} on LinkedIn`}
        className="hover:border-emerald-nrl inline-flex max-w-[11rem] items-center gap-2.5 rounded-full border py-1.5 pr-3 pl-1.5 transition-colors"
        style={{ color: "var(--text-strong)" }}
      >
        {body}
      </a>
    );
  }

  return (
    <span
      className="inline-flex max-w-[11rem] items-center gap-2.5 rounded-full border py-1.5 pr-3 pl-1.5"
      style={{ color: "var(--text-strong)" }}
    >
      {body}
    </span>
  );
}

function ProjectLink({
  href,
  icon,
  children,
  download,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  download?: boolean;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(download ? { download: true } : {})}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="hover:border-emerald-nrl hover:text-emerald-deep dark:hover:text-emerald-soft inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[0.75rem] font-medium transition-colors duration-300"
      style={{ color: "var(--text-strong)" }}
    >
      {icon}
      {children}
    </a>
  );
}
