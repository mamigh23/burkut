# Baştan sona yerel site kontrolü — 15 Ekim 2026

## Ortam ve kapsam

Gerçek in-app Chromium tarayıcısı kullanıldı. Ana geliştirme sunucusu 5173 yanıt vermediği için önce 4173'te üretim çıktısı, 5174'te geliştirme/audit sürümü açıldı. 5173 sürecinin bu projeye ait olduğu doğrulanıp yeniden başlatıldı; normal adres de tekrar çalıştı. Bu sunucu sorunu site kaynak kodu hatası olarak sayılmadı.

Ana sayfa ile web, uygulama ve oyun hizmet sayfaları 320, 390, 768 ve 1440 px genişliklerde kontrol edildi: 16 üretim görünümünde yatay taşma, bozuk yüklenmiş görsel veya birden fazla h1 görülmedi. Ek olarak 640×360 kısa mobil menü kontrol edildi. Bunlar gerçek fiziksel telefon testleri değildir.

## Bulunan ve giderilen hatalar

| Tetikleyici | Önce | Düzeltme ve yeniden kontrol |
| --- | --- | --- |
| Hizmet sayfasını doğrudan `#iletisim` ile açmak | React formu sonradan oluşturduğu için sayfa tepede kalıyordu | Ortak ilk-anchor hook'u ana sayfa ve hizmetlerde çalışır; doğrudan formu gösterir, kendiliğinden klavye açmaz. 390 px üretim ölçümünde form üstü yaklaşık 96 px; odak BODY'de |
| Galerinin ilk düğmesinde Shift+Tab | Odak modalın dışına çıkabiliyordu | İlk/son kontrol arasında Tab çevrimi eklendi; gerçek tarayıcıda Shift+Tab sonraki düğmeye, Tab kapatma düğmesine döner. Escape kapanır, açma düğmesine odak ve gövde kaydırması geri gelir |
| Galeriyi masaüstünde açmak | CSS sıfırlaması native dialog marjını kaldırdığı için pencere sol üstte açılıyordu | Galeriye açık `margin: auto` verildi; masaüstü görünümünde ortalanması tekrar kontrol edildi |
| İlk Yangan özetini mobilde forma aktarmak | İletişim bölümünün tanıtım yazısına kayıyor, ad alanı ekranın altına düşüyordu; ilk aktarımda hizmet güncellemesiyle odak yarışabiliyordu | Eski bölüm kaydırması kaldırıldı; ortak form yönlendirmesi kullanıldı. Taslak alanları layout aşamasında uygulanır. Temiz yüklemeden ilk aktarımda hizmet seçili ve ad alanı odaklı doğrulandı |
| Galeri görselini büyütme düğmesi | Ekran okuyucu adı görünen “Yakından bak” metnini içermiyordu | Erişilebilir ad bu metinle başlar; axe label-content-name-mismatch bulgusu giderildi |
| Hizmet sayfasının üst logosu | Üst alan landmark dışında kalıyordu | Üst kapsayıcı semantik header yapıldı; axe region bulgusu giderildi |

Denetim yardımcısı ayrıca sonlu giriş animasyonlarının bitmesini bekler. İlk karede yarı saydam içerikten oluşan geçici kontrast bulgusu böylece kalıcı arayüz hatasıyla karıştırılmaz; sonsuz dekoratif animasyonlar beklenmez.

## Denenen etkileşimler

- Hero kartının seçilip seçimin kaldırılması; ürün sekmelerinde ok/Home/End gezinmesi.
- Süreç bölümü ve SSS açılması; hizmet kartı → hizmet sayfası → diğer hizmet → tarayıcı geri akışı.
- Mobil menü açma, iletişime geçince kapanma ve form odağı; kısa mobil menüde 250 px menü yüksekliği/360 px viewport ve taşma olmaması.
- Üç hizmette doğru ön seçim ve görseller; galeri büyütme, görsel değiştirme, klavye çevrimi ve Escape.
- Boş formda gerekli alan hataları; hatalı e-postada e-posta odağı; ek bilgi aç/kapat ve değer korunması. Yerel kapalı gönderim sürümünde geçerli sentetik veriyle kontrol sonucu.
- Yangan'ın beş adımlı özeti, forma aktarımı, sıfırlama ve yerel sohbet cevabı. Gerçek AI sağlayıcısı kullanılmadı.
- Site hareket düğmesinin ortak paused durumuna geçmesi, aşağıdaki gezegen görselinin yüklenmesi ve hata konsolunun kontrolü.

## Sonuçlar ve kanıt

- 15 test dosyasında **67 uygulama testi** geçti; ayrıca **24 ağ bağlantısız PHP mail kontrolü** başarılı. Lint, typecheck, üretim, boyut ve dört sayfa yayın denetimi geçti.
- Dört sayfada mobil axe 4.14.0 taramasında otomatik ihlal **0**. Her raporda elle değerlendirme isteyen color-contrast kategorisi kaldı; sonuç tam WCAG uygunluk belgesi değildir. Arka plan gradyanları ve dönüşümlü sahneler otomatik olarak her durumda çözümlenemiyor.
- İletişim alanının bildirilen gradyan uç renklerine göre metin kontrastı hesaplandı: açık ana metin 11.34:1, mint 8.06:1, açıklama 6.98:1 ve bağlantılar 8.71:1 minimum. Bu hesap bütün sayfadaki tüm piksel/hover durumlarını kapsamaz.
- JS yaklaşık 90.5 KiB gzip, CSS 15.0 KiB gzip, fontlar 189.1 KiB; mevcut bütçeler içinde. Bu değerler yeni Lighthouse puanı değildir.
- [16 görünümün ölçümleri](./evidence/responsive-2026-10-15.json), [axe özetleri](./evidence/a11y-2026-10-15.json), [mobil form](./evidence/form-mobile-2026-10-15.png), [masaüstü galeri](./evidence/gallery-desktop-2026-10-15.png), [Yangan son konumu](./evidence/yangan-transfer-2026-10-15.json). Galeri 1280×720 ekranda x=160/y=23 ve 960×674 boyutuyla ortalandı; Yangan aktarımında mobil form üstü 96 px, ad alanı 337 px ve odak contact-name.

## Açık kalanlar

Gerçek fiziksel telefon/ekran klavyesi, gerçek yüzde 200 zoom, ekran okuyucu ve işletim sisteminin azaltılmış hareket tercihiyle ayrı kabul hâlâ gerekiyor. Tarayıcı viewport kontrolü bunların yerine sayılmadı. Canlı cPanel'e bu paketin yüklenmesi, yeni sürümde gerçek Gmail teslimi ve hosting özel yönlendirmeleri ayrıca doğrulanmalı. Bu turda gerçek mail gönderilmedi veya özel sunucu config'i değiştirilmedi. Aydınlatma metninin işletme/aktarım bilgilerine bağlı eksikleri de açık.
