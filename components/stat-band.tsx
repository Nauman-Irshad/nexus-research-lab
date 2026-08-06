import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { stats } from "@/lib/data/stats";

export function StatBand() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="bg-navy-800 relative overflow-hidden border-t border-white/5 py-16 md:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(800px 340px at 20% 0%, rgba(0,168,107,0.14), transparent 60%), radial-gradient(700px 300px at 85% 100%, rgba(76,101,145,0.22), transparent 60%)",
        }}
      />
      <div className="container-nrl relative">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-emerald-soft">
              Laboratory at a glance
            </p>
            <h2
              id="stats-heading"
              className="mt-3 text-2xl font-semibold text-white md:text-[1.9rem]"
            >
              Output, people and partnerships
            </h2>
          </div>
          <p className="max-w-md text-[0.85rem] leading-relaxed text-navy-200">
            Every figure below is generated directly from the laboratory&rsquo;s publication,
            project and roster records, so it never drifts out of date.
          </p>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 45}
              className="bg-navy-800/80 group px-5 py-7 backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.06]"
            >
              <dd className="font-[family-name:var(--font-display)] text-[2.15rem] leading-none font-semibold text-white">
                <Counter value={stat.value} />
              </dd>
              <dt className="mt-3 text-[0.82rem] font-medium text-navy-100">{stat.label}</dt>
              <p className="mt-1.5 text-[0.7rem] leading-snug text-navy-300">{stat.note}</p>
              <span
                aria-hidden
                className="bg-emerald-nrl mt-4 block h-[2px] w-6 origin-left rounded-full transition-transform duration-500 group-hover:scale-x-[2.2]"
              />
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
