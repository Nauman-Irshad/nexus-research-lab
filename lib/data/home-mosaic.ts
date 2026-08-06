/** Full-bleed project & achievement mosaic — real photos only. */

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
    id: "m-excite-trophy",
    title: "ExciTe CUP 2026 · Team win",
    image: "/images/gallery/cust-04.jpeg",
    href: "/gallery",
  },
  {
    id: "m-cust",
    title: "CUST Hackathon 2026",
    image: "/images/gallery/cust-05.jpeg",
    href: "/gallery",
  },
  {
    id: "m-team-certs",
    title: "ExciTe CUP · Certificates",
    image: "/images/gallery/cust-06.jpeg",
    href: "/people",
  },
  {
    id: "m-excite-collage",
    title: "Smart Fitao · ExciTe CUP collage",
    image: "/images/gallery/cust-01.jpeg",
    href: "/projects#smart-fitao-ai",
  },
  {
    id: "m-cxg",
    title: "CXG-DT paper",
    image: "/images/publications/shah2026cxgdt.jpg",
    href: "/projects#cxg-dt",
  },
  {
    id: "m-care",
    title: "CARE-GATE paper",
    image: "/images/publications/shah2026caregate.jpg",
    href: "/projects#care-gate",
  },
  {
    id: "m-pose",
    title: "PoseDepth-CMP",
    image: "/images/publications/shah2026posedepth.jpg",
    href: "/projects#posedepth-cmp",
  },
  {
    id: "m-fitao-demo",
    title: "Smart Fitao AI · Try-on",
    image: "/images/gallery/fitao-demo-01.jpeg",
    href: "/projects#smart-fitao-ai",
  },
  {
    id: "m-harvard",
    title: "HarvardX PredictionX",
    image: "/images/gallery/harvardx-predictionx.png",
    href: "/portfolio#certificates",
  },
  {
    id: "m-lab-show",
    title: "Lab exhibition",
    image: "/images/gallery/cust-02.jpeg",
    href: "/gallery",
  },
];
