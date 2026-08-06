import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui";
import type { NewsItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function NewsCard({ item, index = 0 }: { item: NewsItem; index?: number }) {
  return (
    <article className="surface-card hover-lift group flex h-full flex-col overflow-hidden rounded-2xl">
      {item.image && (
        <div className="relative aspect-16/9 overflow-hidden">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            loading={index < 3 ? "eager" : "lazy"}
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <Badge tone="accent">{item.category}</Badge>
          <time
            dateTime={item.date}
            className="text-[0.72rem] font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            {formatDate(item.date)}
          </time>
        </div>
        <h3 className="mt-4 text-[1.02rem] leading-snug font-semibold">{item.title}</h3>
        <p
          className="mt-2.5 flex-1 text-[0.86rem] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
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
                className="link-underline text-emerald-deep dark:text-emerald-soft text-[0.8rem] font-semibold"
              >
                {item.link.label}
              </a>
            ) : (
              <Link
                href={item.link.href}
                className="link-underline text-emerald-deep dark:text-emerald-soft text-[0.8rem] font-semibold"
              >
                {item.link.label}
              </Link>
            )}
          </p>
        )}
      </div>
    </article>
  );
}
