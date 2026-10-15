import { execFileSync } from "node:child_process";
import {
  cpSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  unlinkSync,
  renameSync,
} from "node:fs";
import { resolve } from "node:path";
import process from "node:process";
import console from "node:console";

const account = process.argv[2];
const gmail = process.argv[3] || "YOUR_ADDRESS@gmail.com";
if (
  !account ||
  !/^[a-zA-Z0-9_]{1,32}$/.test(account) ||
  !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(gmail)
)
  throw new Error(
    "Usage: npm run release:full -- CPANEL_ACCOUNT ADDRESS@gmail.com. Never pass a password.",
  );
execFileSync(process.execPath, ["scripts/release-cpanel.mjs", account], {
  stdio: "inherit",
});
const stage = readFileSync("artifacts/cpanel-smtp-stage.txt", "utf8").trim();
const bundle = resolve(`artifacts/tam-kurulum-${Date.now()}`);
mkdirSync(bundle);
cpSync(`${stage}/public`, `${bundle}/site`, { recursive: true });
cpSync(`${stage}/private`, `${bundle}/burkut-private`, { recursive: true });
// Generate from the blank example. Never read the live/private server config.
writeFileSync(
  `${bundle}/burkut-private/config.php`,
  readFileSync("server/cpanel/config.example.php", "utf8").replaceAll(
    "YOUR_ADDRESS@gmail.com",
    gmail,
  ),
);
writeFileSync(
  `${bundle}/KURULUM.txt`,
  `BÜRKÜT — SIFIRDAN KURULUM

Arşivi önce bilgisayarında aç. Tamamını public_html içine çıkarma.
1. site/ İÇİNDEKİLERİ Bürküt domaininin Document Root klasörüne yükle.
   index.html, assets, images, hizmetler, api ve release.json kökte olmalı.
   assets/.htaccess gizli dosyasını da yükle.
2. burkut-private klasörünü /home/${account}/ altına yükle.
   Yol /home/${account}/burkut-private olmalı; public_html dışında kalmalı.
3. PHP 8.2+ ve openssl/mbstring gerekir. SMTP 587 dış bağlantısı açık olmalı.
4. Özel config.php dosyasında app_password alanına Gmail uygulama şifreni
   yaz; enabled değerini true yap (tırnaksız). Şifre bu pakette yoktur.
   E-posta: ${gmail}
5. Canlı /api/projects.php GET yanıtı 405 METHOD_NOT_ALLOWED olmalı.
   Canlı formdan tek kontrollü test yap; Gmail ve Yanıtla adresini kontrol et.
6. /hizmetler/web/, /hizmetler/uygulama/, /hizmetler/oyun/ adreslerini
   doğrudan açıp yenile; görsellerin ve galerinin çalıştığını kontrol et.
   /release.json güncel sürümü gösterir.

Mevcut kurulumda çalışan config.php ve state/ kayıtlarını koru.
Bu arşivde config boş şifreli ve gönderim kapalı gelir; çalışan özel
config üzerine açmak mail ayarlarını sıfırlar. Mevcut kayıtları silme.
Hesabın ana dizini /home yerine farklıysa api/projects.php yolunu düzelt.
Gerçek AI kapalı; aydınlatma metni eksikleri nedeniyle henüz yayımlanmadı.
Kaynak proje/node_modules bu yayın arşivinde bulunmaz.
`,
);
const zip = resolve("artifacts/burkut-tam-kurulum.zip");
const temporaryZip = `${zip}.next`;
if (existsSync(temporaryZip)) unlinkSync(temporaryZip);
const quote = (value) => `'${value.replaceAll("'", "''")}'`;
execFileSync(
  "powershell.exe",
  [
    "-NoProfile",
    "-NonInteractive",
    "-Command",
    `$ErrorActionPreference='Stop'; Add-Type -AssemblyName System.IO.Compression.FileSystem; [IO.Compression.ZipFile]::CreateFromDirectory(${quote(bundle)}, ${quote(temporaryZip)})`,
  ],
  { stdio: "inherit" },
);
renameSync(temporaryZip, zip);
console.log(`Full installation: ${zip}. No password included.`);
