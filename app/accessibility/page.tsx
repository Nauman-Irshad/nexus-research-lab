import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Accessibility commitments for the Nauman Irshad Lab website, including WCAG 2.2 AA conformance measures, known limitations and how to report a barrier.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="Accessibility statement"
      lead="We aim to meet WCAG 2.2 level AA across this website so that our research is usable by everyone, including people using screen readers, keyboard navigation or magnification."
      updated="1 August 2026"
      sections={[
        {
          heading: "Measures we have taken",
          bullets: [
            "Semantic landmarks, a single H1 per page and a logical heading order throughout.",
            "A skip-to-content link as the first focusable element on every page.",
            "Visible focus indicators on all interactive elements, with a 2px emerald outline and offset.",
            "Colour contrast of at least 4.5:1 for body text in both light and dark themes.",
            "Keyboard support for the navigation menu, filters and the gallery lightbox, which closes with Escape and moves with the arrow keys.",
            "Text alternatives for meaningful images; decorative graphics, including the animated network backdrop, are hidden from assistive technology.",
            "Full respect for the prefers-reduced-motion setting: transitions, counters and the network animation are disabled when it is enabled.",
            "Form fields with programmatically associated labels and error messages announced through live regions.",
            "Layouts that reflow to 320px width and remain usable at 200% zoom.",
          ],
        },
        {
          heading: "Dark mode and appearance",
          paragraphs: [
            "The site follows your operating system's colour scheme by default and remembers a manual override locally. Both themes are checked for contrast independently, and no information is conveyed by colour alone.",
          ],
        },
        {
          heading: "Known limitations",
          bullets: [
            "The embedded Google Map on the contact page is a third-party component whose accessibility we do not control; the full postal address is provided as text alongside it.",
            "Some publisher PDFs linked from publication records are produced by third parties and may not be fully tagged for screen readers. Contact us and we will provide an accessible version of our own manuscripts.",
            "Generated illustrative plates are decorative; where they carry a label it is repeated in the surrounding text.",
          ],
        },
        {
          heading: "Reporting a barrier",
          paragraphs: [
            `If you encounter something on this site that you cannot use, please write to ${site.contact.email} with the page address and a short description of the problem and the assistive technology you are using. We treat accessibility defects as bugs and aim to acknowledge reports within five working days.`,
          ],
        },
        {
          heading: "Assessment approach",
          paragraphs: [
            "The site is checked with automated auditing tools during development, together with manual keyboard-only navigation and screen reader spot checks. Accessibility is reviewed whenever a new page template is introduced.",
          ],
        },
      ]}
    />
  );
}
