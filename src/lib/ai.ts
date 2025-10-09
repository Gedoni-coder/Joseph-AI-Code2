import type { ChatMessage } from "./chatbot-data";

export interface AIOptions {
  model?: string;
  temperature?: number;
  system?: string;
  webContext?: string | null;
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
const DEFAULT_MODEL = (import.meta.env.VITE_OPENAI_MODEL as string | undefined) || "gpt-4o-mini";

function toOpenAIMessages(history: ChatMessage[], system?: string, webContext?: string) {
  const msgs: Array<{ role: "system" | "user" | "assistant"; content: string }> = [];
  const sysParts: string[] = [];
  if (system && system.trim()) sysParts.push(system.trim());
  if (webContext && webContext.trim()) sysParts.push(`Relevant web context (summarized):\n${webContext.trim()}`);
  if (sysParts.length) {
    msgs.push({ role: "system", content: sysParts.join("\n\n") });
  }
  for (const m of history) {
    msgs.push({ role: m.type === "user" ? "user" : "assistant", content: m.content });
  }
  return msgs;
}

export async function generateAIResponse(history: ChatMessage[], opts: AIOptions = {}): Promise<string | null> {
  if (!OPENAI_API_KEY) return null;
  const model = opts.model || DEFAULT_MODEL;
  const body = {
    model,
    temperature: typeof opts.temperature === "number" ? opts.temperature : 0.3,
    messages: toOpenAIMessages(history, opts.system, opts.webContext),
  } as const;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  const content: string | undefined = data?.choices?.[0]?.message?.content;
  return content ?? null;
}
