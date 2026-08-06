import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LinkedInIcon } from "@/components/icons";
import { ButtonLink, PageHeader, Section } from "@/components/ui";
import { people, personMatchesAuthor } from "@/lib/data/people";
import { projects } from "@/lib/data/projects";
import { getPublications, sortedPublications } from "@/lib/data/publications";
import { site } from "@/lib/data/site";
import type { Person, PersonGroup, Project, Publication } from "@/lib/types";
import { initials, seededValue } from "@/lib/utils";

export const metadata: Metadata = {
  title: "People",
  description:
    "Teachers and bachelor student researchers at Nexus Research Lab — affiliation and research work.",
  alternates: { canonical: "/people" },
};

const teacherGroups = new Set<PersonGroup>([
  "co-director",
  "faculty",
  "affiliate-faculty",
  "visiting-faculty",
]);

type MemberEntry = {
  id: string;
  title: string;
  href: string;
  role?: string;
  status?: string;
  detail: string;
  venue?: string;
  year?: number;
  pdf?: string;
  demo?: string;
  github?: string;
};

function papersFor(person: Person): Publication[] {
  return sortedPublications.filter((pub) =>
    pub.authors.some((author) => personMatchesAuthor(person, author)),
  );
}

function workFor(person: Person): Project[] {
  return projects.filter(
    (project) =>
      project.supervisorId === person.id || project.teamIds.includes(person.id),
  );
}

/** One card per project/paper — no duplicate titles across Papers + Work. */
function entriesFor(person: Person): MemberEntry[] {
  const work = workFor(person);
  const papers = papersFor(person);
  const coveredPaperIds = new Set<string>();
  const entries: MemberEntry[] = [];

  for (const project of work) {
    const linked = getPublications(project.publicationIds).filter((pub) =>
      pub.authors.some((author) => personMatchesAuthor(person, author)),
    );
    // Prefer papers the person authored; else any linked paper for venue detail
    const paper =
      linked[0] ??
      getPublications(project.publicationIds)[0] ??
      undefined;
    if (paper) coveredPaperIds.add(paper.id);
    linked.forEach((p) => coveredPaperIds.add(p.id));

    entries.push({
      id: project.id,
      title: project.title,
      href: `/projects#${project.id}`,
      role: project.supervisorId === person.id ? "Supervisor" : "Team",
      status: project.status,
      detail: project.summary,
      venue: paper ? (paper.venueShort ?? paper.venue) : undefined,
      year: paper?.year,
      pdf: paper?.links?.pdf,
      demo: project.links?.demo,
      github: project.links?.github ?? paper?.links?.github,
    });
  }

  for (const paper of papers) {
    if (coveredPaperIds.has(paper.id)) continue;
    entries.push({
      id: paper.id,
      title: paper.title,
      href: `/publications#${paper.id}`,
      status:
        paper.status === "under-review"
          ? "Under review"
          : paper.status === "accepted"
            ? "Accepted"
            : "Published",
      detail: paper.abstract.slice(0, 220).trim() + (paper.abstract.length > 220 ? "…" : ""),
      venue: paper.venueShort ?? paper.venue,
      year: paper.year,
      pdf: paper.links?.pdf,
      github: paper.links?.github,
    });
  }

  return entries;
}

const folders: { id: string; title: string; blurb: string; members: Person[] }[] = [
  {
    id: "teachers",
    title: "Teachers",
    blurb: "Faculty advisors and teachers guiding research and projects.",
    members: people.filter((person) => teacherGroups.has(person.group)),
  },
  {
    id: "bachelor",
    title: "Bachelor students",
    blurb: "Student researchers building papers, systems and exhibitions.",
    members: people.filter((person) => !teacherGroups.has(person.group)),
  },
];

export default function PeoplePage() {
  return (
    <>
      <PageHeader
        eyebrow="People"
        title="Laboratory members"
        lead="Affiliation and a single detailed list of each member’s research — no duplicate titles."
      />

      <Section className="py-10 md:py-14">
        <div className="mx-auto max-w-3xl space-y-14">
          {folders.map((folder) => (
            <section key={folder.id} aria-labelledby={`people-${folder.id}`}>
              <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
                <div>
                  <p
                    className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Folder
                  </p>
                  <h2
                    id={`people-${folder.id}`}
                    className="mt-1 text-2xl font-semibold tracking-tight"
                  >
                    {folder.title}
                  </h2>
                  <p className="mt-1.5 text-[0.9rem]" style={{ color: "var(--text-body)" }}>
                    {folder.blurb}
                  </p>
                </div>
                <span
                  className="shrink-0 rounded-full border px-3 py-1 text-[0.72rem] font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  {folder.members.length}
                </span>
              </div>

              <ul>
                {folder.members.map((person) => (
                  <PersonRow key={person.id} person={person} entries={entriesFor(person)} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>

      <Section tone="inverse">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-emerald-soft!">Openings</p>
            <h2 className="mt-3 text-3xl leading-tight font-semibold text-white md:text-[2.3rem]">
              Research assistant and internship positions open each semester
            </h2>
            <p className="mt-5 leading-relaxed text-navy-100">
              Message us on WhatsApp if you want to join the laboratory.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink href={site.contact.whatsapp} variant="accent" arrow="up-right">
              Join Us
            </ButtonLink>
            <ButtonLink
              href={`mailto:${site.contact.admissions}`}
              variant="outline"
              className="border-white/25 text-white! hover:border-white/70"
            >
              Email the lab
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

function PersonRow({ person, entries }: { person: Person; entries: MemberEntry[] }) {
  const href = person.links.linkedin;
  const hue = seededValue(person.id);
  const angle = Math.round(120 + hue * 110);

  return (
    <li className="flex gap-4 border-b border-[var(--border)] py-6 first:pt-0 last:border-b-0">
      <span className="relative mt-0.5 h-14 w-14 shrink-0 overflow-hidden rounded-full">
        {person.photo ? (
          <Image
            src={person.photo}
            alt=""
            width={56}
            height={56}
            sizes="56px"
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-full w-full items-center justify-center text-[0.75rem] font-semibold text-white"
            style={{
              backgroundImage: `linear-gradient(${angle}deg, #0B1F3A 0%, #133055 55%, #00A86B 145%)`,
            }}
          >
            {initials(person.name)}
          </span>
        )}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[1.08rem] font-semibold tracking-tight">{person.name}</span>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} on LinkedIn`}
              title="Open LinkedIn profile"
              className="hover:border-emerald-nrl hover:text-emerald-deep dark:hover:text-emerald-soft inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
              style={{ color: "var(--text-strong)" }}
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>

        <p className="mt-1 text-[0.82rem] font-medium" style={{ color: "var(--text-muted)" }}>
          {person.affiliation}
          {person.interests.length > 0 ? ` · ${person.interests.join(" · ")}` : ""}
        </p>

        <p className="mt-2 text-[0.9rem] leading-relaxed" style={{ color: "var(--text-body)" }}>
          {person.bio}
        </p>

        {entries.length > 0 && (
          <div className="mt-4">
            <p
              className="text-[0.65rem] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--text-muted)" }}
            >
              Research & work
            </p>
            <ul className="mt-2 space-y-4">
              {entries.map((entry) => (
                <li key={entry.id}>
                  <Link
                    href={entry.href}
                    className="link-underline text-[0.92rem] font-semibold leading-snug"
                    style={{ color: "var(--text-strong)" }}
                  >
                    {entry.title}
                  </Link>
                  <p className="mt-1 text-[0.78rem]" style={{ color: "var(--text-muted)" }}>
                    {[entry.role, entry.status, entry.venue, entry.year]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <p
                    className="mt-1.5 text-[0.84rem] leading-relaxed"
                    style={{ color: "var(--text-body)" }}
                  >
                    {entry.detail}
                  </p>
                  {(entry.pdf || entry.demo || entry.github) && (
                    <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[0.78rem]">
                      {entry.pdf && (
                        <a
                          href={entry.pdf}
                          download
                          className="hover:text-emerald-deep dark:hover:text-emerald-soft font-medium underline-offset-2 hover:underline"
                          style={{ color: "var(--text-strong)" }}
                        >
                          PDF
                        </a>
                      )}
                      {entry.demo && (
                        <a
                          href={entry.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-deep dark:hover:text-emerald-soft font-medium underline-offset-2 hover:underline"
                          style={{ color: "var(--text-strong)" }}
                        >
                          Live demo
                        </a>
                      )}
                      {entry.github && (
                        <a
                          href={entry.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-deep dark:hover:text-emerald-soft font-medium underline-offset-2 hover:underline"
                          style={{ color: "var(--text-strong)" }}
                        >
                          GitHub
                        </a>
                      )}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </li>
  );
}
