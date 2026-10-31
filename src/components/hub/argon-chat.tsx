import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, Eraser } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface HubMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export function ArgonChat({ userId }: { userId: string }) {
  const [messages, setMessages] = useState<HubMessage[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("hub_messages")
      .select("id, role, content, created_at")
      .order("created_at", { ascending: true })
      .then(({ data, error: loadError }) => {
        if (cancelled) return;
        if (!loadError && data) setMessages(data as HubMessage[]);
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending]);

  useEffect(() => () => clearTimeout(clearTimer.current), []);

  async function handleSend() {
    const prompt = input.trim();
    if (!prompt || sending) return;

    setInput("");
    setError(null);
    setSending(true);

    const optimisticId = `local-${Date.now()}`;
    const history = messages.slice(-30).map((m) => ({
      role: m.role,
      content: m.content,
    }));
    setMessages((prev) => [
      ...prev,
      {
        id: optimisticId,
        role: "user",
        content: prompt,
        created_at: new Date().toISOString(),
      },
    ]);

    try {
      // Persist the user message (RLS scopes it to the signed-in owner).
      const { data: userRow, error: insertError } = await supabase
        .from("hub_messages")
        .insert({ user_id: userId, role: "user", content: prompt })
        .select("id, role, content, created_at")
        .single();
      if (insertError) throw insertError;
      setMessages((prev) =>
        prev.map((m) => (m.id === optimisticId ? (userRow as HubMessage) : m)),
      );

      const res = await fetch("/api/hub-argon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, history }),
      });
      const payload = (await res.json().catch(() => null)) as
        | { reply?: unknown; error?: unknown }
        | null;
      if (!res.ok) {
        throw new Error(
          typeof payload?.error === "string"
            ? payload.error
            : `Request failed (${res.status})`,
        );
      }
      const reply = String(payload?.reply ?? "");
      if (!reply) throw new Error("The assistant returned an empty response.");

      const { data: replyRow, error: replyError } = await supabase
        .from("hub_messages")
        .insert({ user_id: userId, role: "assistant", content: reply })
        .select("id, role, content, created_at")
        .single();
      if (replyError) throw replyError;
      setMessages((prev) => [...prev, replyRow as HubMessage]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } finally {
      setSending(false);
    }
  }

  async function handleClear() {
    if (!confirmClear) {
      setConfirmClear(true);
      clearTimer.current = setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    clearTimeout(clearTimer.current);
    setConfirmClear(false);
    const { error: deleteError } = await supabase
      .from("hub_messages")
      .delete()
      .eq("user_id", userId);
    if (deleteError) {
      setError("Could not clear the conversation.");
      return;
    }
    setMessages([]);
  }

  return (
    <section
      aria-label="Argon AI Assistant"
      className="flex min-h-[560px] flex-col rounded-xl border border-border bg-card xl:h-[calc(100vh-9rem)]"
    >
      <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <p className="label-mono">Argon AI Assistant</p>
          <h2 className="mt-1 font-display text-lg">Panel 01 — Assistant</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className={cn(
            "text-muted-foreground hover:text-foreground",
            confirmClear && "text-destructive hover:text-destructive",
          )}
        >
          <Eraser aria-hidden="true" />
          {confirmClear ? "Confirm clear" : "Clear Chat"}
        </Button>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
      >
        {loaded && messages.length === 0 ? (
          <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center">
            <p className="font-display text-lg">Ask Argon anything.</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Sharp, direct, technical answers — grounded in your conversation
              history.
            </p>
          </div>
        ) : null}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%]",
              message.role === "user" ? "ml-auto" : "mr-auto",
            )}
          >
            {message.role === "user" ? (
              <div className="rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                {message.content}
              </div>
            ) : (
              <div className="text-sm leading-relaxed text-foreground/90 [&_li]:ml-4 [&_li]:list-disc [&_ol_li]:list-decimal [&_p+p]:mt-3 [&_strong]:font-medium">
                <ReactMarkdown
                  components={{
                    pre: ({ children }) => (
                      <pre className="my-2 overflow-x-auto rounded-lg border border-border bg-background p-3 text-xs leading-relaxed">
                        {children}
                      </pre>
                    ),
                    code: ({ className, children, ...props }) => (
                      <code
                        className={cn(
                          "font-mono text-xs",
                          !className && "rounded bg-muted px-1 py-0.5",
                        )}
                        {...props}
                      >
                        {children}
                      </code>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}

        {sending ? (
          <div className="mr-auto flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
            </span>
            Argon is thinking
          </div>
        ) : null}
      </div>

      <footer className="border-t border-border px-5 py-4">
        {error ? (
          <p role="alert" className="mb-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Message Argon…"
            rows={1}
            className="max-h-32 min-h-[44px] resize-none"
            aria-label="Message Argon"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={sending || !input.trim()}
            aria-label="Send message"
            className="h-[44px] w-[44px] shrink-0"
          >
            <ArrowUp aria-hidden="true" />
          </Button>
        </div>
      </footer>
    </section>
  );
}
