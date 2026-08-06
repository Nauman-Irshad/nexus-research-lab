import { projects } from "@/lib/data/projects";
import { sortedPublications } from "@/lib/data/publications";

export type UpcomingItem = {
  id: string;
  kind: "Paper" | "Project";
  title: string;
  status: string;
  detail: string;
  href: string;
  image?: string;
  venue?: string;
};

/** Papers and projects currently in progress or awaiting submission decisions. */
export const upcomingWork: UpcomingItem[] = [
  ...sortedPublications
    .filter((paper) => paper.status === "under-review" || paper.status === "accepted")
    .map((paper) => ({
      id: `paper-${paper.id}`,
      kind: "Paper" as const,
      title: paper.title,
      status:
        paper.status === "under-review"
          ? "Submission pending / under review"
          : "Accepted — in press",
      detail: `${paper.type === "conference" ? "Conference" : paper.type === "journal" ? "Journal" : "Manuscript"} · ${paper.venueShort ?? paper.venue} · ${paper.year}`,
      href: `/publications#${paper.id}`,
      image: paper.image,
      venue: paper.venue,
    })),
  ...projects
    .filter((project) => project.status === "Ongoing" || project.status === "Under review")
    .map((project) => ({
      id: `project-${project.id}`,
      kind: "Project" as const,
      title: project.title,
      status:
        project.status === "Under review"
          ? "Under review — linked manuscript pending"
          : "Currently working — ongoing",
      detail: project.summary,
      href: `/projects#${project.id}`,
      image: project.image,
    })),
];

export const upcomingPapers = upcomingWork.filter((item) => item.kind === "Paper");
export const upcomingProjects = upcomingWork.filter((item) => item.kind === "Project");
