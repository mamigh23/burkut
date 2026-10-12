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
