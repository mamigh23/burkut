# Allbytech referans incelemesi

**Tarih:** 12 Ekim 2026  
**Kaynak:** https://allbytech.com/  
**Amaç:** Bürküt'ün ilk web sitesi için canlı referansın görsel düzenini ve etkileşimlerini incelemek.

Kullanıcının son kararı: logo üretimi, gerçek iletişim bilgileri ve aydınlatma metni şimdilik ertelendi. Bu inceleme site yapımına hazırlıktır; site uygulaması veya yayın işlemi yapılmadı.

## Kapsam

Canlı tarayıcıda masaüstü ve mobil ekranlar, DOM, hesaplanmış stiller ve etkileşim durumları incelendi. 1440 × 1000 ve 375 × 812 görünümünde ayrıntılı kontroller; 320, 390, 640, 768, 1024 ve 1440 px genişliklerinde düzen ölçümleri yapıldı. Bunlar her bölümün bütün durumlarını kapsayan tam bir test değildir.

Ekran görüntüleri inceleme sırasında görüntülendi; bu dosyaya yerel görsel arşivi eklenmedi. Kaynak kod, backend, gerçek form teslimi ve AI sağlayıcısı doğrulanmadı. İletişim bilgisi girilmedi, talep gönderilmedi. Performans puanı ölçülmedi.

## Görsel yapı

- Açılış: siyaha yaklaşan koyu zemin, sol üstte büyük mavi ışık, merkezde rozet, büyük başlık, açıklama ve iki eylem düğmesi.
- Hero altında perspektifli kod editörü, dashboard, telefon ve ürün arayüzü maketleri var. Bu sahne sayfanın görsel ağırlığını taşıyor.
- Üst menü kapsül biçiminde, sabit ve yarı saydam. Kaydırma sonrası genişliği azalıyor ve bulanıklık etkisi değişiyor.
- Açık zeminli değer önerisi, dashboard ve çapraz hizmet bantları açılışı izliyor.
- Hizmetler alanı farklı büyüklükte kartlardan oluşuyor. Başlıklar büyük, açıklamalar kısa; geniş boşluklar kullanılıyor.
- Ürün alanında açık gri zemin, sekmeli kontrol, büyük tarayıcı/telefon sahnesi ve dört fayda kartı var.
- Süreç ve ekip alanları koyu zeminde devam ediyor. Teknoloji alanında beyaz zemin geri geliyor.
- Küre ve bulut sahnesi, SSS öncesinde geniş bir görsel ara oluşturuyor. DOM'da bir canvas gözlendi; kullanılan grafik kütüphanesi doğrulanmadı.
- SSS masaüstünde solda başlık ve iletişim çağrısı, sağda açılır sorular şeklinde.
- İletişim bölümü koyu dış panel ve beyaz form kullanıyor. Bürküt'te gerçek bilgiler ve metinler daha sonra tamamlanacak.

## Ölçülen değerler

| Öğe | Gözlem |
| --- | --- |
| Başlık fontu | Inter Tight |
| Gövde fontu | Figtree |
| Masaüstü H1 | 74 px; 83 px satır yüksekliği; 460 ağırlık |
| 375 px H1 | 37.6 px; 40.984 px satır yüksekliği |
| Masaüstü bölüm başlıkları | İncelenen H2'lerde 46–88 px |
| İlk masaüstü navbar | 1312 px genişlik; 71 px yükseklik; üstten 33 px |
| Kaydırılmış navbar | Ölçüm anında yaklaşık 898 px; geçiş süreci değeri etkileyebilir |
| Mobil navbar | 58 px yükseklik; 375 px viewport'ta 336 px genişlik |
| Navbar geçişi | CSS sınıfında 700 ms |
| Mobil asistan | 375 × 812 viewport'ta 336 × 480 px; soldan 12 px |
| Süreç panelleri / 1440 px | Seçili panel yaklaşık 460 px; diğer paneller yaklaşık 84 px |

Tarayıcıdaki dikey scrollbar kullanılabilir genişlikten 15 px düşürüyor. Örneğin 375 px viewport'ta belge içerik genişliği 360 px. Ölçüleri doğrudan sabit mobil genişlik olarak kopyalamamak gerekir.

## Etkileşim sonuçları

### Menü

Mobil hamburger açıldığında navbar altında koyu, yuvarlatılmış bağlantı paneli gösteriliyor. Yaklaşım bağlantısına tıklanınca ilgili anchor'a gidildi ve menü kapandı. 768 px ölçümünde yatay navigasyon görünür oldu.

### Ürün sekmeleri

Web sitesi / Mobil uygulama seçimi `aria-selected` durumunu ve dört fayda kartının içeriğini değiştiriyor. Ancak bu testte mobil sekmesi seçiliyken ana sahnede aynı Göktaş Çini tarayıcı ve telefon maketi kaldı. Belgedeki “sahne değişiyor” varsayımı bu kontrolle doğrulanmadı.

**Bürküt için sonuç:** Web / Uygulama / Oyun sekmelerinin her birinde farklı sahne ve fayda içeriği uygulanmalı.

### Süreç

Masaüstünde üç panelden biri genişliyor. Tasarım & Geliştirme seçildiğinde onun `aria-expanded` değeri true, diğerlerinin false oldu. Mobilde süreç açıklamaları alt alta kartlar olarak sunuluyor. Görünür genişleyen panel düğmeleri 1024 px ölçümünde ortaya çıktı.

### SSS

İlk soru başlangıçta açık. İkinci soru açılınca ilk soru kapandı; aynı anda tek açık soru davranışı doğrulandı.

### Proje asistanı

Gözlenen teklif akışı:

1. Hizmet seçimi.
2. Projenin aşaması.
3. İstenen zaman.
4. Tahmini bütçe.
5. İsteğe bağlı detay veya Atla.
6. İletişim alanları ve gönderim düğmesi.

Bu akışta iletişim öncesinde ayrı bir özet/düzeltme ekranı görülmedi. Önceki adım, Baştan başla ve Kapat kontrolleri bulunuyor. Kapatıp yeniden açınca konuşma korundu; Baştan başla başlangıç seçeneklerini geri getirdi.

“Önce bir sorum var” dalı hazır sorular ve teklif akışına dönüş seçeneği sunuyor. Serbest soru yazma/gerçek model cevabı bu incelemede gözlenmedi; gerçek AI entegrasyonu hakkında sonuç çıkarılamaz.

**Bürküt için sonuç:** Yangan'da belgeye uygun özet/düzeltme adımı ve ayrı serbest soru alanı oluşturulmalı. Servis kurulana kadar demo etiketi kullanılmalı.

## Responsive sonuçlar

| Viewport | Kullanılabilir genişlik | Belge genişliği | Menü | Süreç |
| --- | --- | --- | --- | --- |
| 320 px | 305 px | 356 px | Hamburger | Alt alta |
| 375 px | 360 px | 360 px | Hamburger | Alt alta |
| 390 px | 375 px | 375 px | Hamburger | Alt alta |
| 640 px | 625 px | 625 px | Hamburger | Alt alta |
| 768 px | 753 px | 753 px | Yatay | Alt alta |
| 1024 px | 1009 px | 1009 px | Yatay | Genişleyen paneller |
| 1440 px | 1425 px | 1425 px | Yatay | Genişleyen paneller |

320 px testinde belge genişliği kullanılabilir alanı 51 px aştı. Transform uygulanmış maket öğelerinde de sınır aşımı görüldü; ancak tek sorumlu öğe kesinleştirilmedi. Bürküt'te taşan öğeler düzeltilmeli, sadece belgeye overflow-x:hidden eklemekle yetinilmemeli.

1024 px'de süreç alanındaki seçili panel yaklaşık 154 px, diğerleri yaklaşık 29 px ölçüldü. Bu, metin yerleşimi için dar bir alan; Bürküt'te bu eşik ayrıca görsel olarak kontrol edilmeli ve gerekirse paneller daha geniş ekranlarda açılmalı.

## Hareket

Hesaplanmış stillerde hero-in / hero-in-lite (1.1 s), marquee (70 s), float (7 s), spin (14 s), pulse (2 s), wm-card-in (0.7 s) ve cloud-drift (28 s) animasyonları gözlendi. Bu süreler referans ölçümüdür; Bürküt için doğrudan zorunlu değer değildir.

Bu incelemede azaltılmış hareket tercihi, mobil klavye, ekran okuyucu ve bütün klavye etkileşimleri test edilmedi.

## Bürküt uygulaması için çıkarımlar

1. Büyük tipografi, geniş boşluklar, kapsül menü, maket sunumu ve açık/koyu bölüm ritmini koru.
2. Ana görsel kimliği orman yeşiline taşı; maviyi sınırlı vurgu olarak kullan.
3. Referanstaki restoran/QR menü ağırlığını Web / Uygulama / Oyun içerikleriyle değiştir.
4. Üç sekme için özgün, birbirinden farklı konsept sahneler oluştur; konsept olduklarını belirt.
5. Kişi kartları yerine Bürküt yaklaşımı ve Yangan tanıtımını kullan.
6. Küreyi doğrulanmamış müşteri/operasyon istatistiği taşımayan soyut bağlantı görseli olarak yorumla.
7. 320 px taşmasını ve 1024 px süreç kartlarının daralmasını uygulama sırasında kontrol et.
8. Logo, gerçek iletişim bilgileri ve aydınlatma metnini kullanıcının kararı doğrultusunda sonraki aşamaya bırak. Gerçek talep gönderimi için eksik servis ve metinler tamamlanmalı.

Ana şartname: [Bürküt.md](./Bürküt.md). Bu not, canlı incelemedeki bulguları tamamlar; kullanıcı kararlarını değiştirmez.
