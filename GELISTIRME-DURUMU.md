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
- Ayrı soru alanında hazır hizmet yanıtları. Üçüncü paketle sürekli demo etiketi kullanıcı kararıyla kaldırıldı.
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

## İkinci geliştirme paketi: gezegen ve kalite

- Soyut bağlantı küresi, kullanıcı kararıyla özgün ve hayalî Bürküt gezegeniyle değiştirildi. Görsel şeffaf WebP, küçük ekranlar için ayrı 640 px sürüm ve lazy yükleme kullanıyor.
- Gezegenin boyutları önceden ayrıldı. Görsel yüklenemezse CSS küre yedeği gösterilir. Hayalî dünya olduğu görünür açıklamayla belirtilir.
- Gezegen ve hizmet bandı için ortak hareket durdurma kontrolü eklendi; sistem hareket azaltma tercihi korunur. Tarayıcıda düğmeye basınca her iki animasyonun da `none` olması doğrulandı.
- Mobil Yangan kapanışında gizlenen açma düğmesi yüzünden odak dönüşünün başarısız olabildiği durum düzeltildi. Mobil Escape sonrası odak açma düğmesine döndü.
- Yangan özeti forma aktarıldığında ad alanına odak veriliyor. Atlanan detay “Belirtilmedi” olarak aktarılıyor; tarayıcıda doğrulandı.
- Kısa ekran ve klavye için panel yüksekliği VisualViewport yüksekliğine bağlandı. Gerçek telefon testi hâlâ yapılmadı.
- Doğrudan bölüm URL'siyle açılışta ilgili anchor'a kaydırma eklendi ve gezegen bölümünde doğrulandı.
- Mobil menünün masaüstü breakpoint'inde açık kalmasına karşı durum ve görünürlük koruması eklendi.
- Gezegen sonrasında 12 responsive genişlik tekrar kontrol edildi; yatay taşma görülmedi. Mobil tarayıcı daha küçük WebP dosyasını seçti.
- 111 düz yüzey metni için hesaplanmış renklerden kontrast oranı kontrol edildi; eşik altı sonuç yok. Gradient veya yarı saydam arka plan nedeniyle 22 öğe bu otomatik kontrolden dışlandı. Bu sonuç tam erişilebilirlik denetimi değildir.
- Yerel **üretim build önizlemesinde** ana sayfa ve gezegen dosyası HTTP 200 döndürdü; gezegen ve Yangan hazır yanıtı çalıştı. Kontrol edilen temiz üretim sekmesinde konsol hata/uyarı kaydı bulunmadı. Bu kontrol canlı yayın veya üretim performans ölçümü değildir.

## Üçüncü geliştirme paketi: sunum ve otomatik kalite

- Sitedeki demo etiketleri, önizleme kutusu ve ilgili anlatım kaldırıldı. Yangan “dijital asistan” olarak tanımlanıyor. Form kontrol düğmesi gerçek gönderim izlenimi vermiyor; gönderim bağlantısının kapalı olduğu işlem alanında ve kontrol sonucunda belirtiliyor.
- Hero için `100vh` yedeği ve `100dvh` minimum yüksekliği eklendi. İçeriğin daha uzun olduğu kısa ekranlarda kesilmeden büyüyebiliyor.
- Gezegenin 16 saniye / 8 px hareketi, 10 saniye / 34 px salınım ve ±3 derece eğime dönüştürüldü. 18 saniyelik yörünge animasyonu eklendi. Ekran dışındayken hareket çalışmıyor; ortak durdurma ve sistem azaltılmış hareket kuralları korunuyor.
- GitHub Actions kalite akışı eklendi: main push ve pull request için temiz bağımlılık kurulumu, lint, test ve build. Yerelde kontroller geçti; GitHub çalıştırma sonucu ayrıca kontrol edilmeli.
- Kullanılmayan italik fontlar ve JetBrains Mono'nun gereksiz alfabe tanımları çıkarıldı. Üretim CSS dosyası 72,13 kB'dan 62,10 kB'a, gzip 21,40 kB'dan 13,74 kB'a düştü. Bu ölçüm Lighthouse puanı değildir.
- 1920×944, 1440×1100, 1440×800, 768×1024, 390×844 ve 320×568 ekranlarında hero yüksekliği ekran yüksekliğinin altında kalmadı; yatay taşma görülmedi. Sayfa metninde demo ifadesi bulunmadı.
- Gezegen ve yörünge animasyonlarının çalışması, durdurulduğunda ikisinin de `none` olması ve tekrar başlatılması tarayıcıda doğrulandı.
- TypeScript, üretim build, lint ve 6 akış/doğrulama testi başarılı.

## Dördüncü geliştirme paketi: kaydırma bandı ve boyut koruması

- Zamanla otomatik akan ince şerit kaldırıldı. Büyük dolu/konturlu tipografi, daha geniş boşluklar ve kaydırmaya bağlı yatay hareket eklendi. Aşağı kaydırmada sola, yukarı kaydırmada geri hareket eder.
- Güncelleme yalnızca bant ekran yakınındayken çalışır; pasif scroll dinleyicisi ve requestAnimationFrame ile birleştirilir. Kapatılan hareket tercihi ve sistem azaltılmış hareket tercihinde bant sabit kalır.
- Tarayıcıda iki kaydırma yönünde farklı transform değerleri ölçüldü. Hareket kapalıyken kaydırma sonrasında offset sabit kaldı. 320, 390, 768, 1440 ve 1920 px genişlikte yatay taşma görülmedi.
- Üretim dosyaları için `npm run check:assets` eklendi ve GitHub kalite akışına bağlandı: toplam JS 100 KiB gzip, toplam CSS 20 KiB gzip, tek raster görsel 600 KiB sınırı. Yeni build yaklaşık 83,3 KiB JS / 13,4 KiB CSS gzip ile sınırların içinde.
- Sınırı aşan geçici bir görselle kontrolün hata kodu 1 verdiği doğrulandı; geçici dosya kaldırıldı ve normal çıktı tekrar geçti.
- TypeScript, build, lint ve mevcut 6 test geçti. Boyut koruması Lighthouse veya gerçek cihaz performans ölçümünün yerine geçmez.

## Beşinci geliştirme paketi: erişilebilirlik denetimi

- Yalnızca açık yerel denetim adresinde çalışan axe-core aracı eklendi; üretim paketinde araç metni veya kodu bulunmadığı doğrulandı.
- Konsept maketlerdeki düşük kontrastlı tarayıcı metni, yan etiket ve takvim rakamları koyulaştırıldı. Süreç düğmeleri ve hareket kontrolünün görünür metin/erişilebilir ad uyuşmazlıkları düzeltildi.
- “İçeriğe geç” bağlantısı için ana içerik odak hedefi yapıldı; klavye Enter sonrası aktif öğenin main olması doğrulandı.
- Masaüstünde üç ürün sekmesi, mobilde menü, hatalı form, Yangan karşılama ve ilk akış sorusu tarandı. Yedi durumda otomatik ihlal sayısı 0; manuel inceleme isteyen incomplete bulgular korundu. Bu sonuç tam erişilebilirlik sertifikası değildir.
- [Denetim notları](./docs/qa/ERISILEBILIRLIK.md) ve [ham sonuçlar](./docs/qa/accessibility-2026-10-13.json) kaydedildi.
- Önceki iki GitHub Quality çalışmasının success sonucu API üzerinden doğrulandı: cede6ab ve 5a3708f. Yeni commit'in kontrol sonucu ayrıca izlenmeli.
- TypeScript, lint, build, 6 test ve dosya boyutu sınırları geçti. Paket kurulumunun npm denetimi 0 güvenlik açığı bildirdi.

## Altıncı geliştirme paketi: yerel üretim ölçümü ve kalan işler

- Üretim build'inden ayrı .qa-dist ölçüm kopyası, qa:prepare / qa:preview komutları ve FCP/LCP/CLS/kaynak raporu eklendi. Normal yayın çıktısına ölçüm kodu eklenmedi.
- Masaüstü 1440×900 ve mobil ekran 390×844 örnekleri alındı. Sonuçlar ve ölçüm sınırları [performans raporunda](./docs/qa/PERFORMANS.md) kayıtlı.
- Mobilde gezegenin 640 px görselinin yüklendiği ve yatay taşma olmadığı doğrulandı. Kontrol edilen ölçüm sekmesinde hata/uyarı kaydı yok. Geçici önizleme sunucusu durduruldu.
- Yol haritasının başına aşamaların güncel durumu, kalan işler, öncelik sırası ve gerçek servisler için gereken kararlar eklendi.
- Build, lint, mevcut 6 test ve dosya boyutu kontrolü geçti.

## Yedinci geliştirme paketi: talep servisi temeli ve mobil akış

- Tarayıcı/sunucu için ortak alan, tip, uzunluk ve tek satır doğrulaması eklendi. Yangan bütçe girişi formun 120 karakter sınırıyla eşitlendi.
- Hosting bağımsız Fetch Request/Response talep işlemi eklendi: origin/method/content-type, 24 KiB gövde, yoğunluk, tekrar anahtarı, teslim zaman aşımı ve gerçek alındı kontrolü.
- İstemci adaptörü gerçek gönderim kapalıyken ağ isteği yapmıyor. Açık mod için aynı origin API, tekrar denemede sabit anahtar, sunucu alan hataları ve onaylı başarı davranışı hazır. Bayrak kapalı kalıyor; sunucu rotası/sağlayıcı bağlanmadı.
- 12 sunucu sözleşmesi ve 4 istemci testi eklendi; mevcut 6 testle birlikte toplam 22 test geçti.
- Mobil menü bağlantısı kapanınca odak hedef bölüme taşınıyor; hizmetler bölümünde doğrulandı. Sunucu alan hataları için ilk hata alanına odak davranışı eklendi.
- Mobil Yangan akışı özet adımına kadar tekrar tamamlandı; bütçe alanı 120 sınırı, atlanan detay, forma aktarım ve ad alanına odak kontrol edildi. Özet durumunun axe-core taramasında otomatik ihlal 0; manuel inceleme bulguları [raporda](./docs/qa/yangan-summary-2026-10-13.json) korundu.
- API temelinin kurulum sırası ve tek süreç bellek sınırları [sunucu notlarında](./server/README.md) kayıtlı. Gerçek bağlantı ve veri gönderimi başlamadı.
- Node.js 24 yerel API runner ve Vite /api proxy eklendi. Boş sentetik gövdeyle doğrudan HTTP ve proxy kontrolleri 503 / SUBMISSION_UNAVAILABLE döndü; yerel rota doğrulandı. Teslim adaptörü eklenmedi ve kontrol sunucusu durduruldu.
- Son build, lint, 22 test ve dosya boyutu kontrolü geçti.

## Sekizinci geliştirme paketi: değiştirilebilir hero kartları

- Hero maketleri bağımsız seçilebilir kartlara dönüştürüldü: hover, klavye odağı ve tıklama/dokunma seçimi. Aynı anda tek kalıcı seçim; tekrar basınca temizlenir.
- Kart üzerine gelince yükselme, öne çıkma ve mint kenar/gölge vurgusu eklendi. Geçişler mevcut azaltılmış hareket kurallarına bağlı.
- Her kartın görsel yolu, kırpma biçimi ve açıklaması src/content/heroCards.ts içinde. Özel görsel yüklenemezse mevcut sahne geri gelir. [Değiştirme rehberi](./docs/HERO-KARTLARI.md) kaydedildi; yönetim paneli eklenmedi.
- Dar ekranlarda tüm kartlara yatay kaydırmayla ulaşılır. 320, 390, 768, 1024 ve 1440 px belge taşması kontrolü geçti; mobil son karta klavyeyle odaklanınca kaydırma alanına gelmesi doğrulandı.
- Hover sırasında kalıcı seçim kapalıyken vurgu, Enter ile seçim, geçici gerçek görsel değişimi ve hatalı yolun yedeği tarayıcıda doğrulandı. Test görselleri ayarlardan kaldırıldı; varsayılan maketler korunuyor.
- Yeni kartlarla axe-core otomatik taraması 0 ihlal verdi. Build, lint, 22 test ve dosya boyutu sınırları geçti.

## Dokuzuncu geliştirme paketi: cPanel yayın hazırlığı

- Kullanıcı hedef adresi https://burkut.gemnative.com ve hosting türünü cPanel olarak belirledi.
- Canonical, OG URL/site adı, robots.txt ve sitemap gerçek hedef adresle eklendi.
- Gönderim bayrağı disabled olarak üretim build alındı. Build ve dosya boyutu kontrolleri geçti.
- artifacts/burkut-cpanel.zip hazırlandı: 25 dosya, yaklaşık 1 MB. ZIP kökünde index.html, robots.txt ve sitemap.xml bulunduğu doğrulandı; kaynak proje ve gizli .env dosyaları paketlenmedi.
- [cPanel yayın rehberi](./docs/CPANEL-YAYIN.md) eklendi. ZIP yerel teslim dosyasıdır; Git'e eklenmez. Kaynak ve rehber repo içinde korunur.
- cPanel/DNS/SSL üzerinde işlem yapılmadı; site bu çalışmada canlıya yüklenmedi. Gerçek form teslimi ve AI bağlantısı kapalı kalıyor.

## Onuncu geliştirme paketi: canlı doğrulama ve Yangan servis temeli

- Kullanıcının cPanel yayını HTTPS üzerinden doğrulandı. HTTP yönlendirmesi, robots/sitemap, gezegen görseli, 320/390/1440 px taşma kontrolü ve hero seçimi geçti. [Canlı rapor](./docs/qa/CANLI-YAYIN.md).
- Yangan için ortak sohbet doğrulaması, güvenilir sunucu talimatı, sınırlı geçmiş, 24 KiB gövde, yoğunluk ve süre sınırları eklendi. Sunucu anahtarı veya gerçek sağlayıcı kurulmadı.
- İstemci bağlantı bayrağı kapalıyken ağ isteği yapmıyor. Açık mod için bekleme, tekrar deneme, sıfırlamada iptal ve proje özeti alternatifi hazır. [Kurulum notları](./docs/YANGAN-SERVISI.md).
- Yerel tarayıcıda hazır yanıtın görüntülendiği doğrulandı. Build, lint, 36 test ve dosya boyutu kontrolü geçti.
- Yerel `/api/chat` ve Vite proxy üzerinden sentetik POST isteği 503 döndürdü; sağlayıcısız rota doğrulandı ve kontrol sunucusu durduruldu.
- Yeni kaynak değişiklikleri canlıya otomatik yüklenmez; güncel cPanel ZIP'i kullanıcı tarafından ayrıca yüklenmelidir. Gerçek form ve AI kapalı kalıyor.

## On birinci geliştirme paketi: Yangan hata ve klavye davranışı

- Yoğunluk ve bağlantı hataları ayrıldı; ağ hatası ve HTML hata sayfası için güvenli açıklama eklendi. İstemci testleriyle birlikte toplam 37 test geçti.
- Bekleme/hata durumları ve ekran boyutu değişimi için sohbet kaydırması düzeltildi. Klavyeyle tekrar denemede soru alanına odak, Escape ile açma düğmesine dönüş ve mod değişiminde güncel duyuru doğrulandı.
- Gerçek sohbet modu için mesaj aktarımı açıklaması hazır; yerel proje özeti akışında yerel açıklama korunuyor. Hazır yanıt sürümüne ilişkin ek tanıtım cümlesi kaldırıldı.
- 320/390/640/1440 px kontrolleri ve mobil hata durumunda axe-core taraması geçti. Otomatik ihlal 0; kapsam ve sınırlar [test raporunda](./docs/qa/YANGAN-HATA-KONTROLU.md).
- Test ayrı yerel sunucuda sentetik soruyla yapıldı. Gerçek sağlayıcı kurulmadı; cPanel üretim paketindeki iki servis bayrağı kapalı.

## On ikinci geliştirme paketi: cPanel Gmail SMTP adaptörü

- PHP 8.2+ ve PHPMailer 7.1.1 tabanlı `/api/projects.php` servisi hazırlandı. Gönderici/alıcı config'ten, Reply-To ziyaretçiden alınır; mesaj düz metindir. Gmail STARTTLS/587 kullanır, sertifika doğrulaması kapatılmadı.
- Şifre ve vendor belge kökü dışındaki özel klasöre ayrıldı. Örnek config gönderimi kapalı tutuyor; kişiselleştirilmiş yerel paket boş şifreyle hazırlandı. Gerçek ayar ve mail adresi public kaynaklara eklenmedi.
- Sunucu doğrulama, 24 KiB gövde sınırı, bağlantı IP'siyle yoğunluk koruması, günlük limit ve 24 saat tekrar kaydı eklendi. SMTP sonucu belirsizse aynı anahtar tekrar mail göndermez. SMTP/gelen kutusu onayı arasındaki fark rehberde açıklandı.
- 38 JavaScript testi ve SMTP bağlantısı yapmayan 20 PHP kontrolü geçti. MIME/header, tekrar, yoğunluk, belirsiz sonuç, UTF-16 uzunluk ve bozuk depo davranışı kontrol edildi. Composer güvenlik denetimi uyarı bulmadı.
- Özel yol bağlanmış yerel PHP HTTP rotasında GET 405 / METHOD_NOT_ALLOWED ve kapalı POST 503 / SUBMISSION_UNAVAILABLE JSON dönüşü doğrulandı. Kontrol sunucusu durduruldu; cPanel üzerinde henüz çalıştırılmadı.
- [Gmail/cPanel adım adım rehberi](./docs/GMAIL-SMTP-KURULUM.md), ayrı site/özel klasör paketleme scripti ve GitHub PHP kontrolü eklendi. Gerçek uygulama şifresi, canlı dosya yükleme ve Gmail alındı testi bekliyor; canlı form bu paket hazırlanmasıyla açılmış sayılmaz.

## On üçüncü geliştirme paketi: font yükü ve form kullanımı

- Kullanıcı SMTP kurulumunu sonraya bıraktı. Gmail uygulama şifresi oluşturma adımı bekliyor; mail veya AI bağlantısı açılmadı.
- Font dosyaları 13'ten 6'ya, toplam 319264'ten 193612 bayta indi. Türkçe Latin/Latin Extended parçaları ve lisanslar korundu. Dosya boyutu kontrolüne 210 KiB font sınırı eklendi.
- Form açıklamasına karakter sayacı; bütçe alanına hata ve aria bağlantıları eklendi. İşlem sırasında alanlar devre dışı, bitince tekrar kullanılabilir. Proje türü değişince eski durum mesajı temizleniyor.
- Yerel sentetik form testi, Türkçe karakter görsel kontrolü, 320/390 px taşma kontrolü ve mobil form erişilebilirlik taraması geçti. Otomatik ihlal 0. 38 test, typecheck, lint, build ve boyut sınırları geçti.
- Kapsam ve ölçüm sınırları [font/form raporunda](./docs/qa/FONT-VE-FORM.md). Gerçek cihaz/ekran okuyucu/Lighthouse çalışması sürüyor.

## On dördüncü geliştirme paketi: 14 Ekim kalite kontrolü

- Son hata tasarımı kullanıcı isteğiyle geri alınmış durumda; sade form korunuyor. Logo, Gmail ve iletişim bilgilerini kullanıcı hazırlıyor.
- Kısa mobil ekranda menüye kaydırma sınırı, dışarı tıklama/Tab ile kapanma ve masaüstüne geçerken odak koruması eklendi. 640×360, 320×640 ve 1024×768 tarayıcı kontrolleri geçti.
- Menü, ürün sekmeleri ve hareket tercihleri için 9 DOM etkileşim testi eklendi. Toplam 47 uygulama testi ve mevcut 20 PHP kontrolü geçti.
- Açık mobil menü axe-core taramasında otomatik ihlal 0. Denetim düğmesinin tıklamasının menüyü kapatması giderildi; taranan durum ayrıca doğrulandı.
- Yeni yerel üretim ölçümleri ve canlı PageSpeed raporları alındı: mobil performans 95, masaüstü 100; erişilebilirlik, en iyi uygulamalar ve SEO iki görünümde de 100. Bunlar tek laboratuvar örneği; manuel kontroller ve gerçek kullanıcı verisi yerine geçmez.
- cPanel için yalnızca hash'li varlıklara uzun önbellek ve CSS/JS sıkıştırma dosyası eklendi. Henüz canlıya uygulanmadı. [Ayrıntılı kontrol raporu](./docs/qa/KALITE-2026-10-14.md).

## On beşinci geliştirme paketi: kullanıcı logosu ve SMTP hazırlığı

- Kullanıcının sağladığı şeffaf logo dosyalarından web varlıkları hazırlandı; orijinaller değiştirilmedi. Üst menü ve alt bilgiye simge ve yazı eklendi.
- Favicon yalnızca `onlylogo.png` simgesidir; yazısız ve şeffaf arka planlıdır. Tarayıcı ve Apple simgeleri üretildi.
- 320 px görünümde taşma olmadığı ve marka görsellerinin yüklendiği kontrol edildi. 47 test, lint, typecheck, üretim derlemesi ve varlık boyutu sınırları geçti.
- Kullanıcı Gmail uygulama şifresini hazırladığını bildirdi. Özel paket boş şifre ve kapalı gönderimle hazırlandı; cPanel kullanıcı adına göre API klasör yolu yerel pakete işlendi. Canlı yükleme, özel config ve gerçek mail testi bekliyor.
- Logo varlıklarının yenilenmesi [logo rehberinde](./docs/LOGO.md) açıklanıyor.

## On altıncı geliştirme paketi: proje bildirimi e-posta tasarımı

- Kullanıcı canlı form gönderiminin çalıştığını bildirdi. Bildirim HTML tasarıma dönüştürüldü: marka renkleri, iletişim tablosu, proje özeti, kayıt referansı ve mail ile yanıtlama düğmesi.
- SMTP, gönderici ve Reply-To davranışı korundu. Düz metin alternatifi, kullanıcı alanlarında HTML kaçışlama ve satır sonları doğrulandı; SMTP bağlantısı yapmadan 23 PHP kontrolü geçti.
- Başlığa kullanıcının logosu eklendi; PNG e-postaya CID ile gömülür. HTML/düz metin ve gömülü logo dahil 24 PHP kontrolü geçti.
- Özel klasöre `ProjectMail.php` ve `email-logo.png` birlikte yüklenmeli. Canlı config/şifre üzerine yazılmaz. Yeni tasarımın canlı Gmail kontrolü yüklemeden sonra yapılmalı.

## Canlı Gmail kabulü — 14 Ekim 2026

- Canlı API'de PHP 8.2 ve özel dosya yüklemesi GET 405 / METHOD_NOT_ALLOWED yanıtıyla doğrulandı. Kullanıcı config üzerinden gönderimi açtı ve gerçek form gönderiminin çalıştığını bildirdi.
- Kullanıcı logolu HTML e-posta tasarımının da tamamlandığını onayladı. SMTP kurulumu, gerçek gönderim ve logolu bildirim artık bekleyen iş değildir. Gmail gelen kutusuna doğrudan erişilmedi; teslim ve görünüm kabulü kullanıcı beyanıdır.
- İletişim bilgileri, aydınlatma metni, paylaşım görseli, kalan manuel kontroller ve isteğe bağlı gerçek AI bağlantısı açık kalıyor.

## On yedinci geliştirme paketi: paylaşım önizlemesi ve aydınlatma taslağı

- Mevcut marka varlıklarıyla 1200×630 paylaşım PNG'si hazırlandı, görsel olarak kontrol edildi. OG/Twitter meta etiketleri ve görsel alt metinleri eklendi.
- Resmî KVKK kaynaklarına ve gerçek veri akışına göre aydınlatma taslağı yazıldı. Kullanıcının verdiği şirket unvanı ve başvuru e-postası işlendi. Posta adresi, saklama ve Gmail aktarım düzeni eksik olduğundan nihai metin olarak yayımlanmadı.
- SMTP bağlantısı açık güncel site paketi hazırlandı. Canlı özel config değiştirilmez; cPanel yüklemesi kullanıcı tarafından yapılmalı. 47 test, lint, typecheck, build ve varlık bütçeleri geçti.
- Eksik bilgiler ve yükleme adımları [yayını tamamlama listesinde](./docs/YAYIN-TAMAMLAMA.md) toplandı. Manuel kabul kontrolleri aşağıda açık kalıyor.

## İkinci aşama — ilk geliştirme paketi

- İlk web hizmeti sayfası `/hizmetler/web/`, ortak hizmet içerik yapısı ve web seçili form eklendi. Üç ayrı servis hata mesajı ve başarı sonrası iletişim açıklaması hazırlandı.
- Standart SMTP yayın komutu, public sürüm manifesti ve görünür sürüm bilgisi eklendi. İçerik değişikliği ve yayın/geri dönüş rehberleri hazırlandı. 51 test geçti.
- Tarayıcı aracı URL güvenlik politikasıyla erişimi reddetti; görsel/canlı kabul açık. [Tam kapsam ve kalanlar](./docs/qa/IKINCI-ASAMA-PAKET-1.md).

## İkinci aşama — hizmet sayfalarının tamamlanması

- `/hizmetler/uygulama/` ve `/hizmetler/oyun/` eklendi. Ortak sayfa bileşeninde hizmete özel etiket/çağrı, içerik ve diğer hizmet bağlantıları kullanılıyor.
- Üç kart detay sayfalarına gider; her form kendi hizmeti seçili başlar. Fiziksel HTML girişleri, canonical, paylaşım etiketleri ve sitemap güncellendi.
- 54 test, lint, üretim ve boyut kontrolleri geçti. Üretilmiş HTML varlıkları ayrıca doğrulandı; manuel görsel/canlı kabul açık. [Rapor](./docs/qa/HIZMET-SAYFALARI.md).

## İkinci aşama — hizmet görselleri ve sade galeri

- Altı düzenlenebilir SVG arayüz örneği, büyütme galerisi, hafif hover ve azaltılmış hareket desteği eklendi. Süreç/hazırlık tek kapalı bölüme alındı; diğer hizmetler alt bilgiye taşındı.
- Galeri/kart görselleri ayrı içerik dosyasından değişir. Yol haritasındaki ilk konsept vitrini/galeri işi yeni sayfa kalabalığı oluşturmadan uygulandı.
- 55 test, lint, typecheck, build ve boyut kontrolleri geçti; görsel/canlı kabul açık. Tam kurulum ZIP'i için tekrar kullanılabilir komut eklendi. [Rapor](./docs/qa/HIZMET-GORSELLERI-VE-GALERI.md).

## İkinci aşama — güvenilir yayın ve teknik görünürlük

- Dört sayfa ve içerik dosyalarındaki yerel görseller için `check:site` yayın/GitHub denetimi eklendi. Kontrollü eksik görsel denemesinde yayını engelledi; geri yüklemede geçti.
- Ortak kaynaklardan statik Organization/WebSite/Service/WebPage/BreadcrumbList JSON-LD ve hizmet gezinme yolu eklendi. Kullanıcıya yeni uzun bölüm veya takip aracı gösterilmedi.
- 57 test, lint ve üretim kontrolleri geçti. Çevrim içi zengin sonuç doğrulayıcısı ve canlı kabul yapılmadı. [Rapor](./docs/qa/YAYIN-VE-METAVERI-KONTROLU.md).

## İkinci aşama — sade proje başlangıcı

- Ortak formun telefon, kurum ve bütçe alanları tek isteğe bağlı bölüme taşındı. Kapatılınca veri korunur; Yangan bütçesi veya alan hatasında açılır.
- 60 test, lint, typecheck, üretim, dört sayfa ve varlık bütçe kontrolleri geçti. Gerçek SMTP ve dönüşüm ölçümü yapılmadı; manuel kabul açık. [Rapor](./docs/qa/FORM-SADELESTIRME.md).

## İkinci aşama — doğrudan proje başlangıcı

- Sayfalardaki proje çağrıları ortak yönlendirmeyle formun ilk eksik/hatalı alanına odaklanır. Bilgiler ve hizmet seçimi korunur; mobil menü odağı geri almaz.
- Azaltılmış hareket, kapalı ek bilgi alanı ve alternatif tıklamalar kontrol edildi. 64 test geçti; gerçek mobil scroll/klavye kabulü açık. [Rapor](./docs/qa/PROJE-BASLANGIC-NAVIGASYONU.md).

## Henüz tamamlanmayan kabul kontrolleri

- Gerçek telefon ve mobil klavye kontrolü. VisualViewport desteği uygulandı, fiziksel cihaz testi yapılmadı.
- Gerçek yüzde 200 tarayıcı zoom testi ve ekran okuyucu kontrolü.
- Azaltılmış hareket için CSS mevcut; işletim sistemi tercihiyle ayrı doğrulama yapılmadı.
- Bütün bileşenlerin tüm ekran/etkileşim durumları için kapsamlı görsel regresyon kontrolü.
- Güncel kaynaklar cPanel'e yüklendikten sonra Lighthouse ve önbellek HTTP başlıklarının tekrar kontrolü. Canlı laboratuvar ölçümü alındı; gerçek ziyaretçi verisi henüz yok.
- Paylaşım görseli ve OG/Twitter etiketleri hazır; cPanel yüklemesi ve sosyal platformdaki görünümü bekliyor. Favicon, üretim domain'i, canonical/OG URL ve temel SEO dosyaları tamamlandı.
- Canlı hata/yoğunluk senaryoları, veri işleme düzeni ve gerçek AI bağlantısı. Talep servisi ve Gmail gönderimi çalışıyor; otomatik sunucu sınır testleri geçti.

## Yol haritasındaki karşılığı

1–5. aşamaların ilk uygulaması tamamlandı ve site canlıda. 6. aşamadaki temel kontroller yapıldı; yukarıdaki kabul kontrolleri sürüyor. 7. aşamada gerçek Gmail talep servisi ve logolu bildirim tamamlandı; gerçek AI bağlantısı kapalı.
