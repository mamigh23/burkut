import { describe, expect, it } from "vitest";
import { flowReducer, initialFlow } from "./flow";
import { validateProject } from "../services/demo";

describe("Yangan proje akışı", () => {
  it("önceki cevap değişirse bağımlı cevapları temizler", () => {
    let state = initialFlow;
    for (const value of [
      "Web sitesi",
      "Fikir aşamasında",
      "Yakında",
      "Henüz belli değil",
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
    state = flowReducer(state, { type: "answer", value: "Fikir aşamasında" });
    state = flowReducer(state, { type: "edit", step: 0 });
    state = flowReducer(state, { type: "answer", value: "Web sitesi" });
    expect(state.answers.stage).toBe("Fikir aşamasında");
  });
  it("sıfırlama bütün cevapları temizler; geri başlangıcı aşmaz", () => {
    expect(flowReducer(initialFlow, { type: "back" })).toEqual(initialFlow);
    const state = flowReducer(initialFlow, { type: "answer", value: "Oyun" });
    expect(flowReducer(state, { type: "reset" })).toEqual(initialFlow);
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
