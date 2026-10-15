import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, relative, isAbsolute } from "node:path";
import { JSDOM } from "jsdom";
import { serviceDetails } from "../src/content/serviceDetails.ts";
import { serviceExamples } from "../src/content/serviceExamples.ts";
import { heroCards } from "../src/content/heroCards.ts";
import { siteOrigin } from "../src/shared/siteMetadata.ts";
import { validateContent } from "../src/shared/validateContent.ts";
import console from "node:console";
import process from "node:process";
import { URL } from "node:url";

const root = resolve("dist");
const failures = validateContent(serviceDetails, serviceExamples, heroCards);
function requireLocal(url, label) {
  try {
    if (!url?.trim()) throw new Error("empty asset URL");
    const parsed = new URL(url, siteOrigin);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      failures.push(`${label}: unsupported asset protocol`);
      return;
    }
    if (parsed.origin !== siteOrigin) return;
    const path = resolve(root, "." + decodeURIComponent(parsed.pathname));
    const boundary = relative(root, path);
    if (
      boundary.startsWith("..") ||
      isAbsolute(boundary) ||
      !existsSync(path) ||
      !statSync(path).isFile()
    )
      failures.push(
        `${label}: missing or invalid local file ${parsed.pathname}`,
      );
  } catch {
    failures.push(`${label}: malformed asset URL ${url}`);
  }
}
const sitemap = readFileSync(resolve(root, "sitemap.xml"), "utf8");
const titles = new Set();
const routes = ["/", ...serviceDetails.map((service) => service.path)];
for (const route of routes) {
  const entry = resolve(root, "." + route, "index.html");
  if (!existsSync(entry)) {
    failures.push(`Missing page ${route}`);
    continue;
  }
  const dom = new JSDOM(readFileSync(entry, "utf8"));
  const doc = dom.window.document;
  const canonicals = doc.querySelectorAll('link[rel="canonical"]');
  if (
    canonicals.length !== 1 ||
    canonicals[0].getAttribute("href") !== siteOrigin + route
  )
    failures.push(`Wrong canonical: ${route}`);
  if (!doc.title || titles.has(doc.title))
    failures.push(`Missing or duplicate title: ${route}`);
  titles.add(doc.title);
  if (!doc.querySelector('meta[name="description"]')?.getAttribute("content"))
    failures.push(`Missing description: ${route}`);
  if (!sitemap.includes(`<loc>${siteOrigin + route}</loc>`))
    failures.push(`Missing sitemap URL: ${route}`);
  const schema = doc.querySelector('script[type="application/ld+json"]');
  try {
    const json = JSON.parse(schema?.textContent || "");
    if (!json["@graph"]?.some((node) => node["@type"] === "Organization"))
      throw new Error();
    if (
      route !== "/" &&
      !json["@graph"].some(
        (node) =>
          node["@type"] === "Service" && node.url === siteOrigin + route,
      )
    )
      throw new Error();
  } catch {
    failures.push(`Missing or invalid structured data: ${route}`);
  }
  for (const element of doc.querySelectorAll(
    'script[src], link[rel="stylesheet"], link[rel="icon"], link[rel="apple-touch-icon"], img[src]',
  ))
    requireLocal(
      element.getAttribute("src") || element.getAttribute("href"),
      route,
    );
  const social = doc
    .querySelector('meta[property="og:image"]')
    ?.getAttribute("content");
  if (!social || !social.startsWith(siteOrigin + "/"))
    failures.push(`Invalid share image: ${route}`);
  else requireLocal(social, route);
  dom.window.close();
}
for (const example of Object.values(serviceExamples))
  for (const image of example.images) {
    requireLocal(image.src, example.title);
  }
for (const card of heroCards)
  if (card.image) requireLocal(card.image.src, card.label);
if (failures.length) {
  failures.forEach((failure) => console.error(failure));
  process.exitCode = 1;
} else
  console.log(
    `Site checks passed: ${routes.length} pages, content, metadata, sitemap and configured images. External links and browser interactions were not tested.`,
  );
