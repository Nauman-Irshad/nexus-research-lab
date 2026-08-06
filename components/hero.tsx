import { NetworkCanvas } from "@/components/network-canvas";
import { ButtonLink } from "@/components/ui";
import { site } from "@/lib/data/site";

export function Hero() {
  return (
    <section className="bg-navy-700 relative -mt-[4.5rem] overflow-hidden pt-[4.5rem]">
      {/* Layered gradient field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 620px at 12% -10%, rgba(0,168,107,0.20), transparent 60%), radial-gradient(900px 540px at 88% 8%, rgba(76,101,145,0.34), transparent 62%), linear-gradient(180deg, #071626 0%, #0B1F3A 52%, #0A1B31 100%)",
        }}
      />
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ maskImage: "radial-gradient(75% 70% at 50% 30%, black, transparent)" }}
      />

      {/* Animated research network */}
      <NetworkCanvas className="pointer-events-auto absolute inset-0 h-full w-full opacity-90" />

      {/* Floating accent orbs */}
      <div
        aria-hidden
        className="animate-float-slow pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,168,107,0.35), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="animate-float-slow pointer-events-none absolute -right-16 bottom-8 h-80 w-80 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(126,147,182,0.45), transparent 70%)",
          animationDelay: "-6s",
        }}
      />

      <div className="container-nrl relative">
        <div className="flex min-h-[calc(100dvh-4.5rem)] flex-col justify-center py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="animate-fade-in inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[0.7rem] font-medium tracking-[0.12em] text-navy-100 uppercase backdrop-blur-sm">
              <span className="bg-emerald-nrl inline-block h-1.5 w-1.5 rounded-full" />
              {site.established}
            </p>

            <h1 className="animate-fade-up mt-8 text-[2.65rem] leading-[1.04] font-semibold tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.4rem]">
              {site.name}
            </h1>

            <p
              className="animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-navy-100 md:text-xl"
              style={{ animationDelay: "120ms" }}
            >
              {site.tagline}
            </p>

            <div
              className="animate-fade-up mt-10 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "220ms" }}
            >
              <ButtonLink href="/upcoming" variant="accent" arrow="right">
                Upcoming Work
              </ButtonLink>
              <ButtonLink
                href="/publications"
                variant="outline"
                className="border-white/25 text-white! hover:border-white/70 hover:text-white!"
              >
                Publications
              </ButtonLink>
              <ButtonLink
                href="/portfolio"
                variant="quiet"
                className="text-white/85! hover:text-white!"
                arrow="right"
              >
                Nauman Portfolio
              </ButtonLink>
            </div>
          </div>

          <dl
            className="animate-fade-up mt-16 grid max-w-3xl gap-x-10 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-3"
            style={{ animationDelay: "320ms" }}
          >
            {[
              { term: "Focus", detail: "AI · Cybersecurity · Digital Twins" },
              { term: "Model", detail: "Student-led, faculty-supervised" },
              { term: "Practice", detail: "Open code, data and conference papers" },
            ].map((item) => (
              <div key={item.term}>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-emerald-soft">
                  {item.term}
                </dt>
                <dd className="mt-2 text-[0.92rem] leading-snug text-navy-100">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
