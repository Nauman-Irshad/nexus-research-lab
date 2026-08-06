import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { navigation } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: "var(--surface-muted)" }}>
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]"
      />
      <div className="container-nrl relative flex min-h-[70vh] flex-col justify-center py-24">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-[1.1] font-semibold md:text-[3.2rem]">
          We could not find that page
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
          The address may have changed, or the record you are looking for may have moved into the
          publication database or the research area pages.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" arrow="right">
            Back to home
          </ButtonLink>
          <ButtonLink href="/publications" variant="outline">
            Search publications
          </ButtonLink>
        </div>

        <nav aria-label="Site sections" className="mt-14 border-t pt-8">
          <p
            className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--text-muted)" }}
          >
            Or continue to
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-[0.9rem]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
