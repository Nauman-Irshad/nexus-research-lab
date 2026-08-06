/**
 * Central site configuration.
 * Edit this file to change lab identity, contact details and social profiles
 * across the entire website.
 */

export const site = {
  name: "Nexus Research Lab",
  shortName: "NRL",
  legalName: "Nexus Research Lab (NRL)",
  tagline:
    "Advancing Artificial Intelligence, Cybersecurity, Digital Twins, and Intelligent Systems through Collaborative Research.",
  description:
    "Nexus Research Lab (NRL) is an independent, student-led collaborative research laboratory working on artificial intelligence, cybersecurity, machine learning, digital twins, intrusion detection and intelligent systems.",
  url: "https://nexusresearchlab.org",
  founded: 2024,
  established: "Established 2024 · Independent collaborative research group · Lahore",
  contact: {
    email: "naumanirshadalishah@gmail.com",
    collaborations: "naumanirshadalishah@gmail.com",
    admissions: "naumanirshadalishah@gmail.com",
    phone: "+92 333 438 8037",
    phoneHref: "tel:+923334388037",
    whatsapp: "https://wa.me/923334388037",
    addressLines: [
      "Nexus Research Lab",
      "University of Central Punjab",
      "Lahore, Punjab",
      "Pakistan",
    ],
    officeHours: "Monday – Friday, 10:00 – 18:00 (PKT, UTC+5)",
    mapQuery: "University of Central Punjab, Lahore, Pakistan",
    mapEmbed:
      "https://www.google.com/maps?q=University%20of%20Central%20Punjab%2C%20Lahore%2C%20Pakistan&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=University+of+Central+Punjab,+Lahore,+Pakistan",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/nauman-irshad-ali-shah-aa4799342/",
    github: "https://github.com/Nauman-Irshad",
  },
  mission:
    "Advance scientific knowledge through interdisciplinary research while fostering collaboration among students, faculty members, and researchers.",
  vision:
    "To become a globally recognized collaborative research laboratory contributing impactful innovations in Artificial Intelligence and Cybersecurity.",
  values: [
    {
      title: "Open science",
      body: "Code, datasets and conference manuscripts are released alongside every paper so that results can be reproduced and extended by anyone.",
    },
    {
      title: "Mentorship first",
      body: "Undergraduate and master's researchers are co-authors, not assistants. Every project pairs a student lead with a faculty advisor.",
    },
    {
      title: "Rigour over volume",
      body: "We prefer fewer, carefully validated contributions with honest baselines, ablations and statistical reporting.",
    },
    {
      title: "Research with consequence",
      body: "We work on problems with measurable impact on safety, health and critical infrastructure resilience.",
    },
  ],
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "People", href: "/people" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "Upcoming Work", href: "/upcoming" },
  { label: "Publications", href: "/publications" },
  { label: "Conference", href: "/conference" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const collaborationPartners = [
  "University of Central Punjab (UCP), Lahore",
  "UCP Faculty of Information Technology & Computer Science (FOITCS)",
  "UCP Office of Research, Innovation & Commercialization (ORIC)",
  "Lahore Chamber of Commerce and Industry (LCCI)",
  "Beaconhouse National University (BNU), Lahore",
  "Techificent",
  "19th International Agri Asia Conference",
  "Impact Factor Finder (Dr. Ahmad Arsalan)",
] as const;
