# Bürküt — İlk demo geliştirme durumu

**Tarih:** 12 Ekim 2026

## Tamamlananlar

- React 19, TypeScript, Vite 8 ve Tailwind CSS 4 temeli; kilitlenmiş paket sürümleri.
- Yerel fontlar, font/simge lisansları, merkezi Türkçe içerikler ve palet tokenları.
- Sabit ve kaydırmada daralan navbar, mobil menü ve özgün hero maketleri.
- Vizyon, hizmetler, üç ayrı ürün konsepti, süreç, Bürküt/Yangan tanıtımı, teknoloji, bağlantı görseli, SSS ve footer.
- Demo proje formu: zorunlu alanlar, e-posta doğrulama, hata odaklaması ve dürüst demo sonucu.
- Yangan: rehberli akış, bütçe/detay atlama, geri dönüş, özet düzeltme ve forma aktarım.
- Önceki seçim değiştiğinde sonraki bağımlı cevapların temizlenmesi.
- Ayrı soru alanında hazır hizmet yanıtları; sürekli demo etiketi.
- Kapat/aç konuşma korunması, sıfırlama, odak yönetimi, Escape ve sayfa içi bellek.

Nihai logo yerine geçici metin işareti kullanıldı. İletişim bilgileri ve aydınlatma metni, kullanıcının kararıyla ertelendi. Gerçek veri gönderimi ve AI entegrasyonu bulunmuyor.

## Doğrulama

- TypeScript kontrolü ve üretim build başarılı.
- ESLint kontrolü başarılı.
- Akış ve form doğrulaması için 6 Vitest testi başarılı.
- Tarayıcıda 320, 375, 390, 639, 640, 767, 768, 1023, 1024, 1199, 1200 ve 1440 px genişliklerinde belge seviyesinde yatay taşma görülmedi.
- Mobil menü açılması, anchor'a gitmesi ve kapanması kontrol edildi.
- Ürün sekmesinin ok tuşuyla değişmesi, seçili durumu ve farklı sahne içerikleri kontrol edildi.
- SSS'de aynı anda tek sorunun açık olması kontrol edildi.
- Boş formun dört zorunlu alan için hata üretmesi kontrol edildi.
- Yangan akışı özet adımına kadar ilerletildi; kapat/aç sonrası korunması ve forma aktarımı kontrol edildi.
- Örnek demo form verisiyle gönderimin sunucuya gönderilmediğini belirten sonuç görüldü.
- Yangan soru alanında web hizmetiyle ilgili hazır yanıt kontrol edildi.

## Henüz tamamlanmayan kabul kontrolleri

- Gerçek telefon ve mobil klavye kontrolü. VisualViewport desteği uygulandı, fiziksel cihaz testi yapılmadı.
- Gerçek yüzde 200 tarayıcı zoom testi ve ekran okuyucu kontrolü.
- Azaltılmış hareket için CSS mevcut; işletim sistemi tercihiyle ayrı doğrulama yapılmadı.
- Bütün bileşenlerin tüm ekran/etkileşim durumları için kapsamlı görsel regresyon kontrolü.
- Üretim ortamı performans/Lighthouse ölçümü. Build dosya boyutları performans puanı değildir.
- Üretim domain'i, canonical/OG URL, nihai paylaşım görseli ve favicon.
- Gerçek talep servisi, hata/yoğunluk senaryoları, veri işleme düzeni ve gerçek AI bağlantısı.

## Yol haritasındaki karşılığı

1–5. aşamaların ilk demo uygulaması tamamlandı. 6. aşamadaki temel build, akış, responsive ve tarayıcı kontrolleri yapıldı; yukarıdaki kabul kontrolleri devam ediyor. 7. aşamadaki gerçek servisler ve yayın başlamadı. Site canlıya yayımlanmadı.
