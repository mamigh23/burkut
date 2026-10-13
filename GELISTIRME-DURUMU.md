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

## Henüz tamamlanmayan kabul kontrolleri

- Gerçek telefon ve mobil klavye kontrolü. VisualViewport desteği uygulandı, fiziksel cihaz testi yapılmadı.
- Gerçek yüzde 200 tarayıcı zoom testi ve ekran okuyucu kontrolü.
- Azaltılmış hareket için CSS mevcut; işletim sistemi tercihiyle ayrı doğrulama yapılmadı.
- Bütün bileşenlerin tüm ekran/etkileşim durumları için kapsamlı görsel regresyon kontrolü.
- Ağ/CPU yavaşlatmalı Lighthouse ve gerçek yayın ortamı performansı. Yerel üretim örnekleri alındı; build boyutları veya yerel süreler gerçek ziyaretçi performans puanı değildir.
- Üretim domain'i, canonical/OG URL, nihai paylaşım görseli ve favicon.
- Gerçek talep servisi, hata/yoğunluk senaryoları, veri işleme düzeni ve gerçek AI bağlantısı.

## Yol haritasındaki karşılığı

1–5. aşamaların ilk demo uygulaması tamamlandı. 6. aşamadaki temel build, akış, responsive ve tarayıcı kontrolleri yapıldı; yukarıdaki kabul kontrolleri devam ediyor. 7. aşamadaki gerçek servisler ve yayın başlamadı. Site canlıya yayımlanmadı.
