import type { GalleryCategory, GalleryItem } from "@/lib/types";

/** Real event photographs and certificates only. */

export const galleryCategories: GalleryCategory[] = [
  "Conference Photos",
  "Presentations",
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
    id: "g-agri-asia-certificate",
    title: "Agri Asia 2026 · Certificate of Participation",
    caption:
      "Certificate awarded to Mr. Nauman Irshad Ali Shah as a delegate at the 19th Agri Asia Conference, 09–11 May 2026.",
    category: "Achievements",
    image: "/images/gallery/agri-asia-certificate.jpeg",
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
