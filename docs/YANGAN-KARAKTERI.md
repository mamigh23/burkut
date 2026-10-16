# Yangan — onaylanan mavi karakter

16 Ekim 2026. Kullanıcının onayladığı mavi/beyaz 3D konseptin önden görünümü siteye eklendi. Bu varlık bir 3D render görselidir; döndürülebilir model veya WebGL sahnesi değildir.

- Yayındaki varlık: `public/images/brand/yangan-avatar.png`, 256×256, şeffaf RGBA, 95.206 bayt.
- Yerel yüksek çözünürlüklü kaynak: `artifacts/yangan-avatar-master.png`. Yayına/Git'e eklenmez.
- Üretim: yerleşik Imagegen aracıyla onaylanan konseptten şeffaf tek karakter çıkarıldı; Windows görüntü kitaplığıyla 256×256 PNG olarak küçültüldü. Alfa korundu (köşe alfa değeri 0).
- Ortak bileşen: `YanganMark`; sohbet düğmesinde 56 px, başlıkta 44 px, tanıtımda 72 px, dar ekrandaki tanıtımda 52 px. Düğme 64 px; masaüstü sohbet penceresinin alt boşluğu 102 px.
- Bağımsız görsel kutusu, çevrimiçi durum noktası veya sürekli hareket eklenmedi. Mavi karakter mevcut koyu yeşil zemin üstünde kullanılır.
- [Masaüstü](./qa/evidence/yangan-blue-desktop-2026-10-16.png), [mobil](./qa/evidence/yangan-blue-mobile-2026-10-16.png) ekran görüntüleri.

Gerçek yerel tarayıcıda masaüstü, 390 px ve 320 px görünüm kontrol edildi. Mobilde yatay sayfa/başlık taşması yok. Görsel 256 px doğal genişlikle yükleniyor. Proje akışında hizmet seçimi, yeni konuşma ve Escape ile kapanıp odağın açıcıya dönmesi denendi. Gerçek fiziksel cihaz/ekran okuyucu kabulü bu kontrolün kapsamında değildir.

## Kullanılan son görsel istemi

Yerleşik `image_gen` düzenleme modu; girdi: kullanıcının onayladığı iki açılı mavi Bürküt/Yangan konsepti. Şeffaf arka plan seçildi.

```text
Use case: background-extraction / precise-object-edit. Create a production website avatar asset from the APPROVED reference image. Extract ONLY the RIGHT-HAND FRONT-FACING blue-and-silver Yangan eagle companion head. ONE head, perfectly front-facing, symmetric, centered on a square canvas. Preserve its exact approved identity: cobalt and cyan blue three-layer swept-out feather wing crests, pearly silver-white central angular V faceplate, dark navy inset eye sockets, softly glowing cyan eyes, sharp silver beak and tapered chin. Preserve the polished believable 3D render, beveled metal/ceramic, highlights and natural dark interior. Do not redesign or simplify the head, don't make it green, don't use the left three-quarter view. The complete blue feather crests and pointed chin MUST fit inside the image with approximately 5 percent clear margin on all sides. Tight balanced icon composition, object occupies around 90% of canvas width and height, eyes readable at small icon sizes. TRUE transparent background including transparent gaps between feather tips. NO white background, NO floor, NO shadow floating below the object, NO text, NO border, NO checkerboard painted into the image, NO second head. Only the single isolated approved front-view character, with alpha transparency, ready for use on a deep green website.
```
