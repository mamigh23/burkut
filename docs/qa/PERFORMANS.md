# Yerel üretim ölçümü — 13 Ekim 2026

Vite üretim çıktısının ayrı `.qa-dist` kopyasında tarayıcının PerformanceObserver API'siyle ölçüm alındı. Yayın çıktısı `dist` ve normal siteye ölçüm aracı eklenmedi. [Ham örnekler](./performance-2026-10-13.json).

| Örnek | Ekran | İlk içerik çizimi (FCP) | Ana içerik çizimi (LCP) | Düzen kayması (CLS) |
| --- | --- | --- | --- | --- |
| Masaüstü yükleme | 1440 × 900 | 156 ms | 304 ms | 0,000201 |
| Mobil ekran yükleme | 390 × 844 | 180 ms | 180 ms | 0 |

Mobil gezegen bölümünde 640 px WebP sürümü yüklendi; yatay taşma görülmedi. Kontrol edilen üretim ölçüm sekmesinde konsol hata/uyarı kaydı yoktu.

Bu örnekler yerel bilgisayarda, ağ/CPU yavaşlatması olmadan ve olası sıcak önbellekle alındı. Ölçüm için eklenen kısa inline kod da örneğin parçasıdır. Fiziksel telefon, Lighthouse, INP veya gerçek ziyaretçi ölçümü değildir; canlı performans taahhüdü olarak kullanılmaz. Gezegen gibi sonradan yüklenen kaynaklar ilk yükleme örneğinde yer almayabilir; ayrı örnek kaydedilmiştir.

## Tekrar çalıştırma

```sh
npm run qa:prepare
npm run qa:preview
```

`http://127.0.0.1:4173/` adresini açın. İstenen ekran boyutunda sayfayı yeniden yükleyip yüklemenin tamamlanmasını bekleyin. Sol alttaki “Ölçümü kaydet” düğmesi `#performance-report` JSON öğesini günceller. Kullanıcı etkileşimi LCP ölçümünü sonlandırabildiğinden ilk örneği kaydırmadan önce alın. CLI veya tarayıcı bu akışta gerçek cache/throttling koşullarını garanti etmez.

Yayın için normal `npm run build` çıktısı olan `dist` kullanılır; `.qa-dist` yalnızca yerel ölçüm kopyasıdır ve Git'e eklenmez. Önizleme sunucusu kontrol sonunda durduruldu.
