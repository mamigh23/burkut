# İçerik ve görsel değiştirme

## Nereden düzenlenir?

| İçerik | Dosya |
| --- | --- |
| E-posta, telefon, Instagram | `src/contact.ts` |
| Ana sayfa hizmetleri, ürün konseptleri, SSS | `src/content.ts` |
| Web hizmetinin açıklaması, teslimler, adımlar ve SSS | `src/content/serviceDetails.ts` |
| Hero kartlarının görsel ayarları | `src/content/heroCards.ts` |
| Hizmet sayfası örnek görselleri, ad ve alt metinler | `src/content/serviceExamples.ts` |
| Ana sayfa başlık ve sosyal paylaşım etiketleri | `index.html` |
| Web hizmeti sayfasının başlık ve paylaşım etiketleri | `hizmetler/web/index.html` |
| Logodan türetilen site varlıkları | `public/images/brand/` |
| Onaylanan mavi Yangan karakteri | `public/images/brand/yangan-avatar.png` |

Önce ilgili içerik dosyasındaki örnek kaydı koruyarak metni veya görsel yolunu değiştir. Dosya biçimini ve TypeScript alan adlarını koru. Hizmet detaylarını düzenlemek için `ServicePage.tsx` bileşenini değiştirmen gerekmez.

Yangan'ın düğmesi, sohbet başlığı ve tanıtımı tek şeffaf görseli paylaşır. Görseli değiştirirken kare tuval, saydam arka plan ve kanatların çevresindeki boşluğu koru. [Karakter ve hazırlama notları](./YANGAN-KARAKTERI.md).

## Görsel kuralları

Hizmet galerileri bir veya daha fazla görsel kullanır; müşterinin karar vermesine yardımcı olan 2–4 seçilmiş ekran genellikle yeterlidir. Değiştirmek için `serviceExamples.ts` içindeki `src` ve `alt` değerlerini güncelle; aynı 4:3 oranını koru. İlk kayıt sayfadaki kapaktır. `images` listesine aynı biçimde yeni kayıt ekleyebilir veya mevcut kaydı çıkarabilirsin; bileşeni değiştirmen gerekmez. Tek görselde gezinme okları gizlenir, birden fazla görselde oklar ve klavyenin sağ/sol tuşları tüm listeyi dolaşır. Otomatik slayt yoktur. Listeyi tamamen boş bırakma; yayın kontrolü bunu reddeder.

Örnek yeni kayıt (dosyayı önce `public/images/services/` içine ekle):

```ts
{ src: "/images/services/web-mobile.webp", alt: "Kök mobil koleksiyon ekranı: ürünler ve kategori seçimi" },
```

Varsayılan SVG'ler `scripts/prepare-service-previews.mjs` ile tekrar üretilebilir. Bu komut varsayılan görselleri yeniler; özelleştirilmiş dosyanın üzerine yazmadan önce farklı ad kullan. Örnekler müşteri işi değil tasarım konseptidir. Mevcut görseller 960×720 boyutlarında hafif vektör varlıklardır.

- Yeni görseli `public/images/` altında açıklayıcı, küçük harfli, boşluksuz bir adla sakla. Kodda `/images/dosya-adi.webp` gibi kökten başlayan yol kullan.
- Kartın mevcut en/boy oranına uygun görsel seç; önemli yazı veya logoyu kenarlara yerleştirme. Dikey telefon görseliyle yatay masaüstü görselini aynı kırpmayla değiştirme.
- WebP/PNG/JPEG kullan. Tek raster dosyası mevcut yayında 600 KiB sınırını aşmamalı. Çok büyük orijinal dosyayı doğrudan yayımlama.
- Görsel içerik taşıyorsa ilgili görselin alternatif metnini güncelle. Hero kartlarının görselleri dekoratiftir; erişilebilir adları `label` alanından gelir. İçerik değiştirilirse bu etiketi de güncelle.
- Kaynağın kullanım hakkını doğrula. Gerçek müşteri çalışması, adı ve yorumu için paylaşım izni al; konsepti müşteri işi gibi adlandırma.
- Hero kartının hazır sahnesi yerine özel görsel koyma seçenekleri doğrudan `heroCards.ts` içindeki mevcut tip ve açıklamalarda yer alır; yeni bir ikinci kart sistemi oluşturma.

## Yeni hizmet sayfası hazırlama

`ServiceDetail` ortak içerik tipini kullan. Yeni kayıt, HTML giriş dosyası, `serviceDetails` listesi, Vite çoklu giriş ayarı, ana sayfa hizmet bağlantısı ve sitemap birlikte güncellenmeli. Sadece kart bağlantısı eklemek sayfa oluşturmaz. `/hizmetler/web/`, `/hizmetler/uygulama/` ve `/hizmetler/oyun/` sayfaları hazırdır. Listeye eklenen sayfa, ortak yol çözümlemesi ve diğer hizmetler bağlantılarında kullanılır. İçerikteki `area` değeri formun ön seçimini, `path` sayfa adresini, `eyebrow` üst etiketi ve `action` form çağrısını belirler.

## Kontrol ve yayın

`npm run check:site` derlenmiş `dist/` içinde dört sayfanın canonical, başlık/açıklama, sitemap ve JSON-LD bilgilerini; statik sayfa varlıklarını, galeri ve özel hero görsellerinin yerel dosyalarını kontrol eder. Boş galeri, görsel açıklaması, hizmet metni veya liste; yinelenen hizmet adresi/alanı veya hero kimliği; eksik galeri eşleşmesi de yayın paketini durdurur. Yeni bir görsel yolu yazıp dosyayı eklemeyi unutursan, dosya yerine klasör belirtirsen veya adres bozuksa kontrol başarısız olur. Harici bağlantılara ağ isteği yapmaz; bütün tarayıcı etkileşimlerinin çalıştığını veya özel görsellerin görünümünü doğrulamaz.

Önce `npm run lint`, `npm test` ve `npm run release:cpanel -- gemnative` çalıştır. Yayın komutu TypeScript derlemesini ve Vite çıktısını üretir. Boyut sınırlarını `npm run check:assets` ile kontrol et. Sayfa ve görselleri yerelde incele; yalnızca otomatik testlere bakarak görsel kontrol tamamlandı deme.

Güncel SMTP ZIP'ini Bürküt belge köküne çıkar; özel `config.php`, `vendor/` ve `state/` dosyalarına dokunma. [Yayın ve geri dönüş rehberi](./CPANEL-YAYIN.md).
