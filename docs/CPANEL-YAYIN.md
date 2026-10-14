# cPanel yayını — burkut.gemnative.com

Hedef adres: **https://burkut.gemnative.com/**. Bu paket statik Vite üretim çıktısıdır. cPanel üzerinde Node.js çalıştırmadan mevcut ön yüz yayınlanabilir. Gerçek form teslimi ve gerçek AI servisi henüz bağlı değildir; gönderim bayrağı kapalı kalır.

## Yükleme

1. cPanel → Domains → Create A New Domain bölümünde `burkut.gemnative.com` ekleyin. Ana domain ile belge kökünü paylaşma seçeneğini kapatın. Ayrı bir klasör seçin; örneğin `public_html/burkut`. Zaten oluşturulmuşsa Domains ekranındaki Document Root yolunu kullanın.
2. DNS yönetimi başka yerdeyse `burkut` kaydını hosting sağlayıcısının verdiği sunucu IP'sine yönlendirin. IP'yi tahmin etmeyin; mevcut çalışan kaydı gereksiz yere değiştirmeyin.
3. File Manager'da **bu subdomain'in Document Root klasörünü** açın. Var olan bir site varsa önce dosyalarını yedekleyin.
4. Hazırlanan `burkut-cpanel.zip` dosyasını yükleyip bu klasöre çıkarın. `index.html`, `assets`, `images`, `licenses`, `robots.txt` ve `sitemap.xml` doğrudan belge kökünde olmalı. Araya `dist` klasörü eklemeyin. Gemnative ana sitesinin klasörüne yüklemeyin.
5. SSL/TLS durumundan subdomain sertifikasını kontrol edin. Hosting'de AutoSSL mevcutsa çalıştırın veya sağlayıcıdan sertifika kurulmasını isteyin. Geçerli sertifika kurulduktan sonra cPanel'in HTTPS yönlendirme özelliğini kullanın.
6. `https://burkut.gemnative.com/` adresini gizli pencerede açın. CSS/fontlar, gezegen, hero kartları, mobil menü, Yangan ve form özet kontrolünü sınayın. `robots.txt` ve `sitemap.xml` adreslerinin açıldığını kontrol edin.

Mevcut sayfa bölüm bağlantıları `#` ile çalışır; statik sayfa için SPA rewrite zorunlu değildir. Yeni URL tabanlı sayfalar eklenirse yönlendirme ayrıca hazırlanır.

## Yeni sürüm hazırlama

```sh
npm ci
npm run build
npm run check:assets
```

`dist/` klasörünün **içeriğini** aynı subdomain klasörüne yükleyin. `.qa-dist`, kaynak proje, node_modules veya .env dosyalarını yüklemeyin. Yeni kart görselleri için [Hero kartları rehberini](./HERO-KARTLARI.md) kullanın; kaynak değiştikten sonra yeniden build alın.

Paketin `assets/.htaccess` dosyası da yüklenmeli; Dosya Yöneticisi'nde gizli dosyaları göster seçeneği gerekebilir. Bu dosya yalnızca hash'li JS/CSS/WOFF2 varlıkları için uzun önbellek ve destekleniyorsa CSS/JS sıkıştırması ekler. Ana dizinin mevcut `.htaccess` veya SSL kurallarını değiştirmez. Apache `mod_headers` / `mod_deflate` desteğine bağlıdır. Yeni sürüm sonrası hash'li bir varlığın HTTP cevabında `Cache-Control: public, max-age=31536000, immutable` başlığını kontrol edin. Dosya kaynak kodu değiştirilirse yeni build alın; üretilmiş hash'li dosyaları aynı adla elle değiştirmeyin.

Form teslimini açmak için statik dosyaların yanına gerçek API ve SMTP ayarları gerekir. Gmail için ayrı PHP paketi ve [adım adım kurulum](./GMAIL-SMTP-KURULUM.md) hazırdır. `server/dev.mjs` yerel deneme aracıdır; cPanel'e yüklenerek üretim sunucusuna dönüşmez. [Servis temeli](../server/README.md).

Kullanıcının statik yayını HTTPS üzerinden kontrol edildi: [canlı rapor](./qa/CANLI-YAYIN.md). Gmail paketi henüz canlıya yüklenmedi; yeni paket hazırlanması canlı formun açıldığı anlamına gelmez.

Resmi kaynaklar: [cPanel subdomain oluşturma](https://support.cpanel.net/hc/en-us/articles/360052780313-How-to-create-a-subdomain), [SSL rehberi](https://docs.cpanel.net/knowledge-base/security/guide-to-ssl/).
