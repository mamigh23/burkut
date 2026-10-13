import { describe, expect, it } from "vitest";
import { parseChat, trimChatHistory, type ChatMessage } from "./chat";
describe("konuşma geçmişi sınırları", () => {
  it("uzun ama izinli model yanıtını sonraki sorunun geçmişinde kabul eder", () => {
    expect(
      parseChat({
        messages: [
          { role: "user", content: "Soru" },
          { role: "assistant", content: "a".repeat(3000) },
          { role: "user", content: "Devam" },
        ],
      }),
    ).not.toBeNull();
  });
  it("UTF-8 boyutunu tam konuşma çiftlerini çıkararak sınırlar", () => {
    const messages: ChatMessage[] = [
      { role: "user", content: "界".repeat(2000) },
      { role: "assistant", content: "界".repeat(4000) },
      { role: "user", content: "界".repeat(2000) },
      { role: "assistant", content: "界".repeat(4000) },
      { role: "user", content: "Son soru" },
    ];
    const trimmed = trimChatHistory(messages);
    expect(trimmed.at(-1)?.content).toBe("Son soru");
    expect(parseChat({ messages: trimmed })).not.toBeNull();
    expect(
      new TextEncoder().encode(JSON.stringify({ messages: trimmed }))
        .byteLength,
    ).toBeLessThanOrEqual(24 * 1024);
  });
});
