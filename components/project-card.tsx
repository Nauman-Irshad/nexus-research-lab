import Image from "next/image";
import Link from "next/link";
import { CodeIcon, DatabaseIcon, GlobeIcon } from "@/components/icons";
import { Badge, MetaItem } from "@/components/ui";
import { getPerson } from "@/lib/data/people";
import { getPublications } from "@/lib/data/publications";
import { areaTitle } from "@/lib/data/research";
import type { Project } from "@/lib/types";

const statusTone: Record<Project["status"], "accent" | "neutral" | "outline"> = {
  Ongoing: "accent",
  Completed: "neutral",
  "Under review": "outline",
  Planned: "outline",
};

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const supervisor = getPerson(project.supervisorId);
  const team = project.teamIds.map((id) => getPerson(id)).filter(Boolean);
  const publications = getPublications(project.publicationIds);

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

          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <MetaItem label="Funding agency" value={project.fundingAgency} />
            <MetaItem
              label="Supervisor"
              value={supervisor ? `${supervisor.name} — ${supervisor.affiliation}` : "—"}
            />
            <MetaItem
              label="Research team"
              value={
                <>
                  {team.map((member) => member!.name).join(", ")}
                  {project.externalTeam && project.externalTeam.length > 0 && (
                    <span style={{ color: "var(--text-muted)" }}>
                      {" · "}
                      {project.externalTeam.join(", ")}
                    </span>
                  )}
                </>
              }
            />
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

          {(project.links?.github || project.links?.demo || project.links?.dataset) && (
            <div className="mt-6 flex flex-wrap gap-2 border-t pt-5">
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

function ProjectLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:border-emerald-nrl hover:text-emerald-deep dark:hover:text-emerald-soft inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[0.75rem] font-medium transition-colors duration-300"
      style={{ color: "var(--text-strong)" }}
    >
      {icon}
      {children}
    </a>
  );
}
