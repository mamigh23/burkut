import { demoReply } from "./demo";
import {
  chatLimits,
  parseChat,
  trimChatHistory,
  type ChatMessage,
} from "../shared/chat";
export const chatEnabled = import.meta.env.VITE_YANGAN_CHAT === "enabled";
export async function replyToChat(
  messages: ChatMessage[],
  signal?: AbortSignal,
): Promise<string> {
  if (!chatEnabled) return demoReply(messages.at(-1)?.content ?? "");
  const history = trimChatHistory(messages);
  if (!parseChat({ messages: history }))
    throw new Error("Geçerli bir soru gerekli.");
  const response = await fetch("/api/chat", {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: history }),
  });
  if (response.status === 429)
    throw new Error("Biraz ara verip tekrar deneyebilirsin.");
  const result = await response.json();
  if (
    response.status !== 200 ||
    result?.code !== "REPLIED" ||
    typeof result.text !== "string" ||
    !result.text.trim() ||
    result.text.length > chatLimits.reply
  )
    throw new Error(
      "Yangan'a şu anda bağlanılamıyor. Tekrar deneyebilir veya proje özeti hazırlayabilirsin.",
    );
  return result.text;
}
