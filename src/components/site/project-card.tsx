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
          ? "surface-card-interactive flex flex-col py-10 lg:col-span-2 lg:grid lg:grid-cols-[0.7fr_1.3fr] lg:gap-14"
          : "surface-card-interactive flex flex-col py-8"
      }
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-[0.65rem] tracking-widest text-accent uppercase">
          {kind}
        </span>
        <span className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
          {year}
        </span>
      </div>

      <h3 className={featured ? "mt-6 text-4xl font-normal sm:text-5xl" : "mt-6 text-2xl font-normal"}>
        {name}
      </h3>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{summary}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {technologies.map((t, i) => (
          <li
            key={`${slug}-tech-${i}`}
            className="border-b border-border pb-1 text-xs font-medium text-secondary-foreground"
          >
            {t}
          </li>
        ))}
      </ul>

      <div className={featured ? "mt-8 flex flex-wrap items-center gap-2 lg:col-start-2" : "mt-8 flex flex-wrap items-center gap-2"}>
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
        <p className="mt-3 font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase lg:col-start-2">
          Links to be added
        </p>
      )}
    </article>
  );
}
