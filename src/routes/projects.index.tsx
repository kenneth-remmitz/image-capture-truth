import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site/section-label";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { ProjectCard } from "@/components/site/project-card";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Kenneth Remmitz" },
      {
        name: "description",
        content:
          "Selected software projects by Kenneth Remmitz — the problem behind each one, what was built, the technologies used and the approach taken.",
      },
      { property: "og:title", content: "Projects — Kenneth Remmitz" },
      {
        property: "og:description",
        content:
          "Selected software projects — the problem, the build, the technologies and the approach behind each one.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div id="top" className="min-h-screen">
      <SiteNav />

      <main>
        <section className="border-b border-border">
          <div className="container-page section-y">
            <SectionLabel>Projects</SectionLabel>
            <h1 className="editorial-display mt-8 max-w-5xl text-[clamp(3.5rem,9vw,7.5rem)]">
              Not just a list of <em className="font-normal text-accent">names</em> and technologies.
            </h1>
            <p className="mt-12 max-w-xl border-l border-accent pl-6 text-lg leading-relaxed text-muted-foreground md:ml-auto">
              Each project below opens into a fuller write-up: the problem, what I built, the
              challenges, how I worked through them and where it ended up. The content is
              placeholder for now — send me the real detail and I'll fill it in.
            </p>
          </div>
        </section>

        <section id="work">
          <div className="container-page section-y">
             <div className="grid gap-x-16 gap-y-20 lg:grid-cols-2 [&>article:nth-child(3)]:lg:mt-24">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
