import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

interface HubSession {
  userId: string | null;
}

const HubSessionContext = createContext<HubSession>({ userId: null });

// eslint-disable-next-line react-refresh/only-export-components
export function useHubSession() {
  return useContext(HubSessionContext);
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      const uid = data.session?.user.id ?? null;
      if (!uid) {
        navigate({ to: "/hub-login", replace: true });
        return;
      }
      setUserId(uid);
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate({ to: "/hub-login", replace: true });
        return;
      }
      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        setUserId(session.user.id);
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  if (!ready) {
    return (
      <div className="dark flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.16em]">
            Verifying session
          </span>
        </div>
      </div>
    );
  }

  return (
    <HubSessionContext.Provider value={{ userId }}>
      {children}
    </HubSessionContext.Provider>
  );
}
