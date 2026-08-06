import type { Person, PersonGroup } from "@/lib/types";

/**
 * Nauman Irshad Lab roster.
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
      "Student societies",
    ],
    bio: "Data Analyst | Digital Twin | PIFuHD Metaverse | Flutter App developer. Project Manager for FIHPS / College History Society work at Forman Christian College (FCCU) with teacher Nadia Khushi (May 2021 – May 2022), including the Iqbal Day interview with Rector Sir Dr. Jonathan S. Addleton featured on the FCCU Official YouTube Channel.",
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
    role: "Data Scientist | Researcher · Teacher",
    group: "affiliate-faculty",
    affiliation: "Data Scientist · Researcher · Teacher",
    association: "Data Scientist | Researcher · Teacher",
    interests: [
      "Natural language processing",
      "Software feature mining",
      "App store analytics",
      "Data science",
    ],
    bio: "Data Scientist | Researcher · Teacher",
    photo: "/people/a-arif.jpg",
    links: {
      linkedin: "https://www.linkedin.com/in/ameera-arif/",
    },
  },
  {
    id: "a-irshad",
    name: "Asim Irshad",
    role: "Senior Flutter developer | 4+ year Experience | Lecturer @ BNU | CodeVista 3D Runner",
    group: "affiliate-faculty",
    affiliation: "Lecturer · Beaconhouse National University (BNU), Lahore",
    association:
      "Senior Flutter developer | 4+ year Experience | Lecturer @ BNU | CodeVista 3D Runner",
    interests: [
      "Flutter",
      "Mobile development",
      "Cross-platform apps",
      "Teaching",
      "Educational games",
      "3D learning",
    ],
    bio: "Senior Flutter developer | 4+ year Experience | Lecturer @ BNU. Builds CodeVista 3D Runner — an interactive student coding lab with XP, weekly programs and a live 3D runner for practice.",
    photo: "/people/a-irshad.jpg",
    links: {
      linkedin: "https://www.linkedin.com/in/asim-irshad-18a61bab/",
      website: "https://codevista-3d-runner.vercel.app/",
    },
  },
  {
    id: "n-khushi",
    name: "Nadia Khushi",
    role: "Associate Professor · Forman Christian College (A Chartered University), Lahore",
    group: "affiliate-faculty",
    affiliation: "Associate Professor · FCCU Lahore",
    association:
      "Associate Professor · Forman Christian College (A Chartered University) · Full-time since Jan 2015",
    interests: [
      "Teaching",
      "College history",
      "Student societies",
      "Social services",
      "FIHPS Society",
    ],
    bio: "Associate Professor at Forman Christian College (A Chartered University), Lahore (FCCU), full-time since January 2015. Teacher and mentor for student society and college-history work, including the FIHPS Society programme with Nauman Irshad Ali Shah as Project Manager.",
    links: {
      linkedin: "https://www.linkedin.com/in/nadia-khushi-3b2b253a/",
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
    role: "Teacher · Computer Vision",
    group: "affiliate-faculty",
    affiliation: "Teacher · University of Central Punjab",
    association: "Teacher · Computer Vision · PoseDepth-CMP",
    interests: ["Computer vision", "Pose estimation", "Monocular depth", "Teaching"],
    bio: "Teacher working with the laboratory on computer vision, pose estimation and monocular person depth (PoseDepth-CMP).",
    links: {
      email: "sammrahabib@gmail.com",
    },
  },
  {
    id: "a-saeed",
    name: "Ali Saeed",
    role: "Teacher",
    group: "affiliate-faculty",
    affiliation: "Teacher · Nauman Irshad Lab",
    association: "Teacher",
    interests: ["Teaching", "Research mentoring"],
    bio: "Teacher with Nauman Irshad Lab.",
    links: {},
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
  {
    id: "daniyal",
    name: "Daniyal",
    role: "Student Researcher",
    group: "ms",
    affiliation: "University of Central Punjab",
    association: "Student Researcher",
    interests: ["Artificial intelligence", "Software systems"],
    bio: "Student researcher at Nauman Irshad Lab.",
    links: {},
  },
  {
    id: "shahroz",
    name: "Shahroz",
    role: "Student Researcher",
    group: "ms",
    affiliation: "University of Central Punjab",
    association: "Student Researcher",
    interests: ["Artificial intelligence", "Software systems"],
    bio: "Student researcher at Nauman Irshad Lab.",
    links: {},
  },
  {
    id: "abdullah",
    name: "Abdullah",
    role: "Student Researcher · Trip 3D Mapper",
    group: "ms",
    affiliation: "CUST",
    association: "CUST · Trip 3D Mapper",
    interests: ["3D mapping", "Computer vision"],
    bio: "CUST university — Trip 3D Mapper project.",
    links: {},
  },
  {
    id: "hamza",
    name: "Hamza",
    role: "Student Researcher · MAD",
    group: "ms",
    affiliation: "MAD project",
    association: "MAD project",
    interests: ["Mobile application development"],
    bio: "Student researcher — MAD project.",
    links: {},
  },
  {
    id: "s-ayub",
    name: "Sharjeel Ayub",
    role: "Student Researcher · Semantic NLP",
    group: "ms",
    affiliation: "University of Central Punjab",
    association: "Student Researcher · Semantic NLP",
    interests: ["Natural language processing", "Semantic text understanding", "Deep learning"],
    bio: "Student researcher in semantic NLP and hybrid text-understanding systems.",
    links: {},
  },
  {
    id: "a-kabir",
    name: "Abdul Kabir",
    role: "Student Researcher · Semantic NLP",
    group: "ms",
    affiliation: "University of Central Punjab",
    association: "Student Researcher · Semantic NLP",
    interests: ["Natural language processing", "Semantic text understanding", "Deep learning"],
    bio: "Student researcher in semantic NLP and hybrid text-understanding systems.",
    links: {},
  },
  {
    id: "m-ahmad",
    name: "Muhammad Ahmad",
    role: "Associate Software Engineer | Full-Stack, AI & Security",
    group: "ms",
    affiliation: "Associate Software Engineer",
    association: "Associate Software Engineer | Full-Stack, AI & Security",
    interests: ["Full-stack development", "Artificial intelligence", "Security"],
    bio: "Associate Software Engineer | Full-Stack, AI & Security",
    links: {
      linkedin: "https://www.linkedin.com/in/ahmadshahbazzz/",
    },
  },
  {
    id: "a-habib",
    name: "Abdullah Habib",
    role: "Student Researcher",
    group: "ms",
    affiliation: "University of Central Punjab",
    association: "Student Researcher",
    interests: ["Artificial intelligence", "Software systems"],
    bio: "Student researcher at Nauman Irshad Lab.",
    links: {},
  },
  {
    id: "rille-haq",
    name: "Rill-e-Haq",
    role: "Student Researcher · Law",
    group: "ms",
    affiliation: "Law",
    association: "Law",
    interests: ["Law"],
    bio: "Law — collaborator with Nauman Irshad Lab.",
    links: {},
  },
  {
    id: "ali-irfan",
    name: "Ali Irfan",
    role: "Student Researcher · MAD",
    group: "ms",
    affiliation: "MAD project",
    association: "MAD project",
    interests: ["Mobile application development"],
    bio: "MAD project.",
    links: {},
  },
  {
    id: "ahmad-malik",
    name: "Ahmad Malik",
    role: "Student Researcher",
    group: "ms",
    affiliation: "Punjab University",
    association: "Punjab University",
    interests: ["Research"],
    bio: "Punjab University.",
    links: {},
  },
  {
    id: "ali-raza",
    name: "Ali Raza",
    role: "Student Researcher · AI",
    group: "ms",
    affiliation: "AI project",
    association: "AI project",
    interests: ["Artificial intelligence"],
    bio: "AI project.",
    links: {},
  },
  {
    id: "hassan-khan",
    name: "Hassan Khan",
    role: "Student Researcher",
    group: "ms",
    affiliation: "Nauman Irshad Lab",
    association: "Student Researcher",
    interests: ["Research"],
    bio: "Student researcher at Nauman Irshad Lab.",
    links: {},
  },
  {
    id: "ali-usman-khan",
    name: "Ali Usman Khan",
    role: "Student Researcher",
    group: "ms",
    affiliation: "Nauman Irshad Lab",
    association: "Student Researcher",
    interests: ["Research"],
    bio: "Student researcher at Nauman Irshad Lab.",
    links: {},
  },
  {
    id: "hassan",
    name: "Hassan",
    role: "Student Researcher",
    group: "ms",
    affiliation: "Nauman Irshad Lab",
    association: "Student Researcher",
    interests: ["Research"],
    bio: "Student researcher at Nauman Irshad Lab.",
    links: {},
  },
  {
    id: "roshan",
    name: "Roshan",
    role: "Student Researcher · 3D",
    group: "ms",
    affiliation: "3D work",
    association: "3D work",
    interests: ["3D", "Computer graphics"],
    bio: "3D work.",
    links: {},
  },
  {
    id: "shoaib",
    name: "Shoaib",
    role: "Student Researcher · Hardware",
    group: "ms",
    affiliation: "Hardware",
    association: "Hardware",
    interests: ["Hardware", "Embedded systems"],
    bio: "Hardware.",
    links: {},
  },
  {
    id: "abubakar-riaz",
    name: "Abubakar Riaz",
    role: "Student Researcher",
    group: "ms",
    affiliation: "FAST Lahore",
    association: "FAST Lahore",
    interests: ["Computer science"],
    bio: "FAST Lahore.",
    links: {},
  },
  {
    id: "rahim",
    name: "Rahim",
    role: "Student Researcher",
    group: "ms",
    affiliation: "CC",
    association: "CC",
    interests: ["Research"],
    bio: "CC.",
    links: {},
  },
  {
    id: "haseeb-robotics",
    name: "Haseeb",
    role: "Student Researcher · Robotics",
    group: "ms",
    affiliation: "Chinese · Robotic hand / automated catheter",
    association: "Robotic hand · automated catheter",
    interests: ["Robotics", "Medical devices"],
    bio: "Working on robotic hand and automated catheter systems.",
    links: {},
  },
  {
    id: "hassan-marketing",
    name: "Hassan (Marketing & Deep Learning)",
    role: "Student Researcher · Marketing & Deep Learning",
    group: "ms",
    affiliation: "Marketing · Deep learning",
    association: "Marketing and deep learning",
    interests: ["Marketing", "Deep learning"],
    bio: "Marketing and deep learning.",
    links: {},
  },
  {
    id: "affan",
    name: "Affan",
    role: "Student Researcher",
    group: "ms",
    affiliation: "UK · USA · Russia",
    association: "UK · USA · Russia",
    interests: ["International collaboration"],
    bio: "UK · USA · Russia.",
    links: {},
  },
  {
    id: "zaib",
    name: "Zaib",
    role: "Student Researcher · Pharma",
    group: "ms",
    affiliation: "Pharma · LCCI",
    association: "Pharma department · LCCI sales",
    interests: ["Pharma", "LCCI"],
    bio: "Pharma department — LCCI sales.",
    links: {},
  },
  {
    id: "talha",
    name: "Talha",
    role: "Student Researcher · Society",
    group: "ms",
    affiliation: "Society",
    association: "Society work",
    interests: ["Student society"],
    bio: "Society work.",
    links: {},
  },
  {
    id: "fahad-ali",
    name: "Fahad Ali",
    role: "Student Researcher · PP",
    group: "ms",
    affiliation: "PP project",
    association: "PP project",
    interests: ["PP project"],
    bio: "PP project.",
    links: {},
  },
  {
    id: "iman",
    name: "Iman",
    role: "Student Researcher · PDC",
    group: "ms",
    affiliation: "PDC project",
    association: "PDC project",
    interests: ["PDC"],
    bio: "PDC project.",
    links: {},
  },
  {
    id: "lariab",
    name: "Lariab",
    role: "Student Researcher · PDC",
    group: "ms",
    affiliation: "PDC project",
    association: "PDC project",
    interests: ["PDC"],
    bio: "PDC project.",
    links: {},
  },
  {
    id: "haseeb-pf",
    name: "Haseeb PF",
    role: "Student Researcher · PF",
    group: "ms",
    affiliation: "PF",
    association: "PF",
    interests: ["Research"],
    bio: "PF.",
    links: {},
  },
  {
    id: "rana-nauman",
    name: "Rana Nauman",
    role: "Student Researcher",
    group: "ms",
    affiliation: "Curtin University, Australia",
    association: "Curtin University, Australia",
    interests: ["Research"],
    bio: "Curtin University, Australia.",
    links: {},
  },
  {
    id: "komal",
    name: "Komal",
    role: "Harvard Prize Winner",
    group: "ms",
    affiliation: "Harvard Prize Winner",
    association: "Harvard Prize Winner",
    interests: ["Research", "Awards"],
    bio: "Harvard Prize Winner.",
    links: {},
  },
  {
    id: "naveed",
    name: "Naveed",
    role: "Student Researcher · PP",
    group: "ms",
    affiliation: "PP project",
    association: "PP project",
    interests: ["PP project"],
    bio: "PP project.",
    links: {},
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

/** Extra author-string aliases → person id (publications spelling variants). */
const authorAliases: Record<string, string> = {
  "abdul kabeer": "a-kabir",
  "abdul kabir": "a-kabir",
  "ahmad arsalan": "a-arsalan",
  "umer amir": "u-amir",
  "muhammad umer amir": "u-amir",
};

function normalizePersonName(name: string) {
  return name.replace(/^(Dr\.|Prof\.)\s+/i, "").toLowerCase().trim();
}

/** True when a publication author string refers to this person. */
export function personMatchesAuthor(person: Person, authorName: string) {
  const author = normalizePersonName(authorName);
  const self = normalizePersonName(person.name);
  if (author === self || author.includes(self) || self.includes(author)) return true;
  return authorAliases[author] === person.id;
}

