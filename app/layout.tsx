import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { themeScript } from "@/components/theme-toggle";
import { site } from "@/lib/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Artificial Intelligence, Cybersecurity & Intelligent Systems`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "research laboratory",
    "artificial intelligence",
    "cybersecurity",
    "machine learning",
    "deep learning",
    "computer vision",
    "digital twin",
    "intrusion detection",
    "IoT security",
    "explainable AI",
    "medical AI",
    "intelligent systems",
    "student-led research",
    "Nauman Irshad Lab",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "science",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Collaborative Research in AI & Cybersecurity`,
    description: site.tagline,
    url: site.url,
    locale: "en_GB",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — collaborative research laboratory`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}`,
    description: site.tagline,
    images: ["/images/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1f3a" },
  ],
  colorScheme: "light dark",
};

const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/logo.svg`,
  email: site.contact.email,
  telephone: site.contact.phone,
  foundingDate: String(site.founded),
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.addressLines[1],
    addressLocality: "Lahore",
    postalCode: "",
    addressCountry: "PK",
  },
  sameAs: [site.social.linkedin, site.social.github],
  knowsAbout: [
    "Artificial Intelligence",
    "Cybersecurity",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Digital Twins",
    "Intrusion Detection Systems",
    "Internet of Things",
    "Explainable AI",
    "Medical AI",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />
        <noscript>
          {/* Scroll reveals rely on IntersectionObserver; without JS the content must simply be visible. */}
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main-content"
          className="bg-emerald-nrl sr-only rounded-full px-5 py-2.5 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100]"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="pt-[4.5rem]">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
