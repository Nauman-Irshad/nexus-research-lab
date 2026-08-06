import type { Metadata } from "next";
import { NewsTimeline } from "@/components/news-timeline";
import { ButtonLink, PageHeader, Section } from "@/components/ui";
import { newsCategories, newsSorted } from "@/lib/data/news";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "News",
  description:
    "Timeline of awards, paper acceptances, conference participation, invited talks, workshops, collaborations, funding and media coverage at Nauman Irshad Lab.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const thisYear = new Date().getUTCFullYear();
  const countThisYear = newsSorted.filter(
    (item) => new Date(item.date).getUTCFullYear() === thisYear,
  ).length;

  return (
    <>
      <PageHeader
        eyebrow="News"
        title="Laboratory timeline"
        lead="Paper acceptances, awards, conference participation, invited talks, workshops, new collaborations, funding decisions and media coverage — in one chronological record."
        meta={
          <>
            <Metric value={newsSorted.length} label="Entries on record" />
            <Metric value={countThisYear} label={`Updates in ${thisYear}`} />
            <Metric value={newsCategories.length} label="Categories" />
          </>
        }
      />

      <Section>
        <NewsTimeline items={newsSorted} categories={[...newsCategories]} />
      </Section>

      <Section tone="muted" className="py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <p className="eyebrow">Media and press</p>
            <h2 className="mt-3 text-2xl font-semibold md:text-[1.9rem]">
              Writing about our work?
            </h2>
            <p className="mt-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              We are glad to provide technical background, review a draft for accuracy or arrange an
              interview with the researchers involved. Logos and imagery are available on request.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <ButtonLink href={`mailto:${site.contact.email}`} arrow="right">
              Media enquiries
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
