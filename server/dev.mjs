import { createServer } from "node:http";
import { Readable } from "node:stream";
import console from "node:console";
import { createProjectHandler } from "./projects.ts";
/* global Request, Headers, URL */

const port = 8787;
const handler = createProjectHandler({
  origins: ["http://127.0.0.1:5173", "http://localhost:5173"],
});
// No delivery adapter is installed in this runner. Allowed POSTs return 503.
const server = createServer(async (incoming, outgoing) => {
  try {
    const url = new URL(incoming.url || "/", `http://127.0.0.1:${port}`);
    if (url.pathname !== "/api/projects") {
      outgoing.writeHead(404, {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      });
      outgoing.end(JSON.stringify({ code: "NOT_FOUND" }));
      incoming.resume();
      return;
    }
    const headers = new Headers();
    for (const [name, value] of Object.entries(incoming.headers)) {
      if (value !== undefined)
        headers.set(name, Array.isArray(value) ? value.join(", ") : value);
    }
    const method = incoming.method || "GET";
    const request = new Request(url, {
      method,
      headers,
      ...(method === "GET" || method === "HEAD"
        ? {}
        : { body: Readable.toWeb(incoming), duplex: "half" }),
    });
    const response = await handler(
      request,
      incoming.socket.remoteAddress || "local",
    );
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    outgoing.end(await response.text());
    incoming.resume();
  } catch {
    outgoing.writeHead(500, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    });
    outgoing.end(JSON.stringify({ code: "SERVER_ERROR" }));
    incoming.resume();
  }
});
server.requestTimeout = 15_000;
server.headersTimeout = 10_000;
server.listen(port, "127.0.0.1", () =>
  console.log(
    `Local API: http://127.0.0.1:${port}/api/projects (delivery disabled)`,
  ),
);
