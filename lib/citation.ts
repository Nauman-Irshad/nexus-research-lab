import type { Preprint, Publication } from "@/lib/types";

const entryType: Record<Publication["type"], string> = {
  journal: "article",
  conference: "inproceedings",
  "book-chapter": "incollection",
  preprint: "misc",
};

function bibAuthors(authors: string[]) {
  return authors.join(" and ");
}

export function toBibTeX(publication: Publication) {
  const type = entryType[publication.type];
  const fields: [string, string | undefined][] = [
    ["title", `{${publication.title}}`],
    ["author", bibAuthors(publication.authors)],
    ["year", String(publication.year)],
    [publication.type === "journal" ? "journal" : "booktitle", publication.venue],
    ["volume", publication.volume],
    ["pages", publication.pages],
    ["publisher", publication.publisher],
    ["doi", publication.doi],
    ["keywords", publication.keywords.join(", ")],
  ];

  const body = fields
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `  ${key} = {${value!.replace(/^\{|\}$/g, "")}}`)
    .join(",\n");

  return `@${type}{${publication.id},\n${body}\n}`;
}

/** IEEE-style reference string, the convention used across the laboratory. */
export function toIeee(publication: Publication) {
  const authors = publication.authors
    .map((name) => {
      const parts = name.replace(/^(Dr\.|Prof\.)\s+/i, "").split(/\s+/);
      const last = parts.pop() ?? name;
      const initialsPart = parts.map((part) => `${part[0]}.`).join(" ");
      return initialsPart ? `${initialsPart} ${last}` : last;
    })
    .join(", ");

  const bits = [
    `${authors}, "${publication.title},"`,
    `${publication.venue}`,
    publication.volume ? `vol. ${publication.volume}` : undefined,
    publication.pages ? `pp. ${publication.pages}` : undefined,
    String(publication.year),
  ].filter(Boolean);

  const base = `${bits.join(", ")}.`;
  return publication.doi ? `${base} doi: ${publication.doi}.` : base;
}

export function preprintCitation(preprint: Preprint) {
  const authors = preprint.authors.join(", ");
  const year = new Date(preprint.submitted).getUTCFullYear();
  return `${authors}, "${preprint.title}," ${preprint.server} preprint ${preprint.identifier}, ${year}.`;
}

export function doiUrl(doi?: string) {
  return doi ? `https://doi.org/${doi}` : undefined;
}
