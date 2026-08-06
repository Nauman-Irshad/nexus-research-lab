export type ResearchAreaSlug =
  | "artificial-intelligence"
  | "machine-learning"
  | "deep-learning"
  | "computer-vision"
  | "digital-twin"
  | "cybersecurity"
  | "intrusion-detection"
  | "iot-security"
  | "medical-ai"
  | "explainable-ai"
  | "natural-language-processing"
  | "data-science";

export type IconName =
  | "network"
  | "layers"
  | "cube"
  | "eye"
  | "twin"
  | "shield"
  | "radar"
  | "chip"
  | "pulse"
  | "lens"
  | "language"
  | "chart";

export interface ResearchArea {
  slug: ResearchAreaSlug;
  title: string;
  short: string;
  description: string;
  icon: IconName;
  image: string;
  overview: string[];
  objectives: string[];
  datasets: { name: string; description: string; href?: string }[];
  software: { name: string; description: string; href?: string; license: string }[];
  collaborators: string[];
  funding: { source: string; program: string; period: string; note?: string }[];
  futureDirections: string[];
  gallery: string[];
}

export type PublicationType = "journal" | "conference" | "book-chapter" | "preprint";
export type PublicationStatus = "published" | "accepted" | "under-review";

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  type: PublicationType;
  status: PublicationStatus;
  venue: string;
  venueShort?: string;
  volume?: string;
  pages?: string;
  publisher?: string;
  doi?: string;
  arxiv?: string;
  abstract: string;
  keywords: string[];
  areas: ResearchAreaSlug[];
  links?: {
    pdf?: string;
    github?: string;
    dataset?: string;
  };
  image?: string;
  featured?: boolean;
}

export interface Preprint {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  submitted: string;
  status: "Under review" | "Revision submitted" | "Accepted (in press)" | "Community preprint";
  version: string;
  server: string;
  identifier: string;
  areas: ResearchAreaSlug[];
  keywords: string[];
  links?: {
    pdf?: string;
    github?: string;
    dataset?: string;
  };
  relatedPublicationIds?: string[];
}

export type PersonGroup =
  | "director"
  | "co-director"
  | "faculty"
  | "affiliate-faculty"
  | "visiting-faculty"
  | "postdoc"
  | "phd"
  | "ms"
  | "research-associate"
  | "research-assistant"
  | "intern"
  | "alumni";

export interface Person {
  id: string;
  name: string;
  role: string;
  group: PersonGroup;
  affiliation: string;
  /** How this person is associated with Nauman Irshad Lab. */
  association: string;
  interests: string[];
  bio: string;
  photo?: string;
  links: {
    email?: string;
    linkedin?: string;
    scholar?: string;
    researchgate?: string;
    github?: string;
    orcid?: string;
    website?: string;
  };
  /** Alumni only */
  alumniNote?: string;
}

export type ProjectStatus = "Ongoing" | "Completed" | "Under review" | "Planned";

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  /** Primary research area. */
  area: ResearchAreaSlug;
  /** Additional areas the project contributes to. */
  relatedAreas?: ResearchAreaSlug[];
  fundingAgency?: string;
  supervisorId: string;
  teamIds: string[];
  externalTeam?: string[];
  start: string;
  end: string;
  status: ProjectStatus;
  stack: string[];
  publicationIds: string[];
  image: string;
  links?: {
    github?: string;
    demo?: string;
    dataset?: string;
  };
}

export type NewsCategory =
  | "Paper Acceptance"
  | "Award"
  | "Conference"
  | "Invited Talk"
  | "Workshop"
  | "Collaboration"
  | "Media Coverage"
  | "Funding"
  | "Seminar";

export interface NewsItem {
  id: string;
  date: string;
  category: NewsCategory;
  title: string;
  body: string;
  link?: { label: string; href: string };
  image?: string;
}

export type GalleryCategory =
  | "Lab"
  | "Research Meetings"
  | "Conference Photos"
  | "Workshops"
  | "Presentations"
  | "Team Activities"
  | "Achievements";

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  image: string;
  date: string;
}
