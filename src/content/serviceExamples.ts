import type { Area } from "../content.ts";

export interface ServiceExampleContent {
  title: string;
  images: { src: string; alt: string }[];
}

export const serviceExamples: Record<
  Exclude<Area, "other">,
  ServiceExampleContent
> = {
  web: {
    title: "Kök / Web deneyimi",
    images: [
      {
        src: "/images/services/web-overview.svg",
        alt: "Kök koleksiyon sayfası: üç ürün ve sade gezinme",
      },
      {
        src: "/images/services/web-detail.svg",
        alt: "Kök ürün detayı: ürün görseli ve tek keşfet çağrısı",
      },
    ],
  },
  app: {
    title: "Rota / Uygulama deneyimi",
    images: [
      {
        src: "/images/services/app-overview.svg",
        alt: "Rota uygulaması: günlük plan ve öncelikler ekranları",
      },
      {
        src: "/images/services/app-detail.svg",
        alt: "Rota uygulaması: ilerleme ve günlük hedef ekranları",
      },
    ],
  },
  game: {
    title: "Eşik / Oyun deneyimi",
    images: [
      {
        src: "/images/services/game-overview.svg",
        alt: "Eşik oyun başlangıcı: dağ manzarası ve yolculuğa başla çağrısı",
      },
      {
        src: "/images/services/game-detail.svg",
        alt: "Eşik oyun menüsü: devam et ve kontrol seçenekleri",
      },
    ],
  },
};
