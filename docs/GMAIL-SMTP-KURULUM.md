# Gmail SMTP — cPanel kurulumu

Bu paket gerçek bağlantı için hazırlanmıştır; henüz Gmail'e mail gönderildiği veya cPanel'e yüklendiği anlamına gelmez. PHP 8.2+, OpenSSL ve mbstring gerekir. Altyapı PHPMailer 7.1.1 ile Composer lockfile üzerinden sabitlenmiştir.

## 1. Gmail hesabını hazırla

1. Kullanılacak Gmail hesabında [Google Hesabım / Güvenlik](https://myaccount.google.com/security) bölümünü aç.
2. İki adımlı doğrulamayı etkinleştir.
3. [Uygulama şifreleri](https://myaccount.google.com/apppasswords) sayfasında `Bürküt Web Formu` adlı bir uygulama şifresi oluştur.
4. Bu şifreyi yalnızca cPanel'deki özel `config.php` dosyasına yaz. Sohbete, GitHub'a veya frontend `.env` dosyasına ekleme. Normal Gmail hesap şifresi kullanılmaz.

Google'a göre uygulama şifreleri iki adımlı doğrulama gerektirir; bazı kuruluş hesaplarında, yalnızca güvenlik anahtarı kullanılan kurulumlarda veya Gelişmiş Koruma durumunda seçenek görünmeyebilir. [Google açıklaması](https://support.google.com/accounts/answer/185833?hl=en).

## 2. Özel sunucu dosyalarını yükle

1. cPanel Dosya Yöneticisi'nde hesap ana dizinine git: örneğin `/home/CPANEL_USER/`.
2. Burada `burkut-private` klasörünü oluştur. **Bütün domain belge köklerinin dışında olmalı; public_html içine koyma.**
3. `burkut-mail-private.zip` dosyasını bu klasöre yükle ve çıkar. Kökünde `config.php`, `ProjectMail.php` ve `vendor/` bulunmalı.
4. `config.php` içinde `gmail_address` ve `recipient` aynı Gmail adresi olabilir. `app_password` alanına oluşturduğun uygulama şifresini yaz. Başlangıçta `enabled` false kalsın.
5. Özel klasör erişimi mümkünse 700, config.php 600 olmalı; PHP kullanıcısının okuyabildiğini kontrol et. `state/` klasörü ilk gönderimde otomatik oluşur ve yazılabilir olmalıdır.

Bu ZIP boş şifre içerir. Canlı ayarlardan sonra özel ZIP'i tekrar açarak `config.php` üzerine yazma; şifre ve ayarları silersin.

## 3. Site ve PHP rotasını yükle

1. `burkut-cpanel-smtp.zip` içeriğini Bürküt subdomain'inin belge köküne çıkar. Ana Gemnative sitesinin dizinine yükleme.
2. Belge kökünde `api/projects.php` dosyasını düzenle. `$private = '/home/CPANEL_USER/burkut-private';` satırındaki `CPANEL_USER` yerine gerçek cPanel kullanıcı adını yaz.
3. Tarayıcıda `https://burkut.gemnative.com/api/projects.php` adresine git. Özel dosyalar doğru bağlandıysa GET isteği JSON `METHOD_NOT_ALLOWED` döndürür. PHP kaynak kodu görünür veya dosya indiriliyorsa PHP çalışmıyordur; gönderimi açma ve hosting desteğine başvur.
4. SMTP ayarı: `smtp.gmail.com`, port **587**, STARTTLS, kimlik doğrulama açık. Kod sertifika doğrulamasını kapatmaz. Hosting'in dışarıya 587 bağlantısına izin vermesi gerekir. [Google SMTP ayarları](https://support.google.com/mail/answer/7104828?hl=en).

Bu site ZIP'inde form bağlantı bayrağı açık, AI kapalıdır. Sunucu config'inde `enabled=false` kaldıkça gerçek mail gönderilmez. Statik eski ZIP formu açmaz. API yolu `/api/projects.php` olduğu için Apache rewrite gerekmez.

## 4. Kontrollü bağlantı testi

1. `config.php` içindeki adres/şifre/yol doğru olduğunda `enabled` değerini true yap.
2. Formdan tek bir kısa test talebi gönder. Form kişisel bilgilerin talep için iletileceğini açıklar. Gerçek veri işleme düzenine uygun aydınlatma metni ayrı olarak tamamlanmalıdır; bu paket hukuk metni oluşturmaz.
3. Gmail gelen kutusu, spam ve gönderilenler klasörlerini kontrol et. Başarı mesajı SMTP sunucusu kabul ettikten sonra gösterilir; gelen kutusuna ulaşma ayrıca doğrulanır.
4. Gelen mailde Yanıtla'yı kontrol et: yanıt ziyaretçinin formda yazdığı e-posta adresine gitmeli. Gönderici her zaman yapılandırılmış Gmail hesabıdır.
5. Test bittiğinde sonucu ve görünen hata varsa şifre içermeyen hata mesajını paylaş. Şifreyi gösteren ekran görüntüsü paylaşma.

Sorun halinde `enabled=false` gönderimi durdurur. TLS veya şifre kontrolünü kapatmak yerine adres, uygulama şifresi, PHP uzantıları ve hosting SMTP erişimi kontrol edilir.

## Koruma ve sınırlar

### Çalışan kurulumda e-posta tasarımını güncelleme

Bildirim, koyu yeşil başlık, iletişim tablosu, proje özeti ve ziyaretçiye mail yanıtı düğmesi içeren HTML olarak gönderilir. Düz metin alternatifi korunur. Kullanıcı alanları HTML için kaçışlanır; uzaktan resim veya font yüklenmez. E-posta istemcisine göre köşe, boşluk ve renk gösterimi değişebilir.

Yalnızca `server/cpanel/ProjectMail.php` dosyasını sunucunun özel `burkut-private` klasöründeki aynı dosyanın yerine yükle. Çalışan `config.php`, `vendor/` ve `state/` dosyalarını değiştirme. Bu değişiklik frontend derlemesi gerektirmez. Yeni bir test talebiyle Gmail görünümünü ve Yanıtla adresini doğrula; eski e-postaların görünümü değişmez.

- Sunucu alan/tip/uzunluk doğrulaması, satır sonu/header injection engeli ve 24 KiB gövde sınırı.
- Kaynak origin ve POST/JSON kontrolü. Origin tek başına bot koruması/kimlik doğrulama değildir.
- İstemci IP'si bağlantı bilgisinden alınır; kontrolsüz proxy başlığı kullanılmaz. CDN/reverse proxy varsa güvenilir IP çözümlemesi hosting'e göre ayrıca ayarlanmalı.
- Bir istemci için dakikada 5 geçerli deneme; varsayılan toplam günlük 50 SMTP denemesi (UTC). Başarısız denemeler de günlük sınıra dahil. Bu Gmail'in resmi kotası değildir; uygulama korumasıdır.
- Dosya kilidiyle PHP worker'ları arasında tekrar koruması: aynı anahtar/içerik başarı alındısını tekrar verir, farklı içerik 409 döner. Belirsiz SMTP sonuçları 24 saat aynı anahtarla tekrar gönderilmez. SMTP kendi başına idempotency sunmaz; süre dolması, yeni istek anahtarı veya sayfa yenileme sonrası tekrar mail ihtimali vardır.
- Özel state dosyası içerik hash'i, hash'lenmiş IP, sayaç ve alındı saklar; mesaj/e-posta/şifreyi yazmaz. Hash'lenmiş IP anonimlik garantisi değildir. Eski kayıtlar sonraki istekte temizlenir. Bozuk state gönderimi durdurur; belirsiz gönderimde state'i silerek kör tekrar yapma.
- Sınırlar tek paylaşılan yerel dosya sistemi içindir; çoklu host/dağıtık ortamda ortak depo gerekir. Kamuya açık form için ihtiyaç halinde ek spam koruması değerlendirilir.
- SMTP socket ve komut süreleri sınırlıdır; tüm işlem süresi hosting'e de bağlıdır. İstemci 30 saniyede beklemeyi bırakır. İptal sırasında kabul edilmiş mail olabileceği için belirsiz sonuç başarı sayılmaz.

## Geliştirici doğrulaması ve paketleme

```sh
cd server/cpanel
composer install --no-dev --prefer-dist --no-plugins --no-scripts
php test.php
cd ../..
node scripts/prepare-cpanel-smtp.mjs YOUR_ADDRESS@gmail.com CPANEL_USER
```

Script, iki servis kapalı olan normal yayından ayrı SMTP staging dizini oluşturur; gerçek config veya şifre okumaz. İsteğe bağlı cPanel kullanıcı adı verilirse staging API yolu `/home/CPANEL_USER/burkut-private` düzenine göre hazırlanır. Dosya Yöneticisi'ndeki gerçek ana dizin farklıysa yüklenen API yolu buna göre düzeltilmelidir. Staging'in `public/` ve `private/` içerikleri ayrı ZIP yapılır. Özel ayarlar ve vendor Git'e eklenmez. PHP testleri sentetik teslim callback'i ve ağ bağlantısız MIME üretimi kullanır; Gmail'e bağlantı yapmaz.

Kaynak: [PHPMailer resmi deposu](https://github.com/PHPMailer/PHPMailer).
