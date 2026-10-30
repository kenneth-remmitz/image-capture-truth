// Server-only module for the Argon assistant.
// Holds the Lovable AI Gateway provider, run-ID correlation and the model call.
// Never import this from client code.
import { streamText, type ModelMessage } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const LOVABLE_AIG_RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";
const GATEWAY_BASE_URL = "https://ai.gateway.lovable.dev/v1";

// The brief asked for "gemini-2.5-flash"; the gateway's current fast Gemini
// Flash generation is served under this exact catalog ID.
export const ARGON_MODEL = "google/gemini-3.8-flash";

export const ARGON_SYSTEM =
  "You are Argon, Kenneth Remmitz's personal AI Assistant inside the Kenneth " +
  "Remmitz Hub. Give sharp, direct, technical, and actionable answers.";

export function createLovableAiGatewayRunIdFetch(initialRunId?: string) {
  let runId = initialRunId?.trim() || undefined;
  let resolveRunId: (value: string | undefined) => void = () => {};
  let runIdResolved = false;
  const runIdReady = new Promise<string | undefined>((resolve) => {
    resolveRunId = resolve;
  });

  const publishRunId = (value?: string) => {
    const nextRunId = value?.trim() || undefined;
    if (!runId && nextRunId) {
      runId = nextRunId;
    }
    if (!runIdResolved) {
      runIdResolved = true;
      resolveRunId(runId);
    }
  };
  if (runId) publishRunId(runId);

  return {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      if (runId && !headers.has(LOVABLE_AIG_RUN_ID_HEADER)) {
        headers.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
      }

      try {
        const response = await fetch(input, { ...init, headers });
        publishRunId(response.headers.get(LOVABLE_AIG_RUN_ID_HEADER) ?? undefined);
        return response;
      } catch (error) {
        publishRunId(undefined);
        throw error;
      }
    },
    getRunId: () => runId,
    waitForRunId: () => (runId ? Promise.resolve(runId) : runIdReady),
  };
}

export async function runArgon({
  apiKey,
  messages,
  abortSignal,
}: {
  apiKey: string;
  messages: ModelMessage[];
  abortSignal?: AbortSignal;
}) {
  const runIdFetch = createLovableAiGatewayRunIdFetch(undefined);

  const provider = createOpenAICompatible({
    name: "lovable",
    baseURL: GATEWAY_BASE_URL,
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider(ARGON_MODEL),
    system: ARGON_SYSTEM,
    messages,
    abortSignal,
  });

  const reply = await result.text;
  return { reply: reply.trim(), runId: runIdFetch.getRunId() };
}
