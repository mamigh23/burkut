import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { URL, fileURLToPath } from "node:url";
import console from "node:console";

const source = fileURLToPath(new URL("../dist/", import.meta.url));
const destination = fileURLToPath(new URL("../.qa-dist/", import.meta.url));
await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true, force: true });
const instrument = await readFile(
  new URL("./browser-performance.js", import.meta.url),
  "utf8",
);
const html = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
await writeFile(
  `${destination}/index.html`,
  html.replace("<head>", `<head><script>${instrument}</script>`),
);
console.log(
  "Local measurement copy prepared in .qa-dist; production dist was not modified.",
);
