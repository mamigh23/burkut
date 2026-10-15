import { execFileSync } from "node:child_process";
import { readFileSync, existsSync, unlinkSync, renameSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";
import console from "node:console";

const account = process.argv[2];
if (!account || !/^[a-zA-Z0-9_]{1,32}$/.test(account))
  throw new Error(
    "Usage: npm run release:cpanel -- CPANEL_ACCOUNT (never pass a password)",
  );
// Only the public staging folder is archived. The live private config is untouched.
execFileSync(
  process.execPath,
  ["scripts/prepare-cpanel-smtp.mjs", "YOUR_ADDRESS@gmail.com", account],
  { stdio: "inherit" },
);
const stage = readFileSync("artifacts/cpanel-smtp-stage.txt", "utf8").trim();
execFileSync(process.execPath, ["scripts/check-assets.mjs"], {
  stdio: "inherit",
});
const manifest = JSON.parse(
  readFileSync(`${stage}/public/release.json`, "utf8"),
);
execFileSync(process.execPath, ["scripts/check-site.mjs"], {
  stdio: "inherit",
});
if (
  manifest.submission !== "enabled" ||
  manifest.endpoint !== "/api/projects.php" ||
  ["web", "uygulama", "oyun"].some(
    (slug) => !existsSync(`${stage}/public/hizmetler/${slug}/index.html`),
  ) ||
  existsSync(`${stage}/public/config.php`) ||
  existsSync(`${stage}/public/vendor`)
)
  throw new Error("Release checks failed: do not upload this package.");
const zip = resolve("artifacts/burkut-cpanel-smtp.zip");
if (process.platform !== "win32")
  throw new Error(
    `Public staging is ready at ${stage}/public. ZIP packaging currently requires PowerShell on Windows.`,
  );
const quote = (value) => `'${value.replaceAll("'", "''")}'`;
const temporaryZip = `${zip}.next`;
if (existsSync(temporaryZip)) unlinkSync(temporaryZip);
execFileSync(
  "powershell.exe",
  [
    "-NoProfile",
    "-NonInteractive",
    "-Command",
    `$ErrorActionPreference='Stop'; Add-Type -AssemblyName System.IO.Compression.FileSystem; [IO.Compression.ZipFile]::CreateFromDirectory((Join-Path ${quote(stage)} 'public'), ${quote(temporaryZip)})`,
  ],
  { stdio: "inherit" },
);
renameSync(temporaryZip, zip);
console.log(
  `Public SMTP release: ${zip}\nDo not replace the live private config.`,
);
