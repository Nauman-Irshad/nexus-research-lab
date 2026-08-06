import { people } from "@/lib/data/people";
import { projects } from "@/lib/data/projects";
import { publications } from "@/lib/data/publications";
import { collaborationPartners } from "@/lib/data/site";

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
  { label: "Research Projects", value: projects.length, note: "Funded and internal projects" },
  {
    label: "Faculty Members",
    value: byGroup("director", "co-director", "faculty", "affiliate-faculty", "visiting-faculty"),
    note: "Core, affiliate and visiting faculty",
  },
  {
    label: "Research Associates",
    value: byGroup("research-associate"),
    note: "Full-time research staff",
  },
  {
    label: "Research Assistants",
    value: byGroup("research-assistant"),
    note: "Graduate and undergraduate assistants",
  },
  {
    label: "Students",
    value: byGroup("phd", "ms", "intern"),
    note: "PhD, MS and intern researchers",
  },
  {
    label: "International Collaborations",
    value: collaborationPartners.length,
    note: "Partner institutions and groups",
  },
];

export const bookChapters = byType("book-chapter");
