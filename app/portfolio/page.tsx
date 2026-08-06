import type { Metadata } from "next";
import Image from "next/image";
import { Badge, ButtonLink, PageHeader, Section, SectionHeading } from "@/components/ui";
import {
  allNaumanCollaborators,
  collaboratorsForProject,
  collaboratorsForPublication,
  nauman,
  naumanCertificates,
  naumanHighlights,
  naumanProjects,
  naumanPublications,
  portfolioStats,
  resolveCollaborator,
  type CollaboratorChip,
} from "@/lib/data/portfolio";
import { site } from "@/lib/data/site";
import { initials, seededValue } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nauman Portfolio",
  description:
    "Portfolio of Nauman Irshad Ali Shah — certificates, conference and journal papers, projects, and collaborators.",
  alternates: { canonical: "/portfolio" },
};

export default function NaumanPortfolioPage() {
  const collaborators = allNaumanCollaborators();

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Nauman Irshad Ali Shah"
        lead={nauman.bio}
        meta={
          <>
            <Stat value={portfolioStats.papers} label="Papers" />
            <Stat value={portfolioStats.conferences} label="Conference" />
            <Stat value={portfolioStats.journals} label="Journal" />
            <Stat value={portfolioStats.projects} label="Projects" />
            <Stat value={portfolioStats.certificates} label="Certificates" />
          </>
        }
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {nauman.photo && (
            <span className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-[var(--border)]">
              <Image
                src={nauman.photo}
                alt={nauman.name}
                width={80}
                height={80}
                className="h-full w-full object-cover"
                priority
              />
            </span>
          )}
          <div className="flex flex-wrap gap-3">
            {nauman.links.linkedin && (
              <ButtonLink href={nauman.links.linkedin} variant="outline" arrow="up-right">
                LinkedIn
              </ButtonLink>
            )}
            {nauman.links.github && (
              <ButtonLink href={nauman.links.github} variant="outline" arrow="up-right">
                GitHub
              </ButtonLink>
            )}
            <ButtonLink href={site.contact.whatsapp} variant="accent" arrow="up-right">
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </PageHeader>

      {/* Certificates */}
      <Section id="certificates">
        <SectionHeading
          eyebrow="Certificates"
          title="Certificates and course completions"
        />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {naumanCertificates.map((cert) => (
            <li
              key={cert.id}
              className="surface-card overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[4/3] bg-[var(--surface-muted)]">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-3"
                />
              </div>
              <div className="p-5">
                <Badge tone="accent">{cert.kind}</Badge>
                <h3 className="mt-3 text-lg font-semibold">{cert.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {cert.detail}
                </p>
                <p className="mt-2 text-[0.78rem]" style={{ color: "var(--text-muted)" }}>
                  {cert.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Papers */}
      <Section id="papers" tone="muted">
        <SectionHeading
          eyebrow="Papers"
          title="Conference and journal papers"
          lead="Every manuscript where Nauman Irshad Ali Shah is an author — with first-page preview and collaborators."
        />
        <ul className="mt-10 space-y-6">
          {naumanPublications.map((paper) => {
            const team = collaboratorsForPublication(paper.authors);
            return (
              <li
                key={paper.id}
                id={paper.id}
                className="surface-card scroll-mt-28 overflow-hidden rounded-2xl p-5 md:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  {paper.image && (
                    <div className="relative mx-auto h-[11rem] w-[8rem] shrink-0 overflow-hidden rounded-md border border-[var(--border)] bg-white shadow-sm sm:mx-0 sm:h-[13rem] sm:w-[9.2rem]">
                      <Image
                        src={paper.image}
                        alt={`First page — ${paper.title}`}
                        fill
                        sizes="150px"
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2">
                      <Badge tone="accent">
                        {paper.type === "conference"
                          ? "Conference"
                          : paper.type === "journal"
                            ? "Journal"
                            : paper.type}
                      </Badge>
                      <Badge>{paper.status}</Badge>
                      <Badge tone="outline">{paper.year}</Badge>
                      {paper.venueShort && <Badge tone="outline">{paper.venueShort}</Badge>}
                    </div>
                    <h3 className="mt-3 text-lg leading-snug font-semibold">{paper.title}</h3>
                    <p className="mt-2 text-[0.85rem] italic" style={{ color: "var(--text-muted)" }}>
                      {paper.venue}
                    </p>
                    <p className="mt-3 text-[0.88rem] leading-relaxed" style={{ color: "var(--text-body)" }}>
                      {paper.abstract.slice(0, 280)}
                      {paper.abstract.length > 280 ? "…" : ""}
                    </p>

                    <div className="mt-5">
                      <p
                        className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Collaborated with
                      </p>
                      <CollaboratorRow people={team} />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {paper.links?.pdf && (
                        <ButtonLink href={paper.links.pdf} variant="outline" size="sm">
                          PDF
                        </ButtonLink>
                      )}
                      {paper.links?.github && (
                        <ButtonLink
                          href={paper.links.github}
                          variant="outline"
                          size="sm"
                          arrow="up-right"
                        >
                          GitHub
                        </ButtonLink>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Projects */}
      <Section id="projects">
        <SectionHeading
          eyebrow="Projects"
          title="Projects led or co-built"
          lead="Applied systems and research stacks — each with the people who worked with Nauman."
        />
        <ul className="mt-10 space-y-6">
          {naumanProjects.map((project) => {
            const team = collaboratorsForProject(project.teamIds, project.supervisorId);
            return (
              <li
                key={project.id}
                id={project.id}
                className="surface-card scroll-mt-28 overflow-hidden rounded-2xl"
              >
                <div className="grid lg:grid-cols-5">
                  <div className="relative aspect-[16/10] lg:col-span-2 lg:aspect-auto lg:min-h-[220px]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 lg:col-span-3 md:p-7">
                    <div className="flex flex-wrap gap-2">
                      <Badge tone="accent">{project.status}</Badge>
                      <Badge tone="outline">
                        {project.start} – {project.end}
                      </Badge>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
                    <p
                      className="mt-3 text-[0.9rem] leading-relaxed"
                      style={{ color: "var(--text-body)" }}
                    >
                      {project.summary}
                    </p>
                    <div className="mt-5">
                      <p
                        className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Collaborated with
                      </p>
                      <CollaboratorRow people={team} />
                    </div>
                    {(project.links?.github || project.links?.demo) && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        {project.links.github && (
                          <ButtonLink
                            href={project.links.github}
                            variant="outline"
                            size="sm"
                            arrow="up-right"
                          >
                            GitHub
                          </ButtonLink>
                        )}
                        {project.links.demo && (
                          <ButtonLink
                            href={project.links.demo}
                            variant="outline"
                            size="sm"
                            arrow="up-right"
                          >
                            Demo
                          </ButtonLink>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Events & exhibitions */}
      <Section id="events" tone="muted">
        <SectionHeading
          eyebrow="Events"
          title="Conferences, exhibitions and presentations"
        />
        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {naumanHighlights.map((item) => (
            <li key={item.id} className="surface-card overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <Badge tone="accent">{item.kind}</Badge>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.detail}
                </p>
                <div className="mt-4">
                  <p
                    className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Collaborated with
                  </p>
                  <CollaboratorRow
                    people={item.collaboratorNames.map(resolveCollaborator)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* All collaborators */}
      <Section id="collaborators">
        <SectionHeading
          eyebrow="Team"
          title="People who collaborated with Nauman"
          lead="Every co-author, mentor and teammate from papers, projects and exhibitions above."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collaborators.map((person) => (
            <li
              key={person.name}
              className="flex items-center gap-3 rounded-xl border border-[var(--border)] px-4 py-3"
            >
              <PersonAvatar person={person} size={44} />
              <div className="min-w-0">
                {person.linkedin ? (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-[var(--emerald)]"
                  >
                    {person.name}
                  </a>
                ) : (
                  <p className="font-medium">{person.name}</p>
                )}
                <p className="text-[0.75rem]" style={{ color: "var(--text-muted)" }}>
                  Collaborator
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="inverse">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-emerald-soft!">Contact</p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Work with Nauman
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={site.contact.whatsapp} variant="accent" arrow="up-right">
              WhatsApp
            </ButtonLink>
            <ButtonLink
              href={`mailto:${site.contact.email}`}
              variant="outline"
              className="border-white/25 text-white! hover:border-white/70"
            >
              Email
            </ButtonLink>
            <ButtonLink
              href="/publications"
              variant="outline"
              className="border-white/25 text-white! hover:border-white/70"
            >
              All lab publications
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-[0.78rem]" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
    </div>
  );
}

function CollaboratorRow({ people }: { people: CollaboratorChip[] }) {
  if (people.length === 0) {
    return (
      <p className="mt-2 text-[0.85rem]" style={{ color: "var(--text-muted)" }}>
        —
      </p>
    );
  }

  return (
    <ul className="mt-3 flex flex-wrap gap-3">
      {people.map((person) => (
        <li key={person.name} className="flex items-center gap-2">
          <PersonAvatar person={person} size={32} />
          {person.linkedin ? (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.82rem] font-medium hover:text-[var(--emerald)]"
            >
              {person.name}
            </a>
          ) : (
            <span className="text-[0.82rem] font-medium">{person.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function PersonAvatar({ person, size }: { person: CollaboratorChip; size: number }) {
  const hue = seededValue(person.name);
  const angle = Math.round(120 + hue * 110);

  if (person.photo) {
    return (
      <span
        className="relative shrink-0 overflow-hidden rounded-full"
        style={{ width: size, height: size }}
      >
        <Image
          src={person.photo}
          alt=""
          width={size}
          height={size}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold text-white"
      style={{
        width: size,
        height: size,
        backgroundImage: `linear-gradient(${angle}deg, #0B1F3A 0%, #133055 55%, #00A86B 145%)`,
      }}
    >
      {initials(person.name)}
    </span>
  );
}
