import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  Braces,
  Code2,
  GraduationCap,
  Layers,
  Rocket,
  Sparkles,
  Users,
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
    period: "2023",
    title: "Started my Software Development Diploma",
    icon: BookOpen,
    body: "Began studying Information Technology in Software Development at IIE Rosebank College in Cape Town, building my foundation in programming, databases, web development and application development.",
  },
  {
    period: "April 2025 – November 2025",
    title: "Became a Tutor",
    icon: Users,
    body: "I was offered a tutoring role through Rosebank College, where I helped first-year students work through Java, C# and SQL fundamentals. Teaching other students strengthened my own understanding and taught me how to explain technical problems in different ways.",
  },
  {
    period: "2025",
    title: "Completed my Diploma",
    icon: GraduationCap,
    body: "Completed my Diploma in Information Technology in Software Development, marking the end of my formal studies and the beginning of the next stage — applying what I had learned to projects beyond the classroom.",
  },
  {
    period: "2026",
    title: "CAPACITI AI Acceleration Programme",
    icon: Wrench,
    body: "Completed a one-week AI Acceleration Programme with CAPACITI, gaining practical exposure to AI tools and workflows and exploring how they can support modern software-development work.",
  },
  {
    period: "12 August 2026",
    title: "Google AI Essentials",
    icon: Sparkles,
    body: "Completed the Google AI Essentials specialization, developed by Google and delivered through Coursera, further developing my understanding of productive and responsible AI use.",
  },
  {
    period: "Now",
    title: "Building and sharpening my craft",
    icon: Rocket,
    body: "I'm currently focused on projects that strengthen my web-development, database, software-engineering and AI-assisted development skills while looking for the opportunity to take those skills into a professional environment.",
  },
];

const skillGroups = [
  {
    label: "Programming Languages",
    icon: Braces,
    items: ["C#", "Java", "JavaScript", "Kotlin", "Python — currently learning"],
  },
  {
    label: "Web Development",
    icon: Code2,
    items: ["HTML/CSS"],
  },
  {
    label: "Databases",
    icon: Layers,
    items: ["SQL", "MySQL"],
  },
  {
    label: "Tools & Platforms",
    icon: Wrench,
    items: [
      "Visual Studio",
      "Visual Studio Code",
      "Git",
      "SQL Server Management Studio",
      "Android Studio",
      "Figma",
    ],
  },
];

const education = [
  {
    qualification: "Diploma in Information Technology in Software Development",
    institution: "IIE Rosebank College — Cape Town",
    period: "2023–2025 · Completed",
    detail:
      "A three-year software development qualification covering programming, web development, databases, application development, system analysis, human-computer interaction, software quality and testing, information security and related software-development principles.",
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
                <div className="mt-7 max-w-xl space-y-4 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    I'm a Software Development graduate from IIE Rosebank College in Cape Town,
                    with a strong interest in web development, databases and building practical
                    software that people can actually use.
                  </p>
                  <p>
                    I enjoy taking an idea from a rough concept to something structured, functional
                    and visually considered. Web development is one of the areas I enjoy most, but
                    I'm also continuing to grow my skills in C#, Python, database management and
                    the broader software-development process.
                  </p>
                </div>
                <div className="mt-4 max-w-xl space-y-4 leading-relaxed text-muted-foreground">
                  <p>
                    During my studies, I was offered a tutoring role through my campus, where I
                    helped first-year students work through Java, C# and SQL fundamentals. That
                    experience strengthened both my technical understanding and my ability to
                    explain problems in a way that makes sense to different people.
                  </p>
                  <p>
                    Outside of development, I enjoy getting outdoors when I can — hiking, swimming
                    and anything that gets me away from a screen for a while.
                  </p>
                </div>
              </div>

              <aside className="surface-card h-fit p-7">
                <SectionLabel>At a glance</SectionLabel>
                <dl className="mt-6 space-y-5">
                  {[
                    ["Currently", "Graduate software developer"],
                    ["Completed", "Diploma in IT in Software Development"],
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
                The technologies I've worked with across my studies, tutoring and personal
                projects — grouped by how I use them.
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
                  Certifications and documents.
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Explore my qualifications and supporting documents. My academic transcript is
                available on request.
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
