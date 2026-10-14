import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import process from "node:process";
import console from "node:console";

// Writes staging files only. Never reads a real server config or SMTP password.
const gmail = process.argv[2] || "YOUR_ADDRESS@gmail.com";
const cpanelUser = process.argv[3];
if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(gmail))
  throw new Error("A Gmail address is required; do not pass any password.");
if (cpanelUser && !/^[a-zA-Z0-9_]{1,32}$/.test(cpanelUser))
  throw new Error("Use only the cPanel account name, never a password.");
const source = resolve("server/cpanel");
if (!existsSync(`${source}/vendor/autoload.php`))
  throw new Error("Run composer install in server/cpanel first.");
execFileSync(
  process.execPath,
  ["node_modules/typescript/bin/tsc", "--noEmit"],
  { stdio: "inherit" },
);
execFileSync(process.execPath, ["node_modules/vite/bin/vite.js", "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    VITE_PROJECT_SUBMISSION: "enabled",
    VITE_PROJECT_ENDPOINT: "/api/projects.php",
    VITE_YANGAN_CHAT: "disabled",
  },
});
// A fresh directory prevents old assets or private configs leaking into the package.
const stage = resolve(`artifacts/cpanel-smtp-${Date.now()}`);
mkdirSync(stage, { recursive: true });
cpSync("dist", `${stage}/public`, { recursive: true });
cpSync(`${source}/public/api`, `${stage}/public/api`, { recursive: true });
if (cpanelUser) {
  const endpoint = `${stage}/public/api/projects.php`;
  writeFileSync(
    endpoint,
    readFileSync(endpoint, "utf8").replace(
      "/home/CPANEL_USER/burkut-private",
      `/home/${cpanelUser}/burkut-private`,
    ),
  );
}
mkdirSync(`${stage}/private`);
cpSync(`${source}/vendor`, `${stage}/private/vendor`, { recursive: true });
cpSync(`${source}/ProjectMail.php`, `${stage}/private/ProjectMail.php`);
cpSync(`${source}/email-logo.png`, `${stage}/private/email-logo.png`);
writeFileSync(
  `${stage}/private/config.php`,
  readFileSync(`${source}/config.example.php`, "utf8").replaceAll(
    "YOUR_ADDRESS@gmail.com",
    gmail,
  ),
);
writeFileSync("artifacts/cpanel-smtp-stage.txt", stage);
console.log(
  `SMTP staging: ${stage}\nPrivate config has a blank password and enabled=false.`,
);
