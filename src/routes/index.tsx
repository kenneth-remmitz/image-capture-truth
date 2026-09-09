import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Download, FolderGit2, Route as RouteIcon, User, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/site/section-label";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kenneth Remmitz — Graduate Software Developer" },
      {
        name: "description",
        content:
          "Portfolio of Kenneth Remmitz, a graduate software developer building thoughtful, well-crafted web software. See the journey, projects and CV.",
      },
      { property: "og:title", content: "Kenneth Remmitz — Graduate Software Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Kenneth Remmitz, a graduate software developer building thoughtful, well-crafted web software.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const previews = [
  {
    label: "About",
    to: "/journey" as const,
    hash: "about",
    icon: User,
    title: "Who I am",
    body: "A short story of how I got into software, what I care about, and the way I like to work.",
  },
  {
    label: "Journey",
    to: "/journey" as const,
    hash: "journey",
    icon: RouteIcon,
    title: "Studies to shipping",
    body: "A timeline of study, internships, self-driven builds and the skills picked up along the way.",
  },
  {
    label: "Projects",
    to: "/projects" as const,
    hash: "work",
    icon: FolderGit2,
    title: "Things I've built",
    body: "Selected work with the problem, the decisions behind it, and what I would do differently next.",
  },
];

const facts = [
  { k: "Focus", v: "Full-stack web" },
  { k: "Stack", v: "TypeScript · React · Python" },
  { k: "Based", v: "Johannesburg, SA" },
];

function Index() {
  return (
    <div id="top" className="min-h-screen">
      <SiteNav />

      <main>
        {/* Hero */}
        <section className="overflow-hidden border-b border-border">
          <div className="container-page section-y">
            <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
              <div className="lg:col-span-9">
                <SectionLabel>Introduction</SectionLabel>
                <h1 className="editorial-display mt-8 text-[clamp(3.6rem,10vw,8.5rem)]">
                  Kenneth Remmitz.
                  <br />
                  <span className="font-normal text-accent italic">Graduate software</span>
                  <br />
                  developer.
                </h1>
              </div>
              <div className="flex flex-col justify-end lg:col-span-3 lg:pb-3">
                <p className="max-w-xl border-l border-accent pl-6 text-lg leading-relaxed text-muted-foreground">
                  I build careful, well-structured software for the web — from clean interfaces
                  through to the systems behind them. This is a placeholder for your personal
                  introduction; tell me what you'd like it to say and I'll replace it.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Button variant="accent" size="lg" asChild>
                    <a href="#projects">
                      View projects <ArrowRight />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#journey">My journey</a>
                  </Button>
                  <Button variant="ghost" size="lg" asChild>
                    <a href="#cv">
                      <Download /> CV
                    </a>
                  </Button>
                </div>

              </div>
              <dl className="editorial-rule flex flex-wrap gap-x-10 gap-y-5 pt-6 lg:col-span-7 lg:mt-10">
                  {facts.map((f) => (
                    <div key={f.k}>
                      <dt className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
                        {f.k}
                      </dt>
                      <dd className="mt-1 text-sm font-medium">{f.v}</dd>
                    </div>
                  ))}
              </dl>

              {/* Developer identity as a quiet editorial accent */}
              <div className="border-t border-accent pt-5 lg:col-span-5 lg:mt-10">
                <div className="flex min-h-48 items-center justify-center bg-secondary sm:min-h-56">
                  <div className="text-center text-muted-foreground">
                    <UserRound className="mx-auto size-8" strokeWidth={1.25} />
                    <span className="mt-4 block font-mono text-[0.65rem] tracking-widest uppercase">Portrait reserved</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-b border-border pb-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="h-2.5 w-2.5 rounded-full bg-sand" />
                  <span className="h-2.5 w-2.5 rounded-full bg-sage" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    profile.ts
                  </span>
                </div>
                <pre className="mt-5 overflow-x-auto font-mono text-[0.72rem] leading-6 text-muted-foreground">
                  <code>{`const kenneth = {
  role: "Graduate Developer",
  learning: ["systems", "craft"],
  building: "in public",
  openTo: "junior roles",
};`}</code>
                </pre>
                <div className="mt-5 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
                  </span>
                  <span className="text-sm text-secondary-foreground">
                    Available for graduate opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preview of what's further down */}
        <section id="about">
          <div className="container-page section-y">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionLabel>What's below</SectionLabel>
                <h2 className="mt-5 max-w-2xl text-4xl leading-tight font-normal sm:text-6xl">
                  A short tour of the rest of the site.
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Each of these has its own page — jump straight to whichever interests you.
              </p>
            </div>

            <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-3">
              {previews.map(({ label, to, hash, icon: Icon, title, body }) => (
                <Link
                  key={label}
                  to={to}
                  hash={hash}
                  className="surface-card-interactive group flex flex-col py-8 md:nth-[2]:mt-20"
                >
                  <span className="flex h-10 w-10 items-center justify-center border border-accent text-accent">
                    <Icon className="size-4" />
                  </span>
                  <span className="label-mono mt-6 block">
                    <span aria-hidden="true">// </span>
                    {label}
                  </span>
                  <h3 className="mt-4 text-2xl font-normal">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                    Explore <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CV call to action */}
        <section id="cv" className="border-t border-border">
          <div className="container-page section-y">
            <div className="editorial-rule flex flex-col items-start gap-8 pt-10 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionLabel>CV</SectionLabel>
                <h2 className="mt-5 text-4xl font-normal sm:text-6xl">
                  Want the one-page version?
                </h2>
                <p className="mt-3 max-w-md text-sm text-muted-foreground">
                  Send me your CV file and I'll wire this button up to download it.
                </p>
              </div>
              <Button variant="accent" size="lg">
                <Download /> Download CV
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
