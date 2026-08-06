import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, areaIcons } from "@/components/icons";
import { publicationsForArea } from "@/lib/data/publications";
import { projectsForArea } from "@/lib/data/projects";
import type { ResearchArea } from "@/lib/types";

export function ResearchCard({ area, priority = false }: { area: ResearchArea; priority?: boolean }) {
  const Icon = areaIcons[area.icon];
  const publicationCount = publicationsForArea(area.slug).length;
  const projectCount = projectsForArea(area.slug).length;

  return (
    <article className="surface-card hover-lift group relative flex flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={area.image}
          alt={`${area.title} research imagery`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(5,15,28,0.55) 0%, rgba(5,15,28,0.08) 45%, transparent 100%)",
          }}
        />
        <span
          aria-hidden
          className="bg-navy-700/88 absolute bottom-4 left-4 inline-flex h-11 w-11 items-center justify-center rounded-xl text-white ring-1 ring-white/20 backdrop-blur-sm"
        >
          <Icon className="h-[1.35rem] w-[1.35rem]" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.08rem] font-semibold">
          <Link href={`/research/${area.slug}`} className="after:absolute after:inset-0">
            {area.title}
          </Link>
        </h3>
        <p className="mt-2.5 flex-1 text-[0.88rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {area.description}
        </p>

        <dl className="mt-5 flex gap-6 border-t pt-4 text-[0.72rem]">
          <div>
            <dt className="uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
              Publications
            </dt>
            <dd className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold">
              {publicationCount}
            </dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
              Projects
            </dt>
            <dd className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold">
              {projectCount}
            </dd>
          </div>
          <div className="ml-auto flex items-end">
            <span className="text-emerald-deep dark:text-emerald-soft inline-flex items-center gap-1.5 text-[0.78rem] font-semibold">
              Learn more
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </dl>
      </div>
    </article>
  );
}
