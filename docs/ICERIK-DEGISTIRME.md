# İçerik ve görsel değiştirme

## Nereden düzenlenir?

| İçerik | Dosya |
| --- | --- |
| E-posta, telefon, Instagram | `src/contact.ts` |
| Ana sayfa hizmetleri, ürün konseptleri, SSS | `src/content.ts` |
| Web hizmetinin açıklaması, teslimler, adımlar ve SSS | `src/content/serviceDetails.ts` |
| Hero kartlarının görsel ayarları | `src/content/heroCards.ts` |
| Ana sayfa başlık ve sosyal paylaşım etiketleri | `index.html` |
| Web hizmeti sayfasının başlık ve paylaşım etiketleri | `hizmetler/web/index.html` |
| Logodan türetilen site varlıkları | `public/images/brand/` |

Önce ilgili içerik dosyasındaki örnek kaydı koruyarak metni veya görsel yolunu değiştir. Dosya biçimini ve TypeScript alan adlarını koru. Hizmet detaylarını düzenlemek için `ServicePage.tsx` bileşenini değiştirmen gerekmez.

## Görsel kuralları

- Yeni görseli `public/images/` altında açıklayıcı, küçük harfli, boşluksuz bir adla sakla. Kodda `/images/dosya-adi.webp` gibi kökten başlayan yol kullan.
- Kartın mevcut en/boy oranına uygun görsel seç; önemli yazı veya logoyu kenarlara yerleştirme. Dikey telefon görseliyle yatay masaüstü görselini aynı kırpmayla değiştirme.
- WebP/PNG/JPEG kullan. Tek raster dosyası mevcut yayında 600 KiB sınırını aşmamalı. Çok büyük orijinal dosyayı doğrudan yayımlama.
- Görsel içerik taşıyorsa ilgili görselin alternatif metnini güncelle. Hero kartlarının görselleri dekoratiftir; erişilebilir adları `label` alanından gelir. İçerik değiştirilirse bu etiketi de güncelle.
- Kaynağın kullanım hakkını doğrula. Gerçek müşteri çalışması, adı ve yorumu için paylaşım izni al; konsepti müşteri işi gibi adlandırma.
- Hero kartının hazır sahnesi yerine özel görsel koyma seçenekleri doğrudan `heroCards.ts` içindeki mevcut tip ve açıklamalarda yer alır; yeni bir ikinci kart sistemi oluşturma.

## Yeni hizmet sayfası hazırlama

`ServiceDetail` ortak içerik tipini kullan. Yeni kayıt, HTML giriş dosyası, `serviceDetails` listesi, Vite çoklu giriş ayarı, ana sayfa hizmet bağlantısı ve sitemap birlikte güncellenmeli. Sadece kart bağlantısı eklemek sayfa oluşturmaz. `/hizmetler/web/`, `/hizmetler/uygulama/` ve `/hizmetler/oyun/` sayfaları hazırdır. Listeye eklenen sayfa, ortak yol çözümlemesi ve diğer hizmetler bağlantılarında kullanılır. İçerikteki `area` değeri formun ön seçimini, `path` sayfa adresini, `eyebrow` üst etiketi ve `action` form çağrısını belirler.

## Kontrol ve yayın

Önce `npm run lint`, `npm test` ve `npm run release:cpanel -- gemnative` çalıştır. Yayın komutu TypeScript derlemesini ve Vite çıktısını üretir. Boyut sınırlarını `npm run check:assets` ile kontrol et. Sayfa ve görselleri yerelde incele; yalnızca otomatik testlere bakarak görsel kontrol tamamlandı deme.

Güncel SMTP ZIP'ini Bürküt belge köküne çıkar; özel `config.php`, `vendor/` ve `state/` dosyalarına dokunma. [Yayın ve geri dönüş rehberi](./CPANEL-YAYIN.md).
