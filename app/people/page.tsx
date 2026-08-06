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
  description: "Teachers and students at Nauman Irshad Lab.",
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
      venue: paper.venueShort ?? paper.venue,
      year: paper.year,
      pdf: paper.links?.pdf,
      github: paper.links?.github,
      authors: authorsFromPublication(paper),
    });
  }

  return entries;
}

const teachers = people.filter((person) => teacherGroups.has(person.group));
const students = people.filter((person) => !teacherGroups.has(person.group));

const folders: { id: string; title: string; blurb: string; members: Person[] }[] = [
  {
    id: "teachers",
    title: "Teachers",
    blurb: "Teachers and faculty advisors.",
    members: teachers,
  },
  {
    id: "bachelor",
    title: "Bachelor students",
    blurb: "Student researchers and collaborators.",
    members: students,
  },
];

export default function PeoplePage() {
  return (
    <>
      <PageHeader
        eyebrow="People"
        title="Laboratory members"
        lead={`${people.length} members · ${teachers.length} teachers · ${students.length} students`}
        meta={
          <>
            <Metric value={people.length} label="Total" />
            <Metric value={teachers.length} label="Teachers" />
            <Metric value={students.length} label="Students" />
          </>
        }
      />

      <Section className="py-8 md:py-10">
        <div className="mx-auto max-w-4xl">
          <p
            className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--text-muted)" }}
          >
            Contributors
          </p>
          <div
            className="flex flex-wrap gap-1.5 rounded-2xl border p-4 md:p-5"
            style={{ backgroundColor: "var(--surface-muted)" }}
          >
            {people.map((person) => (
              <a
                key={person.id}
                href={`#person-${person.id}`}
                title={person.name}
                className="hover:ring-emerald-nrl relative rounded-full ring-2 ring-transparent transition ring-offset-1"
              >
                <PersonAvatar name={person.name} photo={person.photo} id={person.id} size={40} />
                <span className="sr-only">{person.name}</span>
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-6 md:py-10">
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

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-[0.78rem]" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
    </div>
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
      className="relative shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-white"
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

function shortBio(bio: string) {
  if (bio.length <= 160) return bio;
  const cut = bio.slice(0, 160);
  const last = cut.lastIndexOf(" ");
  return `${cut.slice(0, last > 80 ? last : 160).trimEnd()}…`;
}

function PersonRow({ person, entries }: { person: Person; entries: MemberEntry[] }) {
  const href = person.links.linkedin;

  return (
    <li
      id={`person-${person.id}`}
      className="scroll-mt-28 border-b border-[var(--border)] py-5 first:pt-0 last:border-b-0"
    >
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

          <p className="mt-1 text-[0.8rem]" style={{ color: "var(--text-muted)" }}>
            {person.affiliation}
          </p>

          <p className="mt-2 text-[0.86rem] leading-relaxed" style={{ color: "var(--text-body)" }}>
            {shortBio(person.bio)}
          </p>

          {entries.length > 0 && (
            <div className="mt-3">
              <p
                className="text-[0.62rem] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "var(--text-muted)" }}
              >
                Papers & projects
              </p>
              <ul className="mt-2 space-y-3">
                {entries.map((entry) => (
                  <li key={entry.id}>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <Link
                        href={entry.href}
                        className="link-underline text-[0.88rem] font-semibold leading-snug"
                        style={{ color: "var(--text-strong)" }}
                      >
                        {entry.title}
                      </Link>
                      {entry.pdf && (
                        <a
                          href={entry.pdf}
                          download
                          className="hover:text-emerald-deep dark:hover:text-emerald-soft text-[0.72rem] font-medium underline-offset-2 hover:underline"
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
                          className="hover:text-emerald-deep dark:hover:text-emerald-soft text-[0.72rem] font-medium underline-offset-2 hover:underline"
                          style={{ color: "var(--text-strong)" }}
                        >
                          Demo
                        </a>
                      )}
                      {entry.github && (
                        <a
                          href={entry.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-deep dark:hover:text-emerald-soft text-[0.72rem] font-medium underline-offset-2 hover:underline"
                          style={{ color: "var(--text-strong)" }}
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                    <p className="mt-0.5 text-[0.72rem]" style={{ color: "var(--text-muted)" }}>
                      {[entry.credit, entry.status, entry.venue, entry.year]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    {entry.authors.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {entry.authors.map((author) => {
                          const chip = (
                            <>
                              <PersonAvatar
                                name={author.name}
                                photo={author.photo}
                                id={author.id}
                                size={28}
                              />
                              <span className="truncate text-[0.68rem] font-medium leading-none">
                                {author.name.split(" ")[0]}
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
                                  title={author.rank ? `${author.name} · ${author.rank}` : author.name}
                                  className="hover:border-emerald-nrl inline-flex items-center gap-1.5 rounded-full border py-0.5 pr-2 pl-0.5 transition-colors"
                                  style={{ color: "var(--text-strong)" }}
                                >
                                  {chip}
                                </a>
                              ) : (
                                <span
                                  title={author.rank ? `${author.name} · ${author.rank}` : author.name}
                                  className="inline-flex items-center gap-1.5 rounded-full border py-0.5 pr-2 pl-0.5"
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
      </div>
    </li>
  );
}
