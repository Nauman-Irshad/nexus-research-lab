import { PageHeader, Section } from "@/components/ui";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export function LegalPage({
  eyebrow,
  title,
  lead,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        meta={
          <p className="text-[0.82rem]" style={{ color: "var(--text-muted)" }}>
            Last updated {updated}
          </p>
        }
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="lg:col-span-4">
            <p
              className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--text-muted)" }}
            >
              On this page
            </p>
            <ol className="mt-4 space-y-2.5 lg:sticky lg:top-28">
              {sections.map((section, index) => (
                <li key={section.heading}>
                  <a
                    href={`#${slug(section.heading)}`}
                    className="link-underline text-[0.88rem]"
                    style={{ color: "var(--text-body)" }}
                  >
                    <span className="mr-2 opacity-50">{String(index + 1).padStart(2, "0")}</span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="lg:col-span-8">
            {sections.map((section) => (
              <section
                key={section.heading}
                id={slug(section.heading)}
                className="scroll-mt-32 border-b py-8 first:pt-0 last:border-0"
              >
                <h2 className="text-xl font-semibold">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 30)}
                    className="mt-4 leading-relaxed"
                    style={{ color: "var(--text-body)" }}
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 leading-relaxed">
                        <span
                          aria-hidden
                          className="bg-emerald-nrl mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        />
                        <span style={{ color: "var(--text-body)" }}>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
