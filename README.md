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

GitHub kalite akışı lint, test, build ve dosya boyutu sınırlarını kontrol eder. Boyut sınırları: toplam JavaScript 100 KiB gzip, toplam CSS 20 KiB gzip, toplam font 210 KiB, tek raster görsel 600 KiB. Bu kontrol tarayıcı performansı veya Lighthouse puanı ölçmez. [Font/form iyileştirmeleri](./docs/qa/FONT-VE-FORM.md).

Yerel erişilebilirlik taraması ve tekrar çalıştırma adımları: [Erişilebilirlik kontrolü](./docs/qa/ERISILEBILIRLIK.md). Denetim aracı yalnızca `?audit=a11y` ile geliştirme sunucusunda açılır.

Yerel üretim yükleme ölçümü: [Performans kontrolü](./docs/qa/PERFORMANS.md). `npm run qa:prepare` ayrı `.qa-dist` kopyasını oluşturur; `npm run qa:preview` 4173 portunda sunar. Bu kopya yayın için kullanılmaz.

## Kaynak yapısı

Hero kartlarının görsellerini değiştirmek için [Hero kartları rehberi](./docs/HERO-KARTLARI.md) ve `src/content/heroCards.ts` ayar dosyasını kullanın.

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

Yayın adresi `https://burkut.gemnative.com/`; canonical, OG URL, robots ve sitemap bu adrese göre hazırlandı. [cPanel kurulum rehberi](./docs/CPANEL-YAYIN.md). Gerçek AI ve talep servisi bağlanmadan önce nihai iletişim ve aydınlatma içeriği tamamlanmalıdır.

Gerçek form için sunucu/istemci sözleşmesi hazır; kurulum ve sınırlar [server/README.md](./server/README.md) içinde. Yangan sohbet altyapısı ve kalan bağlantılar [sohbet rehberinde](./docs/YANGAN-SERVISI.md). `.env.example` iki servisi de varsayılan kapalı tutar. Mevcut site kişisel bilgileri sunucuya göndermeye başlamadı.

Statik canlı site kontrol edildi: [yayın raporu](./docs/qa/CANLI-YAYIN.md). GitHub'a kaynak push etmek cPanel dosyalarını otomatik güncellemez.

cPanel formunu Gmail SMTP'ye bağlamak için [adım adım kurulum](./docs/GMAIL-SMTP-KURULUM.md) hazır. PHP/PHPMailer servisi ayrı özel klasörde çalışır; şifre public dosyalara veya GitHub'a yazılmaz. Sunucu ayarı varsayılan kapalıdır; gerçek Gmail bağlantı testi henüz yapılmadı.

## Lisans

Projenin kendisi için henüz açık kaynak lisansı seçilmedi. Fontların ve Lucide simgelerinin lisansları `public/licenses/` altında korunur.
