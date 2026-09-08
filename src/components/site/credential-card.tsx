import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

export type Credential = {
  name: string;
  provider: string;
  date: string;
  viewHref?: string;
  downloadHref?: string;
};

/** Reusable credential / certificate card. Documents can stay placeholders for now. */
export function CredentialCard({ name, provider, date, viewHref, downloadHref }: Credential) {
  const pending = !viewHref && !downloadHref;

  return (
    <article className="surface-card-interactive flex flex-col py-7">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 items-center justify-center border border-accent text-accent">
          <Award className="size-4" />
        </span>
        <span className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
          {date}
        </span>
      </div>

      <h3 className="mt-8 text-2xl leading-snug font-normal">{name}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{provider}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" asChild={!!viewHref} disabled={!viewHref}>
          {viewHref ? (
            <a href={viewHref} target="_blank" rel="noreferrer">
              <Eye /> View
            </a>
          ) : (
            <span>
              <Eye /> View
            </span>
          )}
        </Button>
        <Button variant="ghost" size="sm" asChild={!!downloadHref} disabled={!downloadHref}>
          {downloadHref ? (
            <a href={downloadHref} download>
              <Download /> Download
            </a>
          ) : (
            <span>
              <Download /> Download
            </span>
          )}
        </Button>
      </div>

      {pending && (
        <p className="mt-3 font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
          Document to be added
        </p>
      )}
    </article>
  );
}
