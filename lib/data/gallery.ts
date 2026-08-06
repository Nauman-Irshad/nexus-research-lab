import type { GalleryCategory, GalleryItem } from "@/lib/types";

/** Real event photographs, CUST exhibition, team wins and certificates. */

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
    id: "g-cust-01",
    title: "CUST · University project exhibition",
    caption:
      "Nexus Research Lab projects presented at the Capital University of Science & Technology (CUST) project exhibition.",
    category: "Workshops",
    image: "/images/gallery/workshop-02.webp",
    date: "2025-12-10",
  },
  {
    id: "g-cust-02",
    title: "CUST · Exhibition booth and demos",
    caption: "Live demos and posters from NRL systems at the CUST university project exhibition.",
    category: "Workshops",
    image: "/images/gallery/workshop-01.webp",
    date: "2025-12-10",
  },
  {
    id: "g-cust-03",
    title: "CUST · Team at the exhibition",
    caption: "Student researchers presenting lab work to visitors at CUST.",
    category: "Workshops",
    image: "/images/gallery/workshop-03.webp",
    date: "2025-12-10",
  },
  {
    id: "g-team-01",
    title: "Laboratory team · Group win",
    caption: "Nexus Research Lab student researchers and collaborators after project milestones.",
    category: "Team Activities",
    image: "/images/gallery/team-01.webp",
    date: "2026-01-15",
  },
  {
    id: "g-team-02",
    title: "Laboratory team · Research group",
    caption: "Group photograph from a lab working session and paper sprint.",
    category: "Team Activities",
    image: "/images/gallery/team-02.webp",
    date: "2026-02-20",
  },
  {
    id: "g-team-03",
    title: "Laboratory team · Celebration",
    caption: "Team moment marking conference submissions and exhibition wins.",
    category: "Team Activities",
    image: "/images/gallery/team-03.webp",
    date: "2026-05-12",
  },
  {
    id: "g-conference-01",
    title: "Conference · Research meeting",
    caption: "Conference and research-meeting moments from Nexus Research Lab activity.",
    category: "Conference Photos",
    image: "/images/gallery/conference-01.webp",
    date: "2026-03-01",
  },
  {
    id: "g-presentation-01",
    title: "Research presentation · Group stage",
    caption: "Presenting Digital Twin, IDS and applied AI work to academic and industry audiences.",
    category: "Presentations",
    image: "/images/gallery/presentation-01.webp",
    date: "2026-04-08",
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
  {
    id: "g-achievement-01",
    title: "Achievement · Lab milestone",
    caption: "Recognition moments from Nexus Research Lab exhibitions and submissions.",
    category: "Achievements",
    image: "/images/gallery/achievement-01.webp",
    date: "2026-06-01",
  },
  {
    id: "g-achievement-02",
    title: "Achievement · Team award moment",
    caption: "Group photograph marking a laboratory win.",
    category: "Achievements",
    image: "/images/gallery/achievement-02.webp",
    date: "2026-06-15",
  },
  {
    id: "g-achievement-03",
    title: "Achievement · Exhibition recognition",
    caption: "Exhibition and conference recognition for NRL applied AI work.",
    category: "Achievements",
    image: "/images/gallery/achievement-03.webp",
    date: "2026-07-01",
  },
];

export const gallerySorted = [...gallery].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

/** Home: CUST exhibition + wins / group photographs (all of them). */
export const homeWinsGallery = gallerySorted.filter(
  (item) =>
    item.id.startsWith("g-cust") ||
    item.category === "Achievements" ||
    item.category === "Team Activities" ||
    item.id === "g-agri-asia-collage" ||
    item.id === "g-lcci-fitao" ||
    item.id === "g-conference-01" ||
    item.id === "g-presentation-01",
);
