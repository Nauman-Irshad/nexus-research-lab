import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { PublicationCard } from "@/components/publication-card";
import { Reveal } from "@/components/reveal";
import { StatBand } from "@/components/stat-band";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { projects } from "@/lib/data/projects";
import { sortedPublications } from "@/lib/data/publications";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: `${site.name} — Artificial Intelligence, Cybersecurity & Intelligent Systems`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const latestPublications = sortedPublications.slice(0, 5);

  return (
    <>
      <Hero />

      <Section id="projects">
        <SectionHeading
          eyebrow="Projects"
          title="Systems and studies we built"
          lead="Each item below is work the laboratory has actually delivered or submitted."
          action={
            <ButtonLink href="/projects" variant="outline" arrow="right">
              All projects
            </ButtonLink>
          }
        />
        <div className="mt-12 space-y-8">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 40}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </Section>

      <StatBand />

      <Section id="publications" tone="muted">
        <SectionHeading
          eyebrow="Latest publications"
          title="Recent work from the laboratory"
          lead="Papers are released with code, data and evaluation protocols wherever licensing permits."
          action={
            <ButtonLink href="/publications" variant="outline" arrow="right">
              Publication database
            </ButtonLink>
          }
        />
        <div className="mt-14 grid gap-6">
          {latestPublications.map((publication, index) => (
            <Reveal key={publication.id} delay={index * 45}>
              <PublicationCard publication={publication} index={index} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="inverse">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-emerald-soft!">Join the laboratory</p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Collaborate with Nexus Research Lab
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={site.contact.whatsapp} variant="accent" arrow="up-right">
              Join Us
            </ButtonLink>
            <ButtonLink
              href="/upcoming"
              variant="outline"
              className="border-white/25 text-white! hover:border-white/70"
            >
              Upcoming Work
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
