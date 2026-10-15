# Hizmet sayfalarını tamamlama — 15 Ekim 2026

## Değişiklik

- Web sayfasının ortak yapısı uygulama ve oyun sayfalarında da kullanıldı. Her hizmetin üst etiketi, çağrı düğmesi, kapsamı, adımları, hazırlık listesi ve SSS'si ayrı içerik kaydından geliyor.
- Ana sayfanın üç hizmet kartı ilgili sayfayı açıyor. Detay sayfalarında diğer iki hizmete bağlantı bulunuyor.
- Formda sayfanın hizmeti seçili geliyor. Yeni hizmetlerin platform, mağaza, ödeme, çok oyunculu yapı ve içerik üretimi gibi ek kapsamları koşullu anlatıldı; kesin fiyat/süre veya sonuç garantisi eklenmedi.
- Üç hizmetin fiziksel HTML girişi, özel metaverisi ve sitemap kaydı mevcut. Ortak yol çözümlemesi dizin adresini, sondaki slash olmayan adresi ve `index.html` biçimini aynı içerikle eşleştirir.
- Yayın paketi artık üç hizmetin HTML dosyalarının da üretildiğini kontrol eder.

## Kontroller

- Lint, TypeScript/Vite üretim derlemesi ve 54 Vitest testi geçti.
- Yeni DOM kontrolleri uygulama ve oyun sayfalarının yalnızca ilgili alanla başlamasını, doğru form çağrısını ve diğer hizmet bağlantılarını doğruladı. Yol çözümlemesi üç adres biçimi için kontrol edildi.
- Üretilmiş üç hizmet HTML'inde canonical adresleri, sitemap üyeliği, script/CSS ve simge dosyalarının varlığı ayrıca kontrol edildi.
- JS yaklaşık 88.8 KiB gzip, CSS 14.1 KiB gzip, fontlar 189.1 KiB; mevcut bütçeler içinde. Bunlar dosya boyutu ölçümleri, gerçek tarayıcı performans puanı değildir.
- SMTP gönderimi yapılmadı; Gmail'in önceki çalışan ayarları değiştirilmedi.

## Açık kabul

Önceki pakette tarayıcı aracı erişimi güvenlik politikası nedeniyle reddetmişti; bu kısıt aşılmadı. Yeni sayfalarda görsel masaüstü/mobil, yüzde 200 zoom, ekran okuyucu ve fiziksel cihaz kontrolü tamamlanmış sayılmaz. cPanel yüklemesi ve canlı doğrudan açılış/yenileme de bekliyor. Bu kapsamın kodu ve otomatik kontrolleri hazır; tüm manuel kabul kapanmış değildir.
