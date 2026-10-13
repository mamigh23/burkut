# Bürküt — Marka ve web sitesi yol haritası

**Tarih:** 12 Ekim 2026  
**Durum:** Statik site canlıda; gerçek servislerin temeli ve kalite kontrolleri ilerliyor.
**Temel belgeler:** Bürküt.md ve REFERANS-INCELEMESI.md

**Yayın durumu:** Kullanıcı siteyi cPanel üzerinden `https://burkut.gemnative.com/` adresine yükledi. HTTPS, HTTP yönlendirmesi, temel SEO dosyaları ve responsive görünüm doğrulandı. [Canlı kontrol raporu](./docs/qa/CANLI-YAYIN.md). Gerçek talep ve AI bağlantıları kapalı; yeni geliştirmeler ayrıca ZIP ile yüklenmeli.

## Güncel durum ve sıradaki işler — 13 Ekim 2026

| Aşama | Durum | Kalan iş |
| --- | --- | --- |
| 1–5: İçerik, temel, tasarım, ana sayfa, Yangan | Çalışan ilk sürüm tamamlandı | Gerçek servis bağlantıları 7. aşamada |
| 6: Kalite | Devam ediyor | Fiziksel telefon/klavye, yüzde 200 zoom, ekran okuyucu, sistem hareket tercihi, manuel kontrast incelemesi, kapsamlı görsel kontrol ve Lighthouse |
| 7: Gerçek servisler ve yayın | Statik yayın doğrulandı; talep ve sohbet temeli hazır | Talep sağlayıcısı/alıcı, API hosting rotaları, AI sağlayıcısı/bütçesi, nihai paylaşım görseli ve favicon |
| 8: Yayın sonrası geliştirme | Yayın kontrolü başladı | Gerçek portföy, içerik iyileştirme ve bakım |

**Son pakette ilerleme:** Yangan'ın hata/tekrar deneme, klavye odağı, ekran küçülmesi ve mod değişimi kontrolleri tamamlandı; bulunan sorunlar düzeltildi. Toplam 37 test geçti. Mobil hata durumunda otomatik erişilebilirlik ihlali 0. [Kontrol ve sınırlar](./docs/qa/YANGAN-HATA-KONTROLU.md). Gerçek sağlayıcı bağlantıları kapalı kalıyor.

**Öncelik sırası:** Kalan manuel kalite kontrolleri → API hosting ve sağlayıcı kararları → gerçek form ve Yangan servisleri → nihai paylaşım bilgileri ve servislerin canlı doğrulaması.

**7. aşama için gereken kararlar:** Taleplerin ulaşacağı adres, API için hosting desteği ve AI sağlayıcısı/kullanım bütçesi. Domain ve statik cPanel yayını tamamlandı. Logo, gerçek iletişim bilgileri ve aydınlatma metni kullanıcı kararıyla ertelenmiş durumda; bu paketle yeniden açılmadı. Anahtarlar public repoya yazılmayacak; gerçek veri gönderimi servisler ve ilgili metinler hazır olduğunda açılacak.

## Hedef

**İlerleme:** 1–5. aşamaların ilk sürümü uygulandı ve statik site yayımlandı. 6. aşamada gerçek cihaz, ekran okuyucu ve üretim performans kontrolleri sürüyor. 7. aşamada teknik temel hazır; sağlayıcı bağlantıları kapalı. Ayrıntılar: [GELISTIRME-DURUMU.md](./GELISTIRME-DURUMU.md).

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
- Logo çalışması ertelendi. İlk arayüzde Türkçe karakterleri doğru bir Bürküt metin işareti kullanılır; nihai logo olarak sunulmaz.
- Gerçek iletişim bilgileri ve aydınlatma metni ertelendi. Bunlar demo geliştirmesini engellemez; gerçek veri toplayan yayına geçişten önce tamamlanır.
- Form ve Yangan ilk sürümde yerel akışlarla çalışır. Kullanıcı kararıyla sitedeki demo etiketleri kaldırıldı; gerçek gönderim açılana kadar form bunu ilgili işlemde açıkça belirtir. Kişisel bilgiler sunucuya gönderilmez veya kalıcı tarayıcı deposuna yazılmaz.
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
