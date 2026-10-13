import { demoReply } from "./demo";
import {
  chatLimits,
  parseChat,
  trimChatHistory,
  type ChatMessage,
} from "../shared/chat";
export const chatEnabled = import.meta.env.VITE_YANGAN_CHAT === "enabled";
export class ChatError extends Error {
  constructor(public readonly kind: "invalid" | "busy" | "unavailable") {
    super(
      kind === "invalid"
        ? "Geçerli bir soru gerekli."
        : kind === "busy"
          ? "Çok hızlı ilerledik. Bir dakika bekleyip tekrar deneyebilirsin."
          : "Yangan'a şu anda bağlanılamıyor. Tekrar deneyebilir veya fikrini proje özetine dönüştürebilirsin.",
    );
    this.name = "ChatError";
  }
}
export async function replyToChat(
  messages: ChatMessage[],
  signal?: AbortSignal,
): Promise<string> {
  if (!chatEnabled) return demoReply(messages.at(-1)?.content ?? "");
  const history = trimChatHistory(messages);
  if (!parseChat({ messages: history })) throw new ChatError("invalid");
  let response: Response;
  try {
    response = await fetch("/api/chat", {
      method: "POST",
      signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    });
  } catch {
    throw new ChatError("unavailable");
  }
  if (response.status === 429) throw new ChatError("busy");
  let result: { code?: unknown; text?: unknown } | null;
  try {
    result = await response.json();
  } catch {
    throw new ChatError("unavailable");
  }
  if (
    response.status !== 200 ||
    result?.code !== "REPLIED" ||
    typeof result.text !== "string" ||
    !result.text.trim() ||
    result.text.length > chatLimits.reply
  )
    throw new ChatError("unavailable");
  return result.text;
}
