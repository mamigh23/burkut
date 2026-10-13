import { afterEach, describe, expect, it, vi } from "vitest";
import type { ProjectData } from "../shared/project";
const data: ProjectData = {
  areas: ["web"],
  name: "Örnek",
  email: "ornek@example.com",
  detail: "Site",
  phone: "",
  company: "",
  budget: "",
};
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.resetModules();
});
async function enabledService(response: Response | Error) {
  vi.stubEnv("VITE_PROJECT_SUBMISSION", "enabled");
  vi.stubGlobal(
    "fetch",
    response instanceof Error
      ? vi.fn().mockRejectedValue(response)
      : vi.fn().mockResolvedValue(response),
  );
  return import("./projects");
}
describe("form teslim istemcisi", () => {
  it("kapalı modda ağ isteği yapmaz", async () => {
    vi.stubEnv("VITE_PROJECT_SUBMISSION", "disabled");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const { submitProject } = await import("./projects");
    const result = await submitProject(data, "key");
    expect(result.mode).toBe("demo");
    expect(fetch).not.toHaveBeenCalled();
  });
  it("sadece doğrulanmış teslim alındısını başarı sayar", async () => {
    const { submitProject } = await enabledService(
      Response.json({ code: "DELIVERED", receipt: "ack" }, { status: 201 }),
    );
    expect((await submitProject(data, "test-key")).mode).toBe("delivered");
  });
  it("cPanel PHP rotasını seçer ve istek anahtarını korur", async () => {
    vi.stubEnv("VITE_PROJECT_ENDPOINT", "/api/projects.php");
    const { submitProject } = await enabledService(
      Response.json({ code: "DELIVERED", receipt: "ack" }, { status: 201 }),
    );
    await submitProject(data, "same-request-key");
    expect(fetch).toHaveBeenCalledWith(
      "/api/projects.php",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Idempotency-Key": "same-request-key",
        }),
      }),
    );
  });
  it("200 cevabını veya eksik alındıyı başarı saymaz", async () => {
    const { submitProject } = await enabledService(
      Response.json({ code: "DELIVERED" }),
    );
    await expect(submitProject(data, "test-key")).rejects.toThrow(
      "Teslim onayı alınamadı",
    );
  });
  it("sunucu alan hatalarını ve bağlantı kesilmesini aktarır", async () => {
    const service = await enabledService(
      Response.json({ errors: { email: "E-posta hatalı" } }, { status: 422 }),
    );
    await expect(service.submitProject(data, "test-key")).rejects.toMatchObject(
      { errors: { email: "E-posta hatalı" } },
    );
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Offline")));
    await expect(service.submitProject(data, "test-key")).rejects.toThrow(
      "Teslim durumu doğrulanamadı",
    );
  });
});
