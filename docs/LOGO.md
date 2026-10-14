# Logo varlıkları

Üst menü ve alt bilgi, `public/images/brand/` içindeki optimize edilmiş şeffaf WebP dosyalarını kullanır. Üst menüde yazı CSS filtresiyle beyaz gösterilir; alt bilgide özgün renk korunur.

Favicon ve Apple simgesi yalnızca kullanıcının `onlylogo.png` dosyasından oluşturulur. Yazı veya arka plan eklenmez.

Varlıkları yenilemek için orijinal `onlylogo.png` ve `bürkütlogopng.png` dosyalarını proje köküne koyup Pillow bulunan Python ile çalıştır:

```sh
python scripts/prepare-brand.py
```

Script alfa sınırlarını kırpar, oranı koruyarak küçültür ve biçimi dönüştürür; çizimi yeniden oluşturmaz. Mevcut birleşik logoda yazı 4000 px görselin 2800. satırından sonra başlar. Farklı yerleşimde bir kaynak verilirse bu kesim güncellenmelidir. Orijinal dosyalar değiştirilmez; üretimde yalnızca türetilmiş dosyalar kullanılır.

Favicon yenilendiğinde `index.html` içindeki simge sorgu sürümü de artırılarak tarayıcı önbelleği yenilenebilir.
