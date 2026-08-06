import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRightIcon,
  CodeIcon,
  DatabaseIcon,
  UsersIcon,
  areaIcons,
} from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { PublicationCard } from "@/components/publication-card";
import { Reveal } from "@/components/reveal";
import { AccentBar, Badge, ButtonLink, Section, SectionHeading } from "@/components/ui";
import { projectsForArea } from "@/lib/data/projects";
import { publicationsForArea } from "@/lib/data/publications";
import { getResearchArea, researchAreas } from "@/lib/data/research";
import { site } from "@/lib/data/site";

export function generateStaticParams() {
  return researchAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getResearchArea(slug);
  if (!area) return { title: "Research area not found" };

  return {
    title: area.title,
    description: area.description,
    alternates: { canonical: `/research/${area.slug}` },
    openGraph: {
      title: `${area.title} · ${site.name}`,
      description: area.description,
      images: [{ url: area.image, width: 1600, height: 900, alt: area.title }],
    },
  };
}

export default async function ResearchAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getResearchArea(slug);
  if (!area) notFound();

  const Icon = areaIcons[area.icon];
  const areaProjects = projectsForArea(area.slug);
  const areaPublications = publicationsForArea(area.slug);
  const areaConference = areaPublications.filter((item) => item.type === "conference");
  const others = researchAreas.filter((entry) => entry.slug !== area.slug).slice(0, 5);

  return (
    <>
      {/* Area header */}
      <header className="bg-navy-700 relative overflow-hidden">
        <Image
          src={area.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(5,15,28,0.94) 8%, rgba(11,31,58,0.82) 52%, rgba(11,31,58,0.55) 100%)",
          }}
        />
        <div className="container-nrl relative py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="text-[0.78rem] text-navy-200">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-emerald-soft transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/research" className="hover:text-emerald-soft transition-colors">
                  Research
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white">{area.title}</li>
            </ol>
          </nav>

          <div className="mt-10 flex items-start gap-5">
            <span className="glass-card inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white">
              <Icon className="h-7 w-7" />
            </span>
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-emerald-soft">
                Research area
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl leading-[1.08] font-semibold text-white md:text-[3.1rem]">
                {area.title}
              </h1>
            </div>
          </div>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-navy-100">{area.description}</p>

          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-t border-white/10 pt-7">
            <HeaderStat label="Projects" value={String(areaProjects.length)} />
            <HeaderStat label="Publications" value={String(areaPublications.length)} />
            <HeaderStat label="Conference" value={String(areaConference.length)} />
            <HeaderStat label="Datasets" value={String(area.datasets.length)} />
            <HeaderStat label="Software" value={String(area.software.length)} />
          </dl>
        </div>
      </header>

      {/* Overview & objectives */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Overview</p>
            <div className="prose-nrl mt-5 text-[1.02rem]">
              {area.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-14 text-2xl font-semibold">Objectives</h2>
            <ol className="mt-6 space-y-4">
              {area.objectives.map((objective, index) => (
                <li key={objective} className="flex gap-4">
                  <span
                    aria-hidden
                    className="bg-emerald-nrl/12 text-emerald-deep dark:text-emerald-soft mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-[0.72rem] font-semibold"
                  >
                    {index + 1}
                  </span>
                  <p className="leading-relaxed" style={{ color: "var(--text-body)" }}>
                    {objective}
                  </p>
                </li>
              ))}
            </ol>

            <h2 className="mt-14 text-2xl font-semibold">Future directions</h2>
            <ul className="mt-6 space-y-3">
              {area.futureDirections.map((direction) => (
                <li key={direction} className="flex gap-3">
                  <ArrowRightIcon className="text-emerald-nrl mt-1 h-4 w-4 shrink-0" />
                  <span className="leading-relaxed" style={{ color: "var(--text-body)" }}>
                    {direction}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:col-span-5">
            <div className="surface-card rounded-2xl p-7">
              <AccentBar />
              <h2 className="mt-5 text-lg font-semibold">Funding</h2>
              <ul className="mt-4 space-y-5">
                {area.funding.map((entry) => (
                  <li key={`${entry.source}-${entry.program}`}>
                    <p className="text-[0.9rem] font-semibold">{entry.source}</p>
                    <p className="mt-1 text-[0.85rem]" style={{ color: "var(--text-body)" }}>
                      {entry.program}
                    </p>
                    <p className="mt-1 text-[0.78rem]" style={{ color: "var(--text-muted)" }}>
                      {entry.period}
                      {entry.note ? ` · ${entry.note}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card rounded-2xl p-7">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <UsersIcon className="text-emerald-nrl h-5 w-5" />
                Collaborators
              </h2>
              <ul className="mt-4 space-y-2.5">
                {area.collaborators.map((collaborator) => (
                  <li
                    key={collaborator}
                    className="text-[0.88rem] leading-snug"
                    style={{ color: "var(--text-body)" }}
                  >
                    {collaborator}
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card rounded-2xl p-7">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <DatabaseIcon className="text-emerald-nrl h-5 w-5" />
                Datasets
              </h2>
              <ul className="mt-4 space-y-4">
                {area.datasets.map((dataset) => (
                  <li key={dataset.name}>
                    <p className="text-[0.9rem] font-semibold">
                      {dataset.href ? (
                        <a
                          href={dataset.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline"
                        >
                          {dataset.name}
                        </a>
                      ) : (
                        <>
                          {dataset.name}{" "}
                          <Badge className="ml-1 align-middle">restricted</Badge>
                        </>
                      )}
                    </p>
                    <p className="mt-1 text-[0.83rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {dataset.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card rounded-2xl p-7">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <CodeIcon className="text-emerald-nrl h-5 w-5" />
                Software
              </h2>
              <ul className="mt-4 space-y-4">
                {area.software.map((tool) => (
                  <li key={tool.name}>
                    <p className="flex items-center gap-2 text-[0.9rem] font-semibold">
                      {tool.href ? (
                        <a
                          href={tool.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline font-mono"
                        >
                          {tool.name}
                        </a>
                      ) : (
                        <span className="font-mono">{tool.name}</span>
                      )}
                      <Badge tone="outline">{tool.license}</Badge>
                    </p>
                    <p className="mt-1 text-[0.83rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {tool.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* Research images */}
      {area.gallery.length > 0 && (
        <Section tone="muted" className="py-16 md:py-20">
          <SectionHeading
            eyebrow="Research images"
            title="From the laboratory"
            action={
              <ButtonLink href="/gallery" variant="outline" arrow="right">
                Full gallery
              </ButtonLink>
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {area.gallery.map((image, index) => (
              <Reveal key={image} delay={index * 70}>
                <figure className="surface-card hover-lift overflow-hidden rounded-2xl">
                  <div className="relative aspect-16/10">
                    <Image
                      src={image}
                      alt={`${area.title} — laboratory imagery`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Current projects */}
      {areaProjects.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Current projects"
            title={`Projects in ${area.title.toLowerCase()}`}
            action={
              <ButtonLink href="/projects" variant="outline" arrow="right">
                All projects
              </ButtonLink>
            }
          />
          <div className="mt-12 grid gap-6">
            {areaProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 60}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Publications */}
      {areaPublications.length > 0 && (
        <Section tone="muted">
          <SectionHeading
            eyebrow="Publications"
            title="Peer-reviewed outputs in this area"
            action={
              <ButtonLink href="/publications" variant="outline" arrow="right">
                Search all publications
              </ButtonLink>
            }
          />
          <div className="mt-12 grid gap-6">
            {areaPublications.map((publication, index) => (
              <Reveal key={publication.id} delay={index * 45}>
                <PublicationCard publication={publication} index={index} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Conference papers */}
      {areaConference.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Conference"
            title="Conference papers in this area"
            action={
              <ButtonLink href="/conference" variant="outline" arrow="right">
                All conference papers
              </ButtonLink>
            }
          />
          <ul className="mt-12 grid gap-4">
            {areaConference.map((paper, index) => (
              <Reveal as="li" key={paper.id} delay={index * 50}>
                <Link
                  href={`/conference#${paper.id}`}
                  className="surface-card hover-lift block rounded-2xl p-6"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge tone="accent">{paper.status}</Badge>
                    <span className="text-[0.75rem]" style={{ color: "var(--text-muted)" }}>
                      {paper.venueShort ?? paper.venue} · {paper.year}
                    </span>
                  </div>
                  <p className="mt-3 text-[1.02rem] leading-snug font-semibold">{paper.title}</p>
                  <p className="mt-2 text-[0.85rem]" style={{ color: "var(--text-muted)" }}>
                    {paper.authors.join(", ")}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {/* Other areas */}
      <Section tone="muted" className="py-16 md:py-20">
        <SectionHeading eyebrow="Continue exploring" title="Other research areas" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((entry) => {
            const OtherIcon = areaIcons[entry.icon];
            return (
              <li key={entry.slug}>
                <Link
                  href={`/research/${entry.slug}`}
                  className="surface-card hover-lift group flex items-center gap-4 rounded-2xl p-5"
                >
                  <span className="bg-emerald-nrl/10 text-emerald-deep dark:text-emerald-soft inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                    <OtherIcon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.95rem] font-semibold">{entry.title}</span>
                    <span
                      className="mt-0.5 block truncate text-[0.8rem]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {entry.short}
                    </span>
                  </span>
                  <ArrowRightIcon className="ml-auto h-4 w-4 shrink-0 opacity-40 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}

function HeaderStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-navy-300">
        {label}
      </dt>
      <dd className="mt-1.5 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
        {value}
      </dd>
    </div>
  );
}
