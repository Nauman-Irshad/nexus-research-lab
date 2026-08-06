import type { NewsItem } from "@/lib/types";

/** Real lab news only. */

export const news: NewsItem[] = [
  {
    id: "news-2026-08-harvardx",
    date: "2026-08-05",
    category: "Seminar",
    title: "Completed HarvardX PredictionX: Omens, Oracles & Prophecies",
    body: "Nauman Irshad Ali Shah completed HarvardX SOC1.practx — PredictionX: Omens, Oracles & Prophecies.",
    image: "/images/gallery/harvardx-predictionx.png",
  },
  {
    id: "news-2026-08-cmt",
    date: "2026-08-01",
    category: "Paper Acceptance",
    title: "CXG-DT submitted via Microsoft CMT (ICETCONF 2026)",
    body: "CXG-DT: Confidence- and Explanation-Gated Digital Twin Response for IoT Intrusion Handling submitted through Microsoft CMT (submission summary #472).",
    link: {
      label: "CMT submission",
      href: "https://cmt3.research.microsoft.com/ICETCONF2026/Submission/Summary/472",
    },
    image: "/images/publications/shah2026cxgdt.jpg",
  },
  {
    id: "news-2026-lcci-fitao",
    date: "2026-07-20",
    category: "Collaboration",
    title: "Smart Fitao AI presented to Lahore Chamber of Commerce leadership",
    body: "Smart Fitao AI presented at LCCI. Team: Nauman Irshad Ali Shah, Umer Amir, Ali Ahmad and Abdul Rehman. Advisor: Asif Farooq.",
    link: { label: "View project", href: "/projects#smart-fitao-ai" },
    image: "/images/gallery/lcci-smart-fitao.png",
  },
  {
    id: "news-2026-07-ids",
    date: "2026-07-10",
    category: "Collaboration",
    title: "Intrusion Deduction research repository opened",
    body: "GitHub codebase behind CXG-DT and CARE-GATE for Digital Twin–gated IoT intrusion response.",
    link: {
      label: "GitHub repository",
      href: "https://github.com/Nauman-Irshad/Intrusion-Deduction-",
    },
    image: "/images/publications/shah2026caregate.jpg",
  },
  {
    id: "news-2026-05-agri-asia",
    date: "2026-05-11",
    category: "Conference",
    title: "Crop Disease Detection exhibited at Agri Asia 2026",
    body: "ResNet50 + Grad-CAM crop disease system exhibited at Expo Centre Lahore.",
    link: { label: "View project", href: "/projects#crop-disease-resnet50" },
    image: "/images/gallery/agri-asia-2026.png",
  },
  {
    id: "news-2026-05-agri-certificate",
    date: "2026-05-11",
    category: "Award",
    title: "Certificate of Participation — Agri Asia 2026",
    body: "Nauman Irshad Ali Shah received a Certificate of Participation as a delegate at the 19th Agri Asia Conference.",
    image: "/images/gallery/agri-asia-certificate.jpeg",
  },
  {
    id: "news-2025-12-safe",
    date: "2025-12-01",
    category: "Paper Acceptance",
    title: "SAFE feature-mining paper published in SEMS",
    body: "Mining Software Features from App Store Artifacts published in Spectrum of Engineering and Management Sciences.",
    link: { label: "Read publication", href: "/publications#shah2025safe" },
    image: "/images/publications/shah2025safe.jpg",
  },
  {
    id: "news-2025-09-fyp",
    date: "2025-09-01",
    category: "Collaboration",
    title: "Smart Fitao AI FYP underway with Techificent mentorship",
    body: "FYP continues under mentorship from Asif Farooq (Techificent) and Flutter guidance from Asim Irshad.",
    image: "/images/projects/smart-fitao.png",
  },
];

export const newsSorted = [...news].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const newsCategories = Array.from(new Set(news.map((item) => item.category))).sort();
