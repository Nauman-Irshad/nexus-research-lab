import type { Metadata } from "next";
import { PublicationCard } from "@/components/publication-card";
import { Reveal } from "@/components/reveal";
import { PageHeader, Section, SectionHeading } from "@/components/ui";
import { sortedPublications } from "@/lib/data/publications";

export const metadata: Metadata = {
  title: "Conference",
  description:
    "Conference papers and manuscripts from Nexus Research Lab — CXG-DT, CARE-GATE, PoseDepth-CMP and related submissions.",
  alternates: { canonical: "/conference" },
};

export default function ConferencePage() {
  const conferencePapers = sortedPublications.filter((item) => item.type === "conference");

  return (
    <>
      <PageHeader
        eyebrow="Conference"
        title="Conference papers"
        lead="All conference manuscripts from the laboratory — under review and submitted — in one place."
        meta={
          <>
            <Metric value={conferencePapers.length} label="Conference papers" />
            <Metric
              value={conferencePapers.filter((item) => item.status === "under-review").length}
              label="Under review"
            />
          </>
        }
      />

      <Section>
        <SectionHeading
          eyebrow="Manuscripts"
          title="All conference papers"
          lead="Digital Twin intrusion response, computer vision and related conference work."
        />

        <div className="mt-10 space-y-6">
          {conferencePapers.map((publication, index) => (
            <Reveal key={publication.id} delay={index * 50}>
              <PublicationCard publication={publication} index={index} />
            </Reveal>
          ))}
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
