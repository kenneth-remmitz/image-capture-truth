export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page py-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
            Kenneth Remmitz — Software Developer Graduate
          </p>
          <p className="text-sm text-muted-foreground">
            Designed &amp; developed by Kenneth Remmitz. © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
