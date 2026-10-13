# Hero kartlarını değiştirme

Beş kartın ayarları `src/content/heroCards.ts` dosyasında. Varsayılan sahneler resim dosyası değil, HTML/CSS ile hazırlanmış maketlerdir. Her kartı kendi resminizle bağımsız olarak değiştirebilirsiniz.

1. WebP, PNG veya JPG görselini `public/images/hero/` klasörüne koyun. Örneğin `web.webp`.
2. Ayar dosyasında ilgili kartın `image: null` değerini değiştirin:

```ts
{
  id: "web",
  label: "Yeni web tasarımım",
  image: {
    src: "/images/hero/web.webp",
    fit: "cover",
    position: "center",
  },
},
```

`cover` kartı doldurur ve kenarlardan kırpabilir; `contain` görselin tamamını gösterir. `position` ile örneğin `center top` kullanabilirsiniz. `image: null` mevcut maketi geri getirir. Dosya yolu hatalıysa kart otomatik olarak mevcut makete döner.

Kart kimlikleri: code, web, phone, game, wire. `label` klavye/ekran okuyucu adıdır; görseli değiştirince bu açıklamayı da güncelleyin. Dizinin sırası kartların sırasıdır. Aynı kimliği iki kez kullanmayın.

Kart üzerine gelince vurgu, hafif yükselme ve öne çıkma oluşur. Tab ile odaklanma aynı vurguyu gösterir; Enter/Space veya dokunma kalıcı seçimi açıp kapatır. Aynı anda tek kart seçilir. Seçim bu sayfada kalır; sayfa yenilenince temizlenir. Dar ekranlarda bütün kartlara yatay kaydırarak ulaşılır.

Bu düzenleme dosyadan yapılır; site içi yönetim paneli eklenmedi. Boyut kontrolü tek görsel için 600 KiB sınırı kullanır. Görselleri makul boyutta WebP olarak hazırlamak tercih edilir; mobil kart için ayrı retina görsel şart değildir.
