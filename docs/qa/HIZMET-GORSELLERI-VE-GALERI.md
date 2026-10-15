# Hizmet görselleri ve galeri — 15 Ekim 2026

## Tasarım kararı

Kullanıcının kuralı: fazla içerikle kafa karıştırmak yerine müşteriyi sonuca yönlendirmek. Bu nedenle yeni uzun proje sayfaları yerine mevcut hizmet sayfaları içinde örnek görseller ve isteğe bağlı büyütme kullanıldı.

- Web, uygulama ve oyun için ikişer 960×720 vektör arayüz konsepti hazırlandı. Gerçek müşteri işi veya teslim ekranı oldukları iddia edilmiyor.
- İlk ekran açıklama, görsel ve proje başlangıcı çağrısını birlikte sunar. Diğer hizmetler alt bilgide kalır; form öncesinde rakip seçenek sunan ayrı bölüm kaldırıldı.
- Süreç/hazırlık bilgileri kapalı başlayan tek bir açılır bölümde tutulur. SSS isteğe bağlı açılır; birincil eylem aynı hizmetin formuna gitmektir.
- Hafif hover/kavrama etkisi eklendi. Hareket durdurma veya sistem azaltılmış hareket tercihinde görselin dönüş/yer değiştirmesi devre dışıdır. Otomatik slayt veya sonsuz yeni animasyon eklenmedi.
- Galeri native dialog kullanır; önceki/sonraki, yön tuşları, Escape/cancel ile kapanma, odak dönüşü ve sayfa kaydırma kilidi var. Kullanıcı görselleri `src/content/serviceExamples.ts` dosyasından değiştirebilir.

## Doğrulama

- Lint, typecheck ve üretim derlemesi geçti. 11 test dosyasında 55 test başarılı.
- Yeni galeri DOM testi açılışı, yön tuşuyla ikinci görseli, cancel ile kapanmayı, kaydırma kilidinin temizlenmesini ve açma düğmesine odak dönüşünü kontrol eder. JSDOM dialog metotları testte taklit edildi; tarayıcının yerleşik odak tuzağı manuel doğrulanmış sayılmaz.
- Altı SVG XML olarak doğrulandı; 4:3 boyutunda, scriptsiz ve her biri 20 kB altında. SVG dosyaları da artık genel varlık boyutu kontrolüne dahil.
- Yeni üretim yaklaşık JS 89.8 KiB gzip, CSS 14.9 KiB gzip, font 189.1 KiB; sınırlar içinde. Bu değerler tarayıcı performans puanı değildir.
- Tarayıcı aracı bu turda yerel sayfa açılışında bağlantı zaman aşımı verdi. Görsel masaüstü/mobil, gerçek dialog klavye odağı, OS hareket tercihi ve canlı cPanel kontrolü açık kalıyor. Sınır aşılmadı; yapılmayan kontroller başarılı raporlanmadı.

## Teslim

- Güncel site ZIP'i: `artifacts/burkut-cpanel-smtp.zip`.
- Sıfır kurulum ZIP'i: `artifacts/burkut-tam-kurulum.zip`. `site/`, `burkut-private/`, `KURULUM.txt` ayrı; şifre içermez. Mevcut kurulumda özel config ve state üzerine yazılmaz.
- Tam ZIP artık `npm run release:full -- gemnative ADDRESS@gmail.com` ile tekrar oluşturulabilir. Adres argümanıdır; şifre verilmez.
- Yol haritasındaki konsept vitrini/galeri işinin ilk uygulaması hazır. Gerçek müşteri portföyü izinli içerik bekliyor; yönetim paneli veya gerçek AI açılmadı.
