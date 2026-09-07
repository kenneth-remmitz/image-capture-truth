import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/site/section-label";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { getProject } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { name, summary } = loaderData.project;
    return {
      meta: [
        { title: `${name} — Kenneth Remmitz` },
        { name: "description", content: summary },
        { property: "og:title", content: `${name} — Kenneth Remmitz` },
        { property: "og:description", content: summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const sections = [
    ["Problem / objective", project.problem],
    ["What I built", project.built],
    ["Challenges", project.challenges],
    ["Solution / approach", project.approach],
    ["Result", project.result],
  ] as const;

  return (
    <div id="top" className="min-h-screen">
      <SiteNav />

      <main>
        <section className="border-b border-border">
          <div className="container-page section-y">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> All projects
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-[0.65rem] tracking-widest text-foreground uppercase">
                {project.kind}
              </span>
              <span className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
                {project.year}
              </span>
            </div>

            <h1 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] leading-[1.06] font-semibold">
              {project.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {project.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.githubUrl ? (
                <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <Github /> GitHub
                  </a>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  <Github /> GitHub
                </Button>
              )}
              {project.liveUrl ? (
                <Button variant="accent" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <Globe /> Live project
                  </a>
                </Button>
              ) : (
                <Button variant="ghost" disabled>
                  <Globe /> Live project
                </Button>
              )}
            </div>
          </div>
        </section>

        <section>
          <div className="container-page section-y">
            <div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
              <div className="space-y-10">
                {sections.map(([heading, body]) => (
                  <div key={heading}>
                    <SectionLabel>{heading}</SectionLabel>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>

              <aside className="surface-card h-fit p-6">
                <SectionLabel>Technologies</SectionLabel>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((t, i) => (
                    <li
                      key={`${project.slug}-t-${i}`}
                      className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
