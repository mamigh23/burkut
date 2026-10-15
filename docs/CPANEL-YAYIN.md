# Standart SMTP site yayını

## Paketi oluştur

Proje kökünde Windows PowerShell ile:

```sh
npm run release:cpanel -- gemnative
```

Argüman cPanel hesap adıdır; şifre veya uygulama şifresi değildir. Komut TypeScript/Vite derlemesini yapar, formu `/api/projects.php` için açık ve gerçek AI'ı kapalı üretir. Yalnızca `public/` staging içeriğini `artifacts/burkut-cpanel-smtp.zip` dosyasına paketler. Özel config kaynak dosyası veya canlı şifre okunmaz. Staging'deki özel örnek dosyalar bu ZIP'e dahil edilmez.

Paketleme şu an Windows PowerShell gerektirir. Diğer sistemlerde script staging klasörünü bildirip ZIP adımında açık hata verir; tamamlandı sayılmaz.

## Sürümü doğrula

Paketin `release.json` dosyası Git revizyonu, UTC üretim zamanı, sürüm kimliği ve servis modlarını içerir. Ana sayfa ve hizmet sayfası alt bilgisindeki sürüm aynı olmalıdır. Bunlar kişisel bilgi veya şifre içermez. `release.json` içindeki zaman UTC'dir.

Git revizyonu derleme sırasında HEAD'dir; yerel kaydedilmemiş değişikliklerle paket oluşturulabilir. Resmî teslim paketini kaynak değişiklikleri commit edildikten sonra üret. Sürüm kimliği içerik bütünlüğü veya güvenlik imzası değildir.

## cPanel'e yükle

Mevcut domain, DNS ve geçerli SSL ayarlarını değiştirme. Yeni hosting kurulumu gerekirse subdomain için ayrı belge kökü seç; ana siteyle kökü paylaşma. Sunucu IP'si sağlayıcıdan alınmalı, tahmin edilmemeli. HTTPS yönlendirmesi geçerli sertifika kurulduktan sonra etkinleştirilir.

1. Çalışan site dosyalarının geri alınabilir kopyasını belge kökü dışında sakla. Mevcut `api/projects.php` özel yolunu kontrol et.
2. ZIP'i yalnızca `burkut.gemnative.com` belge köküne çıkar. Ana Gemnative sitesinin köküne veya özel mail klasörüne yükleme.
3. `index.html`, `assets/`, `images/`, `hizmetler/web/index.html`, `hizmetler/uygulama/index.html`, `hizmetler/oyun/index.html`, `api/projects.php` ve `release.json` doğru yerde olmalı. Ek bir `public/` üst klasörü oluşmamalı.
4. `/release.json` ve sayfa alt bilgisinin sürümünü karşılaştır. `/hizmetler/web/` adresini doğrudan açıp yenile; Apache rewrite gerekmeden fiziksel index dosyası çalışmalıdır. Hosting'deki mevcut özel yönlendirmeler ayrıca kontrol edilir.
5. Ana sayfa hizmet bağlantısı, seçili web alanı, forma geçiş, mobil menü ve görselleri kontrol et. GET API yanıtı 405 olmalı; gerçek gönderim kontrollü bir kullanıcı testiyle ayrıca doğrulanır.

`assets/.htaccess` gizli dosyası da pakete dahildir; Dosya Yöneticisi'nde gizli dosyaları göster seçeneği gerekebilir. Desteklenen sunucularda hash'li varlıklar için uzun önbellek/sıkıştırma kuralları sağlar. Ana dizindeki mevcut SSL/yönlendirme kurallarını değiştirme. `robots.txt`, `sitemap.xml` ve lisans dosyalarını da koru. Kaynak proje, `.env`, `node_modules` veya yerel `server/dev.mjs` dosyasını belge köküne yükleme.

**Özel klasörü güncelleme:** Bu site yayını için `/home/gemnative/burkut-private/` içeriğini değiştirme. Yeni bir özel ZIP'i açarak `config.php` üzerine yazmak çalışan Gmail ayarını siler. `state/` dosyalarını geri alma/silme; belirsiz teslimlerin tekrar gönderilmesine yol açabilir. Farklı bir gerçek hesap ana dizini varsa API özel yolu buna göre ayarlanmalı.

## Geri dönüş

Yayın sonrası kritik sorun çıkarsa belge köküne önceki çalışan site dosyalarını geri koy. Eski `index.html` dosyasının işaret ettiği eski hash'li varlıklar da bulunmalı. Yalnızca index dosyasını geri getirmek yeterli değildir. Kullanımdaki varlıkların eksilmemesi için yayın sırasında eski hash'li dosyaları hemen silme.

Özel Gmail config, vendor ve gönderim kayıtları site geri dönüşünden bağımsız korunur. Eski sürümün API/şablon uyumluluğunu kontrol et; özel dosyaları körlemesine eski ZIP'le değiştirme.
