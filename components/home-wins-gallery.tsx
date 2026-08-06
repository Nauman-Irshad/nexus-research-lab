import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { homeWinsGallery } from "@/lib/data/gallery";

export function HomeWinsGallery() {
  return (
    <Section id="wins" tone="muted">
      <SectionHeading
        eyebrow="CUST · Wins · Group photos"
        title="Exhibitions, wins and the laboratory together"
        lead="CUST university exhibition, Agri Asia, LCCI, certificates and team group photographs."
        action={
          <ButtonLink href="/gallery" variant="outline" arrow="right">
            Full gallery
          </ButtonLink>
        }
      />

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {homeWinsGallery.map((item, index) => (
          <Reveal key={item.id} delay={index * 35} className="mb-4 break-inside-avoid">
            <Link
              href="/gallery"
              className="group surface-card hover-lift block overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index < 4 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4">
                <p
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.category}
                </p>
                <h3 className="mt-1.5 text-[0.95rem] leading-snug font-semibold">{item.title}</h3>
                <p
                  className="mt-1.5 line-clamp-2 text-[0.8rem] leading-relaxed"
                  style={{ color: "var(--text-body)" }}
                >
                  {item.caption}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
