import type { Area } from "../content";

export interface ServiceDetail {
  area: Area;
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
