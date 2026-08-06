import type { Metadata } from "next";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Message Nexus Research Lab on WhatsApp to join or collaborate.",
  alternates: { canonical: "/join" },
};

/** Fallback UI if the server redirect to WhatsApp is skipped. */
export default function JoinPage() {
  return (
    <main className="container-nrl flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Join Us</p>
      <h1 className="mt-4 text-3xl font-semibold">Message us on WhatsApp</h1>
      <p className="mt-4 max-w-md" style={{ color: "var(--text-muted)" }}>
        Tap below to chat with Nexus Research Lab at {site.contact.phone}.
      </p>
      <a
        href={site.contact.whatsapp}
        className="bg-emerald-nrl hover:bg-emerald-deep mt-8 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white"
      >
        Open WhatsApp
      </a>
    </main>
  );
}
