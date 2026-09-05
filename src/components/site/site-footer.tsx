export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="container-page flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Kenneth Remmitz — Graduate Software Developer
        </p>
        <p className="text-sm text-muted-foreground">
          Built and maintained by hand. © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
