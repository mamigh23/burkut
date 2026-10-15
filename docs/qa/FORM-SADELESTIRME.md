# Proje formunu sadeleştirme — 15 Ekim 2026

## Karar

Müşterinin ilk adımı için zorunlu bilgiler öne çıkarıldı. Ana sayfa ve üç hizmet sayfasındaki ortak formda hizmet seçimi, ad soyad, e-posta ve proje açıklaması ilk görünümde kalır. Telefon, kurum ve bütçe kapalı başlayan “Ek bilgi ekle / İsteğe bağlı” bölümüne taşındı.

Yeni sayfa, adımlı sihirbaz, pazarlama kutusu veya gösterişli hata tasarımı eklenmedi. Gerekli alanlar ve sunucunun veri sözleşmesi değişmedi. Doğrudan e-posta/telefon seçenekleri korunuyor.

## Davranış

- Ek bilgiler boşken form gönderilebilir. Açılıp kapanmaları girilmiş değerleri silmez; kapanan bölümdeki değerler payload içinde korunur.
- Yangan'dan bütçe aktarılırsa ek bölüm açılır; aktarılan bilgi gizlenmez.
- İstemci veya sunucu telefon/kurum/bütçe hatası verirse bölüm hata odağı taşınmadan önce açılır. Hata alanı erişilebilir hale gelir.
- Busy durumunda alanlar yine devre dışıdır; önceki tekrar gönderim/istek anahtarı davranışı korunur. Kalıcı tarayıcı depolaması veya otomatik gönderim eklenmedi.

## Kontroller ve sınırlar

- 13 dosyada 60 test geçti. Yeni DOM testleri yalnızca gerekli bilgilerle gönderimi, kapatılan ek bilginin korunmasını, sunucu alan hatasında açılma/odak dönüşünü ve Yangan bütçe aktarımını doğrular.
- Test gönderimleri taklit edilmiş servisle yapıldı; gerçek e-posta gönderilmedi.
- Lint, typecheck, üretim, dört sayfa yayın denetimi ve dosya boyutu kontrolleri geçti. JS yaklaşık 89.9 KiB gzip, CSS 15.0 KiB gzip, fontlar 189.1 KiB.
- Gerçek dönüşüm artışı ölçülmedi; bu bir kullanım kolaylığı iyileştirmesidir. Analitik veya yeni izleme kurulmadı.
- Gerçek tarayıcı/telefon, yüzde 200 zoom, ekran okuyucu ve canlı form kabulü hâlâ açık. Görsel doğrulama yapılmış sayılmaz.
