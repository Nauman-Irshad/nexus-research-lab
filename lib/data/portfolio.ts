import { getPerson, people } from "@/lib/data/people";
import { projects } from "@/lib/data/projects";
import { sortedPublications } from "@/lib/data/publications";

const NAUMAN = "n-shah";

/** Map paper author strings → lab person ids where known. */
const authorToId: Record<string, string> = {
  "nauman irshad ali shah": "n-shah",
  "ahmad arsalan": "a-arsalan",
  "muhammad umer amir": "u-amir",
  "umer amir": "u-amir",
  "ali ahmad": "a-ahmad",
  "danish ali": "d-ali",
  "syed qarib ali naqvi": "q-naqvi",
  "sammra habib": "s-habib",
  "abdul rehman": "a-rehman",
  "ameera arif": "a-arif",
  "asif farooq": "a-farooq",
  "asim irshad": "a-irshad",
};

export type CollaboratorChip = {
  name: string;
  photo?: string;
  linkedin?: string;
  external?: boolean;
};

export function resolveCollaborator(name: string): CollaboratorChip {
  const key = name.replace(/^(Dr\.|Prof\.)\s+/i, "").toLowerCase();
  const id = authorToId[key];
  if (id) {
    const person = getPerson(id);
    if (person) {
      return {
        name: person.name,
        photo: person.photo,
        linkedin: person.links.linkedin,
      };
    }
  }
  return { name, external: true };
}

export const nauman = getPerson(NAUMAN)!;

export const naumanPublications = sortedPublications.filter((pub) =>
  pub.authors.some((author) => /nauman/i.test(author)),
);

export const naumanProjects = projects.filter(
  (project) =>
    project.teamIds.includes(NAUMAN) || project.supervisorId === NAUMAN,
);

export const naumanCertificates = [
  {
    id: "cert-harvardx",
    title: "HarvardX · PredictionX: Omens, Oracles & Prophecies",
    detail:
      "Certificate of completion — HarvardX SOC1.practx (Practice in Prediction / PredictionX).",
    image: "/images/gallery/harvardx-predictionx.png",
    date: "2026",
    kind: "Certificate",
  },
  {
    id: "cert-agri-asia",
    title: "Agri Asia 2026 · Certificate of Participation",
    detail:
      "Certificate awarded to Mr. Nauman Irshad Ali Shah as a delegate at the 19th International Agri Asia Conference (09–11 May 2026).",
    image: "/images/gallery/agri-asia-certificate.jpeg",
    date: "2026",
    kind: "Certificate",
  },
] as const;

export const naumanHighlights = [
  {
    id: "hl-agri-asia",
    title: "Agri Asia 2026 · Crop Disease Detection exhibit",
    detail:
      "Exhibitor at the 19th International Agri Asia & Green Pakistan Exhibition — ResNet50 + Grad-CAM crop disease system.",
    image: "/images/gallery/agri-asia-2026.png",
    kind: "Conference / Exhibition",
    collaboratorNames: [
      "Ali Ahmad",
      "Abdul Rehman",
      "Danish Ali",
      "Muhammad Umer Amir",
    ],
  },
  {
    id: "hl-lcci",
    title: "LCCI · Smart Fitao AI presentation",
    detail:
      "Industry-Academia Linkage presentation to Lahore Chamber of Commerce and Industry leadership via UCP ORIC.",
    image: "/images/gallery/lcci-smart-fitao.png",
    kind: "Presentation",
    collaboratorNames: [
      "Muhammad Umer Amir",
      "Ali Ahmad",
      "Abdul Rehman",
      "Asif Farooq",
      "Asim Irshad",
    ],
  },
] as const;

export function collaboratorsForPublication(authors: string[]) {
  return authors
    .filter((author) => !/nauman/i.test(author))
    .map(resolveCollaborator);
}

export function collaboratorsForProject(teamIds: string[], supervisorId: string) {
  const ids = Array.from(new Set([supervisorId, ...teamIds])).filter(
    (id) => id !== NAUMAN,
  );
  return ids
    .map((id) => getPerson(id))
    .filter(Boolean)
    .map((person) => ({
      name: person!.name,
      photo: person!.photo,
      linkedin: person!.links.linkedin,
    }));
}

/** All unique people who have collaborated with Nauman on papers or projects. */
export function allNaumanCollaborators(): CollaboratorChip[] {
  const map = new Map<string, CollaboratorChip>();

  for (const pub of naumanPublications) {
    for (const chip of collaboratorsForPublication(pub.authors)) {
      map.set(chip.name.toLowerCase(), chip);
    }
  }

  for (const project of naumanProjects) {
    for (const chip of collaboratorsForProject(project.teamIds, project.supervisorId)) {
      map.set(chip.name.toLowerCase(), chip);
    }
    for (const name of project.externalTeam ?? []) {
      if (!map.has(name.toLowerCase())) {
        map.set(name.toLowerCase(), { name, external: true });
      }
    }
  }

  for (const highlight of naumanHighlights) {
    for (const name of highlight.collaboratorNames) {
      const chip = resolveCollaborator(name);
      map.set(chip.name.toLowerCase(), chip);
    }
  }

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export const portfolioStats = {
  papers: naumanPublications.length,
  conferences: naumanPublications.filter((p) => p.type === "conference").length,
  journals: naumanPublications.filter((p) => p.type === "journal").length,
  projects: naumanProjects.length,
  certificates: naumanCertificates.length,
  collaborators: people.filter((p) => p.id !== NAUMAN).length,
};
