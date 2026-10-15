import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { gzipSync } from "node:zlib";
import { URL, fileURLToPath } from "node:url";
import console from "node:console";
import process from "node:process";

const root = new URL("../dist/", import.meta.url);
const files = [];
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else files.push(path);
  }
}
const directory = fileURLToPath(root);
await collect(directory);
let js = 0;
let css = 0;
let fonts = 0;
const failures = [];
for (const path of files) {
  if (!/\.(js|css|svg|webp|png|jpe?g|avif|woff2?)$/.test(path)) continue;
  const data = await readFile(path);
  if (path.endsWith(".js")) js += gzipSync(data).byteLength;
  else if (path.endsWith(".css")) css += gzipSync(data).byteLength;
  else if (/\.woff2?$/.test(path)) fonts += data.byteLength;
  else if (data.byteLength > 600 * 1024)
    failures.push(
      `${relative(directory, path)} exceeds the 600 KiB image budget.`,
    );
}
if (!files.some((path) => path.endsWith(".js")))
  failures.push("Missing JavaScript build.");
if (!files.some((path) => path.endsWith(".css")))
  failures.push("Missing stylesheet build.");
if (js > 100 * 1024)
  failures.push("JavaScript exceeds the 100 KiB gzip budget.");
if (css > 20 * 1024) failures.push("CSS exceeds the 20 KiB gzip budget.");
if (fonts > 210 * 1024) failures.push("Fonts exceed the 210 KiB budget.");
console.log(
  `Build assets: JS ${(js / 1024).toFixed(1)} KiB gzip, CSS ${(css / 1024).toFixed(1)} KiB gzip, fonts ${(fonts / 1024).toFixed(1)} KiB.`,
);
if (failures.length) {
  for (const failure of failures) console.error(failure);
  process.exitCode = 1;
} else
  console.log(
    "Asset budgets passed. This check does not measure browser performance.",
  );
