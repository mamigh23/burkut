export const navigation = [
  ["Hizmetler", "hizmetler"],
  ["Ürünler", "urunler"],
  ["Yaklaşım", "yaklasim"],
  ["SSS", "sss"],
] as const;

export const services = [
  {
    id: "web",
    number: "01",
    title: "Web deneyimleri.",
    subtitle: "İlk izlenimden, son tıklamaya.",
    description:
      "Markanızı anlatan kurumsal siteler, tanıtım sayfaları ve ihtiyacınıza göre web uygulamaları.",
    tags: ["Kurumsal site", "Web uygulaması", "E-ticaret arayüzü"],
  },
  {
    id: "app",
    number: "02",
    title: "Uygulamalar.",
    subtitle: "Günlük hayatın bir parçası.",
    description:
      "Fikrinizi anlaşılır akışlar ve özenli arayüzlerle kullanıcıların eline taşıyan uygulama deneyimleri.",
    tags: ["Mobil deneyim", "Ürün arayüzü", "Prototip"],
  },
  {
    id: "game",
    number: "03",
    title: "Oyun dünyaları.",
    subtitle: "Bir fikir. Yeni bir dünya.",
    description:
      "Oyun fikirlerini keşfediyor; prototip, oynanış ve arayüzü birlikte düşünerek deneyime dönüştürüyoruz.",
    tags: ["Oyun prototipi", "Oynanış", "Oyun arayüzü"],
  },
] as const;

export type Area = "web" | "app" | "game" | "other";
export const areaLabels: Record<Area, string> = {
  web: "Web sitesi",
  app: "Uygulama",
  game: "Oyun",
  other: "Diğer",
};

export const concepts = {
  web: {
    name: "Kök / Studio",
    label: "DİJİTAL BİR VİTRİN",
    title: "Bir markanın dünyası,\nbir ekranın içinde.",
    description:
      "Bağımsız bir tasarım stüdyosu için hazırladığımız özgün web konsepti. Hikâye, koleksiyon ve güçlü bir ilk izlenim.",
    benefits: [
      "Ekrana uyum sağlayan düzen",
      "Açık içerik hiyerarşisi",
      "Özenli mikro etkileşimler",
      "Performans odaklı yapı",
    ],
  },
  app: {
    name: "Rota / Planner",
    label: "GÜNLÜK HAYATA DOKUNAN",
    title: "Daha az karmaşa.\nDaha çok odak.",
    description:
      "Günün planını sadeleştiren bir uygulama konsepti. Öncelikler, küçük adımlar ve tek bakışta anlaşılır bir akış.",
    benefits: [
      "Anlaşılır kullanıcı akışları",
      "Tutarlı tasarım sistemi",
      "Dokunmaya uygun kontroller",
      "İhtiyaca göre geliştirme",
    ],
  },
  game: {
    name: "Eşik / Expedition",
    label: "KEŞFEDİLMEYİ BEKLEYEN",
    title: "Ekranın ötesinde,\nyeni bir dünya.",
    description:
      "Bilinmeyen bir coğrafyada geçen keşif oyunu için menü ve oynanış arayüzü konsepti. Atmosfer ve etkileşim bir arada.",
    benefits: [
      "Özgün görsel yön",
      "Oynanışa uygun arayüz",
      "Prototiple başlayan süreç",
      "Projeye uygun teknik seçim",
    ],
  },
};

export const steps = [
  {
    title: "Keşif & planlama",
    description:
      "Önce fikrinizi dinleriz. Hedefi, kullanıcıları ve kapsamı birlikte netleştirir; çalışmanın yol haritasını çıkarırız.",
    tags: "HEDEF · KAPSAM · YOL HARİTASI",
  },
  {
    title: "Tasarım & geliştirme",
    description:
      "Fikri görünür hale getiririz. Arayüzü ve kullanıcı akışını tasarlar, geri bildirimlerle geliştirir ve çalışan ürüne dönüştürürüz.",
    tags: "ARAYÜZ · PROTOTİP · KOD",
  },
  {
    title: "Yayın & iyileştirme",
    description:
      "Ürünü gerçek kullanım için hazırlarız. Yayın ve sonrasındaki iyileştirmeleri projenin gereksinimlerine göre birlikte planlarız.",
    tags: "KONTROL · YAYIN · GELİŞİM",
  },
];

export const faqs = [
  [
    "Hangi tür projeler geliştiriyorsunuz?",
    "Web siteleri, uygulamalar ve oyun geliştirme üzerine çalışıyoruz. Fikrinizin hedefini ve kapsamını birlikte değerlendirerek uygun yaklaşımı belirliyoruz.",
  ],
  [
    "Proje süreci nasıl başlıyor?",
    "Kısa bir proje özetiyle başlayabiliriz. Ne yapmak istediğinizi, projenin hangi aşamada olduğunu ve önceliklerinizi netleştirerek bir yol haritası oluştururuz.",
  ],
  [
    "Web sitesi farklı ekranlarda çalışacak mı?",
    "Web deneyimlerini mobil, tablet ve masaüstünü birlikte düşünerek tasarlıyoruz. Farklı ekranlarda yerleşim ve kullanılabilirlik kontrolleri yapıyoruz.",
  ],
  [
    "Uygulama ve oyun projelerinde nasıl ilerliyorsunuz?",
    "Önce kullanıcı akışını veya temel oynanışı belirleriz. Taslak ve prototiplerle fikri değerlendirir, platform ve araçları projenin ihtiyacına göre seçeriz.",
  ],
  [
    "Fiyat ve süre nasıl belirleniyor?",
    "Kapsam, gereksinimler ve öncelikler netleşince proje özelinde değerlendirilir. Bu sitede kesin fiyat veya teslim süresi taahhüdü verilmez.",
  ],
  [
    "Mevcut projemi geliştirebilir misiniz?",
    "Mevcut ürünü, teknik yapısını ve hedeflediğiniz değişiklikleri inceleyerek geliştirme imkanlarını değerlendirebiliriz.",
  ],
  [
    "Yangan bana nasıl yardımcı olur?",
    "Yangan fikrinizi birkaç adımda bir proje özetine dönüştürmenize yardımcı olur. Bu ilk sürümde demo modundadır; hazır yanıtlar verir ve bilgilerinizi sunucuya göndermez.",
  ],
] as const;
