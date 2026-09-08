export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="container-page flex flex-col gap-8 py-16 sm:flex-row sm:items-end sm:justify-between md:py-24">
        <div>
          <p className="font-display text-3xl font-normal sm:text-4xl">Let’s make something thoughtful.</p>
          <p className="mt-4 font-mono text-[0.65rem] tracking-widest text-accent uppercase">Available for graduate opportunities</p>
        </div>
        <div className="sm:text-right">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Kenneth Remmitz — Graduate Software Developer
        </p>
        <p className="text-sm text-muted-foreground">
          Built and maintained by hand. © {new Date().getFullYear()}
        </p>
        </div>
      </div>
    </footer>
  );
}
