# Erişilebilirlik kontrolü — 13 Ekim 2026

Yerel denetim `axe-core` 4.14.0 ile çalıştırıldı. [Ham rapor](./accessibility-2026-10-13.json) her durumun ihlal ve manuel inceleme listelerini içerir.

Kontrol edilen durumlar:

| Durum | Ekran | Otomatik ihlal |
| --- | --- | --- |
| Web konsepti | 1280 × 720 | 0 |
| Uygulama konsepti | 1280 × 720 | 0 |
| Oyun konsepti | 1280 × 720 | 0 |
| Açık mobil menü | 390 × 844 | 0 |
| Boş formun hata durumu | 390 × 844 | 0 |
| Yangan karşılama | 390 × 844 | 0 |
| Yangan proje akışı ilk sorusu | 390 × 844 | 0 |

Tarama öncesinde ürün maketlerindeki tarayıcı metni, yan etiket ve takvim rakamlarında kontrast sorunları bulundu. Bu renkler koyulaştırıldı. Süreç düğmeleri ve hareket kontrolünün görünür metin/erişilebilir ad uyuşmazlığı düzeltildi. Ana içerik klavye odak hedefi yapıldı; “İçeriğe geç” bağlantısıyla aktif öğenin `main` olduğu doğrulandı.

## Denetimi tekrar çalıştırma

1. `npm run dev` ile yerel geliştirme sunucusunu başlatın.
2. `http://127.0.0.1:5173/?audit=a11y` adresini açın.
3. Menü, ürün sekmesi, form hatası veya Yangan gibi kontrol edilecek durumu açın.
4. Sol alttaki “Erişilebilirliği tara” düğmesiyle yeniden çalıştırın.
5. `#accessibility-report` JSON öğesi sonuçları içerir.

Araç yalnızca geliştirme modunda ve açık sorgu parametresiyle yüklenir. Normal sitede gösterilmez; üretim build'inde araç kodu bulunmadığı kontrol edildi. Sonuçlar yerel belgede kalır.

## Kontrolün sınırları

Sıfır otomatik ihlal tam WCAG uyumluluğu anlamına gelmez. Gradyan, dekoratif çizgiler, üst üste gelen veya kırpılan öğeler için raporda `incomplete` sonuçlar var; bunlar manuel inceleme gerektiriyor. Gerçek ekran okuyucu, fiziksel telefon/klavye, yüzde 200 tarayıcı zoom ve işletim sistemi hareket tercihi kontrolleri henüz tamamlanmadı. Yangan'ın bütün özet/düzeltme durumları bu otomatik taramanın kapsamında değil; mevcut akış testleri ayrı çalışıyor.

Kullanılan API: [Deque axe-core resmi belgeleri](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md).
