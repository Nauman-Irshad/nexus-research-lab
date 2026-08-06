import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the Nexus Research Lab website, including citation expectations, licensing of code and datasets, and limitations of liability.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of Use"
      title="Terms of use"
      lead="These terms apply to everyone who uses this website and the research artefacts published through it."
      updated="1 August 2026"
      sections={[
        {
          heading: "Purpose of this site",
          paragraphs: [
            `This website presents the research activity of ${site.legalName}: people, research areas, projects, publications, conference papers, news and imagery. It is an academic information resource. Nothing on it constitutes professional, security, medical or legal advice.`,
          ],
        },
        {
          heading: "Use of content",
          bullets: [
            "Text and figures on this site may be quoted for teaching, review and scholarly purposes with attribution to Nexus Research Lab and a link to the page.",
            "Publications remain subject to the copyright of their respective publishers; author copies are provided only where licensing permits.",
            "Code repositories are licensed individually — check the LICENSE file in each repository before reuse.",
            "Datasets are released under the licence stated in their documentation. Restricted datasets require a data-use agreement.",
            "Photographs and the laboratory identity may not be used to imply endorsement of a third-party product or service.",
          ],
        },
        {
          heading: "Citation",
          paragraphs: [
            "If our work informs yours, please cite the relevant paper rather than this website. Each publication record provides a formatted reference and a BibTeX entry. When you use a released dataset or software artefact, cite the accompanying paper and state the version you used.",
          ],
        },
        {
          heading: "Accuracy and availability",
          paragraphs: [
            "Publication records, project status and roster information are updated as the laboratory's work progresses, and figures shown on the site are generated from those records. We nonetheless make no warranty that all content is complete or current at any given moment, and we may change or withdraw material without notice.",
          ],
        },
        {
          heading: "Responsible security research",
          paragraphs: [
            "Our security work is defensive. Datasets and tooling are released to support detection and resilience research. You must not use material from this site to attack systems you do not own or do not have written authorisation to test, and you remain solely responsible for complying with the law in your jurisdiction.",
          ],
        },
        {
          heading: "Third-party links",
          paragraphs: [
            "Links to publishers, repositories, conference venues, partner institutions and profile services are provided for convenience. We do not control those sites and are not responsible for their content or availability.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "To the fullest extent permitted by law, the laboratory and its members accept no liability for any loss or damage arising from use of this website or of any artefact released through it, including software and datasets provided on an as-is basis without warranty.",
          ],
        },
        {
          heading: "Changes and contact",
          paragraphs: [
            `We may revise these terms; the date above records the most recent change. Questions can be sent to ${site.contact.email}.`,
          ],
        },
      ]}
    />
  );
}
