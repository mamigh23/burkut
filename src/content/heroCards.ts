export type HeroCardId = "code" | "web" | "phone" | "game" | "wire";
export interface HeroCardConfig {
  id: HeroCardId;
  label: string;
  image: null | { src: string; fit: "cover" | "contain"; position?: string };
}

// Replace image: null with { src: "/images/hero/example.webp", fit: "cover" }
// to use your own image. A missing image falls back to the original scene.
export const heroCards: HeroCardConfig[] = [
  { id: "code", label: "Kod ve geliştirme", image: null },
  { id: "web", label: "Web tasarımı", image: null },
  { id: "phone", label: "Mobil uygulama", image: null },
  { id: "game", label: "Oyun dünyası", image: null },
  { id: "wire", label: "Tasarım ve kod", image: null },
];
