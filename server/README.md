# Proje talep servisi temeli

`projects.ts` standart Fetch `Request` / `Response` kullanan bir işlem üretir. Henüz hosting rotasına bağlanmadı ve gerçek teslim sağlayıcısı kurulmadı. `deliver` verilmediğinde 503 döner; teslim olmuş gibi davranmaz.

Kurulum sırası:

1. Talep alıcısı, hosting ve veri işleme düzenini belirleyin; ertelenen aydınlatma içeriğini tamamlayın.
2. Sunucuda `createProjectHandler({ origins: [gercekSiteOrigin], deliver })` örneğini uygulama ömrü boyunca yeniden kullanın. Her istekte yeni örnek oluşturmak yoğunluk/tekrar korumasını sıfırlar.
3. Hosting'in `/api/projects` POST rotasını bu işleme bağlayın. `clientId` güvenilir sunucu bağlantısı bilgisinden türetilmeli; istemcinin gönderdiği kimlik veya kontrolsüz forwarded header kullanılmamalı.
4. Teslim adaptörü sunucudaki gizli anahtarları kullanır. Adaptör verilen `signal` iptalini ve `idempotencyKey` anahtarını desteklemeli; yalnızca sağlayıcı gerçekten kabul ettiğinde dolu bir `receipt` dönmeli. E-posta teslimi ve gelen kutusuna ulaşması ayrıca doğrulanır.
5. Sunucu entegrasyonu test edildikten sonra istemci build'inde `VITE_PROJECT_SUBMISSION=enabled` açılır. Bu bayrak gizli anahtar değildir; yalnızca aynı origin'deki API'yi kullanmayı seçer.

## Sözleşme

- Origin izin listesi ve POST/JSON kontrolü.
- 24 KiB istek gövdesi sınırı; ortak alan/tip/uzunluk doğrulaması.
- Her istemci için dakikada 5 deneme; 429 cevabında Retry-After.
- 16–80 karakterlik istek anahtarı; aynı anahtar ve aynı içerik tek teslim işlemine bağlanır. Farklı içerik 409 döner.
- Teslim için varsayılan 10 saniye süre sınırı. Eksik onay, hata veya zaman aşımı 503 döner.
- Başarı yalnızca 201 / DELIVERED / dolu receipt ile döner. İstemci diğer cevapları başarı saymaz.
- Cevaplar no-store kullanır. Kod kişisel alanları loglamaz veya dosyaya yazmaz.

## Yayın öncesi tamamlanacaklar

Bu temel tek süreç içinde bellek kullanır: yoğunluk kayıtları 60 saniye, istek sonuçları 10 dakika tutulur; her harita en fazla 1000 giriş kabul eder. Çoklu sunucu/serverless ortamında kalıcı, ortak yoğunluk ve idempotency deposu veya sağlayıcının kendi koruması gerekir. Başarısız anahtarlar da geçici olarak korunur; zaman aşımında sağlayıcının kabul etmiş olma ihtimali nedeniyle körlemesine tekrar teslim yapılmaz. Saklama süresi sona erdikten sonra süreç koruması biter; adaptör sağlayıcı tarafında anahtarı idempotent işlemek zorundadır.

Gerçek sağlayıcı, hosting rotası, alıcı, ortak depo ve teslim testi bu paketle kurulmuş sayılmaz. Yangan sohbet sözleşmesi hazır; gerçek AI bağlantısı için [ayrı rehber](../docs/YANGAN-SERVISI.md) bulunur. Yapılandırılmamış durumda site mevcut yerel özet kontrolünü kullanır.

## Kontrol

`npm test` istemci, ortak form davranışı ve sunucu sözleşmesi testlerini çalıştırır. `npm run typecheck` sunucu TypeScript dosyalarını da kapsar. Sunucu kaynakları Vite istemci girişinden import edilmez; yayın istemci paketine eklenmez.

Yerel rota denemesi için Node.js 24 ile `npm run server:dev` çalıştırın. API yalnızca 127.0.0.1:8787 üzerinde dinler; Vite geliştirme sunucusu /api isteklerini bu adrese iletir. Bu runner'ın teslim adaptörü yoktur. İzinli origin'den yapılan POST hem doğrudan API'de hem Vite proxy üzerinden 503 / SUBMISSION_UNAVAILABLE ile doğrulandı. Gerçek veri veya e-posta göndermez; kontrol sonunda sunucu durduruldu.
