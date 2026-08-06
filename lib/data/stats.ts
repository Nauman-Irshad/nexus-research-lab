import { people } from "@/lib/data/people";
import { projects } from "@/lib/data/projects";
import { publications } from "@/lib/data/publications";

const byType = (type: string) => publications.filter((item) => item.type === type).length;
const byGroup = (...groups: string[]) =>
  people.filter((person) => groups.includes(person.group)).length;

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  note: string;
}

/**
 * Every figure is derived from the content files, so the counters on the home
 * page can never drift away from the actual record.
 */
export const stats: Stat[] = [
  {
    label: "Publications",
    value: publications.length,
    note: "Peer-reviewed papers and chapters",
  },
  { label: "Journal Papers", value: byType("journal"), note: "Indexed journal articles" },
  {
    label: "Conference Papers",
    value: byType("conference"),
    note: "Peer-reviewed conference papers",
  },
  { label: "Research Projects", value: projects.length, note: "Student–teacher projects" },
  {
    label: "Teachers",
    value: byGroup("director", "co-director", "faculty", "affiliate-faculty", "visiting-faculty"),
    note: "Teachers and faculty advisors",
  },
  {
    label: "Research Assistants",
    value: byGroup("research-assistant"),
    note: "Student research assistants",
  },
  {
    label: "Students",
    value: byGroup("phd", "ms", "intern", "director"),
    note: "Student researchers",
  },
];

export const bookChapters = byType("book-chapter");
