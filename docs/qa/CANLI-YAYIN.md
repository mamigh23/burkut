# Canlı yayın kontrolü — 13 Ekim 2026

Kullanıcının cPanel'e yüklediği statik site `https://burkut.gemnative.com/` üzerinden kontrol edildi. Yayındaki paket önceki cPanel hazırlık sürümüdür (5a471fc); bu kontrol yeni sohbet altyapısının canlıya dağıtıldığı anlamına gelmez.

| Kontrol | Sonuç |
| --- | --- |
| HTTPS ana sayfa | 200, tarayıcıda site açılıyor |
| HTTP adresi | Son adres HTTPS, 200 |
| robots.txt ve sitemap.xml | 200, hedef domain mevcut |
| Mobil gezegen görseli | 200, doğru görsel içerik türü |
| 320, 390, 1440 px | Belge yatay taşması yok |
| Ana başlık ve canonical | Tek H1, doğru yayın adresi |
| Hero kart seçimi | Tıklama sonrası seçili durum doğrulandı |
| İncelenen tarayıcı konsolu | Hata/uyarı kaydı yok |

Gerçek form teslimi veya AI isteği yapılmadı. Bu kontrol fiziksel telefon, ekran okuyucu, Lighthouse veya gerçek ziyaretçi performans ölçümü değildir.
