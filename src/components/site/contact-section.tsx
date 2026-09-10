import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { SectionLabel } from "@/components/site/section-label";

type Channel = {
  label: string;
  value: string;
  href?: string;
  icon: typeof Mail;
};

/** Placeholder details — real addresses and profile links to be supplied. */
const channels: Channel[] = [
  { label: "Email", value: "Email address to be added", icon: Mail },
  { label: "GitHub", value: "GitHub profile to be added", icon: Github },
  { label: "LinkedIn", value: "LinkedIn profile to be added", icon: Linkedin },
];

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="container-page section-y">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel>Contact</SectionLabel>
            <h2 className="editorial-display mt-6 text-[clamp(2.5rem,6vw,4.5rem)]">
              Let’s talk.
            </h2>
            <p className="mt-6 max-w-md border-l border-border pl-6 leading-relaxed text-muted-foreground">
              The quickest way to reach me is by email. Send me your real address and profile
              links and I’ll make each of these live.
            </p>
          </div>

          <ul className="lg:col-span-6 lg:mt-4">
            {channels.map(({ label, value, href, icon: Icon }) => (
              <li key={label} className="editorial-rule last:border-b last:border-border">
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-6 py-6 transition-colors hover:text-accent"
                  >
                    <span className="flex items-center gap-4">
                      <Icon className="size-4 text-muted-foreground" />
                      <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
                        {label}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 text-sm font-medium">
                      {value}
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center justify-between gap-6 py-6">
                    <span className="flex items-center gap-4">
                      <Icon className="size-4 text-muted-foreground" />
                      <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
                        {label}
                      </span>
                    </span>
                    <span className="text-right text-sm text-muted-foreground">{value}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
