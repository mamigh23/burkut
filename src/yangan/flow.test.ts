import { describe, expect, it } from "vitest";
import {
  flowReducer,
  initialFlow,
  createInitialFlow,
  questionsFor,
  startingPoint,
  summaryDetail,
} from "./flow";
import { validateProject } from "../services/demo";

describe("Yangan proje akışı", () => {
  it("önceki cevap değişirse bağımlı cevapları temizler", () => {
    let state = initialFlow;
    for (const value of [
      "Web sitesi",
      "Talep toplamak",
      "Fikir aşamasında",
      "Yakında",
      "Bir site",
    ])
      state = flowReducer(state, { type: "answer", value });
    expect(state.step).toBe(5);
    state = flowReducer(state, { type: "edit", step: 0 });
    state = flowReducer(state, { type: "answer", value: "Oyun" });
    expect(state.answers).toEqual({ area: "Oyun" });
    expect(state.step).toBe(1);
  });
  it("aynı cevaba dönüldüğünde mevcut seçimleri korur", () => {
    let state = flowReducer(initialFlow, {
      type: "answer",
      value: "Web sitesi",
    });
    state = flowReducer(state, { type: "answer", value: "Talep toplamak" });
    state = flowReducer(state, { type: "edit", step: 0 });
    state = flowReducer(state, { type: "answer", value: "Web sitesi" });
    expect(state.answers.goal).toBe("Talep toplamak");
  });
  it("sıfırlama bütün cevapları temizler; geri başlangıcı aşmaz", () => {
    expect(flowReducer(initialFlow, { type: "back" })).toEqual(initialFlow);
    const state = flowReducer(initialFlow, { type: "answer", value: "Oyun" });
    expect(flowReducer(state, { type: "reset" })).toEqual(initialFlow);
  });
  it("hizmet bağlamı alanı seçer; amaç ve detay soruları hizmete göre değişir", () => {
    for (const area of ["web", "app", "game"] as const) {
      const state = createInitialFlow(area);
      expect(state.step).toBe(1);
      expect(questionsFor(state.answers)).toHaveLength(5);
      expect(questionsFor(state.answers)[1].options).not.toContain(
        "Henüz belli değil",
      );
    }
    expect(questionsFor({ area: "Oyun" })[1].options).toContain(
      "Oynanabilir prototip",
    );
    expect(questionsFor({ area: "Uygulama" })[1].options).toContain(
      "Mobil uygulama",
    );
    expect(questionsFor({ area: "Web sitesi" })[4].title).toContain(
      "Ziyaretçin",
    );
  });
  it("özette zaman düzeltildiğinde diğer cevapları koruyup özete döner", () => {
    let state = createInitialFlow("game");
    for (const value of [
      "Oynanabilir prototip",
      "Fikir aşamasında",
      "Yakında",
      "Tek oyunculu keşif",
    ])
      state = flowReducer(state, { type: "answer", value });
    state = flowReducer(state, { type: "edit", step: 3 });
    state = flowReducer(state, { type: "answer", value: "Birkaç ay içinde" });
    expect(state.step).toBe(5);
    expect(state.answers.detail).toBe("Tek oyunculu keşif");
    expect(state.answers.time).toBe("Birkaç ay içinde");
  });
  it("öneri amaca ve mevcut ürün durumuna uyar; forma aktarılacak özet sınırı aşmaz", () => {
    expect(
      startingPoint({ area: "Web sitesi", goal: "Ürün satmak" }).title,
    ).toContain("Satış");
    expect(
      startingPoint({ area: "Oyun", goal: "Menü ve oyun arayüzü" }).title,
    ).toContain("arayüz");
    expect(
      startingPoint({ area: "Uygulama", stage: "Mevcut ürünü geliştirme" })
        .title,
    ).toContain("Mevcut");
    let state = createInitialFlow("app");
    for (const value of [
      "Mobil uygulama",
      "Fikir aşamasında",
      "Yakında",
      "a".repeat(5000),
    ])
      state = flowReducer(state, { type: "answer", value });
    expect(state.answers.detail).toHaveLength(2000);
    const summary = summaryDetail(state.answers);
    expect(summary.length).toBeLessThanOrEqual(4000);
    expect(summary).toContain("Amaç: Mobil uygulama");
    expect(summary).toContain("Başlangıç önerisi:");
  });
});

describe("proje formu doğrulaması", () => {
  const data = {
    areas: [],
    name: "",
    email: "",
    detail: "",
    phone: "",
    company: "",
    budget: "",
  };
  it("boş ve yalnızca boşluk içeren zorunlu alanları reddeder", () => {
    expect(
      Object.keys(validateProject({ ...data, name: "  ", detail: "  " })),
    ).toEqual(["areas", "name", "email", "detail"]);
  });
  it("opsiyonel alanlar boşken geçerli bir projeyi kabul eder", () => {
    expect(
      validateProject({
        ...data,
        areas: ["web"],
        name: "Deneme Kullanıcısı",
        email: "deneme@example.com",
        detail: "Kurumsal site",
      }),
    ).toEqual({});
  });
  it("hatalı e-posta biçimini reddeder", () => {
    expect(validateProject({ ...data, email: "deneme@" }).email).toBeDefined();
  });
});
