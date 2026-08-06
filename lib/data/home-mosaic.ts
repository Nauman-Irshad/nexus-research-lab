/** Full-bleed project & achievement mosaic for the home page (3×4 frame). */

export type MosaicTile = {
  id: string;
  title: string;
  image: string;
  href: string;
};

export const homeMosaic: MosaicTile[] = [
  {
    id: "m-agri",
    title: "Agri Asia 2026 · Crop Disease Detection",
    image: "/images/gallery/agri-asia-2026.png",
    href: "/projects#crop-disease-resnet50",
  },
  {
    id: "m-lcci",
    title: "LCCI · Smart Fitao AI",
    image: "/images/gallery/lcci-smart-fitao.png",
    href: "/projects#smart-fitao-ai",
  },
  {
    id: "m-cxg",
    title: "CXG-DT paper",
    image: "/images/publications/shah2026cxgdt.jpg",
    href: "/projects#cxg-dt",
  },
  {
    id: "m-team",
    title: "Laboratory team",
    image: "/images/gallery/team-01.webp",
    href: "/people",
  },
  {
    id: "m-care",
    title: "CARE-GATE paper",
    image: "/images/publications/shah2026caregate.jpg",
    href: "/projects#care-gate",
  },
  {
    id: "m-present",
    title: "Research presentation",
    image: "/images/gallery/presentation-01.webp",
    href: "/gallery",
  },
  {
    id: "m-pose",
    title: "PoseDepth-CMP",
    image: "/images/publications/shah2026posedepth.jpg",
    href: "/projects#posedepth-cmp",
  },
  {
    id: "m-cust",
    title: "CUST exhibition",
    image: "/images/gallery/workshop-02.webp",
    href: "/gallery",
  },
  {
    id: "m-conf",
    title: "Conference moments",
    image: "/images/gallery/conference-01.webp",
    href: "/conference",
  },
  {
    id: "m-harvard",
    title: "HarvardX PredictionX",
    image: "/images/gallery/harvardx-predictionx.png",
    href: "/portfolio#certificates",
  },
  {
    id: "m-safe",
    title: "SAFE · Feature mining",
    image: "/images/publications/shah2025safe.jpg",
    href: "/projects#safe-features",
  },
  {
    id: "m-codevista",
    title: "CodeVista 3D Runner",
    image: "/images/gallery/presentation-02.webp",
    href: "https://codevista-3d-runner.vercel.app/",
  },
];
