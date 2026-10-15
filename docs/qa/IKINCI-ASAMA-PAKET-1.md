# İkinci aşama, ilk geliştirme paketi — 15 Ekim 2026

## Uygulananlar

- `/hizmetler/web/` fiziksel HTML girişi ve ortak hizmet içerik/bileşen yapısı eklendi. Sayfa özel title, description, canonical ve paylaşım etiketlerine sahip; sitemap'e işlendi.
- Ana sayfadaki web hizmeti kartı detay sayfasını açıyor. Uygulama ve oyun kartları henüz ayrı sayfa oluşturulmadığı için forma yönelmeyi sürdürüyor.
- Web hizmeti formu web alanı seçili başlıyor; alan değişimi yazılmış açıklamayı silmiyor. Yangan üzerinden gelinmiş gibi yanlış durum mesajı gösterilmiyor.
- Kapalı/kullanılamayan servis, yoğunluk ve belirsiz SMTP sonucu ayrıldı. Otomatik tekrar gönderim eklenmedi. Başarı mesajında sonraki iletişim adımı açıklandı; yanıt süresi sözü verilmedi.
- Standart `npm run release:cpanel -- gemnative`, SMTP açık/AI kapalı public ZIP, sürüm manifesti ve görünür sürüm bilgisi eklendi. Üretim çıktısı ve dosya boyutu kontrolü yayın komutunda çalışır. Özel config arşivlenmez.
- [İçerik rehberi](../ICERIK-DEGISTIRME.md) ve [yayın/geri dönüş rehberi](../CPANEL-YAYIN.md) hazırlandı.

## Doğrulama

- Lint ve TypeScript üretim derlemesi geçti. Vite hem ana sayfa hem hizmet sayfası için fiziksel HTML dosyası üretti.
- 10 dosyada 51 Vitest testi geçti. Yeni testler üç sunucu hata kodunda doğru kullanıcı mesajını ve tek istek davranışını; hizmet formunda ön seçim ve içerik korunmasını doğruluyor.
- Bu turda gerçek SMTP gönderimi yapılmadı; canlı Gmail'in önceki kullanıcı kabulü korunuyor.
- Tarayıcı aracı mevcut sekmeye erişimi URL güvenlik politikası nedeniyle reddetti. Kısıt aşılmadı; yeni sayfanın ekran görüntüsü/gerçek tarayıcı görsel kontrolü bu turda tamamlanmadı. DOM testleri görsel doğrulama yerine sayılmaz.

## Açık kalanlar

- Yeni hizmet sayfasının gerçek tarayıcıda masaüstü/mobil görünümü, taşma, kontrast ve odak sırası.
- Fiziksel telefon/klavye, yüzde 200 zoom ve ekran okuyucu kontrolleri.
- cPanel'e güncel paketin yüklenmesi, `/hizmetler/web/` doğrudan açılışı ve yenileme, `/release.json` sürümü ve kontrollü canlı form testi.
- Aydınlatma metninin işletme/aktarım bilgilerine bağlı tamamlanması. Bu pakette taslak yayımlanmadı.

Sonraki büyük özellik: bu paketin görsel/canlı kabulünden sonra uygulama ve oyun hizmet sayfalarını ortak yapıdan üretmek. Gerçek AI ve yönetim paneli bu paketin kapsamına alınmadı.
