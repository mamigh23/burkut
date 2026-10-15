# Yayın ve metaveri kontrolü — 15 Ekim 2026

## Değişiklik

- Yeni `check:site` komutu dört HTML çıktısında tek ve doğru canonical, benzersiz başlık, açıklama, sitemap üyeliği, yapılandırılmış veri, script/CSS/simge ve paylaşım görseli varlığını kontrol eder.
- Hizmet galerisi ve özel hero görsellerinin içerik dosyalarında belirtilen yerel yolları da kontrol edilir. Yerel dosya dışına çıkış ve desteklenmeyen protokoller reddedilir; harici HTTP(S) kaynaklarının erişilebilirliği bu denetimin kapsamında değildir.
- Komut standart yayın ve GitHub kalite akışına bağlandı. Kaynak TS içerikleri Node 24'ün tip silme desteğiyle okunur; ayrı kopya görsel listesi tutulmaz.
- JSON-LD, Vite HTML dönüşümünde statik çıktıya eklenir. Organization ve WebSite; hizmet sayfalarında Service, WebPage ve BreadcrumbList kullanılır. Telefon, e-posta ve Instagram ortak iletişim dosyasından; hizmet bilgileri mevcut hizmet içeriğinden gelir.
- Hizmet sayfasında küçük bir ana sayfa/hizmet yolu görünür. Yeni uzun bölüm, analitik izleyici, fiyat/puan veya müşteri referansı eklenmedi.

## Doğrulama

- Lint, TypeScript/Vite üretimi ve 12 dosyada 57 test geçti.
- JSON-LD testleri ortak iletişim kaynağını, doğru hizmet adresini, doğrulanmamış puan/fiyat/adres alanlarının bulunmamasını ve içerikteki script kapatma dizisinin güvenli kodlanmasını doğrular.
- Derlenmiş galeri görseli geçici olarak kaldırıldı: denetim eksik dosyayı bildirip başarısız oldu. Dosya geri konulduktan sonra dört sayfa denetimi geçti. Bu kontrollü işlem yalnızca yerel `dist/` çıktısında yapıldı.
- Üretim boyutları yaklaşık JS 89.8 KiB gzip, CSS 14.9 KiB gzip, font 189.1 KiB; bütçe içinde. Gerçek SMTP testi ve canlıya yükleme yapılmadı.
- Google veya Schema.org çevrim içi doğrulayıcısına site içeriği yüklenmedi. Yerel doğrulama tam bir JSON-LD/schema validator'ı değildir; arama sırası veya zengin sonuç görünümü garantisi verilmez.
- Tarayıcı/görsel, fiziksel cihaz, yüzde 200 zoom ve ekran okuyucu kabulü önceki açık durumunu koruyor. Bu turda yapılan kontrol statik çıktı/DOM ve mantık kontrolüdür.

## Teknik kaynaklar

- [Schema.org Service](https://schema.org/Service)
- [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList)
- [Google yapılandırılmış veri kuralları](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
