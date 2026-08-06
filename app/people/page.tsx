import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LinkedInIcon } from "@/components/icons";
import { ButtonLink, PageHeader, Section } from "@/components/ui";
import { people, personMatchesAuthor } from "@/lib/data/people";
import { projects } from "@/lib/data/projects";
import { sortedPublications } from "@/lib/data/publications";
import { site } from "@/lib/data/site";
import type { Person, PersonGroup, Project, Publication } from "@/lib/types";
import { initials, seededValue } from "@/lib/utils";

export const metadata: Metadata = {
  title: "People",
  description:
    "Teachers and bachelor student researchers at Nexus Research Lab — affiliation, papers and project work.",
  alternates: { canonical: "/people" },
};

const teacherGroups = new Set<PersonGroup>([
  "co-director",
  "faculty",
  "affiliate-faculty",
  "visiting-faculty",
]);

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
        lead="Each member shows affiliation, papers and project work linked to them."
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
                  <PersonRow
                    key={person.id}
                    person={person}
                    papers={papersFor(person)}
                    work={workFor(person)}
                  />
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

function PersonRow({
  person,
  papers,
  work,
}: {
  person: Person;
  papers: Publication[];
  work: Project[];
}) {
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
        </p>

        <p className="mt-2 text-[0.9rem] leading-relaxed" style={{ color: "var(--text-body)" }}>
          {person.bio}
        </p>

        {(person.interests?.length ?? 0) > 0 && (
          <p className="mt-2 text-[0.78rem]" style={{ color: "var(--text-muted)" }}>
            <span className="font-semibold" style={{ color: "var(--text-strong)" }}>
              Focus:{" "}
            </span>
            {person.interests.join(" · ")}
          </p>
        )}

        {papers.length > 0 && (
          <div className="mt-3">
            <p
              className="text-[0.65rem] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--text-muted)" }}
            >
              Papers
            </p>
            <ul className="mt-1.5 space-y-1">
              {papers.map((paper) => (
                <li key={paper.id} className="text-[0.84rem] leading-snug">
                  <Link
                    href={`/publications#${paper.id}`}
                    className="link-underline"
                    style={{ color: "var(--text-strong)" }}
                  >
                    {paper.title}
                  </Link>
                  <span style={{ color: "var(--text-muted)" }}>
                    {" "}
                    · {paper.venueShort ?? paper.venue} {paper.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {work.length > 0 && (
          <div className="mt-3">
            <p
              className="text-[0.65rem] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--text-muted)" }}
            >
              Work
            </p>
            <ul className="mt-1.5 space-y-1">
              {work.map((project) => (
                <li key={project.id} className="text-[0.84rem] leading-snug">
                  <Link
                    href={`/projects#${project.id}`}
                    className="link-underline"
                    style={{ color: "var(--text-strong)" }}
                  >
                    {project.title}
                  </Link>
                  <span style={{ color: "var(--text-muted)" }}>
                    {" "}
                    · {project.supervisorId === person.id ? "Supervisor" : "Team"} ·{" "}
                    {project.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </li>
  );
}
