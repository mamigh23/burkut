# İçerik bakımı ve galeri kontrolü — 15 Ekim 2026

## Değişiklik

Hizmet galerisi sabit iki ekran yerine içerik dosyasındaki görsel sayısını kullanır. İlk görsel kapaktır; ileri/geri düğmeleri ve sağ/sol tuşları bütün listeyi dolaşır. Tek ekranda gezinme düğmeleri gizlenir. Açık galeriden bir kayıt çıkarılırsa geçerli bir görsele döner; boş liste geliştirme sırasında kırık görsel üretmez ve yayın kontrolünde reddedilir.

Yeni içerik veya çağrı bölümü eklenmedi. Mevcut altı konsept ekranı korundu. Kullanıcı düzenlemeleri için örnek kayıt ve adımlar içerik rehberine eklendi.

Yayın kontrolü boş galeri, başlık, görsel açıklaması, hizmet metni/listesi; yinelenen hizmet adresi/alanı ve hero kimliği; hizmetin eksik galeri eşleşmesini reddeder. Yerel dosya kontrolü bozuk URL/kodlama ve dosya yerine klasör verilmesi durumlarını da hata olarak bildirir. Uzak görsel sunucularına istek göndermez.

## Doğrulama

- 73 uygulama testi geçti. Galerinin üç ekranla iki yönde dolaşması, listeden kayıt silinmesi, tek/boş galeri ve kapatılınca gövde kaydırmasının geri gelmesi test edildi. İçerik doğrulaması için olumlu ve olumsuz örnekler kullanıldı.
- Lint, TypeScript, üretim derlemesi, dört sayfanın site kontrolü ve varlık bütçeleri geçti.
- Gerçek yerel tarayıcıda oyun galerisi açıldı, geri düğmesiyle son ekrana geçildi (`2 / 2`), ileri düğmesi ve sol tuşu kullanıldı; Escape sonrasında odak açıcıya döndü ve sayfa kaydırma kilidi kalktı.
- [Tarayıcı ekran görüntüsü](./evidence/gallery-content-2026-10-15.png).

Üç görselli ve tek görselli varyantlar bileşen testinde denendi; gerçek tarayıcı mevcut iki görselli içerikle kontrol edildi. Bu paket için yeni canlı SMTP gönderimi, fiziksel cihaz testi veya Lighthouse ölçümü yapılmadı. Önceki geniş tarayıcı kontrolünün kapsamı ayrı raporda korunur. Güncel paket cPanel'e yüklenmeden canlı sürümün güncellendiği varsayılmaz.
