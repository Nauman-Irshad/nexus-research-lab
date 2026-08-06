import type { Metadata } from "next";
import { CollectionExplorer, type ExplorerItem } from "@/components/collection-explorer";
import { PublicationCard } from "@/components/publication-card";
import { ButtonLink, PageHeader, Section, SectionHeading } from "@/components/ui";
import {
  publicationVenues,
  publicationYears,
  sortedPublications,
} from "@/lib/data/publications";
import { researchAreas } from "@/lib/data/research";
import { site } from "@/lib/data/site";
import { bookChapters, stats } from "@/lib/data/stats";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Searchable database of Nauman Irshad Lab publications: journal papers, conference papers and book chapters, with DOI, PDF, BibTeX, code and dataset links.",
  alternates: { canonical: "/publications" },
};

const typeOptions = [
  { value: "journal", label: "Journal papers" },
  { value: "conference", label: "Conference papers" },
  { value: "book-chapter", label: "Book chapters" },
];

const statusOptions = [
  { value: "published", label: "Published" },
  { value: "accepted", label: "Accepted" },
  { value: "under-review", label: "Under review" },
];

export default function PublicationsPage() {
  const items: ExplorerItem[] = sortedPublications.map((publication, index) => ({
    id: publication.id,
    node: <PublicationCard publication={publication} index={index} />,
    searchText: [
      publication.title,
      publication.authors.join(" "),
      publication.venue,
      publication.venueShort ?? "",
      publication.keywords.join(" "),
      publication.abstract,
      String(publication.year),
      publication.doi ?? "",
    ]
      .join(" ")
      .toLowerCase(),
    facets: {
      type: [publication.type],
      status: [publication.status],
      year: [String(publication.year)],
      area: publication.areas,
      venue: [publication.venueShort ?? publication.venue],
    },
    sortValues: {
      "year-desc": publication.year * 10000 + index,
      "year-asc": publication.year * 10000 + index,
    },
  }));

  const countBy = (key: string, value: string) =>
    items.filter((item) => (item.facets[key] ?? []).includes(value)).length;

  const publicationsStat = stats.find((stat) => stat.label === "Publications");

  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="Publication database"
        lead="Every peer-reviewed output of the laboratory, with abstracts, keywords, identifiers and links to the code and data required to reproduce the results."
        meta={
          <>
            <Metric value={publicationsStat?.value ?? sortedPublications.length} label="Total records" />
            <Metric value={countBy("type", "journal")} label="Journal papers" />
            <Metric value={countBy("type", "conference")} label="Conference papers" />
            <Metric value={bookChapters} label="Book chapters" />
            <Metric value={publicationYears[publicationYears.length - 1] ?? 0} label="Earliest year" />
          </>
        }
      />

      <Section>
        <SectionHeading
          eyebrow="Search and filter"
          title="Find a paper by author, year, keyword, venue or research area"
          lead="Filters combine: selecting two types shows both, while adding a year narrows the result set. Everything runs locally in your browser."
          action={
            <ButtonLink href="/conference" variant="outline" arrow="right">
              Conference
            </ButtonLink>
          }
        />

        <div className="mt-12">
          <CollectionExplorer
            items={items}
            unit="publications"
            searchLabel="Search by author, year, keyword, journal or conference"
            searchPlaceholder="e.g. Khan 2026, calibration, IEEE TIFS, digital twin"
            searchHint="Multiple terms are combined — “khan drift” matches records containing both."
            sorts={[
              { key: "year-desc", label: "Newest first", direction: "desc" },
              { key: "year-asc", label: "Oldest first", direction: "asc" },
            ]}
            facets={[
              {
                key: "type",
                label: "Publication type",
                options: typeOptions.map((option) => ({
                  ...option,
                  count: countBy("type", option.value),
                })),
              },
              {
                key: "status",
                label: "Status",
                options: statusOptions
                  .map((option) => ({ ...option, count: countBy("status", option.value) }))
                  .filter((option) => option.count > 0),
              },
              {
                key: "year",
                label: "Year",
                options: publicationYears.map((year) => ({
                  value: String(year),
                  label: String(year),
                  count: countBy("year", String(year)),
                })),
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
                key: "venue",
                label: "Journal or conference",
                options: publicationVenues.map((venue) => ({
                  value: venue,
                  label: venue,
                  count: countBy("venue", venue),
                })),
              },
            ]}
            emptyTitle="No publications match those filters"
            emptyBody="Clear a filter or search for an author surname, a venue abbreviation or a keyword."
          />
        </div>
      </Section>

      <Section tone="muted" className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">Citing our work</p>
            <h2 className="mt-3 text-2xl font-semibold md:text-[1.9rem]">
              BibTeX and formatted references are available on every record
            </h2>
            <p className="mt-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Use the <strong>Cite</strong> button for an IEEE-style reference or{" "}
              <strong>BibTeX</strong> to copy a ready-to-paste entry. If a PDF is not available for
              licensing reasons, email us and we will send the author copy.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <ButtonLink href={`mailto:${site.contact.email}`} arrow="right">
              Request an author copy
            </ButtonLink>
            <ButtonLink href={site.social.linkedin} variant="outline" arrow="up-right">
              LinkedIn profile
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
