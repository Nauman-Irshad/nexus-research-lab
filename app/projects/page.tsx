import type { Metadata } from "next";
import { CollectionExplorer, type ExplorerItem } from "@/components/collection-explorer";
import { ProjectCard } from "@/components/project-card";
import { ButtonLink, PageHeader, Section, SectionHeading } from "@/components/ui";
import { getPerson } from "@/lib/data/people";
import { projects, projectStatuses } from "@/lib/data/projects";
import { researchAreas } from "@/lib/data/research";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Research projects at Nauman Irshad Lab — independent student–teacher work with supervisors, teams, timelines, stacks, repositories and publications.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const items: ExplorerItem[] = projects.map((project, index) => {
    const supervisor = getPerson(project.supervisorId);
    const team = project.teamIds.map((id) => getPerson(id)?.name ?? "").join(" ");

    return {
      id: project.id,
      node: <ProjectCard project={project} index={index} />,
      searchText: [
        project.title,
        project.summary,
        project.description,
        supervisor?.name ?? "",
        team,
        project.stack.join(" "),
        project.status,
      ]
        .join(" ")
        .toLowerCase(),
      facets: {
        area: [project.area],
        status: [project.status],
        stack: project.stack,
      },
      sortValues: { order: projects.length - index },
    };
  });

  const countBy = (key: string, value: string) =>
    items.filter((item) => (item.facets[key] ?? []).includes(value)).length;

  const ongoing = projects.filter((project) => project.status === "Ongoing").length;
  const uniqueStack = Array.from(new Set(projects.flatMap((project) => project.stack))).sort();

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Research projects"
        lead="Each project has a named supervisor, a student lead and a defined artefact release. Timelines, funding sources and technology choices are documented openly."
        meta={
          <>
            <Metric value={projects.length} label="Projects on record" />
            <Metric value={ongoing} label="Currently running" />
            <Metric value={researchAreas.length} label="Research areas covered" />
            <Metric value={uniqueStack.length} label="Tools in active use" />
          </>
        }
      />

      <Section>
        <SectionHeading
          eyebrow="Portfolio"
          title="Filter by research area, status or technology"
          lead="Project records link directly to the publications, repositories and datasets they produced."
          action={
            <ButtonLink href="/research" variant="outline" arrow="right">
              Research areas
            </ButtonLink>
          }
        />

        <div className="mt-12">
          <CollectionExplorer
            items={items}
            unit="projects"
            searchLabel="Search by title, supervisor, team member, funder or tool"
            searchPlaceholder="e.g. digital twin, federated, PyTorch, Farooq"
            facets={[
              {
                key: "status",
                label: "Status",
                options: projectStatuses
                  .map((status) => ({
                    value: status,
                    label: status,
                    count: countBy("status", status),
                  }))
                  .filter((option) => option.count > 0),
              },
              {
                key: "area",
                label: "Research area",
                options: researchAreas
                  .map((area) => ({
                    value: area.slug,
                    label: area.title,
                    count: countBy("area", area.slug),
                  }))
                  .filter((option) => option.count > 0),
              },
              {
                key: "stack",
                label: "Technology",
                options: uniqueStack
                  .map((tech) => ({ value: tech, label: tech, count: countBy("stack", tech) }))
                  .filter((option) => option.count > 1),
              },
            ]}
            emptyTitle="No projects match those filters"
            emptyBody="Try a broader technology filter or clear the research area selection."
          />
        </div>
      </Section>

      <Section tone="inverse" className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow text-emerald-soft!">Project proposals</p>
            <h2 className="mt-3 text-2xl font-semibold text-white md:text-[1.9rem]">
              Have a dataset, a testbed or a problem you want studied?
            </h2>
            <p className="mt-4 leading-relaxed text-navy-100">
              We take on a small number of externally proposed projects each year, particularly where
              a partner can provide operational data or hardware access under a documented
              agreement.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <ButtonLink href={site.contact.whatsapp} variant="accent" arrow="up-right">
              Join Us on WhatsApp
            </ButtonLink>
            <ButtonLink
              href={`mailto:${site.contact.collaborations}`}
              variant="outline"
              className="border-white/25 text-white! hover:border-white/70"
            >
              Email us
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
