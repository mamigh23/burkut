# Bürküt Teknoloji

Bürküt; web siteleri, uygulamalar ve oyunlar geliştirmek için oluşturulan teknoloji markasıdır. Bu depo ilk kurumsal web sitesinin kaynak kodunu, marka şartnamesini ve geliştirme yol haritasını içerir.

## Projenin durumu

İlk demo sürüm geliştirildi: responsive ana sayfa, özgün Web / Uygulama / Oyun konseptleri, Yangan rehberli proje akışı, hazır soru yanıtları ve alan doğrulamalı demo formu.

**Gerçek AI veya form gönderimi yoktur.** Demo verileri sunucuya gönderilmez; sayfa yenilenince temizlenir. Konseptler müşteri portföyü değildir.

- Görünen marka: **Bürküt**
- Kurumsal isim: **Bürküt Teknoloji**
- Asistan: **Yangan — demo modu**
- Görsel yön: orman yeşili, mavi ve siyah
- Altyapı: React, TypeScript, Vite, Tailwind CSS ve özel CSS

## Belgeler

- [Marka kimliği ve web sitesi şartnamesi](./Bürküt.md)
- [Canlı referans incelemesi](./REFERANS-INCELEMESI.md)
- [Marka ve geliştirme yol haritası](./YOL-HARITASI.md)
- [Geliştirme durumu ve doğrulama](./GELISTIRME-DURUMU.md)
- [Bürküt gezegeni görseli ve üretim promptu](./docs/BURKUT-GEZEGENI.md)

## İlk geliştirme paketi

İçerik temeli, proje iskeleti, tasarım tokenları, navbar ve hero hazırlandı. Ana sayfa bölümleri, ayrı Web / Uygulama / Oyun konseptleri ve Yangan demo deneyimi eklendi. Gerçek cihaz kontrolleri ve üretim performansı değerlendirmesi devam ediyor.

Logo üretimi, gerçek iletişim bilgileri ve aydınlatma metni sonraki aşamaya bırakılmıştır. Form ve asistan yerel akışlarla çalışır; kullanıcı kararıyla demo etiketleri kaldırılmıştır. Gönderim bağlantısının kapalı olduğu formda belirtilir.

## Kurulum

Node.js 22.12+ veya desteklenen daha yeni bir Node sürümü kullanın. Geliştirme Node.js 24 üzerinde yapıldı.

```sh
npm ci
npm run dev
```

Vite'ın terminalde gösterdiği yerel adresi açın. Önizleme varsayılan olarak yalnızca `127.0.0.1` üzerinden erişilir.

## Doğrulama ve üretim build

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run check:assets
npm run preview
```

Üretim çıktısı `dist/` altında oluşur. Paket sürümleri `package-lock.json` ile sabitlenmiştir. `package.json` içindeki `private: true`, npm paket yayınını engeller; GitHub reposunun public görünürlüğünü değiştirmez.

GitHub kalite akışı lint, test, build ve dosya boyutu sınırlarını kontrol eder. Boyut sınırları: toplam JavaScript 100 KiB gzip, toplam CSS 20 KiB gzip, tek raster görsel 600 KiB. Bu kontrol tarayıcı performansı veya Lighthouse puanı ölçmez.

## Kaynak yapısı

```text
src/components/   Ortak arayüz ve navigasyon
src/sections/     Ana sayfa bölümleri
src/concepts/     HTML/CSS/SVG ürün maketleri
src/yangan/       Asistan ve test edilen akış mantığı
src/services/     Demo yanıtları ve form doğrulaması
src/content.ts    Merkezi Türkçe metinler
src/styles.css    Palet tokenları, düzen ve responsive stiller
public/licenses/  Dağıtılan font ve simge lisansları
```

Domain seçilmediği için canonical ve üretim OG URL'si tanımlanmamıştır. Gerçek AI ve talep servisi bağlanmadan önce nihai iletişim ve aydınlatma içeriği tamamlanmalıdır.

## Lisans

Projenin kendisi için henüz açık kaynak lisansı seçilmedi. Fontların ve Lucide simgelerinin lisansları `public/licenses/` altında korunur.
