"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarIcon } from "@/components/icons";
import { EmptyState } from "@/components/ui";
import type { NewsCategory, NewsItem } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export function NewsTimeline({
  items,
  categories,
}: {
  items: NewsItem[];
  categories: NewsCategory[];
}) {
  const [active, setActive] = useState<NewsCategory | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? items : items.filter((item) => item.category === active)),
    [items, active],
  );

  const years = useMemo(() => {
    const grouped = new Map<number, NewsItem[]>();
    filtered.forEach((item) => {
      const year = new Date(item.date).getUTCFullYear();
      grouped.set(year, [...(grouped.get(year) ?? []), item]);
    });
    return Array.from(grouped.entries()).sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((item) => map.set(item.category, (map.get(item.category) ?? 0) + 1));
    return map;
  }, [items]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter news by category">
        <FilterChip active={active === "all"} onClick={() => setActive("all")} count={items.length}>
          All updates
        </FilterChip>
        {categories.map((category) => (
          <FilterChip
            key={category}
            active={active === category}
            onClick={() => setActive(category)}
            count={counts.get(category) ?? 0}
          >
            {category}
          </FilterChip>
        ))}
      </div>

      <div className="mt-12">
        {filtered.length === 0 ? (
          <EmptyState
            title="Nothing in this category yet"
            body="Choose another category to see the laboratory's recent activity."
          />
        ) : (
          years.map(([year, entries]) => (
            <section key={year} aria-labelledby={`news-${year}`} className="relative">
              <h2
                id={`news-${year}`}
                className="sticky top-[4.75rem] z-10 -mx-2 mb-8 inline-block rounded-full border bg-[var(--surface)] px-4 py-1.5 font-[family-name:var(--font-display)] text-sm font-semibold backdrop-blur"
              >
                {year}
              </h2>

              <ol className="relative space-y-8 border-l pl-6 md:pl-10">
                {entries.map((item) => (
                  <li key={item.id} className="relative">
                    <span
                      aria-hidden
                      className="bg-emerald-nrl absolute -left-[1.9rem] top-6 h-2.5 w-2.5 rounded-full ring-4 ring-[var(--surface)] md:-left-[2.9rem]"
                    />
                    <article className="surface-card hover-lift overflow-hidden rounded-2xl">
                      <div className="grid md:grid-cols-12">
                        {item.image && (
                          <div className="relative aspect-16/9 md:col-span-4 md:aspect-auto">
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              loading="lazy"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className={cn("p-6 md:p-7", item.image ? "md:col-span-8" : "md:col-span-12")}>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="bg-emerald-nrl/12 text-emerald-deep dark:text-emerald-soft rounded-full px-2.5 py-1 text-[0.7rem] font-semibold">
                              {item.category}
                            </span>
                            <span
                              className="inline-flex items-center gap-1.5 text-[0.75rem]"
                              style={{ color: "var(--text-muted)" }}
                            >
                              <CalendarIcon className="h-3.5 w-3.5" />
                              <time dateTime={item.date}>{formatDate(item.date)}</time>
                            </span>
                          </div>
                          <h3 className="mt-3.5 text-[1.08rem] leading-snug font-semibold">
                            {item.title}
                          </h3>
                          <p
                            className="mt-2.5 text-[0.88rem] leading-relaxed"
                            style={{ color: "var(--text-body)" }}
                          >
                            {item.body}
                          </p>
                          {item.link && (
                            <p className="mt-4">
                              {item.link.href.startsWith("http") ? (
                                <a
                                  href={item.link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="link-underline text-emerald-deep dark:text-emerald-soft text-[0.82rem] font-semibold"
                                >
                                  {item.link.label}
                                </a>
                              ) : (
                                <Link
                                  href={item.link.href}
                                  className="link-underline text-emerald-deep dark:text-emerald-soft text-[0.82rem] font-semibold"
                                >
                                  {item.link.label}
                                </Link>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
  count,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-[0.76rem] font-medium transition-all duration-300",
        active
          ? "border-emerald-nrl bg-emerald-nrl text-white"
          : "hover:border-emerald-nrl hover:text-emerald-deep dark:hover:text-emerald-soft",
      )}
      style={active ? undefined : { color: "var(--text-muted)" }}
    >
      {children}
      <span className={cn("ml-1.5", active ? "opacity-80" : "opacity-55")}>{count}</span>
    </button>
  );
}
