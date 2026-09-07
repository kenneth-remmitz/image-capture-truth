import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

/** Reusable project card. Featured projects get a wider, richer layout. */
export function ProjectCard({ project }: { project: Project }) {
  const { slug, name, kind, year, summary, technologies, githubUrl, liveUrl, featured } = project;

  return (
    <article
      className={
        featured
          ? "surface-card-interactive flex flex-col p-8 sm:p-10 lg:col-span-2"
          : "surface-card-interactive flex flex-col p-7"
      }
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-[0.65rem] tracking-widest text-foreground uppercase">
          {kind}
        </span>
        <span className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
          {year}
        </span>
      </div>

      <h3 className={featured ? "mt-5 text-3xl font-semibold" : "mt-5 text-xl font-semibold"}>
        {name}
      </h3>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{summary}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {technologies.map((t, i) => (
          <li
            key={`${slug}-tech-${i}`}
            className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
          >
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-2 pt-0">
        <Button variant={featured ? "accent" : "outline"} size="sm" asChild>
          <Link to="/projects/$slug" params={{ slug }}>
            Case study <ArrowUpRight />
          </Link>
        </Button>

        {githubUrl ? (
          <Button variant="ghost" size="sm" asChild>
            <a href={githubUrl} target="_blank" rel="noreferrer">
              <Github /> GitHub
            </a>
          </Button>
        ) : (
          <Button variant="ghost" size="sm" disabled>
            <Github /> GitHub
          </Button>
        )}

        {liveUrl ? (
          <Button variant="ghost" size="sm" asChild>
            <a href={liveUrl} target="_blank" rel="noreferrer">
              <Globe /> Live
            </a>
          </Button>
        ) : (
          <Button variant="ghost" size="sm" disabled>
            <Globe /> Live
          </Button>
        )}
      </div>

      {!githubUrl && !liveUrl && (
        <p className="mt-3 font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
          Links to be added
        </p>
      )}
    </article>
  );
}
