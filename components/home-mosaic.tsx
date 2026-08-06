import Image from "next/image";
import Link from "next/link";
import { homeMosaic } from "@/lib/data/home-mosaic";

/** Edge-to-edge 3×4 project & achievement frame — sits just above the footer. */
export function HomeMosaic() {
  return (
    <section
      id="frame"
      aria-label="Projects and achievements"
      className="w-full border-t border-[var(--border)]"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {homeMosaic.map((tile, index) => {
          const external = tile.href.startsWith("http");
          const className =
            "group relative aspect-[4/3] overflow-hidden bg-[var(--surface-muted)] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--emerald)]";

          const media = (
            <>
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading={index < 4 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-navy-900/0 transition-colors duration-300 group-hover:bg-navy-900/35"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-[0.72rem] font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {tile.title}
              </span>
            </>
          );

          return external ? (
            <a
              key={tile.id}
              href={tile.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {media}
            </a>
          ) : (
            <Link key={tile.id} href={tile.href} className={className}>
              {media}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
