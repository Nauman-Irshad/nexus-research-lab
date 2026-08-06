"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRightIcon, CloseIcon } from "@/components/icons";
import type { GalleryCategory, GalleryItem } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export function GalleryGrid({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories: GalleryCategory[];
}) {
  const [active, setActive] = useState<GalleryCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const filtered = useMemo(
    () => (active === "all" ? items : items.filter((item) => item.category === active)),
    [items, active],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((item) => map.set(item.category, (map.get(item.category) ?? 0) + 1));
    return map;
  }, [items]);

  const close = useCallback(() => {
    setOpenIndex(null);
    lastFocused.current?.focus();
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        const next = (current + direction + filtered.length) % filtered.length;
        return next;
      });
    },
    [filtered.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  const current = openIndex === null ? null : filtered[openIndex];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
        <Chip active={active === "all"} onClick={() => setActive("all")} count={items.length}>
          All photographs
        </Chip>
        {categories.map((category) => (
          <Chip
            key={category}
            active={active === category}
            onClick={() => setActive(category)}
            count={counts.get(category) ?? 0}
          >
            {category}
          </Chip>
        ))}
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={(event) => {
                lastFocused.current = event.currentTarget;
                setOpenIndex(index);
              }}
              className="surface-card hover-lift group block w-full overflow-hidden rounded-2xl text-left"
              aria-haspopup="dialog"
            >
              <span className="relative block aspect-4/3 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index < 6 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(to top, rgba(5,15,28,0.62), transparent 62%)",
                  }}
                />
                <span
                  aria-hidden
                  className="glass-card absolute bottom-3 right-3 translate-y-2 rounded-full px-3 py-1.5 text-[0.68rem] font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  View full size
                </span>
              </span>
              <span className="block p-5">
                <span className="flex items-center gap-2.5">
                  <span className="bg-emerald-nrl/12 text-emerald-deep dark:text-emerald-soft rounded-full px-2.5 py-1 text-[0.66rem] font-semibold">
                    {item.category}
                  </span>
                  <span className="text-[0.7rem]" style={{ color: "var(--text-muted)" }}>
                    {formatDate(item.date, { day: undefined, month: "short" })}
                  </span>
                </span>
                <span className="mt-3 block text-[0.95rem] font-semibold">{item.title}</span>
                <span
                  className="mt-1.5 block text-[0.82rem] leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.caption}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} — full size`}
          className="animate-fade-in fixed inset-0 z-[80] flex flex-col bg-[rgba(3,10,19,0.94)] backdrop-blur-md"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white/60">
              {openIndex! + 1} / {filtered.length} · {current.category}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              className="hover:border-emerald-nrl inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors"
              aria-label="Close full size view"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-16">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photograph"
              className="hover:border-emerald-nrl absolute left-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-colors md:left-5"
            >
              <ArrowRightIcon className="h-5 w-5 rotate-180" />
            </button>

            <figure className="flex h-full max-h-full w-full max-w-5xl flex-col items-center justify-center">
              <div className="relative h-full max-h-[68vh] w-full">
                <Image
                  key={current.id}
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="90vw"
                  priority
                  className="animate-fade-in object-contain"
                />
              </div>
              <figcaption className="mt-5 max-w-2xl text-center">
                <p className="font-[family-name:var(--font-display)] text-base font-semibold text-white">
                  {current.title}
                </p>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-white/70">{current.caption}</p>
                <p className="mt-2 text-[0.72rem] text-white/45">{formatDate(current.date)}</p>
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photograph"
              className="hover:border-emerald-nrl absolute right-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-colors md:right-5"
            >
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({
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
