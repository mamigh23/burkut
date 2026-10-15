import {
  type ProjectData,
  type Errors,
  projectLimits,
} from "../shared/project";
import { submitDemoProject } from "./demo";

export const projectSubmissionEnabled =
  import.meta.env.VITE_PROJECT_SUBMISSION === "enabled";
const projectEndpoint =
  import.meta.env.VITE_PROJECT_ENDPOINT === "/api/projects.php"
    ? "/api/projects.php"
    : "/api/projects";
export class ProjectSubmissionError extends Error {
  constructor(
    message: string,
    public readonly errors: Errors = {},
  ) {
    super(message);
  }
}
export async function submitProject(data: ProjectData, idempotencyKey: string) {
  if (!projectSubmissionEnabled) return submitDemoProject();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);
  try {
    const response = await fetch(projectEndpoint, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.status === 422) {
      const fields: Errors = {};
      for (const key of [
        "areas",
        ...Object.keys(projectLimits),
      ] as (keyof ProjectData)[]) {
        if (result.errors && typeof result.errors[key] === "string")
          fields[key] = result.errors[key];
      }
      throw new ProjectSubmissionError(
        "İşaretli alanları kontrol etmelisin.",
        fields,
      );
    }
    if (response.status === 429)
      throw new ProjectSubmissionError(
        "Kısa sürede çok fazla deneme oldu. Biraz sonra tekrar deneyebilirsin.",
      );
    if (response.status === 503 && result.code === "SUBMISSION_UNAVAILABLE")
      throw new ProjectSubmissionError(
        "Gönderim servisi şu anda kullanılamıyor. Bilgilerin korundu; e-posta veya telefonla da bize ulaşabilirsin.",
      );
    if (response.status === 503 && result.code === "SUBMISSION_BUSY")
      throw new ProjectSubmissionError(
        "Gönderim servisi şu anda yoğun. Bilgilerin korundu; daha sonra tekrar deneyebilir veya e-posta ile ulaşabilirsin.",
      );
    if (response.status === 503 && result.code === "DELIVERY_UNCONFIRMED")
      throw new ProjectSubmissionError(
        "Gönderimin teslim durumu doğrulanamadı. Yinelenen e-posta oluşturmamak için yeniden göndermeden önce bize e-posta veya telefonla ulaşabilirsin. Bilgilerin bu sayfada korundu.",
      );
    if (
      response.status !== 201 ||
      result.code !== "DELIVERED" ||
      typeof result.receipt !== "string" ||
      !result.receipt
    )
      throw new ProjectSubmissionError(
        "Teslim onayı alınamadı. Bilgilerin bu sayfada korundu.",
      );
    return {
      mode: "delivered",
      message:
        "Proje özetin iletildi. Talebini değerlendirip yazdığın e-posta adresinden seninle iletişime geçeceğiz. İlgin için teşekkürler.",
    };
  } catch (error) {
    if (error instanceof ProjectSubmissionError) throw error;
    throw new ProjectSubmissionError(
      "Bağlantı tamamlanamadı. Teslim durumu doğrulanamadı; bilgilerin bu sayfada korundu.",
    );
  } finally {
    clearTimeout(timer);
  }
}
