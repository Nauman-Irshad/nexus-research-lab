import type { HomeSlide } from "@/components/home-slider";

/** Main photos for the home auto-rotating slider — conference, events, gallery highlights. */
export const homeSlides: HomeSlide[] = [
  {
    id: "slide-agri-asia",
    tag: "Conference · Exhibition",
    title: "Agri Asia 2026 · Crop Disease Detection",
    caption:
      "Exhibitor at the 19th International Agri Asia & Green Pakistan Exhibition — ResNet50 + Grad-CAM plant disease detection at Expo Centre Lahore.",
    image: "/images/gallery/agri-asia-2026.png",
    href: "/projects#crop-disease-resnet50",
  },
  {
    id: "slide-lcci",
    tag: "Presentation · LCCI",
    title: "Smart Fitao AI at Lahore Chamber of Commerce",
    caption:
      "Industry-Academia Linkage presentation through UCP ORIC — cloth size prediction, 3D try-on and seller studio.",
    image: "/images/gallery/lcci-smart-fitao.png",
    href: "/projects#smart-fitao-ai",
  },
  {
    id: "slide-agri-cert",
    tag: "Certificate",
    title: "Agri Asia 2026 · Certificate of Participation",
    caption:
      "Certificate awarded to Nauman Irshad Ali Shah as a delegate at the 19th Agri Asia Conference.",
    image: "/images/gallery/agri-asia-certificate.jpeg",
    href: "/portfolio#certificates",
  },
  {
    id: "slide-harvardx",
    tag: "Certificate · HarvardX",
    title: "PredictionX course completion",
    caption:
      "HarvardX SOC1.practx — PredictionX: Omens, Oracles & Prophecies.",
    image: "/images/gallery/harvardx-predictionx.png",
    href: "/portfolio#certificates",
  },
  {
    id: "slide-cust",
    tag: "Exhibition · CUST",
    title: "CUST university project exhibition",
    caption:
      "Nexus Research Lab projects presented at the CUST university project exhibition.",
    image: "/images/gallery/workshop-02.webp",
    href: "/gallery",
  },
  {
    id: "slide-conference-1",
    tag: "Conference",
    title: "Conference & research meetings",
    caption: "Lab conference and presentation moments from Nexus Research Lab activity.",
    image: "/images/gallery/conference-01.webp",
    href: "/conference",
  },
  {
    id: "slide-conference-2",
    tag: "Conference",
    title: "Research presentations",
    caption: "Presenting Digital Twin, IDS and applied AI work to academic and industry audiences.",
    image: "/images/gallery/presentation-01.webp",
    href: "/gallery",
  },
  {
    id: "slide-team",
    tag: "Gallery · Team",
    title: "Laboratory team",
    caption: "Student researchers and collaborators behind NRL papers and projects.",
    image: "/images/gallery/team-01.webp",
    href: "/people",
  },
];
