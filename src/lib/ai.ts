import type { ChatMessage } from "./chatbot-data";

export interface AIOptions {
  model?: string;
  temperature?: number;
  system?: string;
  webContext?: string | null;
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
const DEFAULT_OPENAI_MODEL = (import.meta.env.VITE_OPENAI_MODEL as string | undefined) || "gpt-4o-mini";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const DEFAULT_GEMINI_MODEL = (import.meta.env.VITE_GEMINI_MODEL as string | undefined) || "gemini-1.5-flash";

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

function toGeminiBody(history: ChatMessage[], system?: string, webContext?: string, model?: string, temperature?: number) {
  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
  const sysParts: string[] = [];
  if (system && system.trim()) sysParts.push(system.trim());
  if (webContext && webContext.trim()) sysParts.push(`Relevant web context (summarized):\n${webContext.trim()}`);
  const systemInstruction = sysParts.length ? { role: "system", parts: [{ text: sysParts.join("\n\n") }] } : undefined;

  for (const m of history) {
    contents.push({ role: m.type === "user" ? "user" : "model", parts: [{ text: m.content }] });
  }

  return {
    model: model || DEFAULT_GEMINI_MODEL,
    contents,
    system_instruction: systemInstruction,
    generationConfig: {
      temperature: typeof temperature === "number" ? temperature : 0.3,
    },
  };
}

export async function generateAIResponse(history: ChatMessage[], opts: AIOptions = {}): Promise<string | null> {
  // Try OpenAI first if key exists
  if (OPENAI_API_KEY) {
    try {
      const model = opts.model || DEFAULT_OPENAI_MODEL;
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

      if (res.ok) {
        const data = await res.json();
        const content: string | undefined = data?.choices?.[0]?.message?.content;
        if (content) return content;
      }
    } catch {
      // Continue to Gemini fallback
    }
  }

  // Fallback to Gemini if configured
  if (GEMINI_API_KEY) {
    try {
      const body = toGeminiBody(history, opts.system || undefined, opts.webContext || undefined, opts.model, opts.temperature);
      const url = `https://generativelanguage.googleapis.com/v1/models/${encodeURIComponent(body.model)}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: body.contents,
          system_instruction: body.system_instruction,
          generationConfig: body.generationConfig,
        }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      const parts = data?.candidates?.[0]?.content?.parts || [];
      const text = parts.map((p: any) => p?.text).filter(Boolean).join("\n");
      return text || null;
    } catch {
      return null;
    }
  }

  return null;
}
