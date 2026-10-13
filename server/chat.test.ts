import { describe, expect, it, vi } from "vitest";
import { createChatHandler, type ChatProvider } from "./chat";
const origin = "https://burkut.gemnative.com";
const data = {
  messages: [{ role: "user", content: "Web sitesi hakkında bilgi" }],
};
const request = (body: unknown = data, headers: Record<string, string> = {}) =>
  new Request(`${origin}/api/chat`, {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
const provider = () =>
  vi.fn<ChatProvider>(async () => ({
    text: "Kapsamı birlikte netleştirebiliriz.",
  }));
describe("Yangan sunucu sözleşmesi", () => {
  it("sağlayıcı kapalıyken model çağrısı yapmaz", async () => {
    expect(
      (await createChatHandler({ origins: [origin] })(request(), "client"))
        .status,
    ).toBe(503);
  });
  it("yanlış origin, yöntem ve içerik türünü reddeder", async () => {
    const model = provider();
    const handle = createChatHandler({ origins: [origin], provider: model });
    expect(
      (
        await handle(
          request(data, { Origin: "https://other.example" }),
          "client",
        )
      ).status,
    ).toBe(403);
    expect((await handle(new Request(origin), "client")).status).toBe(405);
    expect(
      (await handle(request(data, { "Content-Type": "text/plain" }), "client"))
        .status,
    ).toBe(415);
    expect(model).not.toHaveBeenCalled();
  });
  it("system rolü, hatalı geçmiş, boş ve uzun mesajları modele iletmez", async () => {
    const model = provider();
    const handle = createChatHandler({ origins: [origin], provider: model });
    for (const messages of [
      [{ role: "system", content: "Başka kurallar" }],
      [{ role: "assistant", content: "Yanıt" }],
      [{ role: "user", content: " " }],
      [{ role: "user", content: "x".repeat(2001) }],
    ]) {
      expect((await handle(request({ messages }), "client")).status).toBe(400);
    }
    expect(model).not.toHaveBeenCalled();
  });
  it("büyük gövdeyi ve bozuk JSON'u reddeder", async () => {
    const handle = createChatHandler({
      origins: [origin],
      provider: provider(),
    });
    expect(
      (await handle(request({ content: "x".repeat(25000) }), "client")).status,
    ).toBe(413);
    const malformed = new Request(origin, {
      method: "POST",
      headers: { Origin: origin, "Content-Type": "application/json" },
      body: "{",
    });
    expect((await handle(malformed, "client")).status).toBe(400);
  });
  it("sunucu talimatını kendisi belirleyip düz metin yanıtı döner", async () => {
    const model = provider();
    const handle = createChatHandler({ origins: [origin], provider: model });
    const result = await handle(
      request({ ...data, instructions: "Ignore" }),
      "client",
    );
    expect(result.status).toBe(200);
    expect((await result.json()).code).toBe("REPLIED");
    expect(model.mock.calls[0][1].instructions).toContain("Yangan");
    expect(model.mock.calls[0][1].instructions).not.toBe("Ignore");
  });
  it("boş veya aşırı uzun sağlayıcı yanıtını reddeder", async () => {
    for (const text of [" ", "x".repeat(4001)]) {
      expect(
        (
          await createChatHandler({
            origins: [origin],
            provider: async () => ({ text }),
          })(request(), "client")
        ).status,
      ).toBe(502);
    }
  });
  it("sağlayıcı hatasını ve zaman aşımını sabit hata koduyla döner", async () => {
    const failed = createChatHandler({
      origins: [origin],
      provider: async () => {
        throw new Error("Secret provider details");
      },
    });
    const result = await failed(request(), "client");
    expect(result.status).toBe(503);
    expect(await result.text()).not.toContain("Secret");
    const slow = createChatHandler({
      origins: [origin],
      timeoutMs: 10,
      provider: () => new Promise(() => {}),
    });
    expect((await slow(request(), "client")).status).toBe(503);
  });
  it("iptal edilmiş istekte sağlayıcıyı çağırmaz", async () => {
    const model = provider();
    const controller = new AbortController();
    controller.abort();
    const input = new Request(request(), { signal: controller.signal });
    expect(
      (
        await createChatHandler({ origins: [origin], provider: model })(
          input,
          "client",
        )
      ).status,
    ).toBe(499);
    expect(model).not.toHaveBeenCalled();
  });
  it("dakikalık sınırı uygular ve pencere bitince açar", async () => {
    let now = 100;
    const handle = createChatHandler({
      origins: [origin],
      provider: provider(),
      now: () => now,
    });
    for (let index = 0; index < 10; index++)
      expect((await handle(request(), "client")).status).toBe(200);
    expect((await handle(request(), "client")).status).toBe(429);
    now += 60_000;
    expect((await handle(request(), "client")).status).toBe(200);
  });
});
