import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import {
  GitHubIcon,
  GlobeIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";
import { AccentBar, PageHeader, Section, SectionHeading } from "@/components/ui";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Nauman Irshad Lab: laboratory address, email, telephone, map, social and academic profiles, and a direct enquiry form.",
  alternates: { canonical: "/contact" },
};

const profiles = [
  { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: site.social.github, Icon: GitHubIcon },
];

const contactRoutes = [
  {
    label: "General enquiries",
    email: site.contact.email,
    note: "Questions about the laboratory, papers, datasets or code.",
  },
  {
    label: "Research collaborations",
    email: site.contact.collaborations,
    note: "Joint projects, co-supervision, visiting researchers and partnerships.",
  },
  {
    label: "Students and interns",
    email: site.contact.admissions,
    note: "Research assistant, internship and thesis supervision enquiries.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch with the laboratory"
        lead="Whether you want to collaborate, join as a student researcher, request a dataset or ask about a paper, write to the address below and we will route your message to the right group."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Laboratory</p>
            <h2 className="mt-3 text-2xl font-semibold">{site.legalName}</h2>

            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <span className="bg-emerald-nrl/10 text-emerald-deep dark:text-emerald-soft inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
                    Address
                  </p>
                  <address className="mt-1.5 text-[0.92rem] leading-relaxed not-italic" style={{ color: "var(--text-body)" }}>
                    {site.contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-nrl/10 text-emerald-deep dark:text-emerald-soft inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <MailIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
                    Email
                  </p>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="link-underline mt-1.5 block text-[0.92rem]"
                    style={{ color: "var(--text-strong)" }}
                  >
                    {site.contact.email}
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-nrl/10 text-emerald-deep dark:text-emerald-soft inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
                    Telephone
                  </p>
                  <a
                    href={site.contact.phoneHref}
                    className="link-underline mt-1.5 block text-[0.92rem]"
                    style={{ color: "var(--text-strong)" }}
                  >
                    {site.contact.phone}
                  </a>
                  <p className="mt-1 text-[0.8rem]" style={{ color: "var(--text-muted)" }}>
                    {site.contact.officeHours}
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-emerald-nrl/10 text-emerald-deep dark:text-emerald-soft inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <GlobeIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
                    Profiles
                  </p>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {profiles.map(({ label, href, Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          title={label}
                          className="hover:border-emerald-nrl hover:text-emerald-deep dark:hover:text-emerald-soft inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <Icon className="h-[1.05rem] w-[1.05rem]" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            <div className="mt-10 grid gap-4">
              {contactRoutes.map((route) => (
                <div key={route.email} className="surface-card rounded-2xl p-5">
                  <p className="text-[0.9rem] font-semibold">{route.label}</p>
                  <a
                    href={`mailto:${route.email}`}
                    className="link-underline text-emerald-deep dark:text-emerald-soft mt-1 inline-block text-[0.85rem]"
                  >
                    {route.email}
                  </a>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {route.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow">Enquiry form</p>
            <h2 className="mt-3 text-2xl font-semibold">Send us a message</h2>
            <p className="mt-3 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Fields marked with an asterisk are required. Most enquiries receive a reply within
              three working days.
            </p>
            <div className="mt-8">
              <ContactForm mailto={site.contact.email} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted" className="py-16 md:py-20">
        <SectionHeading
          eyebrow="Location"
          title="Finding the laboratory"
          lead="Visitors should email ahead so that we can arrange building access."
        />
        <div className="surface-card mt-10 overflow-hidden rounded-2xl">
          <iframe
            title={`Map showing the location of ${site.name}`}
            src={site.contact.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full border-0"
          />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <AccentBar />
          <a
            href={site.contact.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm font-medium"
            style={{ color: "var(--text-strong)" }}
          >
            Open in Google Maps
          </a>
        </div>
      </Section>
    </>
  );
}
