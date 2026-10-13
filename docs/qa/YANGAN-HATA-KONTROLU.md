# Yangan hata ve klavye kontrolü — 13 Ekim 2026

Kontrol ana yerel siteden ayrı, `VITE_YANGAN_CHAT=enabled` olan 5174 portunda yapıldı. Yerel API runner'ı gerçek sağlayıcı içermez; bu test origin'i izin listesinde olmadığından 403 döndü. Yalnızca sentetik bir web sitesi sorusu kullanıldı; dış AI sağlayıcısına mesaj veya gerçek proje talebi gönderilmedi. Üretim bayrakları kapalı tutuldu.

## Doğrulanan davranışlar

- Enter ile soru gönderme; beklerken gönderim ve mod değiştirme düğmeleri devre dışı.
- Başarısız API cevabından sonra açıklama, tekrar deneme ve proje özeti alternatifi.
- Tekrar deneme aynı kullanıcı mesajını çoğaltmıyor; klavye odağı soru alanında kalıyor.
- Escape paneli kapatıyor ve odağı açma düğmesine döndürüyor.
- Sohbetten proje özeti akışına geçince ilk seçenek odaklanıyor, güncel soru duyuruluyor ve açıklama yerel veri davranışını yansıtıyor.
- Yeni konuşma eski hata ve mesajları temizliyor.
- 320×640, 390×844, 640×360 ve 1440×900 görünümünde belge yatay taşması yok. Yatay 640×360 görünümünde panel ve alt kontroller ekran içinde.
- Masaüstü görünümünden 320×640'a küçültünce konuşma en alttaysa hata mesajı tamamen görünür kalıyor. Kullanıcı geçmişi incelerken otomatik aşağı kaydırma yapılmıyor.
- 320×640 hata durumunda axe-core otomatik ihlal sayısı 0. [Ham sonuç](./yangan-error-2026-10-13.json). Gradyan gibi otomatik çözülemeyen kontrast durumları sonuç dosyasında korunuyor.

## Düzeltilenler

Yoğunluk hatası ile bağlantı hatası ayrıldı; ağ/HTML hata cevapları teknik servis ayrıntısı göstermeyen açıklamaya dönüştürüldü. Bekleme ve hata durumları kaydırma davranışına eklendi. Ekran boyutu değişince en altta olan konuşmanın konumu korunuyor. Tekrar denemede kaldırılan düğmeden kaynaklanan odak kaybı giderildi. Mod değişimindeki eski hata duyurusu temizlendi.

Bu test gerçek model yanıtı, sağlayıcı maliyeti, mobil klavye, ekran okuyucu veya tarayıcı yüzde 200 zoom testi değildir. Gerçek API bağlanınca gecikme, iptal, kota ve teslim davranışları üretim adaptörüyle ayrıca sınanmalı.
