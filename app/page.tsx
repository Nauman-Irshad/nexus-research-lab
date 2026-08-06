import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { HomeMosaic } from "@/components/home-mosaic";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { StatBand } from "@/components/stat-band";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { projects } from "@/lib/data/projects";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: `${site.name} — Artificial Intelligence, Cybersecurity & Intelligent Systems`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
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

      <Section tone="inverse">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-emerald-soft!">Join the laboratory</p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Collaborate with Nauman Irshad Lab
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

      <HomeMosaic />
    </>
  );
}
