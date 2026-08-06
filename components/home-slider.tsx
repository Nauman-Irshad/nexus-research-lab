"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type HomeSlide = {
  id: string;
  title: string;
  caption: string;
  image: string;
  href?: string;
  tag: string;
};

export function HomeSlider({ slides }: { slides: HomeSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [slides.length, paused]);

  if (slides.length === 0) return null;

  const current = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Latest lab work"
      className="relative overflow-hidden border-b"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/10] w-full md:aspect-[21/9] md:max-h-[72vh]">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              i === index ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(5,15,28,0.88) 0%, rgba(5,15,28,0.35) 45%, rgba(5,15,28,0.15) 100%)",
              }}
            />
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="container-nrl pb-8 pt-16 md:pb-10">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-emerald-soft">
              {current.tag}
            </p>
            <h2 className="mt-3 max-w-3xl text-2xl leading-tight font-semibold text-white md:text-4xl">
              {current.href ? (
                <Link href={current.href} className="hover:underline">
                  {current.title}
                </Link>
              ) : (
                current.title
              )}
            </h2>
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-navy-100 md:text-base">
              {current.caption}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show slide ${i + 1}: ${slide.title}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "bg-emerald-nrl w-8" : "w-2.5 bg-white/35 hover:bg-white/60",
                  )}
                />
              ))}
              <span className="ml-auto text-[0.75rem] text-white/55">
                {index + 1} / {slides.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
