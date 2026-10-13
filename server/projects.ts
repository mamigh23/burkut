import { parseProject, type ProjectData } from "../src/shared/project.ts";

export type Delivery = (
  data: ProjectData,
  options: { signal: AbortSignal; idempotencyKey: string },
) => Promise<{ receipt: string }>;
interface Options {
  origins: string[];
  deliver?: Delivery;
  now?: () => number;
  timeoutMs?: number;
}
const reply = (
  status: number,
  code: string,
  extra: Record<string, unknown> = {},
  headers: Record<string, string> = {},
) =>
  Response.json(
    { code, ...extra },
    { status, headers: { "Cache-Control": "no-store", ...headers } },
  );

export function createProjectHandler(options: Options) {
  const now = options.now ?? Date.now;
  const buckets = new Map<string, { count: number; expires: number }>();
  const requests = new Map<
    string,
    { hash: string; expires: number; result: Promise<{ receipt: string }> }
  >();
  return async (request: Request, clientId: string): Promise<Response> => {
    if (request.method !== "POST")
      return reply(405, "METHOD_NOT_ALLOWED", {}, { Allow: "POST" });
    if (!options.origins.includes(request.headers.get("origin") || ""))
      return reply(403, "ORIGIN_DENIED");
    if (!options.deliver) return reply(503, "SUBMISSION_UNAVAILABLE");
    const time = now();
    for (const [key, value] of buckets)
      if (value.expires <= time) buckets.delete(key);
    for (const [key, value] of requests)
      if (value.expires <= time) requests.delete(key);
    const bucket = buckets.get(clientId);
    if (bucket && bucket.count >= 5)
      return reply(
        429,
        "RATE_LIMITED",
        {},
        { "Retry-After": String(Math.ceil((bucket.expires - time) / 1000)) },
      );
    if (!bucket && buckets.size >= 1000)
      return reply(429, "RATE_LIMITED", {}, { "Retry-After": "60" });
    buckets.set(clientId, {
      count: (bucket?.count ?? 0) + 1,
      expires: bucket?.expires ?? time + 60_000,
    });
    if (
      request.headers.get("content-type")?.split(";")[0].trim() !==
      "application/json"
    )
      return reply(415, "JSON_REQUIRED");
    const key = request.headers.get("idempotency-key") || "";
    if (!/^[a-zA-Z0-9-]{16,80}$/.test(key))
      return reply(400, "INVALID_REQUEST_KEY");
    if (!request.body) return reply(400, "INVALID_JSON");
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > 24 * 1024) {
          await reader.cancel();
          return reply(413, "PAYLOAD_TOO_LARGE");
        }
        chunks.push(value);
      }
    } catch {
      return reply(400, "INVALID_JSON");
    }
    const body = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(new TextDecoder().decode(body));
    } catch {
      return reply(400, "INVALID_JSON");
    }
    const { data, errors } = parseProject(parsed);
    if (!data) return reply(422, "VALIDATION_FAILED", { errors });
    const hash = Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(JSON.stringify(data)),
        ),
      ),
    ).join(",");
    const existing = requests.get(key);
    if (existing && existing.hash !== hash)
      return reply(409, "REQUEST_KEY_CONFLICT");
    if (!existing && requests.size >= 1000)
      return reply(503, "SUBMISSION_BUSY");
    if (!existing) {
      const controller = new AbortController();
      let timer: ReturnType<typeof setTimeout>;
      const timeout = new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          controller.abort();
          reject(new Error("Delivery timed out"));
        }, options.timeoutMs ?? 10_000);
      });
      const result = Promise.race([
        Promise.resolve().then(() =>
          options.deliver!(data, {
            signal: controller.signal,
            idempotencyKey: key,
          }),
        ),
        timeout,
      ])
        .then((value) => {
          if (!value?.receipt)
            throw new Error("Missing delivery acknowledgement");
          return value;
        })
        .finally(() => clearTimeout(timer));
      requests.set(key, { hash, expires: time + 600_000, result });
    }
    try {
      const result = await requests.get(key)!.result;
      return reply(201, "DELIVERED", { receipt: result.receipt });
    } catch {
      // Keep failed keys too: a timed-out provider may have accepted delivery.
      // The same key must not trigger an unbounded second delivery.
      return reply(503, "DELIVERY_UNCONFIRMED");
    }
  };
}
