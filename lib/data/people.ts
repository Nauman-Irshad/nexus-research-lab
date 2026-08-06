import type { Person, PersonGroup } from "@/lib/types";

/**
 * Nexus Research Lab roster.
 * `role` = LinkedIn headline. `bio` = LinkedIn about / profile summary.
 */

export const groupMeta: Record<
  PersonGroup,
  { label: string; blurb: string; order: number }
> = {
  director: {
    label: "Director",
    blurb: "Founder and scientific lead of the laboratory.",
    order: 1,
  },
  "co-director": {
    label: "Faculty Advisor",
    blurb: "Faculty leadership guiding research direction, supervision and publication quality.",
    order: 2,
  },
  faculty: {
    label: "Faculty",
    blurb: "Faculty members supervising thesis and research work with the laboratory.",
    order: 3,
  },
  "affiliate-faculty": {
    label: "Affiliate Faculty & Mentors",
    blurb: "Faculty and senior mentors who co-supervise projects, courses and publications.",
    order: 4,
  },
  "visiting-faculty": {
    label: "Visiting Faculty",
    blurb: "Visiting researchers hosted for a defined appointment.",
    order: 5,
  },
  postdoc: {
    label: "Postdoctoral Researchers",
    blurb: "Independent researchers leading work packages.",
    order: 6,
  },
  phd: {
    label: "PhD Students",
    blurb: "Doctoral researchers collaborating with the laboratory.",
    order: 7,
  },
  ms: {
    label: "Student Researchers",
    blurb: "Undergraduate and graduate researchers co-authoring papers and building systems.",
    order: 8,
  },
  "research-associate": {
    label: "Industry & Research Collaborators",
    blurb: "Industry partners and senior collaborators on applied research and product projects.",
    order: 9,
  },
  "research-assistant": {
    label: "Research Assistants",
    blurb: "Assistants supporting experiments, datasets and engineering pipelines.",
    order: 10,
  },
  intern: {
    label: "Interns",
    blurb: "Semester and summer interns on mentored research tasks.",
    order: 11,
  },
  alumni: {
    label: "Alumni",
    blurb: "Former members of the laboratory.",
    order: 12,
  },
};

export const people: Person[] = [
  {
    id: "n-shah",
    name: "Nauman Irshad Ali Shah",
    role: "Data Analyst | Digital Twin | PIFuHD Metaverse | Flutter App developer",
    group: "director",
    affiliation: "University of Central Punjab, Lahore",
    association:
      "Data Analyst | Digital Twin | PIFuHD Metaverse | Flutter App developer",
    interests: [
      "Digital twins",
      "Intrusion detection",
      "Computer vision",
      "Explainable AI",
      "PIFuHD / Metaverse",
      "Flutter",
    ],
    bio: "Data Analyst | Digital Twin | PIFuHD Metaverse | Flutter App developer",
    photo: "/people/n-shah.jpg",
    links: {
      email: "naumanirshadalishah@gmail.com",
      linkedin: "https://www.linkedin.com/in/nauman-irshad-ali-shah-aa4799342/",
      github: "https://github.com/Nauman-Irshad",
    },
  },
  {
    id: "a-arsalan",
    name: "Dr. Ahmad Arsalan",
    role: "PhD (Computer Science) | Open to Postdoc | Digital Twin | Wireless Networks | AI | Senior Lecturer at University of Central Punjab, Pakistan | Founder & Lead Engineer - Impact Factor Finder",
    group: "co-director",
    affiliation: "Senior Lecturer · University of Central Punjab, Lahore",
    association:
      "PhD (Computer Science) | Open to Postdoc | Digital Twin | Wireless Networks | AI | Senior Lecturer at University of Central Punjab, Pakistan | Founder & Lead Engineer - Impact Factor Finder",
    interests: [
      "Digital twin",
      "Wireless networks",
      "Artificial intelligence",
      "IoT security",
      "Academic tooling",
    ],
    bio: "I'm a Senior Lecturer in the Faculty of Information Technology and Computer Science at the University of Central Punjab, Pakistan. With a strong educational background in Computer Science, including an MS from NUCES-FAST, I've been dedicated to both teaching and research in the field. My research interests encompass Future Internet Architectures, Recent Network Approaches, Cross-Layer Design for Wireless Networks, Home Automation Technologies, Machine Learning, and more. Founder & Lead Engineer of Impact Factor Finder.",
    photo: "/people/a-arsalan.jpg",
    links: {
      email: "ahmad.arslan@ucp.edu.pk",
      linkedin: "https://www.linkedin.com/in/irealarsi/",
    },
  },
  {
    id: "a-farooq",
    name: "Asif Farooq",
    role: "Educationist | Teaching Professional | Co Founder Techificent | Software Development | Project Management | Team Building | Communication",
    group: "affiliate-faculty",
    affiliation: "Co-Founder, Techificent",
    association:
      "Educationist | Teaching Professional | Co Founder Techificent | Software Development | Project Management | Team Building | Communication",
    interests: [
      "Software development",
      "Project management",
      "Team building",
      "Education technology",
    ],
    bio: "Educationist | Teaching Professional | Co Founder Techificent | Software Development | Project Management | Team Building | Communication",
    photo: "/people/a-farooq.jpg",
    links: {
      linkedin: "https://www.linkedin.com/in/asif-farooq-32a11090/",
    },
  },
  {
    id: "a-arif",
    name: "Ameera Arif",
    role: "Data Scientist | Researcher",
    group: "affiliate-faculty",
    affiliation: "Data Scientist · Researcher",
    association: "Data Scientist | Researcher",
    interests: [
      "Natural language processing",
      "Software feature mining",
      "App store analytics",
      "Data science",
    ],
    bio: "Data Scientist | Researcher",
    photo: "/people/a-arif.jpg",
    links: {
      linkedin: "https://www.linkedin.com/in/ameera-arif/",
    },
  },
  {
    id: "a-irshad",
    name: "Asim Irshad",
    role: "Senior Flutter developer | 4+ year Experience | Lecturer @ BNU",
    group: "affiliate-faculty",
    affiliation: "Lecturer · Beaconhouse National University (BNU), Lahore",
    association: "Senior Flutter developer | 4+ year Experience | Lecturer @ BNU",
    interests: ["Flutter", "Mobile development", "Cross-platform apps", "Teaching"],
    bio: "Senior Flutter developer | 4+ year Experience | Lecturer @ BNU",
    photo: "/people/a-irshad.jpg",
    links: {
      linkedin: "https://www.linkedin.com/in/asim-irshad-18a61bab/",
    },
  },
  {
    id: "u-amir",
    name: "Muhammad Umer Amir",
    role: "Aspiring Computer Scientist",
    group: "ms",
    affiliation: "University of Central Punjab",
    association: "Aspiring Computer Scientist",
    interests: ["Computer science", "Digital twins", "Intrusion detection", "Computer vision"],
    bio: "Aspiring Computer Scientist",
    photo: "/people/u-amir.jpg",
    links: {
      email: "umrramrr@gmail.com",
      linkedin: "https://www.linkedin.com/in/umer-amir-3684a52b7/",
    },
  },
  {
    id: "a-ahmad",
    name: "Ali Ahmad",
    role: "Attended University Of Central Punjab | C++ | MySQL | HTML | CSS | JavaScript | React | AI | ML | Deep Learning",
    group: "ms",
    affiliation: "University of Central Punjab",
    association:
      "Attended University Of Central Punjab | C++ | MySQL | HTML | CSS | JavaScript | React | AI | ML | Deep Learning",
    interests: [
      "Artificial intelligence",
      "Machine learning",
      "Deep learning",
      "React",
      "MySQL",
      "C++",
    ],
    bio: "Attended University Of Central Punjab | C++ | MySQL | HTML | CSS | JavaScript | React | AI | ML | Deep Learning",
    photo: "/people/a-ahmad.jpg",
    links: {
      email: "aliahmaddev61@gmail.com",
      linkedin: "https://www.linkedin.com/in/ali-ahmad-91a7972a2/",
    },
  },
  {
    id: "d-ali",
    name: "Danish Ali",
    role: "AI/ML Engineer (Learning) | Computer Vision · Visual-RAG · RAG | Python · FastAPI · AWS | Final-Year CS @ UCP | Open to Internships",
    group: "ms",
    affiliation: "Final-Year CS · University of Central Punjab",
    association:
      "AI/ML Engineer (Learning) | Computer Vision · Visual-RAG · RAG | Python · FastAPI · AWS | Final-Year CS @ UCP | Open to Internships",
    interests: [
      "Computer vision",
      "Visual RAG",
      "RAG systems",
      "Python",
      "FastAPI",
      "AWS",
    ],
    bio: "AI/ML Engineer (Learning) | Computer Vision · Visual-RAG · RAG | Python · FastAPI · AWS | Final-Year CS @ UCP | Open to Internships",
    photo: "/people/d-ali.jpg",
    links: {
      email: "danish.ali02721@gmail.com",
      linkedin: "https://www.linkedin.com/in/danish-ali092/",
    },
  },
  {
    id: "a-rehman",
    name: "Abdul Rehman",
    role: "MERN Stack Developer | JavaScript, HTML, CSS | React.js, Node.js, Express.js, MongoDB | UI/UX Designer (Figma) Passionate About Building Scalable Web Applications",
    group: "ms",
    affiliation: "MERN Stack Developer · UI/UX (Figma)",
    association:
      "MERN Stack Developer | JavaScript, HTML, CSS | React.js, Node.js, Express.js, MongoDB | UI/UX Designer (Figma) Passionate About Building Scalable Web Applications",
    interests: [
      "MERN stack",
      "React.js",
      "Node.js",
      "MongoDB",
      "UI/UX",
      "Figma",
    ],
    bio: "MERN Stack Developer | JavaScript, HTML, CSS | React.js, Node.js, Express.js, MongoDB | UI/UX Designer (Figma) Passionate About Building Scalable Web Applications",
    photo: "/people/a-rehman.jpg",
    links: {
      linkedin: "https://www.linkedin.com/in/abdul-rehman-47a079250/",
    },
  },
  {
    id: "s-habib",
    name: "Sammra Habib",
    role: "Student Researcher · Computer Vision",
    group: "research-assistant",
    affiliation: "University of Central Punjab",
    association: "Student Researcher · Computer Vision",
    interests: ["Computer vision", "Pose estimation", "Monocular depth"],
    bio: "Student researcher in computer vision, pose estimation and monocular person depth.",
    links: {
      email: "sammrahabib@gmail.com",
    },
  },
  {
    id: "q-naqvi",
    name: "Syed Qarib Ali Naqvi",
    role: "Student Researcher · IoT Security",
    group: "research-assistant",
    affiliation: "University of Central Punjab",
    association: "Student Researcher · IoT Security",
    interests: ["IoT security", "Intrusion detection", "Digital twins", "Explainable AI"],
    bio: "Student researcher in IoT security, intrusion detection and Digital Twin systems.",
    links: {
      email: "Contactqaribnaqvi@gmail.com",
    },
  },
];

export const peopleById = new Map(people.map((person) => [person.id, person]));

export function getPerson(id: string): Person | undefined {
  return peopleById.get(id);
}

export function peopleByGroup(group: PersonGroup): Person[] {
  return people.filter((person) => person.group === group);
}

export const orderedGroups = (Object.keys(groupMeta) as PersonGroup[]).sort(
  (a, b) => groupMeta[a].order - groupMeta[b].order,
);

const memberNames = new Set(
  people.map((person) => person.name.replace(/^(Dr\.|Prof\.)\s+/i, "").toLowerCase()),
);

/** True when an author string belongs to a current or former lab member. */
export function isLabMember(authorName: string) {
  const cleaned = authorName.replace(/^(Dr\.|Prof\.)\s+/i, "").toLowerCase();
  if (memberNames.has(cleaned)) return true;
  for (const name of memberNames) {
    if (cleaned.includes(name) || name.includes(cleaned)) return true;
  }
  return false;
}
