export type Project = {
  slug: string;
  name: string;
  summary: string;
  /** Short label shown on the card, e.g. "Personal project" */
  kind: string;
  year: string;
  featured?: boolean;
  problem: string;
  built: string;
  technologies: string[];
  challenges: string;
  approach: string;
  result: string;
  githubUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "kenneth-portfolio-personal-workspace",
    name: "Kenneth Portfolio & Personal Workspace",
    kind: "Flagship personal project",
    year: "In progress",
    featured: true,
    summary:
      "A personal portfolio and evolving productivity platform designed to showcase my development journey while growing into a private workspace for tasks, email management, job applications and AI-assisted workflows.",
    problem:
      "The project began as a redesign of my personal portfolio but has a larger goal: combining the public story of who I am as a developer with a private system that I can use every day.",
    built:
      "The public portfolio is built and live. The private workspace is planned to include task management, aggregated email workflows, job-application tracking and an integrated AI assistant.",
    technologies: ["TypeScript", "React", "TanStack Start", "Tailwind CSS", "Vite"],
    challenges:
      "The project serves as a practical way for me to revisit the complete software-development lifecycle — including frontend development, Git and GitHub, authentication, databases, APIs, security, testing and AI integration.",
    approach:
      "I'm deliberately using AI development tools as part of the workflow while keeping responsibility for the architecture, decisions, testing and understanding of the final system.",
    result:
      "The public portfolio is in place, with the private workspace features planned as the next stage of the build.",
    githubUrl: "https://github.com/kenneth-remmitz/image-capture-truth.git",
  },
  {
    slug: "little-heights-academy-website",
    name: "Little Heights Academy Website",
    kind: "Full-stack project",
    year: "2025",
    summary:
      "A full-stack parent portal built for Little Heights Academy using HTML, CSS and JavaScript. The system allows parents to create and manage accounts, add students, view academic progress and access information about the academy from one central place.",
    problem:
      "The academy needed one central place where parents could access information and follow their children's academic progress.",
    built:
      "A parent portal with account creation and management, the ability to add students, academic progress information, and general information about the academy.",
    technologies: ["HTML", "CSS", "JavaScript"],
    challenges:
      "Translating the requirements into a practical website, and handling authentication and account management for parent accounts.",
    approach:
      "I worked through the requirements section by section — authentication and account management first, then the parent and student functionality, then a responsive frontend design.",
    result:
      "A working parent portal covering account management, student records and academic progress information, built to work across screen sizes.",
    githubUrl: "https://github.com/kenneth-remmitz/LittleHeightsAcademyWebsite.git",
  },
  {
    slug: "tranquilitea",
    name: "Tranquilitea",
    kind: "CAPACITI AI Acceleration Programme",
    year: "2026",
    summary:
      "An AI-powered workplace management tool created during the CAPACITI AI Acceleration Programme. Tranquilitea helps users plan their day, summarise meeting notes and research topics through a calm, café-inspired assistant experience.",
    problem:
      "Workplace tools often add noise rather than calm. The brief was to explore how AI could support everyday work without that pressure.",
    built:
      "An assistant experience for daily planning, meeting-note summarisation and topic research, wrapped in a calm café-inspired interface.",
    technologies: ["AI-assisted development tools"],
    challenges:
      "Shaping AI-assisted workplace productivity into something focused, and keeping the interface calm while the underlying features grew.",
    approach:
      "I experimented with AI-assisted development tools throughout the programme, building the planning, summarisation and research features around the café-inspired concept.",
    result:
      "A working AI-assisted workplace tool completed within the one-week CAPACITI programme.",
    githubUrl: "https://github.com/kenneth-remmitz/tranquilitea-work-sanctuary.git",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
