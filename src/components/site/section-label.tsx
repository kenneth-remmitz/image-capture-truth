import type { ReactNode } from "react";
import { cn } from "@/lib/utils";


/** Small developer-style label, e.g. `<SectionLabel>About</SectionLabel>` -> "// ABOUT" */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("label-mono inline-block", className)}>
      <span aria-hidden="true">// </span>
      {children}
    </span>
  );
}
