# Yangan sohbet servisi

Gerçek AI sağlayıcısı henüz bağlı değil. `VITE_YANGAN_CHAT=disabled` varsayılanında sohbet hazır yanıtlarla çalışır ve ağ isteği yapmaz. Proje özeti akışı bağımsız olarak çalışmaya devam eder.

## Hazır olan temel

- `src/shared/chat.ts`: dönüşümlü kullanıcı/asistan geçmişi, mesaj ve toplam uzunluk sınırları; eski konuşma çiftlerini çıkararak UTF-8 gövde boyutunu sınırlandırma.
- `server/chat.ts`: Fetch Request/Response işlemi; izinli origin, POST/JSON, 24 KiB gövde, istemci başına dakikada 10 deneme, 15 saniye sağlayıcı süresi ve doğrulanmış yanıt.
- `src/services/chat.ts`: aynı origin `/api/chat` istemcisi; 200 / REPLIED ve dolu, en fazla 4000 karakter yanıt kontrolü.
- Yangan arayüzü: bekleme durumu, çift gönderimi engelleme, hata sonrası tekrar deneme, proje özeti alternatifi ve sıfırlamada eski yanıtı iptal etme. İstemci 20 saniyede isteği iptal eder.

İşlem en fazla 10 mesajı kabul eder; istemci son 9 mesajı, gerektiğinde daha azını gönderir. Kullanıcı mesajı 2000, asistan mesajı 4000, toplam geçmiş 12000 karakterle sınırlı. Yanıtlar React metni olarak gösterilir; model çıktısı HTML olarak çalıştırılmaz. Sunucu talimatı istemciden alınmaz. Bu kurallar modelin doğruluğunu veya tüm kötüye kullanımın önlenmesini garanti etmez.

## Gerçek bağlantı sırası

1. Sağlayıcı/model ve aylık kullanım bütçesini belirleyin. Anahtar yalnızca sunucu gizli değişkeninde tutulmalı; `VITE_` değişkenine veya public GitHub reposuna yazılmamalı.
2. Node.js çalıştıran bir API ortamı ve aynı origin `/api/chat` rotası kurun. cPanel'e statik ZIP yüklemek TypeScript sunucusunu çalıştırmaz. Hosting Node.js desteklemiyorsa ayrı API ve sunucu üzerinden yönlendirme gerekir.
3. Uygulama ömrü boyunca tek `createChatHandler({ origins, provider })` örneğini kullanın. Sağlayıcı adaptörü `messages`, sunucunun `instructions` metni ve `signal` alır; `{ text }` döndürür. İptali ve yanıt uzunluğu sınırını sağlayıcı çağrısında da uygulayın.
4. `clientId` güvenilir bağlantı bilgisinden üretilmeli; ziyaretçinin gönderdiği kimlik veya doğrulanmamış forwarded header kullanılmamalı. Çoklu süreç için ortak yoğunluk deposu, toplam maliyet kotası ve erişim koruması gerekir. Origin kontrolü tek başına kimlik doğrulama değildir.
5. Sağlayıcının veri saklama düzeni ve site açıklamaları tamamlandıktan sonra gerçek bağlantı, hata, süre aşımı ve kota senaryolarını test edin. Ardından `VITE_YANGAN_CHAT=enabled` ile yeni build alın.

Mevcut yoğunluk deposu tek süreç belleğindedir; 60 saniye ve en fazla 1000 kayıt sınırı vardır. Sohbet bu uygulamada dosyaya/loga yazılmaz. Gerçek sağlayıcının saklama politikası ayrıca değerlendirilir. Sunucuya gönderilen geçmişin asistan mesajları da istemci verisidir; doğrulanmış model kaydı sayılmaz.

## Yerel kontrol

`npm run server:dev` 127.0.0.1:8787 üzerinde `/api/projects` ve `/api/chat` rotalarını açar. Sağlayıcılar kurulmadığı için izinli POST istekleri 503 döner. Bu geliştirme runner'ı üretim sunucusu değildir; bağlantı kopmalarını Fetch iptal sinyaline bağlayan hosting adaptörü de üretimde tamamlanmalıdır.

`npm test` sohbet ve talep sözleşmelerini, doğrulamayı, iptal/süre sınırlarını ve kapalı modda ağ isteği yapılmadığını kontrol eder.
