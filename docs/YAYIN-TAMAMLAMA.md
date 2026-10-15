# Yayını tamamlama listesi — 14 Ekim 2026

## Hazır olanlar

- Canlı form ve logolu HTML Gmail bildirimi kullanıcı tarafından doğrulandı.
- Paylaşım görseli: `public/images/burkut-social.png`, 1200×630 PNG. OG ve Twitter büyük görsel etiketleri siteye eklendi; mutlak HTTPS görsel adresi kullanılıyor.
- SMTP bağlantısı açık güncel site: yerel `artifacts/burkut-cpanel-smtp.zip`. Bu ZIP özel config veya şifre içermez.
- [Aydınlatma metni taslağı](./AYDINLATMA-METNI-TASLAK.md), gerçek form alanları, teknik kayıtlar ve Gmail akışı esas alınarak hazırlandı. Şirket unvanı ve başvuru e-postası kullanıcıdan alındı.
- Lint, 47 uygulama testi, typecheck, üretim derlemesi ve varlık boyut kontrolü geçti. Bu paket için fiziksel cihaz veya ekran okuyucu testi yapılmış sayılmaz.

## Kullanıcının sağlaması gereken bilgiler

**15 Ekim güncellemesi:** Şirket e-postası `burkuttechnlogie@gmail.com`, telefon `0505 932 7310`, Instagram `@burkutteknoloji` siteye eklendi. Sunucu ülkesi Hollanda, yedek saklama süresi 2 gün olarak aydınlatma taslağına işlendi. Aşağıdaki eski listede bu alanlar artık tamamlanmıştır; posta adresi, hosting sağlayıcısı/log süreleri ve aktarım düzeni açık kalır.

1. Şirketin tebligata elverişli posta adresi. Telefon ve sosyal hesaplar varsa sitede gösterilmesi istenen güncel değerler.
2. Hosting firmasının adı ve sunucu ülkesi; erişim/hata logları ile yedeklerin saklanma süreleri. Hosting desteğinden öğrenilebilir; şifre gerekmez.
3. Gmail ve proje yazışmalarında uygulanacak saklama/silme düzeni. Kod Gmail'deki e-postaları silmez; işletme bir süre veya ölçüt belirleyip uygulamalı.
4. Google/Gmail veri alıcısı ve Kanun m.9 aktarım düzeninin doğrulanması. Düzenli yurt dışı aktarımlar için uygun mekanizma işletme ve gerektiğinde uzman tarafından netleştirilmeli; teknik TLS bağlantısı veya aydınlatma kutusu bu konuyu tek başına çözmez. Uygun düzen kurulamazsa mail hizmeti/veri akışı değiştirilmeli.

Bu bilgiler gelince taslak son haline getirilebilir ve formun gönder düğmesinden önce/alt bilgiden erişilebilir şekilde yayımlanabilir. Eksik alanlar ziyaretçi metnine yayımlanmadı. Aydınlatma ve açık rıza aynı şey değildir.

## cPanel güncellemesi

`burkut-cpanel-smtp.zip` içeriğini yalnızca Bürküt subdomain'inin belge köküne çıkar. `index.html`, `assets/`, `images/` ve `api/` belge kökünde bulunur. Canlı özel klasördeki `config.php`, `vendor/` ve `state/` dosyalarını değiştirme. Yeni özel ZIP'i canlı config üzerine açma; boş şifre ve kapalı gönderim içerir.

Yüklemeden sonra `/images/burkut-social.png` açılmalı; sayfa kaynak kodunda `og:image` bulunmalı. WhatsApp/sosyal platformlar eski önizlemeyi önbelleğe alabilir; görselin ilk paylaşımda anında yenileneceği garanti edilmez. Bu paketin üretimi cPanel'e otomatik yükleme yapmaz.

## Kalan manuel kontroller

- Gerçek telefonda menü, form, ekran klavyesi ve yatay/dikey görünüm.
- Gerçek tarayıcı yüzde 200 zoom, ekran okuyucu, yalnızca klavye ile kullanım ve işletim sisteminin azaltılmış hareket tercihi.
- Güncel paket yüklendikten sonra paylaşım önizlemesi, canlı form ve önbellek başlıklarının kontrolü. Gmail testini gereksiz tekrarlarla çoğaltma.
- İsteğe bağlı gerçek Yangan AI için sağlayıcı/bütçe/hosting kararı. Şu an gerçek AI bağlantısı açılmadı.
