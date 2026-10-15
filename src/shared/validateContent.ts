import type { ServiceDetail } from "../content/serviceDetails.ts";
import type { ServiceExampleContent } from "../content/serviceExamples.ts";
import type { HeroCardConfig } from "../content/heroCards.ts";

// Pure checks shared by release preflight and tests; no browser or network needed.
export function validateContent(
  services: ServiceDetail[],
  examples: Record<string, ServiceExampleContent>,
  cards: HeroCardConfig[],
): string[] {
  const failures: string[] = [];
  const text = (value: string, label: string) => {
    if (!value?.trim()) failures.push(`${label}: boş bırakılamaz`);
  };
  const unique = (values: string[], label: string) => {
    if (new Set(values).size !== values.length)
      failures.push(`${label}: tekrar eden kayıt`);
  };
  unique(
    services.map((service) => service.path),
    "Hizmet adresleri",
  );
  unique(
    services.map((service) => service.area),
    "Hizmet alanları",
  );
  unique(
    cards.map((card) => card.id),
    "Hero kart kimlikleri",
  );
  for (const service of services) {
    const label = `Hizmet ${service.area}`;
    if (!/^\/hizmetler\/[a-z0-9-]+\/$/.test(service.path))
      failures.push(`${label}: geçersiz sayfa adresi`);
    for (const field of [
      "label",
      "eyebrow",
      "action",
      "title",
      "highlight",
      "intro",
      "audience",
    ] as const)
      text(service[field], `${label} / ${field}`);
    for (const field of ["outputs", "steps", "preparation", "faqs"] as const) {
      const entries = service[field];
      if (!entries.length)
        failures.push(`${label} / ${field}: en az bir kayıt gerekli`);
      entries.forEach((entry, index) => {
        const values =
          typeof entry === "string" ? [entry] : Object.values(entry);
        values.forEach((value) =>
          text(value, `${label} / ${field} / ${index + 1}`),
        );
      });
    }
    if (!examples[service.area])
      failures.push(`${label}: görsel galerisi eksik`);
  }
  for (const [area, example] of Object.entries(examples)) {
    text(example.title, `Galeri ${area} / başlık`);
    if (!example.images.length)
      failures.push(`Galeri ${area}: en az bir görsel gerekli`);
    example.images.forEach((image, index) => {
      text(image.src, `Galeri ${area} / ${index + 1} / dosya`);
      text(image.alt, `Galeri ${area} / ${index + 1} / açıklama`);
    });
  }
  cards.forEach((card) => {
    text(card.label, `Hero ${card.id} / etiket`);
    if (card.image) text(card.image.src, `Hero ${card.id} / dosya`);
  });
  return failures;
}
