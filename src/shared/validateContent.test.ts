import { expect, it } from "vitest";
import { serviceDetails } from "../content/serviceDetails";
import { serviceExamples } from "../content/serviceExamples";
import { heroCards } from "../content/heroCards";
import { validateContent } from "./validateContent";

function fixture() {
  return structuredClone({
    services: serviceDetails,
    examples: serviceExamples,
    cards: heroCards,
  });
}

it("mevcut içerik ve tek/üç görselli galeriler yayın kontrolünden geçer", () => {
  const { services, examples, cards } = fixture();
  examples.web.images.push({ src: "/third.webp", alt: "Üçüncü ekran" });
  examples.app.images.pop();
  expect(validateContent(services, examples, cards)).toEqual([]);
});

it("boş galeri, başlık ve görsel açıklamasını yayın öncesinde bildirir", () => {
  const { services, examples, cards } = fixture();
  examples.web.images = [];
  examples.app.title = "  ";
  examples.game.images[0].alt = " ";
  const failures = validateContent(services, examples, cards);
  expect(failures).toHaveLength(3);
  expect(failures.join(" ")).toContain("en az bir görsel");
  expect(failures.join(" ")).toContain("açıklama");
});

it("yinelenen adres, geçersiz yol ve eksik hizmet içeriğini yakalar", () => {
  const { services, examples, cards } = fixture();
  services[1].path = services[0].path;
  services[2].path = "https://example.com/";
  services[0].action = " ";
  services[0].outputs = [];
  services[1].faqs[0].answer = "";
  expect(validateContent(services, examples, cards)).toHaveLength(5);
});

it("eksik galeri eşleşmesini ve yinelenen hero kimliğini yakalar", () => {
  const { services, examples, cards } = fixture();
  services[0].area = "other";
  cards[1].id = cards[0].id;
  const failures = validateContent(services, examples, cards);
  expect(failures).toHaveLength(2);
  expect(failures.join(" ")).toContain("galerisi eksik");
});
