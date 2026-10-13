import { describe, expect, it, vi } from "vitest";
import { createProjectHandler, type Delivery } from "./projects";

const origin = "http://127.0.0.1:5173";
const project = {
  areas: ["web"],
  name: "Örnek Kullanıcı",
  email: "ornek@example.com",
  detail: "Kurumsal web sitesi",
  phone: "",
  company: "",
  budget: "",
};
const makeRequest = (
  data: unknown = project,
  key = "12345678-1234-1234-1234-123456789012",
  extra: Record<string, string> = {},
) =>
  new Request("http://localhost/api/projects", {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/json",
      "Idempotency-Key": key,
      ...extra,
    },
    body: JSON.stringify(data),
  });
const delivery = () =>
  vi.fn<Delivery>(async () => ({ receipt: "local-test-ack" }));

describe("proje talep sözleşmesi", () => {
  it("bağlantı kurulmadığında teslim başarısı üretmez", async () => {
    const response = await createProjectHandler({ origins: [origin] })(
      makeRequest(),
      "client",
    );
    expect(response.status).toBe(503);
    expect((await response.json()).code).toBe("SUBMISSION_UNAVAILABLE");
  });
  it("izinsiz origin'i ve POST dışındaki yöntemleri reddeder", async () => {
    const deliver = delivery();
    const handle = createProjectHandler({ origins: [origin], deliver });
    expect(
      (
        await handle(
          makeRequest(project, undefined, {
            Origin: "https://untrusted.example",
          }),
          "client",
        )
      ).status,
    ).toBe(403);
    expect(
      (await handle(new Request("http://localhost/api/projects"), "client"))
        .status,
    ).toBe(405);
    expect(deliver).not.toHaveBeenCalled();
  });
  it("JSON türünü ve geçersiz gövdeyi reddeder", async () => {
    const handle = createProjectHandler({
      origins: [origin],
      deliver: delivery(),
    });
    expect(
      (
        await handle(
          makeRequest(project, undefined, { "Content-Type": "text/plain" }),
          "client",
        )
      ).status,
    ).toBe(415);
    const malformed = new Request("http://localhost/api/projects", {
      method: "POST",
      headers: {
        Origin: origin,
        "Content-Type": "application/json",
        "Idempotency-Key": "1234567890123456",
      },
      body: "{",
    });
    expect((await handle(malformed, "client")).status).toBe(400);
  });
  it("tip, alan ve uzunluk hatalarını sunucuda yakalar", async () => {
    const deliver = delivery();
    const handle = createProjectHandler({ origins: [origin], deliver });
    const response = await handle(
      makeRequest({
        ...project,
        areas: ["invalid"],
        name: 12,
        detail: "x".repeat(4001),
      }),
      "client",
    );
    expect(response.status).toBe(422);
    expect(Object.keys((await response.json()).errors)).toEqual(
      expect.arrayContaining(["areas", "name", "detail"]),
    );
    expect(deliver).not.toHaveBeenCalled();
  });
  it("tek satırlık alanlarda satır enjeksiyonunu reddeder", async () => {
    const handle = createProjectHandler({
      origins: [origin],
      deliver: delivery(),
    });
    expect(
      (
        await handle(
          makeRequest({ ...project, name: "Ad\r\nBcc: hidden@example.com" }),
          "client",
        )
      ).status,
    ).toBe(422);
  });
  it("büyük gövdeyi teslim adaptöründen önce durdurur", async () => {
    const deliver = delivery();
    const response = await createProjectHandler({ origins: [origin], deliver })(
      makeRequest({ ...project, detail: "x".repeat(25000) }),
      "client",
    );
    expect(response.status).toBe(413);
    expect(deliver).not.toHaveBeenCalled();
  });
  it("yalnızca teslim onayından sonra başarılı cevap verir", async () => {
    const deliver = delivery();
    const response = await createProjectHandler({ origins: [origin], deliver })(
      makeRequest({ ...project, name: "  Örnek  " }),
      "client",
    );
    expect(response.status).toBe(201);
    expect((await response.json()).receipt).toBe("local-test-ack");
    expect(deliver.mock.calls[0][0]).toMatchObject({ name: "Örnek" });
  });
  it("aynı anahtar ve içerik için tek teslim yapar", async () => {
    const deliver = delivery();
    const handle = createProjectHandler({ origins: [origin], deliver });
    const results = await Promise.all([
      handle(makeRequest(), "client"),
      handle(makeRequest(), "client"),
    ]);
    expect(results.map((response) => response.status)).toEqual([201, 201]);
    expect(deliver).toHaveBeenCalledTimes(1);
    expect(
      (
        await handle(
          makeRequest({ ...project, detail: "Başka kapsam" }),
          "client",
        )
      ).status,
    ).toBe(409);
  });
  it("başarısız teslimi aynı anahtarla otomatik tekrarlamaz", async () => {
    const deliver = vi.fn(async () => {
      throw new Error("Provider unavailable");
    });
    const handle = createProjectHandler({ origins: [origin], deliver });
    expect((await handle(makeRequest(), "client")).status).toBe(503);
    expect((await handle(makeRequest(), "client")).status).toBe(503);
    expect(deliver).toHaveBeenCalledTimes(1);
  });
  it("teslim alındısı olmadan başarı üretmez", async () => {
    const handle = createProjectHandler({
      origins: [origin],
      deliver: async () => ({ receipt: "" }),
    });
    expect((await handle(makeRequest(), "client")).status).toBe(503);
  });
  it("takılan teslimi zaman aşımıyla sonlandırır", async () => {
    const handle = createProjectHandler({
      origins: [origin],
      timeoutMs: 10,
      deliver: (_, { signal }) =>
        new Promise((_, reject) =>
          signal.addEventListener("abort", () => reject(new Error("Aborted"))),
        ),
    });
    expect((await handle(makeRequest(), "client")).status).toBe(503);
  });
  it("yoğunluğu sınırlayıp pencere sonunda yeniden izin verir", async () => {
    let now = 100;
    const handle = createProjectHandler({
      origins: [origin],
      now: () => now,
      deliver: delivery(),
    });
    for (let i = 0; i < 5; i++) await handle(makeRequest(), "client");
    const blocked = await handle(makeRequest(), "client");
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toBe("60");
    now += 60_000;
    expect((await handle(makeRequest(), "client")).status).toBe(201);
  });
});
