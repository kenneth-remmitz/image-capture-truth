import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  Braces,
  Code2,
  GraduationCap,
  Layers,
  Rocket,
  Sparkles,
  Wrench,
} from "lucide-react";
import { SectionLabel } from "@/components/site/section-label";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { CredentialCard, type Credential } from "@/components/site/credential-card";
import { credentialDocs } from "@/data/credentials";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "My Journey — Kenneth Remmitz" },
      {
        name: "description",
        content:
          "The story so far: studying software development, the technologies I learned, graduating, certifications and where I'm heading next as a graduate developer.",
      },
      { property: "og:title", content: "My Journey — Kenneth Remmitz" },
      {
        property: "og:description",
        content:
          "Studies, projects, graduation and certifications — the path that shaped me as a graduate software developer.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JourneyPage,
});

const milestones = [
  {
    period: "Placeholder date",
    title: "Started studying software development",
    icon: BookOpen,
    body: "Where the foundations were laid — programming fundamentals, problem solving and the first taste of building something that runs. Replace this with your own words.",
  },
  {
    period: "Placeholder date",
    title: "Learning different programming technologies",
    icon: Braces,
    body: "Broadening out from a single language into several — languages, frameworks, databases and tooling. Add the specifics you'd like highlighted here.",
  },
  {
    period: "Placeholder date",
    title: "Academic and personal projects",
    icon: Code2,
    body: "Turning coursework into real, working software, and starting side projects driven purely by curiosity. Project details to be added.",
  },
  {
    period: "Placeholder date",
    title: "Graduated",
    icon: GraduationCap,
    body: "Completed the qualification and stepped out of study mode with a much clearer sense of the kind of engineer I want to be. Exact qualification and date to be confirmed.",
  },
  {
    period: "Placeholder date",
    title: "Google AI Essentials certification",
    icon: Sparkles,
    body: "Formal grounding in how AI tools work and where they genuinely help. Add your own reflection on what this changed for you.",
  },
  {
    period: "Ongoing",
    title: "An interest in AI-assisted development",
    icon: Wrench,
    body: "Exploring how AI fits into a real development workflow — as an accelerator for the work, not a replacement for understanding it.",
  },
  {
    period: "Now",
    title: "Building more ambitious personal software",
    icon: Rocket,
    body: "Larger, longer-lived projects with real architecture behind them. This is where the journey is heading next.",
  },
];

const skillGroups = [
  {
    label: "Languages",
    icon: Braces,
    items: ["Placeholder", "Placeholder", "Placeholder"],
  },
  {
    label: "Frameworks & libraries",
    icon: Layers,
    items: ["Placeholder", "Placeholder", "Placeholder"],
  },
  {
    label: "Data & storage",
    icon: BookOpen,
    items: ["Placeholder", "Placeholder"],
  },
  {
    label: "Tools & workflow",
    icon: Wrench,
    items: ["Placeholder", "Placeholder", "Placeholder"],
  },
];

const education = [
  {
    qualification: "Software development qualification (placeholder)",
    institution: "Institution to be confirmed",
    period: "Year – Year",
    detail:
      "A short summary of the course focus, notable modules and anything you'd like to call out. Replace with real detail.",
  },
  {
    qualification: "Secondary education (placeholder)",
    institution: "Institution to be confirmed",
    period: "Year",
    detail: "Optional — remove this entry if you'd rather not include it.",
  },
];

const credentials: Credential[] = credentialDocs;

function JourneyPage() {
  return (
    <div id="top" className="min-h-screen">
      <SiteNav />

      <main>
        {/* About Me */}
        <section id="about" className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 grid-paper [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]" />
          <div className="container-page relative section-y">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <SectionLabel>About</SectionLabel>
                <h1 className="mt-5 max-w-2xl text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.05] font-semibold">
                  The short version of how I got here.
                </h1>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Placeholder introduction. A few sentences about who you are, what drew you to
                  software, and the kind of problems you enjoy working on. Send me the wording and
                  I'll put it in.
                </p>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                  A second placeholder paragraph for how you like to work — the habits, the
                  standards you hold yourself to, and where you want to grow next.
                </p>
              </div>

              <aside className="surface-card h-fit p-7">
                <SectionLabel>At a glance</SectionLabel>
                <dl className="mt-6 space-y-5">
                  {[
                    ["Currently", "Graduate software developer"],
                    ["Studying", "Software development"],
                    ["Exploring", "AI-assisted development"],
                    ["Next", "First developer role"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-6 border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <dt className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
                        {k}
                      </dt>
                      <dd className="text-right text-sm font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>
          </div>
        </section>

        {/* Journey timeline */}
        <section id="journey" className="border-b border-border">
          <div className="container-page section-y">
            <div className="max-w-2xl">
              <SectionLabel>Journey</SectionLabel>
              <h2 className="mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
                One thread running through the studying, the building and the graduating.
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Each step below fed into the next. The education, the skills and the certificates
                further down this page are all part of the same story.
              </p>
            </div>

            <ol className="relative mt-14 space-y-10 border-l border-border pl-8 sm:pl-12">
              {milestones.map(({ period, title, body, icon: Icon }) => (
                <li key={title} className="relative">
                  <span className="absolute top-1 -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground sm:-left-[3.55rem]">
                    <Icon className="size-3.5" />
                  </span>
                  <span className="font-mono text-[0.7rem] tracking-widest text-accent uppercase">
                    {period}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold">{title}</h3>
                  <p className="mt-2.5 max-w-2xl leading-relaxed text-muted-foreground">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="border-b border-border bg-card/40">
          <div className="container-page section-y">
            <SectionLabel>Education</SectionLabel>
            <h2 className="mt-4 max-w-xl text-3xl leading-tight font-semibold sm:text-4xl">
              Where the formal grounding came from.
            </h2>

            <div className="mt-12 space-y-4">
              {education.map((e) => (
                <article
                  key={e.qualification}
                  className="surface-card grid gap-4 p-7 md:grid-cols-[10rem_1fr] md:gap-8"
                >
                  <span className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
                    {e.period}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{e.qualification}</h3>
                    <p className="mt-1.5 text-sm text-accent">{e.institution}</p>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                      {e.detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="border-b border-border">
          <div className="container-page section-y">
            <div className="max-w-xl">
              <SectionLabel>Skills</SectionLabel>
              <h2 className="mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
                What I reach for, grouped by how I actually use it.
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Placeholder list — send me the technologies you want shown and I'll fill these in.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map(({ label, icon: Icon, items }) => (
                <div key={label} className="surface-card-interactive flex flex-col p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-foreground">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold">{label}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {items.map((item, i) => (
                      <li
                        key={`${label}-${i}`}
                        className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications">
          <div className="container-page section-y">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionLabel>Credentials</SectionLabel>
                <h2 className="mt-4 max-w-lg text-3xl leading-tight font-semibold sm:text-4xl">
                  Certifications and credentials.
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                View and download buttons are ready — they'll activate once you send me the
                documents.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {credentials.map((c, i) => (
                <CredentialCard key={`${c.name}-${i}`} {...c} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
