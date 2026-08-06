import Image from "next/image";
import Link from "next/link";
import { CitationActions } from "@/components/citation-actions";
import { CodeIcon, DatabaseIcon, FileIcon, GlobeIcon } from "@/components/icons";
import { Badge } from "@/components/ui";
import { doiUrl, toBibTeX, toIeee } from "@/lib/citation";
import { isLabMember } from "@/lib/data/people";
import { areaTitle } from "@/lib/data/research";
import type { Publication } from "@/lib/types";

const typeLabel: Record<Publication["type"], string> = {
  journal: "Journal paper",
  conference: "Conference paper",
  "book-chapter": "Book chapter",
  preprint: "Preprint",
};

const statusLabel: Record<Publication["status"], string> = {
  published: "Published",
  accepted: "Accepted",
  "under-review": "Under review",
};

export function PublicationCard({
  publication,
  withAbstract = true,
  index = 0,
}: {
  publication: Publication;
  /** @deprecated Images always show beside the title when available. */
  withImage?: boolean;
  withAbstract?: boolean;
  index?: number;
}) {
  const doi = doiUrl(publication.doi);

  return (
    <article
      id={publication.id}
      className="surface-card hover-lift scroll-mt-32 overflow-hidden rounded-2xl p-5 md:p-6"
    >
      <div className="flex gap-4 md:gap-5">
        {publication.image && (
          <div className="relative h-[7.5rem] w-[5.4rem] shrink-0 overflow-hidden rounded-md border border-[var(--border)] bg-white shadow-sm sm:h-[9.5rem] sm:w-[6.8rem]">
            <Image
              src={publication.image}
              alt={`First page of ${publication.title}`}
              fill
              sizes="110px"
              className="object-cover object-top"
              loading={index < 3 ? "eager" : "lazy"}
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">{typeLabel[publication.type]}</Badge>
            <Badge>{statusLabel[publication.status]}</Badge>
            <span
              className="ml-auto font-[family-name:var(--font-display)] text-sm font-semibold"
              style={{ color: "var(--text-muted)" }}
            >
              {publication.year}
            </span>
          </div>

          <h3 className="mt-3 text-[1.02rem] leading-snug font-semibold md:text-lg">
            {doi ? (
              <a href={doi} target="_blank" rel="noopener noreferrer" className="link-underline">
                {publication.title}
              </a>
            ) : (
              publication.title
            )}
          </h3>

          <p className="mt-2.5 text-[0.82rem] leading-relaxed" style={{ color: "var(--text-body)" }}>
            {publication.authors.map((author, position) => (
              <span key={author}>
                <span className={isLabMember(author) ? "font-semibold" : undefined}>{author}</span>
                {position < publication.authors.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>

          <p className="mt-1.5 text-[0.82rem] italic" style={{ color: "var(--text-muted)" }}>
            {publication.venue}
            {publication.volume ? `, vol. ${publication.volume}` : ""}
            {publication.pages ? `, pp. ${publication.pages}` : ""}
            {publication.publisher ? ` · ${publication.publisher}` : ""}
          </p>

          {withAbstract && (
            <details className="group mt-3">
              <summary
                className="hover:text-emerald-deep dark:hover:text-emerald-soft cursor-pointer list-none text-[0.72rem] font-semibold uppercase tracking-[0.12em] transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <span className="group-open:hidden">Read abstract</span>
                <span className="hidden group-open:inline">Hide abstract</span>
              </summary>
              <p
                className="mt-2.5 text-[0.86rem] leading-relaxed"
                style={{ color: "var(--text-body)" }}
              >
                {publication.abstract}
              </p>
              {publication.keywords.length > 0 && (
                <p className="mt-2.5 text-[0.72rem]" style={{ color: "var(--text-muted)" }}>
                  <span className="font-semibold">Keywords: </span>
                  {publication.keywords.join(" · ")}
                </p>
              )}
            </details>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            {doi && (
              <ResourceLink href={doi} icon={<GlobeIcon className="h-3.5 w-3.5" />}>
                DOI
              </ResourceLink>
            )}
            {publication.links?.pdf && (
              <ResourceLink
                href={publication.links.pdf}
                icon={<FileIcon className="h-3.5 w-3.5" />}
              >
                PDF
              </ResourceLink>
            )}
            {publication.links?.github && (
              <ResourceLink
                href={publication.links.github}
                icon={<CodeIcon className="h-3.5 w-3.5" />}
              >
                GitHub
              </ResourceLink>
            )}
            {publication.links?.dataset && (
              <ResourceLink
                href={publication.links.dataset}
                icon={<DatabaseIcon className="h-3.5 w-3.5" />}
              >
                Dataset
              </ResourceLink>
            )}
            <CitationActions
              bibtex={toBibTeX(publication)}
              citation={toIeee(publication)}
              compact
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t pt-3">
            {publication.areas.map((area) => (
              <Link
                key={area}
                href={`/research/${area}`}
                className="hover:border-emerald-nrl hover:text-emerald-deep dark:hover:text-emerald-soft rounded-full border px-2.5 py-1 text-[0.68rem] font-medium transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                {areaTitle(area)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function ResourceLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="hover:border-emerald-nrl hover:text-emerald-deep dark:hover:text-emerald-soft inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.72rem] font-medium transition-colors duration-300"
      style={{ color: "var(--text-strong)" }}
    >
      {icon}
      {children}
    </a>
  );
}
