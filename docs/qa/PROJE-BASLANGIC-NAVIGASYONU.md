# Proje başlangıcına doğrudan geçiş — 15 Ekim 2026

## Değişiklik

- Ana sayfa hero, yaklaşım/bağlantı/SSS, üst navigasyon ve hizmet sayfası proje çağrıları ortak bir form yönlendirmesi kullanır.
- Hizmet seçilmediyse seçim alanına, seçiliyse ilk eksik zorunlu alana geçilir. Mevcut hata varsa hatalı alan önceliklidir; kapalı ek bilgi alanı gerektiğinde açılır. Dolu formda proje açıklamasına dönülür.
- Seçili hizmetler ve yazılmış bilgiler değiştirilmez. Formun kendisi görünür alana kaydırılır; iletişim bölümünün uzun tanıtım yazısının başında kalınmaz. Sabit üst menü için kaydırma boşluğu korunur.
- Normal tıklamada iletişim hash'i korunur, aynı hash için yeni geçmiş kaydı eklenmez. Ctrl/Meta/Shift/alternatif tıklama ve yeni sekme davranışı engellenmez. Form bulunmazsa sıradan bağlantı davranışı devam eder.
- Sistem veya site hareket durdurma tercihinde animasyonlu kaydırma yapılmaz. Yeni bant, düğme, içerik veya açılır uyarı eklenmedi.
- Mobil menünün iletişim bağlantısı kapanırken form odağının bölüm başlığına geri alınması önlendi; diğer bölüm bağlantılarının mevcut davranışı korundu.

## Kontroller

- Lint, typecheck, üretim, varlık boyutu ve dört sayfa denetimi geçti. 14 dosyada 64 test başarılı.
- Dört yeni DOM testi alan seçimi, eksik e-posta odağı ve veri korunması, gizli hatanın açılması/azaltılmış hareket ve alternatif tıklamaya karışılmamasını doğrular.
- Yük altında UI testlerinde süre aşımı görüldü. Eşzamanlı test işçisi ikiyle sınırlandı; form doldurma testleri tek tek karakter yazmak yerine gerçek yapıştırma etkileşimi kullanıyor. Kontrol edilen gönderim/odak iddiaları ve 5 saniyelik varsayılan test limiti gevşetilmedi.
- Gerçek form gönderimi yapılmadı; testler yerel DOM/taklit servis kullanır. Görsel mobil klavye, gerçek tarayıcı scroll/back ve ekran okuyucu kabulü açık kalır. DOM testindeki scroll çağrısı ekran görüntüsü veya fiziksel cihaz doğrulaması sayılmaz.
