import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/site/theme-toggle";

const links = [
  { label: "About", to: "/journey", hash: "about" },
  { label: "Journey", to: "/journey", hash: "journey" },
  { label: "Skills", to: "/journey", hash: "skills" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/", hash: "contact" },
] as const;


export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-border bg-background/95 backdrop-blur-md" : "border-transparent",
      )}
    >
      <nav className="container-page flex h-20 items-center justify-between md:h-24">
        <Link to="/" className="group flex items-baseline gap-3">
          <span className="font-display text-xl font-bold">Kenneth Remmitz</span>
          <span className="hidden font-mono text-[0.6rem] tracking-widest text-accent uppercase sm:inline">Portfolio / 26</span>
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              {...("hash" in l ? { hash: l.hash } : {})}
              className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}

          <ThemeToggle />
          <Button variant="accent" size="sm" asChild>
            <Link to="/" hash="cv">
              Download CV
            </Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center border border-border bg-card text-foreground lg:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                {...("hash" in l ? { hash: l.hash } : {})}
                onClick={() => setOpen(false)}
                className="border-b border-border px-1 py-4 font-display text-xl text-foreground transition-colors hover:text-accent"
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-3 flex items-center justify-between">
              <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">Theme</span>
              <ThemeToggle />
            </div>
            <Button variant="accent" className="mt-2" asChild>
              <Link to="/" hash="cv" onClick={() => setOpen(false)}>
                Download CV
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
