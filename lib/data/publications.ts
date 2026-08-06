import type { Publication } from "@/lib/types";

/**
 * Real bibliography from Nexus Research Lab manuscripts in
 * `all publication things finals/` (conference, journal, research projects).
 */

export const publications: Publication[] = [
  {
    id: "shah2026cxgdt",
    title:
      "CXG-DT: Confidence- and Explanation-Gated Digital Twin Response for IoT Intrusion Handling",
    authors: [
      "Nauman Irshad Ali Shah",
      "Ahmad Arsalan",
      "Muhammad Umer Amir",
      "Ali Ahmad",
      "Danish Ali",
      "Syed Qarib Ali Naqvi",
    ],
    year: 2026,
    type: "conference",
    status: "under-review",
    venue: "ICET / International Conference on Emerging Technologies (CMT submission)",
    venueShort: "ICETCONF 2026",
    abstract:
      "Internet of Things (IoT) intrusion detectors often report high accuracy yet still fail at the operational response stage, where uncertain predictions can cause false isolation or delayed mitigation. This paper presents CXG-DT, a confidence- and explanation-gated Digital Twin (DT) response framework for IoT intrusion handling. The pipeline detects attacks with lightweight models, estimates calibrated confidence, computes selective SHAP only when a risk gate opens, validates alerts against virtual device twin states, and permits monitor, throttle, isolate, or escalate actions only when an uncertainty score is acceptable. On a locked multiclass IoT evaluation, CatBoost attains the best detection trade-off with 81.94% accuracy and 82.01% weighted F1-score. CXG-DT therefore shifts IoT IDS evaluation from accuracy alone toward safe closed-loop response under uncertainty.",
    keywords: [
      "IoT intrusion detection",
      "Digital Twin",
      "explainable AI",
      "SHAP",
      "edge AI",
      "uncertainty gating",
      "CatBoost",
    ],
    areas: ["digital-twin", "intrusion-detection", "iot-security", "explainable-ai", "cybersecurity"],
    links: {
      pdf: "/publications/CXG-DT.pdf",
      github: "https://github.com/Nauman-Irshad/Intrusion-Deduction-",
    },
    image: "/images/publications/shah2026cxgdt.jpg",
    featured: true,
  },
  {
    id: "shah2026caregate",
    title:
      "CARE-GATE: Cost-Aware Uncertainty Gating for Digital Twin based IoT Intrusion Response",
    authors: [
      "Nauman Irshad Ali Shah",
      "Syed Qarib Ali Naqvi",
      "Muhammad Umer Amir",
      "Ali Ahmad",
      "Danish Ali",
      "Ahmad Arsalan",
    ],
    year: 2026,
    type: "conference",
    status: "under-review",
    venue: "Conference manuscript · Digital Twin IoT intrusion response",
    venueShort: "Conference 2026",
    abstract:
      "Machine-learning intrusion detectors usually report predictive performance but do not specify how a detected IoT attack should be handled when response actions have different operational costs. This paper presents CARE-GATE, a cost-aware response policy that combines detector confidence, explanation stability, and a Digital Twin state residual in an uncertainty gate. The gate blocks automatic isolation when evidence is uncertain and uses an explicit cost matrix to calibrate its weights and threshold. Evaluated on a balanced eight-class subset of CICIoT2023, CatBoost gives the best weighted F1-score (76.09%). These results show how explicit operational costs and uncertainty evidence shape response behavior beyond detector accuracy alone.",
    keywords: [
      "Internet of Things",
      "intrusion detection",
      "cost-sensitive response",
      "uncertainty gating",
      "Digital Twin",
      "explainable AI",
      "SHAP",
      "CatBoost",
    ],
    areas: ["intrusion-detection", "digital-twin", "iot-security", "explainable-ai", "cybersecurity"],
    links: {
      pdf: "/publications/CARE_GATE.pdf",
      github: "https://github.com/Nauman-Irshad/Intrusion-Deduction-",
    },
    image: "/images/publications/shah2026caregate.jpg",
    featured: true,
  },
  {
    id: "shah2026posedepth",
    title:
      "PoseDepth-CMP: A Comparative Analysis of OpenPose COCO and MPI Keypoint Models for Contour-Guided Monocular Person Depth Estimation with Adaptive Selection",
    authors: [
      "Nauman Irshad Ali Shah",
      "Sammra Habib",
      "Muhammad Umer Amir",
      "Ali Ahmad",
      "Danish Ali",
    ],
    year: 2026,
    type: "journal",
    status: "under-review",
    venue: "Journal manuscript · Computer Vision / Pose & Depth",
    venueShort: "Journal (under review)",
    abstract:
      "Monocular depth estimation from human imagery supports clinical gait analysis, sports biomechanics, surveillance, and human–computer interaction, yet practitioners lack direct evidence for selecting between OpenPose body-model variants. PoseDepth-CMP provides a locked-seed comparison of COCO (18 keypoints) and MPI (15 keypoints) within the same contour-guided geometric depth pipeline. On 240 controlled samples (seed 42), COCO achieves 94.4% keypoint accuracy with 13.0 cm depth error, whereas MPI achieves 87.3% accuracy with 15.4 cm error while reducing runtime by 13.3% and memory by 16.7%. The learned selector attains 93.6% accuracy and 12.4 cm depth error at intermediate computational cost.",
    keywords: [
      "OpenPose",
      "COCO keypoints",
      "MPI keypoints",
      "monocular depth estimation",
      "human pose estimation",
      "adaptive model selection",
    ],
    areas: ["computer-vision", "deep-learning", "artificial-intelligence", "data-science"],
    links: {
      pdf: "/publications/PoseDepth-CMP.pdf",
    },
    image: "/images/publications/shah2026posedepth.jpg",
    featured: true,
  },
  {
    id: "shah2025safe",
    title:
      "Mining Software Features from App Store Artifacts: A Pattern-Based Approach to Feature Extraction and Matching",
    authors: ["Nauman Irshad Ali Shah", "Ali Ahmad", "Muhammad Umer Amir"],
    year: 2025,
    type: "journal",
    status: "published",
    venue: "Spectrum of Engineering and Management Sciences",
    venueShort: "SEMS",
    publisher: "Spectrum of Engineering and Management Sciences",
    abstract:
      "This paper presents SAFE, a novel uniform approach to extract app features from single app pages, single reviews and to match them. We manually build 18 part-of-speech patterns and 5 sentence patterns that are frequently used in text referring to app features, then apply these patterns with several text pre- and post-processing steps. A major advantage is that it does not require large training and configuration data. For well-maintained app pages such as Google Drive the approach has a precision of 87% and on average 56% for 10 evaluated apps. SAFE also matches 87% of the features extracted from user reviews to those extracted from the app descriptions.",
    keywords: [
      "User Reviews",
      "App Store Analytics",
      "Software Feature",
      "Data Mining",
      "NLP",
      "Pattern Recognition",
    ],
    areas: ["natural-language-processing", "data-science", "machine-learning"],
    links: {
      pdf: "/publications/Mining_Software_Features.pdf",
    },
    image: "/images/publications/shah2025safe.jpg",
    featured: true,
  },
  {
    id: "shah2025hybridnlp",
    title:
      "Hybrid Approaches to Semantic Text Understanding: Bridging Traditional NLP and Deep Learning",
    authors: ["Nauman Irshad Ali Shah", "Abdul Kabeer", "Sharjeel Ayub"],
    year: 2025,
    type: "conference",
    status: "under-review",
    venue: "Conference manuscript · Semantic NLP",
    venueShort: "Conference 2025",
    abstract:
      "This research paper presents a novel integrated framework for semantic text understanding that bridges traditional Natural Language Processing (NLP) techniques with modern deep learning approaches. We address semantic ambiguity by proposing a hybrid methodology that leverages statistical methods and neural architectures. Through experimentation on multiple datasets, the approach achieves a 15% improvement in semantic similarity tasks and a 12% enhancement in named entity recognition accuracy compared to baselines.",
    keywords: [
      "semantic understanding",
      "hybrid NLP",
      "deep learning",
      "statistical methods",
      "natural language processing",
    ],
    areas: ["natural-language-processing", "deep-learning", "artificial-intelligence"],
    links: {
      pdf: "/publications/Hybrid_NLP.pdf",
    },
    image: "/images/publications/shah2025hybridnlp.jpg",
    featured: true,
  },
];

export const publicationsById = new Map(publications.map((item) => [item.id, item]));

export const sortedPublications = [...publications].sort((a, b) => {
  if (b.year !== a.year) return b.year - a.year;
  return a.title.localeCompare(b.title);
});

export function publicationsForArea(slug: string): Publication[] {
  return sortedPublications.filter((item) => (item.areas as string[]).includes(slug));
}

export function getPublications(ids: string[]) {
  return ids
    .map((id) => publicationsById.get(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

export const publicationYears = Array.from(
  new Set(publications.map((item) => item.year)),
).sort((a, b) => b - a);

export const publicationVenues = Array.from(
  new Set(publications.map((item) => item.venueShort ?? item.venue)),
).sort((a, b) => a.localeCompare(b));
