# Yangan proje akışı — 16 Ekim 2026

## Sonuç

Yangan müşterinin amacına göre kısa bir başlangıç önerisi verir; kesin fiyat veya teslim süresi üretmez. Ana sayfada alan, amaç, aşama, zaman ve kısa detay olmak üzere beş soru vardır. Hizmet sayfaları alanı önceden seçer; kullanıcı isterse Geri ile alanını değiştirebilir. Bütçe sohbetten çıkarıldı, formun isteğe bağlı alanında kaldı.

Web için tanıtım/talep/satış, uygulama için mobil/web/mevcut uygulama, oyun için prototip/arayüz/mevcut oyun hedefleri ayrılır. Ortak başlangıç seçenekleri yalnızca ön görüşmeye yardımcı öneridir. Gerçek AI sağlayıcısı açılmadı; mevcut yerel akış çalışır.

Özette zaman, amaç veya detay düzeltmek diğer cevapları silmez ve tamamlanınca doğrudan özete döner. Alan değişikliği eski hizmete ait cevapları temizler. Detay tekrar açılınca önceki metin hazır gelir. Uzun detay 2.000 karakterle sınırlıdır; oluşturulan özet formun 4.000 karakter sınırını aşmaz.

Özet tekrar sohbet geçmişiyle uzatılmaz. Öneri ilk görünümde, “Forma aktar” düğmesi sabit alt bölümde kalır. Aktarım öneri/cevapları forma yazar, ilk eksik alana odaklanır; kayıtlı ad/bütçeyi korur. Bu işlem e-posta göndermez; kullanıcı formu tamamlayıp ayrıca gönderir. Veriler sayfa belleğindedir; yeni bir izleyici, çerez veya sunucu kaydı eklenmedi.

Karakter kısa selamlama ve yalnızca yanıt beklerken hafif ışık tepkisi gösterir. Site duraklatması ve mevcut sistem azaltılmış hareket CSS'i geçerlidir.

## Doğrulama

- 80 uygulama testi (17 dosya), lint, TypeScript/üretim, dört sayfanın yayın öncesi denetimi ve varlık bütçeleri geçti.
- Yeni kontroller: hizmet soruları, bağlamla başlatma, bağımlı alan temizliği, özette bilgileri koruma, öneri seçimi ve özet boyutu; gerçek bileşende detay düzeltme/aktarma; hizmet sayfasındaki forma aktarım ve mevcut bütçenin korunması.
- Bekleyen sohbet isteğinde karakter tepkisi ve yeni konuşma sonrası iptal/eski yanıtı göstermeme davranışı, servis taklidiyle test edildi. Gerçek sağlayıcıya istek gönderilmedi.
- Yerel gerçek tarayıcı: ana sayfa beş adım → web/talep önerisi; oyun sayfası dört adım → prototip önerisi → zaman düzeltme → form aktarımı. Açıklamada amaç, yeni zaman ve öneri korundu; panel kapandı, odak `contact-name` alanına geçti.
- Web ve uygulama bağlamları 320 px genişlikte doğru seçeneklerle açıldı. Oyun özeti/aktarım 390 px genişlikte denendi. Sayfa ve panelde yatay taşma görülmedi; aktar düğmesi viewport içinde kaldı.
- Site hareketi kapatılıp Yangan açılınca başlık görselinin hesaplanan `animation-name` değeri `none` oldu. İşletim sistemi ayarı veya fiziksel telefon bu turda ayrıca denenmedi.

Kanıtlar: [masaüstü](./evidence/yangan-flow-desktop-2026-10-16.png), [mobil](./evidence/yangan-flow-mobile-2026-10-16.png), [320 px bağlam ölçümleri](./evidence/yangan-context-2026-10-16.json).

Bu turda gerçek SMTP gönderimi, canlı cPanel güncellemesi, yeni Lighthouse/axe taraması veya ekran okuyucu testi yapılmadı. Önceki kabul sınırları korunur. Güncel ZIP'ler hazırlanır; canlıya yükleme ayrıca yapılmalıdır.
