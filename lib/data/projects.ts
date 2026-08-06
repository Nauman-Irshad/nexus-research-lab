import type { Project } from "@/lib/types";

/**
 * Projects with full detail from real NRL work:
 * conference papers, Smart Fitao AI, Crop Disease (Agri Asia), SAFE.
 */

export const projects: Project[] = [
  {
    id: "cxg-dt",
    title: "CXG-DT · Confidence- and Explanation-Gated Digital Twin IoT Response",
    summary:
      "Digital Twin response framework for IoT intrusion handling with calibrated confidence, selective SHAP and gated monitor / throttle / isolate actions.",
    description:
      "CXG-DT addresses the gap between high IDS accuracy and safe operational response. The pipeline detects attacks with lightweight models, estimates calibrated confidence, runs selective SHAP only when a risk gate opens, validates alerts against virtual device twin states, and permits monitor, throttle, isolate or escalate actions only when uncertainty is acceptable. Evaluated on a locked multiclass IoT set (CICIoT-style flows) with CatBoost as the primary detector.",
    area: "digital-twin",
    relatedAreas: ["intrusion-detection", "iot-security", "explainable-ai", "cybersecurity"],
    fundingAgency: "Nauman Irshad Lab · University of Central Punjab",
    supervisorId: "a-arsalan",
    teamIds: ["n-shah", "u-amir", "a-ahmad", "d-ali", "q-naqvi"],
    start: "2025",
    end: "2026",
    status: "Under review",
    stack: ["Python", "CatBoost", "SHAP", "Digital Twin", "scikit-learn", "CICIoT2023"],
    publicationIds: ["shah2026cxgdt"],
    image: "/images/publications/shah2026cxgdt.jpg",
    links: {
      github: "https://github.com/Nauman-Irshad/Intrusion-Deduction-",
    },
  },
  {
    id: "care-gate",
    title: "CARE-GATE · Cost-Aware Uncertainty Gating for DT Intrusion Response",
    summary:
      "Cost-aware response policy that combines detector confidence, explanation stability and Digital Twin residuals before choosing monitor, throttle or isolate.",
    description:
      "CARE-GATE focuses on the decision layer after detection: when should an IoT gateway isolate, throttle or only monitor? The framework uses an explicit cost matrix with uncertainty evidence from confidence scores, selective SHAP stability and twin-state residuals. Evaluated on a balanced eight-class CICIoT2023 subset with six detectors; CatBoost provides the best weighted F1 trade-off.",
    area: "intrusion-detection",
    relatedAreas: ["digital-twin", "iot-security", "explainable-ai", "cybersecurity"],
    fundingAgency: "Nauman Irshad Lab · University of Central Punjab",
    supervisorId: "a-arsalan",
    teamIds: ["n-shah", "q-naqvi", "u-amir", "a-ahmad", "d-ali"],
    start: "2025",
    end: "2026",
    status: "Under review",
    stack: ["Python", "CatBoost", "SHAP", "Cost-sensitive learning", "CICIoT2023"],
    publicationIds: ["shah2026caregate"],
    image: "/images/publications/shah2026caregate.jpg",
    links: {
      github: "https://github.com/Nauman-Irshad/Intrusion-Deduction-",
    },
  },
  {
    id: "posedepth-cmp",
    title: "PoseDepth-CMP · OpenPose COCO vs MPI for Person Depth Estimation",
    summary:
      "Locked-seed comparison of OpenPose COCO and MPI keypoint models inside a contour-guided monocular person depth pipeline, with adaptive model selection.",
    description:
      "PoseDepth-CMP gives practitioners evidence for choosing between OpenPose body-model variants for person-specific monocular depth. On 240 controlled samples, COCO reaches higher keypoint accuracy and lower depth error; MPI is faster and lighter. The project contributes paired statistics, cue ablations, uncertainty analysis and a learned adaptive selector.",
    area: "computer-vision",
    relatedAreas: ["deep-learning", "artificial-intelligence", "data-science"],
    fundingAgency: "Nauman Irshad Lab · University of Central Punjab",
    supervisorId: "n-shah",
    teamIds: ["n-shah", "s-habib", "u-amir", "a-ahmad", "d-ali"],
    start: "2025",
    end: "2026",
    status: "Under review",
    stack: ["Python", "OpenPose", "COCO", "MPI", "Contour analysis", "NumPy"],
    publicationIds: ["shah2026posedepth"],
    image: "/images/publications/shah2026posedepth.jpg",
  },
  {
    id: "smart-fitao-ai",
    title: "Smart Fitao AI · Cloth Size Prediction, 3D Try-On & Seller Studio (FYP)",
    summary:
      "AI-powered cloth size prediction for tailors, 3D virtual try-on, a 24/7 chatbot with 3D product recommendations, and a seller 3D studio — presented to LCCI leadership through UCP ORIC.",
    description:
      "Smart Fitao AI asks: what if getting the perfect fit required no guesswork — just AI? The Final Year Project delivers (1) cloth size prediction for tailors from body and garment measurements, (2) 3D virtual try-on for a more personalised shopping experience, (3) a 24/7 AI chatbot with 3D product recommendations, and (4) a 3D studio for sellers to convert 2D products into interactive 3D models (including PIFuHD Metaverse finetuning). The project was presented at the Lahore Chamber of Commerce and Industry (LCCI) through UCP ORIC's Industry-Academia Linkage Program to the President, Vice President, Chairman, Hammad Naveed and Rana Sikander Hayat. Feedback confirmed the problem is real and the solution is needed. FYP advisor: Asif Farooq. Team: Nauman Irshad Ali Shah, Umer Amir, Ali Ahmad and Abdul Rehman.",
    area: "computer-vision",
    relatedAreas: ["deep-learning", "artificial-intelligence", "data-science"],
    fundingAgency:
      "Final Year Project · UCP FOITCS · Mentored by Asif Farooq (Techificent) · Presented via UCP ORIC at LCCI",
    supervisorId: "a-farooq",
    teamIds: ["n-shah", "u-amir", "a-ahmad", "a-rehman"],
    externalTeam: [
      "Techificent",
      "UCP ORIC",
      "Lahore Chamber of Commerce and Industry (LCCI)",
    ],
    start: "2024",
    end: "2026",
    status: "Ongoing",
    stack: [
      "Python",
      "PIFuHD",
      "PyTorch",
      "Flutter",
      "Computer Vision",
      "Metaverse",
      "Chatbot",
      "3D Studio",
    ],
    publicationIds: [],
    image: "/images/projects/smart-fitao.png",
  },
  {
    id: "crop-disease-resnet50",
    title:
      "Crop Disease Detection · ResNet50 + Explainable AI for Agricultural Intelligence",
    summary:
      "AI-powered plant disease detection with ResNet50, Grad-CAM explainability and real-time FastAPI inference — exhibited at Agri Asia 2026, Expo Centre Lahore.",
    description:
      "This AgriTech project detects 15 plant diseases across tomato, potato and pepper bell using 20,638 images, transfer learning on ResNet50 (ImageNet) and Explainable AI via Grad-CAM for transparent predictions. Reported metrics: 90.09% accuracy, 88.41% precision, 89.18% recall and 88.73% F1, with sub-200ms FastAPI inference. The work addresses global crop losses of 20–40% (~$220B annually). Proudly presented as an exhibitor at the 19th International Agri Asia & Green Pakistan Exhibition & Conference (09–11 May 2026, Expo Centre Lahore), organised with support from University of Central Punjab ORIC. Team: Nauman Irshad Ali Shah, Ali Ahmad, Abdul Rehman, Danish Ali and Umer Amir (UCP FOITCS).",
    area: "deep-learning",
    relatedAreas: ["computer-vision", "explainable-ai", "artificial-intelligence", "medical-ai"],
    fundingAgency: "Nauman Irshad Lab · UCP FOITCS · Exhibited with UCP ORIC at Agri Asia 2026",
    supervisorId: "n-shah",
    teamIds: ["n-shah", "a-ahmad", "a-rehman", "d-ali", "u-amir"],
    externalTeam: ["UCP ORIC", "19th International Agri Asia Conference"],
    start: "2025",
    end: "2026",
    status: "Completed",
    stack: [
      "Python",
      "ResNet50",
      "PyTorch",
      "Grad-CAM",
      "FastAPI",
      "Transfer Learning",
      "Explainable AI",
    ],
    publicationIds: [],
    image: "/images/projects/crop-disease.png",
  },
  {
    id: "safe-features",
    title: "SAFE · Mining Software Features from App Store Artifacts",
    summary:
      "Pattern-based NLP approach to extract and match app features from store descriptions and user reviews — linked to NLP coursework with Ameera Arif.",
    description:
      "SAFE (published in Spectrum of Engineering and Management Sciences) manually builds POS and sentence patterns frequently used when text refers to app features, then extracts and matches features across developer pages and user reviews without large training corpora. The work sits alongside NLP teaching collaboration with Ameera Arif.",
    area: "natural-language-processing",
    relatedAreas: ["data-science", "machine-learning"],
    fundingAgency: "Nauman Irshad Lab · University of Central Punjab",
    supervisorId: "a-arif",
    teamIds: ["n-shah", "a-ahmad", "u-amir", "a-arif"],
    start: "2024",
    end: "2025",
    status: "Completed",
    stack: ["Python", "NLP", "POS patterns", "App store analytics"],
    publicationIds: ["shah2025safe"],
    image: "/images/publications/shah2025safe.jpg",
  },
  {
    id: "codevista-3d-runner",
    title: "CodeVista · 3D Runner Learning Lab",
    summary:
      "Interactive student coding platform with XP progress, weekly programs and a live 3D runner — Pause, Next, Replay and Run for hands-on practice.",
    description:
      "CodeVista 3D Runner is an educational coding lab led by Asim Irshad (Lecturer, Beaconhouse National University). Students complete weekly programs, earn XP toward skill goals, and practise in a live 3D runner with Pause, Next, Replay and Run controls plus a source panel for the current exercise. Built for classroom and self-paced learning so beginners can see code behaviour while they write it. Live demo: https://codevista-3d-runner.vercel.app/",
    area: "artificial-intelligence",
    relatedAreas: ["data-science", "deep-learning"],
    fundingAgency: "Asim Irshad · Beaconhouse National University (BNU) · Nauman Irshad Lab affiliate",
    supervisorId: "a-irshad",
    teamIds: ["a-irshad"],
    start: "2025",
    end: "2026",
    status: "Ongoing",
    stack: ["Flutter", "3D", "Educational games", "XP systems", "Web"],
    publicationIds: [],
    image: "/images/projects/glasslens.webp",
    links: {
      demo: "https://codevista-3d-runner.vercel.app/",
    },
  },
];

export const projectsById = new Map(projects.map((project) => [project.id, project]));

/** Projects where the area is either the primary or a contributing area. */
export function projectsForArea(slug: string) {
  return projects.filter(
    (project) =>
      project.area === slug || ((project.relatedAreas ?? []) as string[]).includes(slug),
  );
}

/** Projects whose primary area matches — used where a single owner is implied. */
export function projectsLedByArea(slug: string) {
  return projects.filter((project) => project.area === slug);
}

export const projectStatuses = ["Ongoing", "Completed", "Under review", "Planned"] as const;
