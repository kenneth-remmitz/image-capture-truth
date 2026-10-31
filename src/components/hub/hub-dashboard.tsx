import { useNavigate } from "@tanstack/react-router";
import { LogOut, ArrowUpLeft } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useHubSession } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { ArgonChat } from "@/components/hub/argon-chat";
import { GmailTriage } from "@/components/hub/gmail-triage";
import { RemindersPanel } from "@/components/hub/reminders-panel";
import { Link } from "@tanstack/react-router";

export function HubDashboard() {
  const { userId } = useHubSession();
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/hub-login", replace: true });
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-baseline gap-3">
            <h1 className="editorial-display truncate text-xl">
              Kenneth Remmitz Hub
            </h1>
            <span className="label-mono hidden shrink-0 sm:inline">
              Command center
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500 md:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Encrypted Session Active
            </span>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowUpLeft aria-hidden="true" />
                <span className="hidden sm:inline">Portfolio</span>
                <span className="sm:hidden">Site</span>
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut aria-hidden="true" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container-page py-8">
        {userId ? (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <ArgonChat userId={userId} />
            <div className="grid content-start gap-6">
              <GmailTriage userId={userId} />
              <RemindersPanel userId={userId} />
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
