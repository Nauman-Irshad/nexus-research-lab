import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, PageHeader, Section } from "@/components/ui";
import { people } from "@/lib/data/people";
import { site } from "@/lib/data/site";
import { initials, seededValue } from "@/lib/utils";

export const metadata: Metadata = {
  title: "People",
  description: "Members of Nexus Research Lab — LinkedIn profiles and bios.",
  alternates: { canonical: "/people" },
};

export default function PeoplePage() {
  return (
    <>
      <PageHeader
        eyebrow="People"
        title="Laboratory members"
        lead="Names, photos and LinkedIn bios."
      />

      <Section className="py-10 md:py-14">
        <ul className="mx-auto max-w-3xl">
          {people.map((person) => {
            const href = person.links.linkedin;
            const hue = seededValue(person.id);
            const angle = Math.round(120 + hue * 110);

            return (
              <li
                key={person.id}
                className="flex gap-4 border-b border-[var(--border)] py-5 first:pt-0 last:border-b-0"
              >
                <span className="relative mt-0.5 h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  {person.photo ? (
                    <Image
                      src={person.photo}
                      alt=""
                      width={56}
                      height={56}
                      sizes="56px"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex h-full w-full items-center justify-center text-[0.75rem] font-semibold text-white"
                      style={{
                        backgroundImage: `linear-gradient(${angle}deg, #0B1F3A 0%, #133055 55%, #00A86B 145%)`,
                      }}
                    >
                      {initials(person.name)}
                    </span>
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[1.08rem] font-semibold tracking-tight transition-colors hover:text-[var(--emerald)]"
                    >
                      {person.name}
                    </a>
                  ) : (
                    <span className="text-[1.08rem] font-semibold tracking-tight">
                      {person.name}
                    </span>
                  )}

                  <p
                    className="mt-1.5 text-[0.9rem] leading-relaxed"
                    style={{ color: "var(--text-body)" }}
                  >
                    {person.bio}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="inverse">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-emerald-soft!">Openings</p>
            <h2 className="mt-3 text-3xl leading-tight font-semibold text-white md:text-[2.3rem]">
              Research assistant and internship positions open each semester
            </h2>
            <p className="mt-5 leading-relaxed text-navy-100">
              Message us on WhatsApp if you want to join the laboratory.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink href={site.contact.whatsapp} variant="accent" arrow="up-right">
              Join Us
            </ButtonLink>
            <ButtonLink
              href={`mailto:${site.contact.admissions}`}
              variant="outline"
              className="border-white/25 text-white! hover:border-white/70"
            >
              Email the lab
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
