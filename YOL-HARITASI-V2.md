# Bürküt — İkinci aşama geliştirme yol haritası

**Tarih:** 16 Ekim 2026

**Durum:** Hizmet sayfaları, sade talep akışı, galeri ve teknik SEO uygulandı; yerel tarayıcı kontrolleri yapıldı. İçerik bakım kontrolleri güçlendiriliyor. Fiziksel cihaz, canlı sürüm kabulü ve kullanıcı bilgisine bağlı işler açık.
**Hedef:** Ziyaretçinin Bürküt'ü daha iyi tanıdığı, doğru hizmete ulaştığı ve nitelikli proje talebi bırakabildiği bir site oluşturmak.

**İlk paket uygulama durumu — 15 Ekim:** Standart SMTP yayın komutu/sürüm bilgisi, form durum mesajları, ortak hizmet sayfası yapısı, ilk web hizmeti sayfası ve içerik rehberi eklendi. 51 test geçti. Tarayıcı erişimi kısıtlandığı için yeni sayfanın görsel ve canlı kabulü açık; sonraki büyük özelliğe geçmeden bu kontroller tamamlanmalı. [Doğrulama ve sınırlar](./docs/qa/IKINCI-ASAMA-PAKET-1.md).

İlk sürümün geçmişi [ilk yol haritasında](./YOL-HARITASI.md), teknik ilerleme [geliştirme durumunda](./GELISTIRME-DURUMU.md) korunur. Bu belge sonraki geliştirmelerin önceliğini belirler; teslim tarihi veya otomatik görev oluşturmaz.

## Başlangıç noktası

**Hizmet sayfaları güncellemesi — 15 Ekim:** Web, uygulama ve oyun detay sayfalarının kodu tamamlandı; ana sayfa ve hizmetler arası bağlantılar, hizmete göre form ön seçimi ve üç sayfanın metaveri/sitemap kayıtları hazır. 54 test, lint, build ve boyut kontrolleri geçti. Görsel/canlı kabul açık. [Kontrol raporu](./docs/qa/HIZMET-SAYFALARI.md). Sonraki planlanan alan proje vitrini ve galeri; mevcut sayfaların manuel kontrol ihtiyacı korunur.

- Site cPanel'de canlı; gerçek form ve logolu Gmail bildirimi kullanıcı tarafından doğrulandı.
- Logo, favicon, etkileşimli hero kartları, Bürküt gezegeni, hizmetler, ürün konseptleri ve Yangan'ın yerel akışı mevcut.
- E-posta, telefon ve Instagram kaynak koda eklendi. Paylaşım görseli ve OG/Twitter etiketleri hazır. Son paketlerin canlıya yüklendiği ayrıca doğrulanmalı.
- Önceki kontrollerde 47 uygulama testi ve son mail paketinde 24 PHP kontrolü geçti. Bunlar bütün cihazlarda kusursuz çalışma garantisi değildir.
- Aydınlatma metni taslak halinde; şirket posta adresi, log/yazışma saklama ve aktarım düzeni açık kalıyor. Hosting ülkesi Hollanda ve yedek süresi 2 gün olarak bildirildi.
- Gerçek müşteri işleri, ekip geçmişi ve başarı sayıları sağlanmadı. Konseptler gerçek müşteri referansı gibi sunulmaz. Gerçek AI kapalı.

## Öncelik tablosu

**Yangan — 16 Ekim:** Web/uygulama/oyuna özel amaç ve detay soruları, cevaplara göre başlangıç önerisi ve cevapları koruyan özet düzenleme uygulandı. Beş soruluk akışta bütçe yerine amaç sorulur; bütçe formda isteğe bağlı kalır. Hizmet sayfalarında alan önceden seçilir ve akış dört soruyla ilerler. Özetin aktar düğmesi sabit görünür; öneri ve düzenlenmiş bilgiler forma taşınır. Karakterin kısa selamlaması ve bekleme tepkisi hareket tercihini izler. 80 test geçti; gerçek AI bağlantısı kapalı kalır. [Kontrol kapsamı](./docs/qa/YANGAN-AKISI-2026-10-16.md).

**İçerik bakımı — 15 Ekim:** Hizmet galerilerinin iki görsel sınırı kaldırıldı. Görsel sayısı içerik dosyasından değişir; tek görselde oklar gizlenir. Yayın kontrolü boş galeriyi/açıklamayı/hizmet metnini, yinelenen adres ve kimlikleri, eksik galeri eşleşmesini ve geçersiz yerel dosyaları durdurur. Yeni görünür bölüm eklenmedi. Düzenleme adımları [içerik rehberinde](./docs/ICERIK-DEGISTIRME.md).

**Baştan sona kontrol — 15 Ekim:** Gerçek yerel tarayıcı erişimi sağlandı. Dört sayfa × dört ekran genişliği, menü/sekme/SSS/galeri/form/Yangan akışları kontrol edildi. Doğrudan form bağlantısı, galeri odak çevrimi/ortalama, Yangan aktarımı, görsel düğme adı ve üst alan landmark hataları giderildi. 67 uygulama testi, 24 PHP kontrolü ve dört mobil axe taramasında 0 otomatik ihlal; fiziksel cihaz/gerçek zoom/ekran okuyucu ve canlı cPanel kabulü açık. [Rapor ve kanıtlar](./docs/qa/UCTAN-UCA-KONTROL-2026-10-15.md).

**Doğrudan proje başlangıcı — 15 Ekim:** Proje çağrıları mevcut bilgileri koruyarak ilk eksik/hatalı form alanına götürür. Seçili hizmet korunur, gerekirse ek bilgi bölümü açılır; hareket tercihi ve yeni sekme davranışları gözetilir. Yeni görünür içerik/çağrı kalabalığı eklenmedi. 64 test geçti; gerçek mobil klavye/scroll kabulü açık. [Rapor](./docs/qa/PROJE-BASLANGIC-NAVIGASYONU.md).

**Talep akışını sadeleştirme — 15 Ekim:** Telefon, kurum ve bütçe isteğe bağlı tek bölüme alındı; ilk görünüm yalnızca gerekli bilgilerden oluşur. Ek bilgileri kapatma veriyi silmez; Yangan bütçesi ve alan hataları bölümü otomatik açar. Reddedilmiş hata tasarımı geri getirilmedi. 60 test ve üretim/yayın kontrolleri geçti. [Kontrol raporu](./docs/qa/FORM-SADELESTIRME.md). Dönüşüm artışı ölçülmüş sayılmaz; manuel/canlı kabul açık kalır.

**Yayın/görünürlük paketi — 15 Ekim:** Yol haritasının içerik bakım ve teknik görünürlük işleri ilerletildi. Eksik yerel görselleri, temel sayfa/metaveri sorunlarını engelleyen yayın kontrolü; otomatik statik JSON-LD ve küçük hizmet gezinme yolu eklendi. 57 test geçti. İzleyici veya yeni içerik bölümü eklenmedi; Search Console ve analitik kararları kullanıcı bağımlılığı olarak açık kalır. [Kapsam ve sınırlar](./docs/qa/YAYIN-VE-METAVERI-KONTROLU.md).

**Kalıcı tasarım kuralı — 15 Ekim:** İçerik miktarını artırmak başarı ölçütü değildir. Her yeni bölüm ziyaretçinin hizmeti anlamasını veya proje talebi bırakmasını kolaylaştırmalı. Hizmet sayfalarında örnek görsel ve tek ana eylem öne çıkar; ayrıntılar isteğe bağlı açılır, rakip hizmet bağlantıları alt bilgide kalır. Yeni blog/panel/AI veya galeri eklenirken bu kural korunur.

**Görsel ve galeri paketi:** Üç hizmete ikişer düzenlenebilir arayüz konsepti, büyütme galerisi ve hover etkileşimi eklendi. Süreç/hazırlık tek açılır bölüme alındı, hizmetler arası gezinme alt bilgiye taşındı. Böylece proje vitrini/galeri aşamasının ilk uygulaması mevcut sayfalar içinde gerçekleştirildi; ayrı uzun proje sayfaları açılmadı. Gerçek müşteri portföyü içerik/izin bekliyor.

| Sıra | Paket | Beklenen fayda | Bağımlılık |
| --- | --- | --- | --- |
| 1 | Canlı sürümü ve temel kullanımı sağlamlaştırma | Yayın ve gönderim sorunlarını erken bulmak | Son paketin yüklenmesi; fiziksel cihaz kontrolü |
| 2 | Hizmet detayları ve talep akışı | Ziyaretçinin ne alacağını anlayıp uygun talep bırakması | Hizmet kapsamının işletme tarafından doğrulanması |
| 3 | Proje vitrini ve marka güveni | Tasarımın yanında çalışma biçimini ve üretilen işi göstermek | Gerçek projeler için içerik ve paylaşım izni |
| 4 | Düzenlenebilir içerik ve güvenli yayın | Görselleri/metinleri kolay ve hatasız değiştirmek | Önce dosya üzerinden ortak içerik yapısı |
| 5 | Görünürlük ve sonuç takibi | Hangi içeriklerin işe yaradığını öğrenmek | Veri toplama kararı ve uygun bilgilendirme |
| 6 | İhtiyaç doğrulanırsa AI ve yönetim paneli | Tekrarlayan işi azaltmak | Hosting, bütçe, yetkilendirme ve bakım kararı |

## 1. Canlı sürümü sağlamlaştırma

**İşler**

- Kaynak sürüm ile cPanel'deki sürümü ayırt eden, kişisel bilgi içermeyen bir yayın sürüm kaydı oluşturmak.
- Yanlışlıkla gönderimi kapalı statik paket yüklenmesini önlemek: standart yayın komutu ve açık dosya listesi hazırlamak. Özel mail config hiçbir yayın işleminde üzerine yazılmamalı.
- Form yanıtlarında kapalı servis, yoğunluk, bağlantı sorunu ve belirsiz teslim durumlarını anlaşılır mesajlarla ayırmak. SMTP hatasının özel ayrıntılarını ziyaretçiye göstermemek; belirsiz sonuçta kör tekrar göndermemek.
- Başarılı gönderimde isteğin alındığını ve sonraki adımı açıklamak. Yanıt süresi işletme tarafından belirlenmedikçe saat/gün sözü vermemek.
- Gerçek telefon/ekran klavyesi, klavye ile gezinme, yüzde 200 zoom ve azaltılmış hareket kontrollerini tamamlamak. Hareket sayısını artırmak yerine mevcut animasyonların kullanım etkisini incelemek.
- Aydınlatma metnini eksik işletme bilgileriyle tamamlayıp formdan ve alt bilgiden erişilebilir hale getirmek. Mevcut taslağı nihai metin olarak yayımlamamak.

**Tamamlanma ölçütü:** Yüklü sürüm tanımlanabilir; gerçek form teslimi kontrollü olarak doğrulanır; kritik mobil/klavye sorunları giderilir; çözülmeyen bağımlılıklar açıkça kaydedilir. Aydınlatma alt işi, eksikleri tamamlanana kadar açık kalır.

## 2. Hizmet detayları ve daha anlaşılır proje başlangıcı

**İşler**

- Web, uygulama ve oyun için ayrı adresi olan hizmet detay sayfaları hazırlamak. Başlangıçta aynı tasarım şablonunu ve ortak içerik yapısını kullanmak.
- Her sayfada kimler için uygun olduğu, kapsam, teslim edilebilen çıktılar, çalışma adımları, müşteriden gerekenler ve ilgili SSS'yi göstermek.
- Hizmet sayfasındaki “Bu projeyi konuşalım” eyleminin formda doğru hizmet alanını seçmesi; ziyaretçinin yazdığı bilgileri silmemesi.
- Kapsam dışında kalan işleri işletmeyle netleştirmek. Doğrulanmamış fiyat paketi veya gerçekçi olmayan teslim süresi yazmamak.
- Ziyaretçi formu doldururken seçili alanların ve kısa açıklamaların daha anlaşılır olmasını sağlamak. Kullanıcının reddettiği gösterişli hata tasarımını geri getirmemek.
- Yeni sayfalarda benzersiz başlık/açıklama, canonical, site içi bağlantılar ve sitemap güncellemesi yapmak; cPanel'de doğrudan açılış/yenileme yollarını doğrulamak.

**Tamamlanma ölçütü:** Üç hizmet sayfası ayrı URL'den açılır; kullanıcı kapsamı anlayıp seçili hizmetle forma ulaşır; doğrudan açılış ve geri gezinme çalışır.

## 3. Proje vitrini ve marka güveni

**İşler**

- Mevcut ürün konseptlerine ayrıntılı proje anlatımı eklemek: fikir, problem, tasarım kararı, ekranlar ve kullanılan yaklaşım. Konsept niteliği proje anlatımında anlaşılır olmalı.
- Görseller için seçilebilir galeri ve erişilebilir büyütülmüş görünüm hazırlamak; Escape ile kapanma, odak dönüşü ve mobil kullanım sağlamak.
- Gerçek projeler geldikçe amaç, Bürküt'ün rolü, kapsam ve izinli görsellerle vaka sayfası eklemek. Müşteri adı, yorum, sonuç ve sayısal etki yalnızca doğrulanmış içerikle kullanılmalı.
- Hakkımızda bölümünü şirketin gerçek çalışma biçimiyle geliştirmek; ekip fotoğrafı ve isimleri yalnızca sağlanırsa eklemek.
- Instagram bağlantısını korumak; otomatik sosyal akış yerine izinli, seçilmiş görseller kullanmak.

**Tamamlanma ölçütü:** İlk aşamada en az bir konseptin ayrıntılı anlatımı ve çalışan galerisi hazırdır. Gerçek iş alt aşaması, içerik/izin gelene kadar açık kalır.

## 4. Kolay içerik değişikliği ve bakım

**İşler**

- Hero kartları, proje görselleri, hizmet metinleri, SSS ve iletişim bilgilerini anlaşılır içerik dosyalarında toplamak. Mevcut yapıların üzerine ikinci bir veri kaynağı kurmamak.
- Görseller için dosya adı, oran, önerilen boyut ve alternatif metin rehberi yazmak; eksik dosya veya geçersiz bağlantıyı yayın öncesinde yakalamak.
- Proje eklemeyi bir örnek kayıtla belgelemek. Görsel değişikliği için uygulama bileşenini düzenlemek gerekmemeli.
- Site ZIP'i ve yalnızca mail tasarımı ZIP'ini açıkça ayırmak. Önceki çalışan sürüme dönüşü belgelemek; geri dönüşte özel config ve gönderim kayıtlarını eski paketle ezmemek.
- Bağımlılık güncellemeleri, yedekten dönüş ve form kontrolü için bakım listesi oluşturmak. Kullanıcı ayrıca istemedikçe zamanlanmış otomasyon kurulmaz.

**Tamamlanma ölçütü:** Bir görsel/proje/metin rehbere göre değiştirilebilir; paketleme hatalı varlıkları yakalar; yayın ve geri dönüş adımları şifreleri değiştirmez.

## 5. Görünürlük ve sonuç takibi

**İşler**

- Hizmet ve proje sayfalarını tutarlı site haritası, başlıklar, anlamlı bağlantılar ve paylaşım görselleriyle tamamlamak.
- İşletmenin doğruladığı bilgilerle uygun yapılandırılmış veri hazırlamak. Sahte puan, yorum, adres veya hizmet bölgesi eklememek.
- Search Console mülkiyet doğrulamasını kullanıcı hesabında tamamlamak ve sitemap göndermek; arama sırası garantisi vermemek.
- Önce basit bir takip sorusu belirlemek: talepler hangi hizmete geliyor, ziyaretçiler hangi içerikten forma geçiyor? Analitik ürününü ancak ihtiyaç ve veri düzeni kararlaştırıldıktan sonra seçmek.
- Analitik eklenirse ad, e-posta, telefon, proje açıklaması veya form içeriğini olay/veri etiketlerine göndermemek. Rıza gerektiren izleme, gerekli seçim yapılmadan başlamamalı.
- İlk küçük trafik örneklerinde A/B test yerine görüşme ve kullanılabilirlik geri bildirimleriyle ilerlemek. Veri yetersizken dönüşüm başarısı iddiası üretmemek.

**Tamamlanma ölçütü:** Teknik sayfa bilgileri ve sitemap tutarlıdır. Mülkiyet doğrulaması kullanıcı tarafından yapılır. Analitik alt işi ancak veri düzeni ve ihtiyaç netleşince tamamlandı sayılır.

## 6. Koşula bağlı genişleme

### Yangan'ın gerçek AI bağlantısı

Yalnızca yerel akışın karşılamadığı somut sorular varsa ele alınır. Önce onaylı hizmet bilgisi, sağlayıcı, aylık üst bütçe ve hosting desteği belirlenir. Sunucuda anahtar koruması, yoğunluk ve maliyet sınırları, yanlış bilgiye karşı kapsam sınırı ve form alternatifi uygulanır. Kesin fiyat, teslim tarihi ve şirket adına taahhüt üretmemeli. Veri akışı ve aydınlatma ayrıca güncellenir.

### İçerik yönetim paneli

Sık içerik değişimi gerçekten ihtiyaç olduğunda değerlendirilir. Önce kapsam ve bakım sahibi belirlenir. Giriş/rol kontrolü, CSRF koruması, güvenli dosya yükleme, oturum yönetimi, yedek ve geri dönüş olmadan internete açık yönetim ekranı eklenmez. Basit içerik dosyaları ilk seçenek olarak korunur.

### Sonraki seçenekler

İngilizce içerik, blog ve randevu sistemi ancak gerçek talep ve içerik üretme kapasitesi varsa planlanır. Çok dilde bütün sayfa/metaveri içeriği tamamlanır; boş blog veya çalışmayan randevu düğmesi yayımlanmaz.

## İlk uygulanacak geliştirme paketi

1. Standart SMTP yayın paketi ve sürüm bilgisini oluşturmak.
2. Formun teknik hata durumlarını mevcut sade tasarım içinde netleştirmek; başarı sonrası adımı düzenlemek.
3. Üç hizmet detay sayfasının ortak yapısını ve ilk web hizmeti sayfasını hazırlamak.
4. Kullanıcının değiştireceği içerik/görseller için kısa rehber yazmak.

Bu paket yeni yönetim paneli veya gerçek AI bağlantısına bağlı değildir. Aydınlatma metninin eksik bilgileri ve gerçek cihaz kontrolü ayrı açık işler olarak korunur. Paketin kendi kabul kontrolleri tamamlanmadan sonraki büyük özelliğe geçilmez.

## İş bölümü

| Codex'in yapabileceği işler | Kullanıcıdan gerekenler |
| --- | --- |
| Sayfa, içerik şablonu, galeri, teknik SEO, paketleme ve otomatik kontroller | Gerçek hizmet kapsamını ve yayınlanan ticari bilgileri doğrulamak |
| Marka düzenini koruyarak kullanılabilirlik iyileştirmeleri | Gerçek proje içeriği, müşteri paylaşım izni, varsa ekip/çalışma bilgileri |
| Aydınlatma taslağını bildirilen veri düzenine göre güncellemek | Eksik işletme/veri işleme bilgileri ve gerekli hukuki değerlendirme |
| İncelenebilir yayın paketi ve geri dönüş rehberi | cPanel yüklemesi, fiziksel cihaz testi ve hesap mülkiyet doğrulamaları |
| Karar verildiğinde AI veya panel uygulamasını hazırlamak | Sağlayıcı, bütçe, işletme süreci ve bakım sorumlusu kararı |
