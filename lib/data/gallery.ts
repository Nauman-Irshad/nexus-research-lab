import type { GalleryCategory, GalleryItem } from "@/lib/types";

/** Real photographs only — CUST / ExciTe CUP, Agri Asia, LCCI, certificates, team. */

export const galleryCategories: GalleryCategory[] = [
  "Conference Photos",
  "Workshops",
  "Presentations",
  "Team Activities",
  "Achievements",
];

export const gallery: GalleryItem[] = [
  {
    id: "g-agri-asia-collage",
    title: "Agri Asia 2026 · Crop Disease Detection stall",
    caption:
      "19th International Agri Asia & Green Pakistan Exhibition — AI-Powered Plant Disease Detection System (ResNet50 + Grad-CAM) at Expo Centre Lahore.",
    category: "Conference Photos",
    image: "/images/gallery/agri-asia-2026.png",
    date: "2026-05-11",
  },
  {
    id: "g-lcci-fitao",
    title: "LCCI · Smart Fitao AI Industry-Academia presentation",
    caption:
      "Smart Fitao AI presented to Lahore Chamber of Commerce and Industry leadership through UCP ORIC.",
    category: "Presentations",
    image: "/images/gallery/lcci-smart-fitao.png",
    date: "2026-07-20",
  },
  {
    id: "g-cust-hackathon-banner",
    title: "CUST Hackathon 2026 · Campus exhibition",
    caption:
      "Capital University of Science & Technology (CUST) Hackathon 2026 — Nauman Irshad Lab projects on site.",
    category: "Workshops",
    image: "/images/gallery/cust-05.jpeg",
    date: "2026-06-13",
  },
  {
    id: "g-excite-team-trophy",
    title: "ExciTe CUP 2026 · Team with trophy",
    caption:
      "Nauman Irshad Lab team at the 11th ExciTe CUP / 4th Hackathon 2026 — certificates and trophy.",
    category: "Achievements",
    image: "/images/gallery/cust-04.jpeg",
    date: "2026-06-13",
  },
  {
    id: "g-excite-certificates",
    title: "ExciTe CUP 2026 · Ali, Nauman & Umer",
    caption:
      "Ali Ahmad, Nauman Irshad Ali Shah and Muhammad Umer Amir with certificates at ExciTe CUP 2026.",
    category: "Team Activities",
    image: "/images/gallery/cust-06.jpeg",
    date: "2026-06-13",
  },
  {
    id: "g-excite-collage",
    title: "ExciTe CUP 2026 · Smart Fitao AI collage",
    caption:
      "Team photos, Smart Fitao AI poster and participant badge from the 11th ExciTe CUP 2026.",
    category: "Achievements",
    image: "/images/gallery/cust-01.jpeg",
    date: "2026-06-13",
  },
  {
    id: "g-lab-exhibition",
    title: "Lab exhibition · Project posters",
    caption:
      "Indoor project showcase with research posters and visitors in the computing lab.",
    category: "Presentations",
    image: "/images/gallery/cust-02.jpeg",
    date: "2026-06-13",
  },
  {
    id: "g-fitao-thesis",
    title: "Smart Fitao AI · BSCS final project report",
    caption:
      "University of Central Punjab final-project cover — advisor Asif Farooq; team Nauman, Umer, Ali Ahmad, Abdul Rehman.",
    category: "Achievements",
    image: "/images/gallery/fitao-team-01.jpeg",
    date: "2026-06-01",
  },
  {
    id: "g-fitao-demo",
    title: "Smart Fitao AI · Virtual try-on product",
    caption: "Live Smart Fitao AI virtual try-on interface used in demos and LCCI presentations.",
    category: "Presentations",
    image: "/images/gallery/fitao-demo-01.jpeg",
    date: "2026-07-01",
  },
  {
    id: "g-paper-sprint",
    title: "Research sprint · Remote team call",
    caption:
      "Nauman, Umer and Ali Ahmad on a Microsoft Teams paper / project working session.",
    category: "Team Activities",
    image: "/images/gallery/fitao-team-02.jpeg",
    date: "2026-05-20",
  },
  {
    id: "g-open-house",
    title: "UCP Open House Exhibition 2025 · Volunteer",
    caption:
      "Volunteer badge — Faculty of Information Technology & Computer Science Open House Exhibition 2025.",
    category: "Achievements",
    image: "/images/gallery/open-house-01.jpeg",
    date: "2025-11-15",
  },
  {
    id: "g-agri-asia-certificate",
    title: "Agri Asia 2026 · Certificate of Participation",
    caption:
      "Certificate awarded to Mr. Nauman Irshad Ali Shah as a delegate at the 19th Agri Asia Conference, 09–11 May 2026.",
    category: "Achievements",
    image: "/images/gallery/agri-asia-certificate.jpeg",
    date: "2026-05-11",
  },
  {
    id: "g-harvardx",
    title: "HarvardX · PredictionX course completion",
    caption:
      "Certificate of completion for HarvardX SOC1.practx — PredictionX: Omens, Oracles & Prophecies.",
    category: "Achievements",
    image: "/images/gallery/harvardx-predictionx.png",
    date: "2026-08-05",
  },
];

export const gallerySorted = [...gallery].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const homeWinsGallery = gallerySorted;
