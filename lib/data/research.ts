import type { ResearchArea } from "@/lib/types";

/**
 * Research themes grounded in Nauman Irshad Lab's real papers and projects only.
 */

export const researchAreas: ResearchArea[] = [
  {
    slug: "digital-twin",
    title: "Digital Twin",
    short: "Twin-gated IoT intrusion response",
    description:
      "Digital Twin replicas used to validate IoT intrusion alerts before costly response actions — the core of CXG-DT and CARE-GATE.",
    icon: "twin",
    image: "/images/research/digital-twin.webp",
    overview: [
      "Our Digital Twin work focuses on closed-loop IoT intrusion handling: detectors raise alerts, twin state residuals help validate them, and response actions (monitor, throttle, isolate, escalate) are gated by confidence and explanation evidence.",
      "This programme produced the CXG-DT and CARE-GATE manuscripts with Dr. Ahmad Arsalan and the student researcher team at University of Central Punjab.",
    ],
    objectives: [
      "Gate IoT response actions with calibrated confidence and selective SHAP explanations.",
      "Validate alerts against virtual device twin residuals before isolation.",
      "Publish reproducible CatBoost / CICIoT-style evaluation protocols for twin-gated response.",
    ],
    datasets: [
      {
        name: "CICIoT2023 evaluation subsets",
        description:
          "Locked multiclass and balanced eight-class evaluation subsets used in CXG-DT and CARE-GATE.",
      },
    ],
    software: [
      {
        name: "Intrusion Deduction",
        description: "Experimental pipelines for detection, SHAP, twin residuals and response gating.",
        href: "https://github.com/Nauman-Irshad/Intrusion-Deduction-",
        license: "Research code",
      },
    ],
    collaborators: [
      "University of Central Punjab (UCP), Lahore",
      "Dr. Ahmad Arsalan — Faculty Advisor",
    ],
    funding: [
      {
        source: "Nauman Irshad Lab",
        program: "Independent collaborative research · UCP FOITCS",
        period: "2025 – 2026",
      },
    ],
    futureDirections: [
      "Hardware-in-the-loop twin validation on constrained IoT gateways.",
      "Broader cost matrices for operational response policies.",
    ],
    gallery: ["/images/gallery/lab-02.webp", "/images/gallery/meeting-01.webp"],
  },
  {
    slug: "intrusion-detection",
    title: "Intrusion Detection",
    short: "IDS with safe response under uncertainty",
    description:
      "Machine-learning intrusion detection for IoT traffic, with emphasis on uncertainty, cost-aware response and explainability — CARE-GATE and CXG-DT.",
    icon: "radar",
    image: "/images/research/intrusion-detection.webp",
    overview: [
      "We treat detection accuracy as necessary but not sufficient: the laboratory studies how to act after an alert when false isolation is expensive and delayed mitigation is dangerous.",
      "CARE-GATE combines detector confidence, explanation stability and Digital Twin residuals with an explicit cost matrix. CXG-DT emphasises confidence- and explanation-gated twin response.",
    ],
    objectives: [
      "Improve operational IDS evaluation beyond raw accuracy and F1.",
      "Calibrate response policies with explicit action costs.",
      "Release open research code for twin-gated intrusion experiments.",
    ],
    datasets: [
      {
        name: "CICIoT2023",
        description: "Primary public IoT intrusion corpus used for locked evaluations.",
      },
    ],
    software: [
      {
        name: "Intrusion Deduction",
        description: "Shared codebase behind CXG-DT and CARE-GATE.",
        href: "https://github.com/Nauman-Irshad/Intrusion-Deduction-",
        license: "Research code",
      },
    ],
    collaborators: ["University of Central Punjab (UCP), Lahore"],
    funding: [
      {
        source: "Nauman Irshad Lab",
        program: "Independent collaborative research",
        period: "2025 – 2026",
      },
    ],
    futureDirections: [
      "Online drift monitoring for deployed IoT detectors.",
      "Human-in-the-loop escalation studies for security operators.",
    ],
    gallery: ["/images/gallery/lab-02.webp"],
  },
  {
    slug: "computer-vision",
    title: "Computer Vision",
    short: "Pose, depth, try-on and agri vision",
    description:
      "PoseDepth-CMP (OpenPose COCO vs MPI), Smart Fitao AI 3D try-on / size prediction, and crop-disease vision systems.",
    icon: "eye",
    image: "/images/research/computer-vision.webp",
    overview: [
      "Computer vision at Nauman Irshad Lab covers person pose and monocular depth (PoseDepth-CMP), Metaverse / PIFuHD virtual try-on for Smart Fitao AI, and plant disease recognition with ResNet50 and Grad-CAM for Agri Asia 2026.",
      "Student researchers co-author papers and ship demos presented through UCP ORIC to LCCI and Agri Asia.",
    ],
    objectives: [
      "Compare OpenPose body models for contour-guided person depth estimation.",
      "Deliver practical cloth size prediction and 3D try-on for tailors and sellers.",
      "Ship explainable plant-disease classifiers for agricultural exhibition and field use.",
    ],
    datasets: [
      {
        name: "PoseDepth-CMP controlled samples",
        description: "240 locked-seed samples used for COCO vs MPI comparison.",
      },
      {
        name: "PlantVillage-style crop disease set",
        description: "20,638 images across tomato, potato and pepper bell diseases.",
      },
    ],
    software: [
      {
        name: "Crop Disease Detection (ResNet50 + Grad-CAM)",
        description: "Transfer-learning classifier with FastAPI inference under 200ms.",
        license: "Research code",
      },
    ],
    collaborators: [
      "University of Central Punjab (UCP), Lahore",
      "Techificent · Asif Farooq (FYP mentor)",
      "UCP ORIC · LCCI · Agri Asia 2026",
    ],
    funding: [
      {
        source: "Final Year Project · UCP FOITCS",
        program: "Smart Fitao AI · Crop Disease Detection",
        period: "2024 – 2026",
      },
    ],
    futureDirections: [
      "Stronger Metaverse try-on fidelity with PIFuHD finetuning.",
      "Mobile deployment of Grad-CAM-backed crop disease tools.",
    ],
    gallery: [
      "/images/gallery/achievement-01.webp",
      "/images/projects/smart-fitao.png",
      "/images/projects/crop-disease.png",
    ],
  },
  {
    slug: "deep-learning",
    title: "Deep Learning",
    short: "ResNet50, Grad-CAM and transfer learning",
    description:
      "Deep models for agricultural disease detection (ResNet50 + XAI) and supporting vision pipelines used in PoseDepth and Smart Fitao AI.",
    icon: "cube",
    image: "/images/research/deep-learning.webp",
    overview: [
      "Deep learning at Nauman Irshad Lab is applied, not abstract: ImageNet-pretrained ResNet50 for 15 plant diseases with Grad-CAM explanations, reported at Agri Asia 2026 with 90.09% accuracy.",
      "Related deep components support pose estimation and 3D human reconstruction in product and research demos.",
    ],
    objectives: [
      "Train and evaluate transfer-learning classifiers with honest metrics and XAI.",
      "Keep inference budgets suitable for FastAPI / edge-friendly demos.",
    ],
    datasets: [
      {
        name: "Crop disease image corpus",
        description: "Multi-class leaf disease imagery used for ResNet50 training and Grad-CAM.",
      },
    ],
    software: [
      {
        name: "ResNet50 + Grad-CAM pipeline",
        description: "Training and real-time inference stack for crop disease detection.",
        license: "Research code",
      },
    ],
    collaborators: ["University of Central Punjab (UCP) FOITCS", "UCP ORIC"],
    funding: [
      {
        source: "Nauman Irshad Lab · UCP FOITCS",
        program: "Agri Asia 2026 exhibitor project",
        period: "2025 – 2026",
      },
    ],
    futureDirections: ["Broader crop species coverage", "On-device model compression"],
    gallery: ["/images/projects/crop-disease.png"],
  },
  {
    slug: "natural-language-processing",
    title: "Natural Language Processing",
    short: "App-store feature mining and hybrid NLP",
    description:
      "SAFE — pattern-based mining of software features from app store artifacts (published in SEMS) — and hybrid semantic NLP research with collaborators.",
    icon: "language",
    image: "/images/research/natural-language-processing.webp",
    overview: [
      "SAFE extracts and matches app features from descriptions and user reviews using manually built POS and sentence patterns, without large training corpora. The paper was published in Spectrum of Engineering and Management Sciences with Ali Ahmad and Muhammad Umer Amir, alongside NLP coursework collaboration with Ameera Arif.",
      "A related hybrid NLP manuscript studies bridging classical NLP features with deep contextual embeddings.",
    ],
    objectives: [
      "Extract software features reliably from noisy app-store text.",
      "Match review-derived features to developer page features.",
      "Teach and apply NLP methods with laboratory co-authors.",
    ],
    datasets: [
      {
        name: "App store pages and reviews",
        description: "Evaluation apps including well-maintained pages such as Google Drive.",
      },
    ],
    software: [
      {
        name: "SAFE feature patterns",
        description: "18 POS patterns and 5 sentence patterns for feature extraction and matching.",
        license: "Research artefact",
      },
    ],
    collaborators: [
      "Ameera Arif — NLP collaborator",
      "University of Central Punjab",
    ],
    funding: [
      {
        source: "Nauman Irshad Lab",
        program: "NLP research & coursework collaboration",
        period: "2024 – 2025",
      },
    ],
    futureDirections: ["Broader multilingual app corpora", "Hybrid deep–symbolic feature matchers"],
    gallery: ["/images/gallery/achievement-03.webp"],
  },
  {
    slug: "explainable-ai",
    title: "Explainable AI",
    short: "SHAP and Grad-CAM in deployed pipelines",
    description:
      "Selective SHAP for IoT intrusion response gates and Grad-CAM for transparent crop-disease predictions.",
    icon: "lens",
    image: "/images/research/explainable-ai.webp",
    overview: [
      "Explainability at Nauman Irshad Lab is tied to decisions: CXG-DT and CARE-GATE use selective SHAP when risk gates open; crop disease detection uses Grad-CAM so predictions are inspectable for agricultural stakeholders.",
    ],
    objectives: [
      "Use explanations only when they change response behaviour under uncertainty.",
      "Provide visual explanations for agricultural AI demos and exhibitions.",
    ],
    datasets: [],
    software: [
      {
        name: "SHAP gating (CXG-DT / CARE-GATE)",
        description: "Selective explanation computation inside twin-gated response pipelines.",
        href: "https://github.com/Nauman-Irshad/Intrusion-Deduction-",
        license: "Research code",
      },
    ],
    collaborators: ["University of Central Punjab"],
    funding: [
      {
        source: "Nauman Irshad Lab",
        program: "Independent collaborative research",
        period: "2025 – 2026",
      },
    ],
    futureDirections: ["Operator studies on explanation usefulness for IDS response"],
    gallery: ["/images/research/explainable-ai.webp"],
  },
];

export const researchBySlug = new Map(researchAreas.map((area) => [area.slug, area]));

export function getResearchArea(slug: string) {
  return researchBySlug.get(slug as ResearchArea["slug"]);
}

export function areaTitle(slug: string) {
  return researchBySlug.get(slug as ResearchArea["slug"])?.title ?? slug;
}
