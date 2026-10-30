import { createFileRoute } from "@tanstack/react-router";
import type { ModelMessage } from "ai";

import { runArgon, ARGON_MODEL } from "@/lib/argon/argon.server";

// Server route for the Argon assistant. Verifies the caller's session,
// restricts access to the single hub owner (ALLOWED_USER_ID), calls the
// Lovable AI Gateway (streamed, consumed server-side) and persists the reply.
export const Route = createFileRoute("/api/hub-argon")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = (request.headers.get("Authorization") ?? "")
          .replace(/^Bearer\s+/i, "")
          .trim();
        if (!token) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const supabaseUrl = process.env["SUPABASE_URL"];
        const publishableKey = process.env["SUPABASE_PUBLISHABLE_KEY"];
        if (!supabaseUrl || !publishableKey) {
          return Response.json({ error: "Server is not configured" }, { status: 500 });
        }

        // Verify the caller's JWT with the auth server.
        const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
          headers: { apikey: publishableKey, Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const user = (await userRes.json()) as { id?: string };
        const userId = user.id;

        // Strictly restrict the assistant to the hub owner.
        const allowed = process.env["ALLOWED_USER_ID"];
        if (!userId || !allowed || userId !== allowed) {
          return Response.json({ error: "Unauthorized" }, { status: 403 });
        }

        let body: { prompt?: unknown; history?: unknown };
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }
        const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
        if (!prompt) {
          return Response.json({ error: "A message is required." }, { status: 400 });
        }
        const history = Array.isArray(body.history)
          ? body.history.filter(
              (m): m is { role: "user" | "assistant"; content: string } =>
                !!m &&
                typeof m === "object" &&
                ((m as { role?: unknown }).role === "user" ||
                  (m as { role?: unknown }).role === "assistant") &&
                typeof (m as { content?: unknown }).content === "string",
            )
          : [];

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return Response.json({ error: "AI is not configured" }, { status: 500 });
        }

        const messages: ModelMessage[] = [
          ...history.slice(-30).map(
            (m) => ({ role: m.role, content: m.content }) as ModelMessage,
          ),
          { role: "user", content: prompt },
        ];

        try {
          const { reply } = await runArgon({
            apiKey,
            messages,
            abortSignal: request.signal,
          });
          if (!reply) {
            return Response.json(
              { error: "The assistant returned an empty response." },
              { status: 502 },
            );
          }

          // Persist Argon's reply as the authenticated user (RLS applies).
          const insertRes = await fetch(`${supabaseUrl}/rest/v1/hub_messages`, {
            method: "POST",
            headers: {
              apikey: publishableKey,
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Prefer: "return=minimal",
            },
            body: JSON.stringify({
              user_id: userId,
              role: "assistant",
              content: reply,
              model: ARGON_MODEL,
            }),
          });
          if (!insertRes.ok) {
            console.error("hub-argon: failed to persist reply", insertRes.status);
          }

          return Response.json({ reply });
        } catch (error) {
          if (request.signal.aborted) {
            return Response.json({ error: "Request cancelled" }, { status: 499 });
          }
          const message =
            error instanceof Error ? error.message : "The AI request failed.";
          return Response.json({ error: message }, { status: 502 });
        }
      },
    },
  },
});
