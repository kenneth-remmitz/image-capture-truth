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

/**
 * Placeholder project content. Replace the copy with real detail —
 * nothing here should be presented as a factual achievement yet.
 */
export const projects: Project[] = [
  {
    slug: "personal-management-application",
    name: "Personal management application",
    kind: "Flagship personal project",
    year: "In progress",
    featured: true,
    summary:
      "A larger personal system for organising my own work, applications and day-to-day admin. Placeholder description — replace with your own.",
    problem:
      "Placeholder: describe the problem you set out to solve and why the existing options didn't fit.",
    built:
      "Placeholder: describe what you actually built — the main screens, the moving parts, and the scope you took on.",
    technologies: ["Placeholder", "Placeholder", "Placeholder"],
    challenges:
      "Placeholder: the parts that were genuinely hard, and what made them hard.",
    approach:
      "Placeholder: how you worked through those challenges and the decisions you settled on.",
    result:
      "Placeholder: the outcome so far and what you'd like to do next. Add real detail only when you have it.",
  },
  {
    slug: "academic-project",
    name: "Academic project (placeholder)",
    kind: "Academic project",
    year: "Year TBC",
    summary: "Placeholder description of a project completed during your studies.",
    problem: "Placeholder: the brief or the problem the project addressed.",
    built: "Placeholder: what you delivered.",
    technologies: ["Placeholder", "Placeholder"],
    challenges: "Placeholder: the difficult parts.",
    approach: "Placeholder: how you approached them.",
    result: "Placeholder: how it turned out and what you learned.",
  },
  {
    slug: "personal-project",
    name: "Personal project (placeholder)",
    kind: "Personal project",
    year: "Year TBC",
    summary: "Placeholder description of something you built out of curiosity.",
    problem: "Placeholder: what prompted you to build it.",
    built: "Placeholder: what it does.",
    technologies: ["Placeholder", "Placeholder"],
    challenges: "Placeholder: the difficult parts.",
    approach: "Placeholder: how you approached them.",
    result: "Placeholder: where it stands now.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
