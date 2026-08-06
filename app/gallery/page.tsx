import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { PageHeader, Section } from "@/components/ui";
import { galleryCategories, gallerySorted } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from Nauman Irshad Lab: the laboratory, research meetings, conferences, workshops, presentations, team activities and achievements.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Inside the laboratory"
        lead="Research meetings, testbeds under construction, conference sessions, workshops and the moments worth marking. Select any image to open it full size."
        meta={
          <>
            <Metric value={gallerySorted.length} label="Photographs" />
            <Metric value={galleryCategories.length} label="Categories" />
          </>
        }
      />

      <Section>
        <GalleryGrid items={gallerySorted} categories={galleryCategories} />
      </Section>
    </>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-[0.78rem]" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
    </div>
  );
}
