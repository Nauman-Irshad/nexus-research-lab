import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LinkedInIcon } from "@/components/icons";
import { ButtonLink, PageHeader, Section } from "@/components/ui";
import { getPerson, people, personMatchesAuthor } from "@/lib/data/people";
import { projects } from "@/lib/data/projects";
import { getPublications, sortedPublications } from "@/lib/data/publications";
import { site } from "@/lib/data/site";
import type { Person, PersonGroup, Project, Publication } from "@/lib/types";
import { initials, seededValue } from "@/lib/utils";

export const metadata: Metadata = {
  title: "People",
  description:
    "Teachers and bachelor students at Nauman Irshad Lab — affiliation and projects.",
  alternates: { canonical: "/people" },
};

const teacherGroups = new Set<PersonGroup>([
  "co-director",
  "faculty",
  "affiliate-faculty",
  "visiting-faculty",
]);

type AuthorChip = {
  id: string;
  name: string;
  photo?: string;
  linkedin?: string;
  rank?: string;
};

type MemberEntry = {
  id: string;
  title: string;
  href: string;
  credit: string;
  status?: string;
  detail: string;
  venue?: string;
  year?: number;
  pdf?: string;
  demo?: string;
  github?: string;
  authors: AuthorChip[];
};

function ordinalAuthor(position: number) {
  const n = position + 1;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

function authorCredit(person: Person, publication: Publication) {
  const index = publication.authors.findIndex((author) =>
    personMatchesAuthor(person, author),
  );
  if (index < 0) return "Co-author";
  return `${ordinalAuthor(index)} author`;
}

function resolveAuthorName(authorName: string): AuthorChip {
  const match = people.find((person) => personMatchesAuthor(person, authorName));
  if (match) {
    return {
      id: match.id,
      name: match.name,
      photo: match.photo,
      linkedin: match.links.linkedin,
    };
  }
  return { id: authorName.toLowerCase().replace(/\s+/g, "-"), name: authorName };
}

function authorsFromPublication(publication: Publication): AuthorChip[] {
  return publication.authors.map((author, index) => ({
    ...resolveAuthorName(author),
    rank: `${ordinalAuthor(index)} author`,
  }));
}

function authorsFromProject(project: Project, paper?: Publication): AuthorChip[] {
  if (paper) return authorsFromPublication(paper);

  const seen = new Set<string>();
  const list: AuthorChip[] = [];
  const push = (id: string, rank: string) => {
    if (seen.has(id)) return;
    seen.add(id);
    const person = getPerson(id);
    if (!person) return;
    list.push({
      id: person.id,
      name: person.name,
      photo: person.photo,
      linkedin: person.links.linkedin,
      rank,
    });
  };

  push(project.supervisorId, "Supervisor");
  for (const id of project.teamIds) {
    push(id, id === project.supervisorId ? "Supervisor" : "Team");
  }
  return list;
}

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

function entriesFor(person: Person): MemberEntry[] {
  const work = workFor(person);
  const papers = papersFor(person);
  const coveredPaperIds = new Set<string>();
  const entries: MemberEntry[] = [];

  for (const project of work) {
    const linkedAuthored = getPublications(project.publicationIds).filter((pub) =>
      pub.authors.some((author) => personMatchesAuthor(person, author)),
    );
    const paper =
      linkedAuthored[0] ?? getPublications(project.publicationIds)[0] ?? undefined;
    linkedAuthored.forEach((p) => coveredPaperIds.add(p.id));

    const credits: string[] = [];
    if (linkedAuthored[0]) credits.push(authorCredit(person, linkedAuthored[0]));
    if (project.supervisorId === person.id) credits.push("Supervisor");
    else if (!linkedAuthored[0]) credits.push("Team");

    entries.push({
      id: project.id,
      title: project.title,
      href: `/projects#${project.id}`,
      credit: credits.join(" · "),
      status: project.status,
      detail: project.summary,
      venue: paper ? (paper.venueShort ?? paper.venue) : undefined,
      year: paper?.year,
      pdf: linkedAuthored[0]?.links?.pdf ?? paper?.links?.pdf,
      demo: project.links?.demo,
      github: project.links?.github ?? paper?.links?.github,
      authors: authorsFromProject(project, paper),
    });
  }

  for (const paper of papers) {
    if (coveredPaperIds.has(paper.id)) continue;
    entries.push({
      id: paper.id,
      title: paper.title,
      href: `/publications#${paper.id}`,
      credit: authorCredit(person, paper),
      status:
        paper.status === "under-review"
          ? "Under review"
          : paper.status === "accepted"
            ? "Accepted"
            : "Published",
      detail: paper.abstract.slice(0, 180).trim() + (paper.abstract.length > 180 ? "…" : ""),
      venue: paper.venueShort ?? paper.venue,
      year: paper.year,
      pdf: paper.links?.pdf,
      github: paper.links?.github,
      authors: authorsFromPublication(paper),
    });
  }

  return entries;
}

const folders: { id: string; title: string; blurb: string; members: Person[] }[] = [
  {
    id: "teachers",
    title: "Teachers",
    blurb: "Teachers and faculty advisors.",
    members: people.filter((person) => teacherGroups.has(person.group)),
  },
  {
    id: "bachelor",
    title: "Bachelor students",
    blurb: "Student researchers and collaborators.",
    members: people.filter((person) => !teacherGroups.has(person.group)),
  },
];

export default function PeoplePage() {
  return (
    <>
      <PageHeader
        eyebrow="People"
        title="Laboratory members"
        lead="Teachers first, then students — open affiliation and projects when you need them."
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

function PersonAvatar({
  name,
  photo,
  id,
  size = 56,
}: {
  name: string;
  photo?: string;
  id: string;
  size?: number;
}) {
  const hue = seededValue(id);
  const angle = Math.round(120 + hue * 110);
  return (
    <span
      className="relative shrink-0 overflow-hidden rounded-full border border-[var(--border)]"
      style={{ width: size, height: size }}
    >
      {photo ? (
        <Image
          src={photo}
          alt=""
          width={size}
          height={size}
          sizes={`${size}px`}
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          aria-hidden
          className="flex h-full w-full items-center justify-center font-semibold text-white"
          style={{
            fontSize: size > 40 ? "0.75rem" : "0.58rem",
            backgroundImage: `linear-gradient(${angle}deg, #0B1F3A 0%, #133055 55%, #00A86B 145%)`,
          }}
        >
          {initials(name)}
        </span>
      )}
    </span>
  );
}

function PersonRow({ person, entries }: { person: Person; entries: MemberEntry[] }) {
  const href = person.links.linkedin;
  const workCount = entries.length;

  return (
    <li className="border-b border-[var(--border)] py-4 first:pt-0 last:border-b-0">
      <div className="flex items-start gap-4">
        <PersonAvatar name={person.name} photo={person.photo} id={person.id} />

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
          <p className="mt-1 text-[0.82rem]" style={{ color: "var(--text-muted)" }}>
            {person.affiliation}
            {workCount > 0 ? ` · ${workCount} research item${workCount === 1 ? "" : "s"}` : ""}
          </p>

          <details className="group mt-3">
            <summary
              className="hover:border-emerald-nrl inline-flex cursor-pointer list-none items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.72rem] font-medium transition-colors group-open:border-emerald-nrl [&::-webkit-details-marker]:hidden"
              style={{ color: "var(--text-strong)" }}
            >
              <span className="group-open:hidden">View affiliation · projects</span>
              <span className="hidden group-open:inline">Hide</span>
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>

            <div className="mt-4 space-y-3">
              <p className="text-[0.86rem] leading-relaxed" style={{ color: "var(--text-body)" }}>
                {person.bio}
              </p>
              <p className="text-[0.78rem]" style={{ color: "var(--text-muted)" }}>
                <span className="font-semibold" style={{ color: "var(--text-strong)" }}>
                  Affiliation:{" "}
                </span>
                {person.affiliation}
                {person.association ? ` · ${person.association}` : ""}
              </p>

              {entries.length > 0 && (
                <div className="mt-2">
                  <p
                    className="text-[0.65rem] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Projects
                  </p>
                  <ul className="mt-2 space-y-4">
                    {entries.map((entry) => (
                      <li key={entry.id}>
                        <Link
                          href={entry.href}
                          className="link-underline text-[0.9rem] font-semibold leading-snug"
                          style={{ color: "var(--text-strong)" }}
                        >
                          {entry.title}
                        </Link>
                        <p className="mt-1 text-[0.75rem]" style={{ color: "var(--text-muted)" }}>
                          {[entry.credit, entry.status, entry.venue, entry.year]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                        {entry.authors.length > 0 && (
                          <ul className="mt-2 flex flex-wrap gap-2">
                            {entry.authors.map((author) => {
                              const chip = (
                                <>
                                  <PersonAvatar
                                    name={author.name}
                                    photo={author.photo}
                                    id={author.id}
                                    size={36}
                                  />
                                  <span className="min-w-0">
                                    <span className="block truncate text-[0.72rem] font-semibold leading-tight">
                                      {author.name}
                                    </span>
                                    {author.rank && (
                                      <span
                                        className="block text-[0.62rem]"
                                        style={{ color: "var(--text-muted)" }}
                                      >
                                        {author.rank}
                                      </span>
                                    )}
                                  </span>
                                </>
                              );
                              return (
                                <li key={`${entry.id}-${author.id}`}>
                                  {author.linkedin ? (
                                    <a
                                      href={author.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title={`${author.name} on LinkedIn`}
                                      className="hover:border-emerald-nrl inline-flex max-w-[10.5rem] items-center gap-2 rounded-full border py-1 pr-2.5 pl-1 transition-colors"
                                      style={{ color: "var(--text-strong)" }}
                                    >
                                      {chip}
                                    </a>
                                  ) : (
                                    <span
                                      className="inline-flex max-w-[10.5rem] items-center gap-2 rounded-full border py-1 pr-2.5 pl-1"
                                      style={{ color: "var(--text-strong)" }}
                                    >
                                      {chip}
                                    </span>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </details>
        </div>
      </div>
    </li>
  );
}
