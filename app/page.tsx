import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { NewsCard } from "@/components/news-card";
import { PublicationCard } from "@/components/publication-card";
import { ResearchCard } from "@/components/research-card";
import { Reveal } from "@/components/reveal";
import { StatBand } from "@/components/stat-band";
import { AccentBar, ButtonLink, Section, SectionHeading } from "@/components/ui";
import { newsSorted } from "@/lib/data/news";
import { sortedPublications } from "@/lib/data/publications";
import { researchAreas } from "@/lib/data/research";
import { collaborationPartners, site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: `${site.name} — Artificial Intelligence, Cybersecurity & Intelligent Systems`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const latestPublications = sortedPublications.slice(0, 5);
  const latestNews = newsSorted.slice(0, 3);

  return (
    <>
      <Hero />
      <StatBand />

      {/* Mission & vision */}
      <Section id="mission">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Who we are</p>
            <h2 className="mt-3 text-3xl leading-[1.15] font-semibold md:text-[2.6rem]">
              An independent laboratory built around students who want to do real research
            </h2>
            <p className="mt-6 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Nexus Research Lab is a collaborative research group rather than a department. Faculty
              members, postdoctoral researchers and students work on the same problems, publish
              together, and release the code and data behind every claim. Membership is open to
              researchers from any institution whose interests overlap with ours.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/people" arrow="right">
                Meet the team
              </ButtonLink>
              <ButtonLink href={site.contact.whatsapp} variant="outline" arrow="up-right">
                Join Us on WhatsApp
              </ButtonLink>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:col-span-7">
            <Reveal delay={80}>
              <article className="surface-card hover-lift rounded-2xl p-8">
                <AccentBar />
                <h3 className="mt-5 text-xl font-semibold">Mission</h3>
                <p className="mt-3 leading-relaxed" style={{ color: "var(--text-body)" }}>
                  {site.mission}
                </p>
              </article>
            </Reveal>
            <Reveal delay={160}>
              <article className="surface-card hover-lift rounded-2xl p-8">
                <AccentBar />
                <h3 className="mt-5 text-xl font-semibold">Vision</h3>
                <p className="mt-3 leading-relaxed" style={{ color: "var(--text-body)" }}>
                  {site.vision}
                </p>
              </article>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {site.values.map((value, index) => (
            <Reveal
              key={value.title}
              delay={index * 60}
              className="bg-[var(--surface-muted)] p-7"
            >
              <h3 className="text-[0.98rem] font-semibold">{value.title}</h3>
              <p
                className="mt-2.5 text-[0.86rem] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {value.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Featured research */}
      <Section id="research" tone="muted">
        <SectionHeading
          eyebrow="Our research"
          title="Work the laboratory has actually delivered"
          lead="Digital Twin IDS, computer vision, deep learning for agriculture, and NLP feature mining — grounded in our papers and demos."
          action={
            <ButtonLink href="/research" variant="outline" arrow="right">
              See all our work
            </ButtonLink>
          }
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((area, index) => (
            <Reveal key={area.slug} delay={(index % 3) * 70}>
              <ResearchCard area={area} priority={index < 3} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Latest publications */}
      <Section id="publications">
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
              <PublicationCard publication={publication} index={index} withImage />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Collaborations */}
      <Section tone="inverse">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-emerald-soft!">International collaborations</p>
            <h2 className="mt-3 text-3xl leading-[1.15] font-semibold text-white md:text-[2.4rem]">
              We work with groups who hold us to a higher standard
            </h2>
            <p className="mt-6 leading-relaxed text-navy-100">
              Joint supervision, shared testbeds and reciprocal research visits keep the laboratory
              connected to the wider community. Partner institutions co-author papers and co-fund
              student positions.
            </p>
            <div className="mt-9">
              <ButtonLink
                href={site.contact.whatsapp}
                variant="outline"
                className="border-white/25 text-white! hover:border-white/70"
                arrow="up-right"
              >
                Join Us on WhatsApp
              </ButtonLink>
            </div>
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2 lg:col-span-7">
            {collaborationPartners.map((partner, index) => (
              <Reveal
                key={partner}
                as="li"
                delay={index * 40}
                className="bg-white/[0.04] px-6 py-5 text-[0.88rem] leading-snug text-navy-100 transition-colors duration-500 hover:bg-white/[0.09]"
              >
                {partner}
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Recent news */}
      <Section id="news" tone="muted">
        <SectionHeading
          eyebrow="Recent news"
          title="Awards, papers, talks and workshops"
          lead="A running record of what the laboratory has published, presented and hosted."
          action={
            <ButtonLink href="/news" variant="outline" arrow="right">
              Full timeline
            </ButtonLink>
          }
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {latestNews.map((item, index) => (
            <Reveal key={item.id} delay={index * 70}>
              <NewsCard item={item} index={index} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Closing call to action */}
      <Section>
        <Reveal className="bg-navy-700 relative overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(700px 320px at 50% -10%, rgba(0,168,107,0.28), transparent 62%), radial-gradient(600px 300px at 85% 110%, rgba(76,101,145,0.32), transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="grid-lines pointer-events-none absolute inset-0 opacity-[0.06]"
          />
          <div className="relative">
            <p className="eyebrow text-emerald-soft!">Join the laboratory</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl leading-[1.15] font-semibold text-white md:text-[2.5rem]">
              Looking for a research group that will put your name on the paper?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-navy-100">
              We accept a small number of research assistants, interns and visiting collaborators
              each semester. Applications are reviewed by the group whose work you want to join.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href={site.contact.whatsapp} variant="accent" arrow="up-right">
                Join Us
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="outline"
                className="border-white/25 text-white! hover:border-white/70"
              >
                Contact the lab
              </ButtonLink>
            </div>
            <p className="mt-8 text-[0.8rem] text-navy-200">
              Prefer email?{" "}
              <Link
                href={`mailto:${site.contact.collaborations}`}
                className="link-underline text-white"
              >
                {site.contact.collaborations}
              </Link>
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
