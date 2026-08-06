import Link from "next/link";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { researchAreas } from "@/lib/data/research";
import { sortedPublications } from "@/lib/data/publications";
import { navigation, site } from "@/lib/data/site";
import { truncate } from "@/lib/utils";

const socialLinks = [
  { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: site.social.github, Icon: GitHubIcon },
];

export function SiteFooter() {
  const recent = sortedPublications.slice(0, 3);

  return (
    <footer className="bg-navy-700 relative overflow-hidden text-navy-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, rgba(0,168,107,0.55), transparent 45%), radial-gradient(circle at 85% 10%, rgba(120,160,220,0.4), transparent 40%)",
        }}
      />
      <div className="container-nrl relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 text-white">
              <LogoMark className="h-10 w-10" />
              <div className="leading-tight">
                <p className="font-[family-name:var(--font-display)] text-base font-semibold">
                  Nexus Research Lab
                </p>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-navy-200">
                  Independent collaborative research
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-navy-200">
              {site.description}
            </p>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="hover:border-emerald-nrl hover:text-emerald-soft inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-navy-100 transition-colors duration-300"
                  >
                    <Icon className="h-[1.1rem] w-[1.1rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Quick links" className="lg:col-span-2">
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="mt-5 space-y-2.5 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-emerald-soft text-navy-200 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-soft text-navy-200 transition-colors duration-200"
                >
                  Join Us
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Research areas" className="lg:col-span-3">
            <FooterHeading>Research Areas</FooterHeading>
            <ul className="mt-5 grid gap-2.5 text-sm sm:grid-cols-2 lg:grid-cols-1">
              {researchAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/research/${area.slug}`}
                    className="hover:text-emerald-soft text-navy-200 transition-colors duration-200"
                  >
                    {area.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/research"
                  className="text-emerald-soft/90 hover:text-emerald-soft transition-colors duration-200"
                >
                  All our research →
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <FooterHeading>Recent Publications</FooterHeading>
            <ul className="mt-5 space-y-4 text-sm">
              {recent.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/publications#${item.id}`}
                    className="hover:text-emerald-soft group block text-navy-200 transition-colors duration-200"
                  >
                    <span className="block leading-snug">{truncate(item.title, 78)}</span>
                    <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.12em] text-navy-300">
                      {item.venueShort ?? item.venue} · {item.year}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <FooterHeading className="mt-9">Contact</FooterHeading>
            <ul className="mt-5 space-y-3 text-sm text-navy-200">
              <li className="flex gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-navy-300" />
                <span>
                  {site.contact.addressLines.slice(1).join(", ")}
                </span>
              </li>
              <li className="flex gap-2.5">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-navy-300" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:text-emerald-soft transition-colors"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-navy-300" />
                <a href={site.contact.phoneHref} className="hover:text-emerald-soft transition-colors">
                  {site.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-[0.78rem] text-navy-300 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-emerald-soft transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-emerald-soft transition-colors">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-emerald-soft transition-colors">
                Accessibility
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="hover:text-emerald-soft transition-colors">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white ${className ?? ""}`}
    >
      {children}
    </p>
  );
}
