import { useEffect, useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/hub-login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Hub Access — Kenneth Remmitz" },
      { name: "description", content: "Private sign-in for the Kenneth Remmitz Hub." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Hub Access — Kenneth Remmitz" },
      {
        property: "og:description",
        content: "Private sign-in for the Kenneth Remmitz Hub.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HubLoginPage,
});

function HubLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Already signed in? Straight to the hub.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/hub", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setSubmitting(false);
      return;
    }
    navigate({ to: "/hub", replace: true });
  }

  return (
    <div className="dark flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="label-mono">Private area</p>
          <h1 className="editorial-display mt-3 text-3xl">Kenneth Remmitz Hub</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Sign in to access your command center.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-border bg-card p-6 shadow-soft"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hub-email">Email</Label>
              <Input
                id="hub-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hub-password">Password</Label>
              <Input
                id="hub-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Signing in
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
