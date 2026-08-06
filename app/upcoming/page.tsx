import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge, ButtonLink, PageHeader, Section, SectionHeading } from "@/components/ui";
import { upcomingPapers, upcomingProjects, upcomingWork } from "@/lib/data/upcoming";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Upcoming Work",
  description:
    "Papers under review and projects currently in progress at Nexus Research Lab — submission pending manuscripts and ongoing builds.",
  alternates: { canonical: "/upcoming" },
};

export default function UpcomingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Upcoming Work"
        title="What we are working on now"
        lead="Submission-pending papers and ongoing projects — the active pipeline of Nexus Research Lab."
        meta={
          <>
            <Metric value={upcomingPapers.length} label="Papers pending / under review" />
            <Metric value={upcomingProjects.length} label="Projects in progress" />
            <Metric value={upcomingWork.length} label="Total active items" />
          </>
        }
      />

      <Section>
        <SectionHeading
          eyebrow="Papers"
          title="Conference & journal — submission pending"
          lead="Manuscripts submitted or under review. Decisions are pending."
        />
        <ul className="mt-10 space-y-5">
          {upcomingPapers.map((item) => (
            <UpcomingRow key={item.id} item={item} />
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Projects"
          title="Projects currently in progress"
          lead="Systems and research stacks we are still building or revising."
        />
        <ul className="mt-10 space-y-5">
          {upcomingProjects.map((item) => (
            <UpcomingRow key={item.id} item={item} />
          ))}
        </ul>
      </Section>

      <Section tone="inverse">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-emerald-soft!">Follow along</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Questions about a submission or collaboration?
            </h2>
          </div>
          <ButtonLink href={site.contact.whatsapp} variant="accent" arrow="up-right">
            WhatsApp
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

function UpcomingRow({
  item,
}: {
  item: (typeof upcomingWork)[number];
}) {
  return (
    <li className="surface-card overflow-hidden rounded-2xl">
      <Link href={item.href} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start md:p-6">
        {item.image && (
          <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-44">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="180px"
              className="object-cover object-top"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-2">
            <Badge tone="accent">{item.kind}</Badge>
            <Badge>{item.status}</Badge>
          </div>
          <h3 className="mt-3 text-lg leading-snug font-semibold">{item.title}</h3>
          <p className="mt-2 text-[0.9rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {item.detail}
          </p>
          {item.venue && (
            <p className="mt-2 text-[0.82rem] italic" style={{ color: "var(--text-muted)" }}>
              {item.venue}
            </p>
          )}
        </div>
      </Link>
    </li>
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
