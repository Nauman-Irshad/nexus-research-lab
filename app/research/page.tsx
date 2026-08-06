import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { PublicationCard } from "@/components/publication-card";
import { ResearchCard } from "@/components/research-card";
import { Reveal } from "@/components/reveal";
import { ButtonLink, PageHeader, Section, SectionHeading } from "@/components/ui";
import { projects } from "@/lib/data/projects";
import { sortedPublications } from "@/lib/data/publications";
import { researchAreas } from "@/lib/data/research";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Real research from Nexus Research Lab: Digital Twin IDS, PoseDepth-CMP, Smart Fitao AI, crop disease detection, and SAFE feature mining.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="What we have done"
        lead="Only real laboratory work — papers, systems and exhibitions from Nexus Research Lab. No placeholder programmes."
        meta={
          <>
            <Metric value={projects.length} label="Projects" />
            <Metric value={sortedPublications.length} label="Publications" />
            <Metric value={researchAreas.length} label="Active themes" />
          </>
        }
      />

      <Section>
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

      <Section tone="muted">
        <SectionHeading
          eyebrow="Publications"
          title="Papers from the laboratory"
          action={
            <ButtonLink href="/publications" variant="outline" arrow="right">
              Publication database
            </ButtonLink>
          }
        />
        <div className="mt-12 space-y-6">
          {sortedPublications.map((publication, index) => (
            <Reveal key={publication.id} delay={index * 40}>
              <PublicationCard publication={publication} index={index} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Themes"
          title="Where that work sits"
          lead="Themes below are derived from the projects and papers above — not empty research programmes."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((area, index) => (
            <Reveal key={area.slug} delay={(index % 3) * 60}>
              <ResearchCard area={area} priority={index < 3} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/conference" arrow="right">
            Conference papers
          </ButtonLink>
          <a
            href={site.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline self-center text-sm font-medium"
            style={{ color: "var(--text-strong)" }}
          >
            Message us on WhatsApp
          </a>
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
