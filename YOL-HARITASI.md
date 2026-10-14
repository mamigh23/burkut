# Bürküt — Marka ve web sitesi yol haritası

**Tarih:** 12 Ekim 2026  
**Durum:** Site ve Gmail form gönderimi canlıda; logolu e-posta kullanıcı tarafından doğrulandı. Kalan içerik ve kalite kontrolleri sürüyor.
**Temel belgeler:** Bürküt.md ve REFERANS-INCELEMESI.md

**Yayın durumu:** Kullanıcı siteyi cPanel üzerinden `https://burkut.gemnative.com/` adresine yükledi. HTTPS, HTTP yönlendirmesi, temel SEO dosyaları ve responsive görünüm doğrulandı. [Canlı kontrol raporu](./docs/qa/CANLI-YAYIN.md). Gmail SMTP form bağlantısı aktif; logolu HTML bildirimin çalıştığı kullanıcı tarafından onaylandı. Gerçek AI bağlantısı kapalı; yeni geliştirmeler ayrıca ilgili dosyalar veya ZIP ile yüklenmeli.

## Güncel durum ve sıradaki işler — 14 Ekim 2026

| Aşama | Durum | Kalan iş |
| --- | --- | --- |
| 1–5: İçerik, temel, tasarım, ana sayfa, Yangan | Çalışan ilk sürüm tamamlandı | Gerçek servis bağlantıları 7. aşamada |
| 6: Kalite | Devam ediyor | Fiziksel telefon/klavye, yüzde 200 zoom, ekran okuyucu, sistem hareket tercihi, manuel kontrast incelemesi, kapsamlı görsel kontrol ve Lighthouse |
| 7: Gerçek servisler ve yayın | Site, Gmail SMTP ve logolu bildirim tamamlandı; gerçek AI kapalı | İletişim bilgileri, aydınlatma taslağının eksik işletme/aktarım bilgileri; paylaşım görseli paketinin yüklenmesi; AI için sağlayıcı/bütçe ve hosting kararı |
| 8: Yayın sonrası geliştirme | Yayın kontrolü başladı | Gerçek portföy, içerik iyileştirme ve bakım |

**Önceki Yangan paketi:** Hata/tekrar deneme, klavye odağı, ekran küçülmesi ve mod değişimi kontrolleri tamamlandı; bulunan sorunlar düzeltildi. O pakette toplam 37 test geçti. Mobil hata durumunda otomatik erişilebilirlik ihlali 0. [Kontrol ve sınırlar](./docs/qa/YANGAN-HATA-KONTROLU.md). Gerçek AI sağlayıcı bağlantısı kapalı kalıyor.

**Form bağlantısı tamamlandı:** cPanel üzerinde PHP/PHPMailer ve Gmail SMTP aktif. Özel config belge kökü dışında tutuluyor; dosya kilidiyle tekrar koruması, yoğunluk ve günlük sınır mevcut. [Kurulum](./docs/GMAIL-SMTP-KURULUM.md). Son uygulama kontrollerinde 47 JavaScript testi, son mail şablonunda SMTP bağlantısı yapmadan 24 PHP kontrolü geçti. Kullanıcı gerçek gönderimi ve logolu e-postayı doğruladı. AI kapalı kalıyor.

**SMTP kabulü — 14 Ekim 2026:** PHP 8.2 üzerinde özel klasör bağlantısı doğrulandı; kullanıcı gönderimi açıp formdan mail alındığını ve ardından logolu tasarımın tamamlandığını bildirdi. HTML bildirimde iletişim tablosu, proje özeti, yanıt düğmesi ve gömülü logo var; düz metin alternatifi korunuyor. Uygulama şifresi sohbet veya public repoya alınmadı. Canlı kabul kullanıcı beyanına dayanır; gelen kutusuna doğrudan erişilmedi.

**Yeni kalite paketi:** Font çıktısı 319264 → 193612 bayt (yaklaşık %39,4 azalma); Türkçe alt kümeler korundu. Form karakter sayacı, bütçe hata erişilebilirliği ve işlem sırasında giriş kilidi eklendi. [Doğrulama raporu](./docs/qa/FONT-VE-FORM.md).

**14 Ekim kalite kontrolleri:** Mobil menünün kısa ekran, dışarı tıklama ve odak davranışı düzeltildi. 47 uygulama testi ve o pakette 20 PHP kontrolü geçti. Canlı PageSpeed performansı mobil 95, masaüstü 100; diğer üç kategori iki görünümde de 100. [Kapsam, ham ölçümler ve kalan kontroller](./docs/qa/KALITE-2026-10-14.md). Logo ve favicon eklendi; Gmail daha sonra aynı gün tamamlandı. İletişim bilgileri bekliyor. Reddedilen form hata tasarımı geri getirilmedi.

**Öncelik sırası:** Şirket posta adresi ve veri işleme/aktarım bilgilerinin tamamlanması → aydınlatma metninin yayımlanması ve iletişim bilgileri → paylaşım görseli içeren güncel site paketinin yüklenmesi → kalan manuel kontroller → isteğe bağlı gerçek Yangan AI bağlantısı.

**7. aşamada kalanlar:** İletişim bilgileri ve veri işleme düzenine uygun aydınlatma metninin tamamlanması. Paylaşım görseli ve OG/Twitter etiketleri hazır; cPanel yüklemesi bekliyor. AI için hosting desteği ve sağlayıcı/kullanım bütçesi kararı bekliyor. Domain, cPanel yayını, logo, favicon ve Gmail gönderimi tamamlandı. Anahtarlar public repoya yazılmaz.

**Paylaşım ve aydınlatma paketi:** 1200×630 PNG, OG/Twitter etiketleri ve SMTP bağlantısı açık site ZIP’i hazırlandı. [Aydınlatma taslağı](./docs/AYDINLATMA-METNI-TASLAK.md) gerçek form/Gmail akışına göre yazıldı; kullanıcı şirket unvanını ve başvuru e-postasını verdi. Posta adresi, hosting kayıt/saklama düzeni ve Gmail yurt dışı aktarım dayanağı eksik olduğundan taslak henüz ziyaretçilere yayımlanmadı. Kullanıcıya kalan işler [teslim listesinde](./docs/YAYIN-TAMAMLAMA.md).

## Hedef

**İlerleme:** 1–5. aşamaların ilk sürümü uygulandı ve site yayımlandı. 6. aşamada kalan manuel kontroller sürüyor. 7. aşamada Gmail gönderimi ve logolu bildirim tamamlandı; gerçek AI bağlantısı kapalı. Ayrıntılar: [GELISTIRME-DURUMU.md](./GELISTIRME-DURUMU.md).

**Son görsel karar:** Soyut bağlantı küresi yerine hayalî **Bürküt gezegeni** kullanılacak. İlk görsel ve responsive sürümleri eklendi. Bu karar marka görseli içindir; gerçek operasyon coğrafyası veya müşteri istatistiği anlamına gelmez.

Bürküt Teknoloji'nin web, uygulama ve oyun geliştirme alanlarını açıkça anlatan; özgün görsel kimliği, ürün konseptleri ve Yangan asistanıyla güven veren ilk kurumsal sitesini oluşturmak.

İlk somut hedef, mobil ve masaüstünde çalışan, gerçek hizmet bağlantılarına ihtiyaç duymadan incelenebilen bir demo sitedir. İkinci hedef, gerçek iletişim ve AI servisleri tamamlandığında yayına alınabilecek bir temel kurmaktır.

Markanın şu an doğrulanabilir dayanağı; hizmet alanları, tasarım yaklaşımı ve geliştirme hedefidir. Gerçek ekip, müşteri, portföy, şirket geçmişi veya başarı verisi sağlanmadan bunlara ilişkin iddia kullanılmaz.

## Çalışma kararları

- Görünen marka Bürküt; kurumsal isim Bürküt Teknoloji; asistan Yangan.
- İlk dil Türkçe. Çok dil, CMS, yönetim paneli, üyelik ve veritabanı ilk teslimin kapsamına girmez.
- React + TypeScript + Vite; Tailwind CSS ve özel CSS. Paketler uygulama başlangıcında uyumlu kararlı sürümlerle kurulup lockfile ile sabitlenir.
- Ana renk orman yeşili, yardımcı vurgu mavi; renkler tek token kaynağından gelir.
- Allbytech'in bölüm ritmi ve maket sunumundan yararlanılır; Bürküt'e özgü metin ve sahneler hazırlanır.
- Kullanıcının sağladığı logo siteye, favicon'a ve e-posta başlığına uygulandı; orijinal çizim korunur.
- Gerçek iletişim bilgileri ve aydınlatma metni ertelendi. Bunlar demo geliştirmesini engellemez; gerçek veri toplayan yayına geçişten önce tamamlanır.
- Canlı form Gmail SMTP ile gönderir; yerel geliştirme ve normal statik paket varsayılan olarak kapalıdır. Yangan gerçek AI bağlantısı kapalı kalır. Kişisel form bilgileri kalıcı tarayıcı deposuna yazılmaz; canlı gönderimde sunucu ve Gmail üzerinden işlenir.
- Ziyaretçinin ana eylemi “Projeni Anlat” olur. Yangan bu eylemi destekler.

## 1. Marka ve içerik temeli

**Amaç:** Tasarım başlamadan sitenin ne söyleyeceğini kesinleştirmek.

Yapılacaklar:

- Tek cümlelik konumlandırma, kısa marka açıklaması ve iletişim tonu hazırlanır.
- Web, uygulama ve oyun hizmetleri için kısa tanıtımlar, örnek kapsamlar ve proje bazında değerlendirilecek konular ayrılır.
- Hero, hizmetler, yaklaşım, Bürküt tanıtımı, teknoloji ilkeleri ve SSS metinleri yazılır.
- Geçici slogan ve konsept örnekler açıkça işaretlenir.
- İçerikler merkezi dosyalarda saklanır; tasarım bileşenlerinin içine dağılmaz.

**Çıktı:** İçerik planı ve ilk Türkçe metin seti.  
**Tamamlanma ölçütü:** Ziyaretçi Bürküt'ün ne yaptığını ve nasıl proje başlatacağını anlayabilir; doğrulanmamış vaat bulunmaz.

## 2. Proje ve GitHub temeli

**Amaç:** Geliştirmeyi düzenli, tekrar kurulabilir ve paylaşılabilir hale getirmek.

Yapılacaklar:

- Yerel Git deposu ve Vite/React/TypeScript projesi kurulur.
- README, .gitignore, paket lockfile'ı ve varsa servis yapılandırması için değer içermeyen .env.example hazırlanır.
- Kurulum, geliştirme, TypeScript kontrolü, lint ve build komutları tanımlanır.
- Marka belgeleri docs altında düzenlenir; taşınırsa belge bağlantıları güncellenir.
- Bileşenler, içerikler, stiller, servis adaptörleri ve varlıklar ayrı tutulur.
- GitHub deposu oluşturulacağı aşamada hesap/organizasyon, görünürlük ve lisans kararı netleştirilir. Gizli değerler, bağımlılık klasörleri ve build çıktısı repoya alınmaz.

Önerilen başlangıç yapısı:

```text
docs/                  Marka, referans ve yol haritası belgeleri
public/                Statik varlıklar
src/
  components/          Ortak düğme, kart, alan ve marka bileşenleri
  sections/            Ana sayfa bölümleri
  concepts/            Web, uygulama ve oyun maketleri
  yangan/              Asistan arayüzü ve akışı
  content/             Türkçe metinler ve hizmet verileri
  services/            Demo ve gerçek servis adaptörleri
  styles/              Tokenlar ve ortak stiller
```

**Çıktı:** Çalışan proje iskeleti ve GitHub'a uygun depo düzeni.  
**Tamamlanma ölçütü:** Temiz kurulumdan sonra geliştirme sunucusu açılır, TypeScript kontrolü ve üretim build başarılı olur.

## 3. Görsel sistem ve ilk ekran

**Amaç:** Bürküt'ün kimliğini önce küçük, değerlendirilebilir bir bölümde oturtmak.

Yapılacaklar:

- Renk, tipografi, boşluk, köşe, kenarlık ve odak stilleri kurulur.
- Inter Tight, Figtree ve JetBrains Mono fontları Türkçe karakter desteğiyle eklenir; dağıtılan fontların lisans dosyaları korunur.
- Geçici metin işareti, mobil/masaüstü navbar ve hero oluşturulur.
- Hero için web, uygulama ve oyun alanlarını temsil eden özgün HTML/CSS/SVG maketleri hazırlanır.
- Yeşil ana ışık ve sınırlı mavi vurgu kullanılır. Ağır hareketler temel yerleşim tamamlandıktan sonra eklenir.

**Çıktı:** Navbar, hero ve yeniden kullanılabilir temel arayüz parçaları.  
**Tamamlanma ölçütü:** 375 ve 1440 px görünümünde görsel yön tutarlı; 320 px'de yatay taşma yok; menü ve ana eylemler çalışıyor.

## 4. Ana sayfa ve konsept ürünler

**Amaç:** Markayı tamamlanmış bir ziyaretçi deneyimine dönüştürmek.

Bölüm sırası:

1. Hero.
2. Vizyon/değer önerisi ve konsept dashboard.
3. Hizmet bantları ve hizmet kartları.
4. Web / Uygulama / Oyun sekmeleri.
5. Üç aşamalı çalışma yaklaşımı.
6. Bürküt ve Yangan tanıtımı.
7. Teknoloji ilkeleri.
8. Soyut bağlantı görseli ve proje çağrısı.
9. SSS.
10. Demo proje formu ve footer.

Yapılacaklar:

- Her ürün sekmesinde ayrı sahne ve fayda metinleri hazırlanır.
- Konseptler teslim edilmiş müşteri işi gibi gösterilmez.
- Süreç masaüstünde genişleyen paneller, dar ekranlarda açık açıklamalı kartlar olur.
- 1024 px süreç yerleşimi özellikle kontrol edilir; gerekirse genişleyen düzen daha geniş ekranlarda başlatılır.
- Bağlantı görseli için önce hafif SVG çözümü hazırlanır; canvas ancak görünümün ihtiyaçları bunu gerekçelendirirse eklenir.
- Form doğrulaması ve anlaşılır demo sonucu uygulanır. Ertelenen politika sayfası hazır hukuk metni gibi sunulmaz.

**Çıktı:** Bütün bölümleri tamamlanmış ana sayfa.  
**Tamamlanma ölçütü:** Sekmeler, süreç, SSS ve mobil navigasyon çalışır; içerik ve görsellerde referans markaya ait kalıntı bulunmaz.

## 5. Yangan demo deneyimi

**Amaç:** Ziyaretçinin fikrini anlaşılır bir proje özetine dönüştürmek.

Yapılacaklar:

- Aç/kapat, Escape, odak dönüşü, sıfırlama ve mesaj alanı kaydırması uygulanır.
- Hizmet → aşama → zaman → isteğe bağlı bütçe → detay → özet/düzeltme akışı kurulur.
- Geriye dönüp seçim değiştirildiğinde bağımlı sonraki cevaplar yeniden değerlendirilir.
- Özet, iletişim formuna aktarılabilir; gerçek gönderim henüz açılmaz.
- Ayrı serbest soru alanı oluşturulur. Gerçek model olmadan hizmetlerle ilgili hazır yanıtlar kullanılır; dijital asistan tanımı korunur. Kullanıcı kararıyla sürekli demo etiketi gösterilmez.
- Panel kapanınca konuşma korunur; sıfırlama ve sayfa yenileme temizler.

**Çıktı:** Mobil ve masaüstünde çalışan Yangan demo asistanı.  
**Tamamlanma ölçütü:** Akış baştan sona ilerler, düzeltmeler çelişkili özet üretmez, mobil klavye panel kullanımını engellemez.

## 6. Kalite ve demo teslimi

**Amaç:** Sitenin sadece güzel görünmesini değil, kullanılabilir olmasını sağlamak.

Yapılacaklar:

- 320, 375, 390, 640, 768, 1024 ve 1440 px ile önemli breakpoint sınırları kontrol edilir.
- Klavye, görünür odak, erişilebilir sekmeler, form hataları, yüzde 200 zoom ve azaltılmış hareket tercihi kontrol edilir.
- **Uygulandı:** Yedi arayüz durumunda yerel axe-core taraması ve bulunan kontrast/düğme adı düzeltmeleri. [Denetim raporu](./docs/qa/ERISILEBILIRLIK.md). Manuel inceleme, ekran okuyucu ve fiziksel cihaz kontrolleri sürüyor.
- Yangan geri/düzelt/sıfırla durumları ve formun boş/hatalı alanları test edilir. Otomatik testler özellikle akış mantığı ve veri doğrulamasına odaklanır.
- TypeScript, lint ve build kontrolleri çalıştırılır; konsol hataları ve bozuk varlıklar giderilir.
- Font/görsel boyutları, düzen kaymaları ve performans gerçek tarayıcıda ölçülür. Ölçülmemiş puan raporlanmaz.
- **Uygulandı:** GitHub kalite akışında JS/CSS gzip ve tek görsel boyutu sınırları kontrol ediliyor. Kaydırma bandının iki yönü ve hareket durdurma davranışı tarayıcıda doğrulandı. Gerçek cihaz ve Lighthouse kontrolleri devam ediyor.
- Title, description, sosyal paylaşım görseli ve favicon planı hazırlanır; domain bilinmeden canonical uydurulmaz.

**Çıktı:** İncelenebilir demo, kısa doğrulama raporu ve kalan üretim bağımlılıkları.  
**Tamamlanma ölçütü:** Kritik etkileşimler ve build geçer; demo davranışları açık; bilinen sorunlar kayıtlıdır.

## 7. Gerçek servisler ve yayına hazırlık

**Amaç:** Demo siteyi gerçek talepleri güvenilir biçimde alan bir kurumsal siteye dönüştürmek.

Bu aşama demo tamamlandıktan ve gerekli işletme kararları sağlandıktan sonra başlar.

- Nihai logo, favicon, gerçek iletişim bilgileri ve tamamlanmış aydınlatma metni eklenir.
- Domain, hosting ve talep alıcısı belirlenir; veri akışı ve saklama düzeni netleştirilir.
- Proje talep servisi sunucu doğrulaması, yoğunluk koruması ve tekrar gönderim kontrolüyle bağlanır.
- **Temel hazır:** Ortak doğrulama, sunucu işlem sözleşmesi ve istemci adaptörü eklendi; hata/yoğunluk/tekrar/zaman aşımı testleri geçti. [Kurulum ve kalan bağlantılar](./server/README.md). Gerçek sağlayıcı ve hosting rotası henüz bağlanmadı; gönderim bayrağı kapalı.
- Yangan için sağlayıcı/model ve kullanım sınırları seçilir. Anahtarlar sunucuda tutulur; hata, tekrar deneme ve form alternatifi uygulanır.
- **Temel hazır:** Sohbet doğrulaması, sunucu talimatı, yoğunluk/süre sınırları, istemci adaptörü ve hata sonrası tekrar deneme eklendi. [Bağlantı ve sınırlar](./docs/YANGAN-SERVISI.md). Sağlayıcı bağlı değil; sohbet bayrağı kapalı.
- Gerçek form teslimi ve AI bağlantısı ayrı ayrı test edilir. Başarı mesajı yalnızca doğrulanmış sunucu cevabından sonra gösterilir.
- Üretim domain'i metaveriye eklenir; HTTPS, doğru yönlendirmeler ve hata sayfası kontrol edilir.
- Yayın adımı, kullanıcının yayın isteği geldiğinde yürütülür.

**Çıktı:** Gerçek servisleri çalışan üretim sitesi.  
**Tamamlanma ölçütü:** Gerçek talep doğru alıcıya ulaşır, veri işleme metni mevcut düzeni yansıtır, site ve servisler üretim ortamında doğrulanır.

## 8. Yayın sonrası marka gelişimi

- Gelen sorulara göre hizmet metinleri ve SSS iyileştirilir.
- Gerçek projeler tamamlandıkça paylaşım izni olan işler portföye eklenir; konseptlerden açıkça ayrılır.
- Logo, renkler, tipografi ve iletişim örnekleriyle kısa marka kullanım kılavuzu tamamlanır.
- Gerçek talep ve bakım ihtiyaçlarına göre yeni sayfalar, çok dil veya CMS değerlendirilir.
- Paket ve bağımlılık güncellemeleri, form teslimi ve servis maliyetleri için bakım düzeni belirlenir. Otomatik izleme/tekrarlayan görev bu planla kurulmuş sayılmaz.

## İlk uygulama paketi

Geliştirme başladığında ilk paket **1–3. aşamalar** olmalı: içerik temeli, proje/depo iskeleti, tasarım tokenları, navbar ve hero. Bu paket, bütün sayfa yapılmadan marka yönünü görüp değerlendirmemizi sağlar.

Sonra ana sayfa tamamlanır, Yangan eklenir ve kalite kontrolleriyle demo teslim edilir. Gerçek servisler ve yayın son aşamadır.

Takvim, ilk çalışan ekran ve maketlerin üretim yükü görüldükten sonra belirlenmelidir. Bu yol haritası şu an kesin teslim tarihi veya maliyet taahhüdü değildir.
