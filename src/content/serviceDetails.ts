import type { Area } from "../content";

export interface ServiceDetail {
  area: Area;
  path: string;
  label: string;
  eyebrow: string;
  action: string;
  title: string;
  highlight: string;
  intro: string;
  audience: string;
  outputs: { title: string; description: string }[];
  steps: { title: string; description: string }[];
  preparation: string[];
  faqs: { question: string; answer: string }[];
}

export const webService: ServiceDetail = {
  area: "web",
  path: "/hizmetler/web/",
  label: "Web deneyimleri",
  eyebrow: "WEB TASARIM VE GELİŞTİRME",
  action: "Web projemi konuşalım",
  title: "Markanın dünyası,",
  highlight: "iyi bir web deneyimiyle başlar.",
  intro:
    "İlk izlenimden iletişim formuna kadar, ziyaretçinin aradığını kolayca bulduğu web siteleri ve arayüzler tasarlayıp geliştiriyoruz.",
  audience:
    "Yeni markasını tanıtmak, mevcut sitesini yenilemek veya dijital ürün fikrini bir prototiple görünür hale getirmek isteyenler için.",
  outputs: [
    {
      title: "Markaya uygun arayüz",
      description:
        "İçerik hiyerarşisi, görsel yön ve mobil ekranlara uyarlanan bir tasarım.",
    },
    {
      title: "Çalışan web deneyimi",
      description:
        "Kararlaştırılan sayfalar ve etkileşimler; gerekiyorsa kapsamı ayrıca belirlenen form veya servis bağlantıları.",
    },
    {
      title: "Yayın ve teslim",
      description:
        "Başlık ve paylaşım bilgileri, temel kullanım kontrolleri ve kararlaştırılan hosting için yayın dosyaları.",
    },
  ],
  steps: [
    {
      title: "Birlikte netleştiririz",
      description:
        "Hedefi, kullanıcıları, içerikleri ve hangi işlerin kapsama gireceğini konuşuruz.",
    },
    {
      title: "Görünür hale getiririz",
      description:
        "Sayfa yapısı ve tasarım yönünü hazırlayıp geri bildirimlerle geliştiririz.",
    },
    {
      title: "Geliştirir, kontrol ederiz",
      description:
        "Arayüzü çalışan siteye dönüştürür, farklı ekranlarda temel akışları kontrol ederiz.",
    },
    {
      title: "Yayına hazırlarız",
      description:
        "Kararlaştırılan yayın ortamına uygun dosyaları ve kullanım notlarını teslim ederiz.",
    },
  ],
  preparation: [
    "Markan ve sitenin amacı",
    "İhtiyaç duyduğun sayfalar veya örnek bir içerik listesi",
    "Varsa logo, metinler ve kullanım izni olan görseller",
    "Mevcut domain/hosting bilgisi ve planladığın zaman aralığı",
  ],
  faqs: [
    {
      question: "Henüz içeriğim hazır değil. Başlayabilir miyiz?",
      answer:
        "İlk görüşmede içerik ihtiyaçlarını birlikte çıkarabiliriz. Metin ve görsel üretiminin kim tarafından yapılacağını kapsam belirlenirken netleştiririz.",
    },
    {
      question: "Mevcut sitemi yenileyebilir miyiz?",
      answer:
        "Mevcut yapıyı, korunacak içerikleri ve teknik bağlantıları inceleyerek yenilemenin kapsamını belirleyebiliriz.",
    },
    {
      question: "Fiyat ve süre nasıl belirlenir?",
      answer:
        "Sayfa sayısı, içerik hazırlığı, özel etkileşimler ve servis bağlantıları birlikte değerlendirilir. Kapsam netleşmeden kesin fiyat veya süre sözü vermiyoruz.",
    },
    {
      question: "E-ticaret veya yönetim paneli dahil mi?",
      answer:
        "Ürün arayüzü tasarımı ile ödeme, stok, üyelik ve yönetim altyapısı farklı kapsamlardır. İhtiyaç duyulan bağlantılar ve bakım sorumluluğu ayrıca belirlenir.",
    },
  ],
};

export const appService: ServiceDetail = {
  area: "app",
  path: "/hizmetler/uygulama/",
  label: "Uygulamalar",
  eyebrow: "UYGULAMA VE ÜRÜN DENEYİMİ",
  action: "Uygulama fikrimi konuşalım",
  title: "Günlük hayatın içinde,",
  highlight: "yerini bulan bir uygulama.",
  intro:
    "Bir fikri ekranlara taşırken önce kullanıcıyı ve ihtiyacını düşünürüz. Akışları, arayüzü ve geliştirilecek ilk kapsamı birlikte şekillendiririz.",
  audience:
    "Yeni bir dijital ürün fikrini denemek, mevcut uygulamasının kullanımını iyileştirmek veya geliştirmeye başlamadan önce deneyimini netleştirmek isteyenler için.",
  outputs: [
    {
      title: "Kullanıcı akışları",
      description:
        "Temel ihtiyaçların, ekranların ve kullanıcı adımlarının birlikte tanımlandığı bir ürün yapısı.",
    },
    {
      title: "Arayüz ve prototip",
      description:
        "Görsel yönü ve temel etkileşimleri deneyebileceğin, geri bildirime açık ekranlar ve prototip.",
    },
    {
      title: "İlk ürün kapsamı",
      description:
        "Geliştirilecek özellikler, gerekli bağlantılar ve hedef platform için birlikte belirlenen teslimler.",
    },
  ],
  steps: [
    {
      title: "İhtiyacı anlarız",
      description:
        "Uygulamanın kimin hangi sorununa cevap vereceğini ve öncelikli kullanım senaryosunu konuşuruz.",
    },
    {
      title: "Akışı kurarız",
      description:
        "Ekran yapısını ve temel etkileşimleri prototiple görünür hale getiririz.",
    },
    {
      title: "İlk kapsamı seçeriz",
      description:
        "Öncelikli özellikleri, hedef platformu ve teknik bağlantıları birlikte netleştiririz.",
    },
    {
      title: "Deneyip geliştiririz",
      description:
        "Kararlaştırılan kapsamı kontrol eder, geri bildirimlere göre iyileştirme adımlarını belirleriz.",
    },
  ],
  preparation: [
    "Uygulamanın çözmesini istediğin ihtiyaç",
    "Hedef kullanıcılar ve en önemli kullanım senaryosu",
    "Varsa mevcut ekranlar, prototip veya kullanım geri bildirimleri",
    "Hedef platform, gerekli servisler ve düşündüğün başlangıç kapsamı",
  ],
  faqs: [
    {
      question: "Yalnızca tasarım ve prototip hazırlayabilir miyiz?",
      answer:
        "Evet. Geliştirmeye geçmeden önce kullanıcı akışları, ekran tasarımı ve prototipi ayrı bir kapsam olarak ele alabiliriz.",
    },
    {
      question: "iOS ve Android birlikte mi geliştirilir?",
      answer:
        "Hedef platform ve teknik yaklaşım ihtiyaçlara göre belirlenir. İki platformun desteği, cihaz kontrolleri ve mağaza süreçleri kapsamda ayrıca netleştirilir.",
    },
    {
      question: "Üyelik, ödeme ve bildirimler dahil mi?",
      answer:
        "Bu özelliklerin sunucu, güvenlik, sağlayıcı ve bakım ihtiyaçları vardır. Tasarım ile çalışan servis bağlantılarını ayrı ayrı kapsamlandırırız.",
    },
    {
      question: "Mağazaya yayın ve sonraki bakım nasıl ilerler?",
      answer:
        "Hesap sahipliği, mağaza gereksinimleri, yayın ve bakım sorumlulukları başlangıçta konuşulur. Mağaza kabulü veya kullanıcı sayısı için garanti verilmez.",
    },
  ],
};

export const gameService: ServiceDetail = {
  area: "game",
  path: "/hizmetler/oyun/",
  label: "Oyun dünyaları",
  eyebrow: "OYUN PROTOTİPİ VE ARAYÜZ",
  action: "Oyun fikrimi konuşalım",
  title: "Bir fikirden,",
  highlight: "oynanabilen bir dünyaya.",
  intro:
    "Oyunun ilk hissini ararız: oyuncu ne yapacak, neyi keşfedecek, tekrar denemek için neye ihtiyaç duyacak? Prototipi ve arayüzü bu soruların etrafında birlikte kurarız.",
  audience:
    "Bir oyun mekaniğini denemek, fikrini oynanabilir bir prototipe dönüştürmek veya mevcut oyununun menü ve arayüz deneyimini geliştirmek isteyenler için.",
  outputs: [
    {
      title: "Temel oyun döngüsü",
      description:
        "Oyuncunun ana eylemini, hedefini ve ilk denemede sınanacak mekaniği tanımlayan kapsam.",
    },
    {
      title: "Oynanabilir prototip",
      description:
        "Kararlaştırılan platform ve teknik sınırlar içinde temel fikri denemeye yarayan ilk sürüm.",
    },
    {
      title: "Oyun arayüzü",
      description:
        "Menüler, temel oyun içi bilgiler ve oyuncunun akışı anlayabilmesi için gerekli ekranlar.",
    },
  ],
  steps: [
    {
      title: "Fikrin özünü buluruz",
      description:
        "Oyun türünü, oyuncunun ana eylemini ve denemek istediğin deneyimi konuşuruz.",
    },
    {
      title: "Prototipi sınırlarız",
      description:
        "İlk denemeye hangi mekaniklerin, ekranların ve içeriklerin gireceğini belirleriz.",
    },
    {
      title: "Oynanır hale getiririz",
      description:
        "Kararlaştırılan temel döngüyü, kontrolleri ve arayüzü birlikte geliştiririz.",
    },
    {
      title: "Dener, değerlendiririz",
      description:
        "Oynanıştan gelen geri bildirimi inceleyip bir sonraki geliştirme adımını netleştiririz.",
    },
  ],
  preparation: [
    "Oyuncunun yapmasını istediğin ana eylem",
    "Oyun türü, hedef platform ve örnek deneyimler",
    "Varsa mekanik notları, çizimler ve kullanım hakkı olan varlıklar",
    "İlk prototipte denemek istediğin tek bir temel hedef",
  ],
  faqs: [
    {
      question: "Tam bir oyun yerine küçük bir prototiple başlayabilir miyiz?",
      answer:
        "Evet. Önce temel mekaniği sınayan küçük bir prototip, sonraki kararları daha somut hale getirir. Tam oyun kapsamı bundan ayrı değerlendirilir.",
    },
    {
      question: "Çizimler, sesler ve karakterler kapsamda mı?",
      answer:
        "Özgün varlık üretimi, hazır varlık lisansları ve kullanım hakları ayrıca konuşulur. Geçici prototip varlıkları son ürün içeriği olarak varsayılmaz.",
    },
    {
      question: "Çok oyunculu sistem eklenebilir mi?",
      answer:
        "Çok oyunculu yapı sunucu, senkronizasyon, güvenlik ve işletim maliyetleri getirir. İlk prototipe kendiliğinden dahil değildir; teknik ihtiyaçlar ayrıca incelenir.",
    },
    {
      question: "Oyunu ne zaman yayımlayabiliriz?",
      answer:
        "Mekanikler, içerik miktarı, platform ve test ihtiyacı kapsamı belirler. Mağaza onayı, oyuncu sayısı veya gelir için garanti verilmez.",
    },
  ],
};

export const serviceDetails = [webService, appService, gameService];
export function serviceForPath(pathname: string): ServiceDetail | undefined {
  const path = pathname.replace(/index\.html$/, "").replace(/\/$/, "");
  return serviceDetails.find(
    (service) => service.path.replace(/\/$/, "") === path,
  );
}
