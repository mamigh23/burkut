export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
export const chatLimits = {
  messages: 10,
  message: 2000,
  total: 12000,
  reply: 4000,
};
export function parseChat(value: unknown): ChatMessage[] | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const messages = (value as { messages?: unknown }).messages;
  if (
    !Array.isArray(messages) ||
    !messages.length ||
    messages.length > chatLimits.messages
  )
    return null;
  const parsed: ChatMessage[] = [];
  let total = 0;
  for (const [index, message] of messages.entries()) {
    if (!message || typeof message !== "object" || Array.isArray(message))
      return null;
    if (
      message.role !== (index % 2 ? "assistant" : "user") ||
      typeof message.content !== "string"
    )
      return null;
    const content = message.content.trim();
    if (
      !content ||
      content.length >
        (message.role === "assistant"
          ? chatLimits.reply
          : chatLimits.message) ||
      content.includes("\0")
    )
      return null;
    total += content.length;
    if (total > chatLimits.total) return null;
    parsed.push({ role: message.role, content });
  }
  return parsed.at(-1)?.role === "user" ? parsed : null;
}

export function trimChatHistory(messages: ChatMessage[]): ChatMessage[] {
  let history = messages.slice(-9);
  while (
    history.length > 1 &&
    (history.reduce((total, message) => total + message.content.length, 0) >
      chatLimits.total ||
      new TextEncoder().encode(JSON.stringify({ messages: history }))
        .byteLength >
        24 * 1024)
  )
    history = history.slice(2);
  return history;
}
