import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Nauman Irshad Lab handles personal data submitted through this website, including enquiry forms, analytics and research data governance.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="How we handle your data"
      lead="This website is a public research information site. We collect as little personal data as possible and never sell or share it for advertising."
      updated="1 August 2026"
      sections={[
        {
          heading: "Information we collect",
          paragraphs: [
            "The website itself does not require an account and does not use tracking cookies for advertising. Personal data reaches us only when you choose to send it.",
          ],
          bullets: [
            "Enquiry form: the name, email address, subject and message you submit, used solely to reply to you.",
            "Email correspondence: anything you include in messages sent to our published addresses.",
            "Server logs: standard technical records such as IP address, browser type and requested page, retained for security and troubleshooting.",
            "Theme preference: a single browser-local value remembering whether you chose light or dark mode. It never leaves your device.",
          ],
        },
        {
          heading: "How we use it",
          bullets: [
            "To answer your enquiry and, where relevant, continue a research conversation.",
            "To assess applications for research assistant, internship, thesis and visiting positions.",
            "To maintain the security and availability of this website.",
          ],
          paragraphs: [
            "We do not use your details for marketing, and we do not add you to mailing lists without an explicit request.",
          ],
        },
        {
          heading: "Legal basis and retention",
          paragraphs: [
            "We process enquiry data on the basis of your consent and our legitimate interest in responding to academic correspondence. Enquiry messages are retained for up to 24 months, after which they are deleted unless they form part of an ongoing collaboration record.",
          ],
        },
        {
          heading: "Third-party services",
          bullets: [
            "Map embed: the contact page embeds a Google Maps frame. Loading it involves a request to Google, which is subject to Google's own privacy policy.",
            "Fonts: typefaces are served from the site's own domain, so no font provider receives your IP address.",
            "Form delivery: if a form-handling service is configured for the enquiry form, your submission passes through that provider solely to reach our inbox.",
            "External links: repositories, DOIs, conference proceedings and profile pages are operated by third parties with their own policies.",
          ],
        },
        {
          heading: "Research data governance",
          paragraphs: [
            "Personal data used in research — for example clinical imaging cohorts — is handled entirely separately from this website, under study-specific protocols agreed with the partner institution that holds the data. Such data is never stored on or served from this site, and published datasets are de-identified or aggregated in accordance with the applicable agreement.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            `You may ask us to confirm what personal data we hold about you, to correct it, or to delete it. Write to ${site.contact.email} and we will respond within 30 days.`,
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            `Questions about this policy can be sent to ${site.contact.email}, or by post to ${site.contact.addressLines.join(", ")}.`,
          ],
        },
      ]}
    />
  );
}
