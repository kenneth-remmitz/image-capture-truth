import { useEffect, useState } from "react";
import { Link2, Mail, ShieldAlert, Timer, Trash } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LinkedAccount {
  id: string;
  slot: number;
  email: string | null;
  status: string;
}

const TRIAGE_TABS = [
  {
    value: "urgent",
    label: "Urgent",
    icon: ShieldAlert,
    copy: "Once an inbox is connected, mail flagged as urgent will land here for immediate attention.",
  },
  {
    value: "follow-up",
    label: "Follow-Up",
    icon: Timer,
    copy: "Threads waiting on a reply will queue here so nothing slips through.",
  },
  {
    value: "quick-sweep",
    label: "Quick Sweep / Delete",
    icon: Trash,
    copy: "Low-value mail will be batched here for a fast one-click sweep.",
  },
] as const;

export function GmailTriage({ userId }: { userId: string }) {
  const [accounts, setAccounts] = useState<LinkedAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("linked_google_accounts")
      .select("id, slot, email, status")
      .eq("user_id", userId)
      .order("slot", { ascending: true })
      .then(({ data }) => {
        if (cancelled) return;
        if (data) setAccounts(data as LinkedAccount[]);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const slots = [1, 2, 3].map(
    (slot) => accounts.find((account) => account.slot === slot) ?? null,
  );

  return (
    <section
      aria-label="Unified Gmail triage"
      className="rounded-xl border border-border bg-card"
    >
      <header className="border-b border-border px-5 py-4">
        <p className="label-mono">Unified 3-Gmail Triage</p>
        <h2 className="mt-1 font-display text-lg">Panel 02 — Inboxes</h2>
      </header>

      <div className="space-y-3 px-5 py-5">
        {loading
          ? [1, 2, 3].map((slot) => (
              <div
                key={slot}
                className="h-14 animate-pulse rounded-lg border border-border bg-muted"
              />
            ))
          : slots.map((account, index) => (
              <div
                key={account?.id ?? `slot-${index}`}
                className={
                  account?.status === "connected"
                    ? "flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-4 py-3"
                    : "flex items-center justify-between gap-3 rounded-lg border border-dashed border-border px-4 py-3"
                }
              >
                {account?.status === "connected" ? (
                  <>
                    <div className="flex min-w-0 items-center gap-3">
                      <Mail
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="truncate text-sm">{account.email}</span>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Connected
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex min-w-0 items-center gap-3 text-muted-foreground">
                      <Link2
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="truncate text-sm">
                        Empty slot — account {index + 1}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      title="Available in Phase 3"
                    >
                      Connect Gmail Account
                    </Button>
                  </>
                )}
              </div>
            ))}
      </div>

      <div className="border-t border-border px-5 py-5">
        <Tabs defaultValue="urgent">
          <TabsList className="w-full justify-start">
            {TRIAGE_TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="text-xs">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {TRIAGE_TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-4">
              <div className="flex items-start gap-3 rounded-lg border border-border bg-background px-4 py-4 text-sm text-muted-foreground">
                <tab.icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <p>{tab.copy}</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
