# Font ve form iyileştirmeleri — 13 Ekim 2026

SMTP kurulumu kullanıcı isteğiyle beklemede. Bu paket gerçek mail veya AI bağlantısını açmaz.

## Font dosyaları

| Üretim çıktısı | Önce | Sonra |
| --- | --- | --- |
| Font dosyası | 13 | 6 |
| Toplam font boyutu | 319264 bayt | 193612 bayt |
| Biçim | WOFF2 ve WOFF | WOFF2 |

Dosya toplamı 125652 bayt, yaklaşık yüzde 39,4 azaldı. Inter Tight için kullanılmayan Kiril, Yunanca ve Vietnamca dosyaları; JetBrains Mono için eski WOFF kopyaları çıkarıldı. Latin ve Latin Extended parçaları, Türkçe karakterler ve mevcut font lisansları korundu. JetBrains Mono parçalarının karakter aralıkları tanımlandı. `src/fonts.css` yerel Fontsource dosyalarına referans verir; fontlar dış servisten yüklenmez.

Yerel tarayıcı varlık envanterinde altı WOFF2 parçası gözlendi. Formda `İ ı Ş ş Ğ ğ Ç ç Ö ö Ü ü` örneğiyle görsel kontrol yapıldı. Yeni dil veya geniş karakter seti eklenirse alt küme seçimi yeniden değerlendirilmelidir.

GitHub dosya boyutu kontrolüne toplam **210 KiB font sınırı** eklendi. Son build'de fontlar 189,1 KiB, JS 84,6 KiB gzip, CSS 13,4 KiB gzip. Bunlar paket ölçüleridir; ağ yükleme süresi veya Lighthouse puanı değildir. Önceki fontların tamamının her ziyarette indirildiği varsayılmadı.

## Form deneyimi

- Proje açıklamasına mevcut 4000 karakter sınırını gösteren sayaç ve erişilebilir açıklama bağlantısı eklendi.
- Bütçe alanında sunucu hata mesajı, `aria-invalid` ve açıklama bağlantısı tamamlandı.
- İşlem sırasında formun 10 giriş alanı devre dışı; form `aria-busy=true`. İşlem bitince alanlar yeniden açılıyor ve veri korunuyor.
- Proje türü değiştirildiğinde eski sonuç mesajı temizleniyor.
- Boş gönderimde odak ilk proje türüne dönüyor ve gerekli alan hataları gösteriliyor.
- Sentetik doğru girişle yerel özet kontrolü tamamlandı; bilgiler gönderilmedi. Deneme değerleri ardından temizlendi.
- 320×640 ve 390×844 form görünümünde belge yatay taşması yok. Mobil boş/hatalı form durumunda axe-core otomatik ihlal 0; [ham rapor](./form-font-2026-10-13.json). Otomatik çözülemeyen kontrast durumları kayıt içinde duruyor.

38 mevcut test, typecheck, lint, build ve boyut kontrolleri geçti. Fiziksel telefon, ekran okuyucu, yüzde 200 tarayıcı zoom ve Lighthouse kontrolleri tamamlanmış sayılmaz. Önceki a393018 commit'inin GitHub kalite sonucu success olarak doğrulandı; yeni commit'in CI sonucu ayrı değerlendirilir.
