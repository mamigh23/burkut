import { afterEach, describe, expect, it, vi } from "vitest";
const messages = [{ role: "user" as const, content: "Web sitesi" }];
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.resetModules();
});
describe("Yangan istemci bağlantısı", () => {
  it("kapalı bayrakta ağ yerine hazır yanıt kullanır", async () => {
    vi.stubEnv("VITE_YANGAN_CHAT", "disabled");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const { replyToChat } = await import("./chat");
    expect(await replyToChat(messages)).toContain("Bürküt");
    expect(fetch).not.toHaveBeenCalled();
  });
  it("geçerli metni döner ve iptal sinyalini aktarır", async () => {
    vi.stubEnv("VITE_YANGAN_CHAT", "enabled");
    const fetch = vi
      .fn()
      .mockResolvedValue(Response.json({ code: "REPLIED", text: "Merhaba" }));
    vi.stubGlobal("fetch", fetch);
    const { replyToChat } = await import("./chat");
    const controller = new AbortController();
    expect(await replyToChat(messages, controller.signal)).toBe("Merhaba");
    expect(fetch.mock.calls[0][1].signal).toBe(controller.signal);
  });
  it("başarı olmayan veya bozuk cevabı yanıt olarak göstermez", async () => {
    vi.stubEnv("VITE_YANGAN_CHAT", "enabled");
    const fetch = vi
      .fn()
      .mockResolvedValue(Response.json({ code: "OTHER", text: "Yanıt" }));
    vi.stubGlobal("fetch", fetch);
    const { replyToChat } = await import("./chat");
    await expect(replyToChat(messages)).rejects.toThrow();
    fetch.mockResolvedValue(Response.json({}, { status: 429 }));
    await expect(replyToChat(messages)).rejects.toMatchObject({ kind: "busy" });
  });
  it("ağ hatası ve HTML hata sayfası için güvenli açıklama verir", async () => {
    vi.stubEnv("VITE_YANGAN_CHAT", "enabled");
    const fetch = vi
      .fn()
      .mockRejectedValue(new Error("private upstream detail"));
    vi.stubGlobal("fetch", fetch);
    const { replyToChat, ChatError } = await import("./chat");
    await expect(replyToChat(messages)).rejects.toBeInstanceOf(ChatError);
    await expect(replyToChat(messages)).rejects.toThrow(
      "şu anda bağlanılamıyor",
    );
    fetch.mockResolvedValue(
      new Response("<html>Service unavailable</html>", { status: 503 }),
    );
    await expect(replyToChat(messages)).rejects.toMatchObject({
      kind: "unavailable",
    });
  });
});
