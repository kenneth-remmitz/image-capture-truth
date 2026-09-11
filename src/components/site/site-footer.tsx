import { Link } from "@tanstack/react-router";

const footerLinks = [
  { label: "About", to: "/journey" as const, hash: "about" },
  { label: "Journey", to: "/journey" as const, hash: "journey" },
  { label: "Credentials", to: "/journey" as const, hash: "certifications" },
  { label: "Projects", to: "/projects" as const },
  { label: "Contact", to: "/" as const, hash: "contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="editorial-display text-3xl sm:text-4xl">
              Let’s make something thoughtful.
            </p>
            <p className="mt-5 font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
              Available for graduate opportunities
            </p>
          </div>

          <nav className="md:col-span-5 md:justify-self-end" aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {footerLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    {...("hash" in l ? { hash: l.hash } : {})}
                    className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="editorial-rule mt-14 flex flex-col gap-2 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
            Kenneth Remmitz — Graduate Software Developer
          </p>
          <p className="text-sm text-muted-foreground">
            Designed &amp; developed by Kenneth Remmitz. © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
