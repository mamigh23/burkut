// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "./Contact";
import { ProjectSubmissionError } from "../services/projects";

const { submit } = vi.hoisted(() => ({ submit: vi.fn() }));
vi.mock("../services/projects", async (original) => ({
  ...(await original<typeof import("../services/projects")>()),
  projectSubmissionEnabled: true,
  submitProject: submit,
}));
beforeEach(() => {
  submit.mockReset();
  submit.mockResolvedValue({
    mode: "delivered",
    message: "Proje özetin iletildi.",
  });
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) =>
    setTimeout(() => callback(0), 0),
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
async function fillRequired(user: ReturnType<typeof userEvent.setup>) {
  for (const [label, value] of [
    [/ad soyad/i, "Örnek Kişi"],
    [/^e-posta/i, "ornek@example.com"],
    [/fikrinden bahset/i, "Bir web sitesi hazırlamak istiyoruz."],
  ] as const) {
    await user.click(screen.getByRole("textbox", { name: label }));
    await user.paste(value);
  }
}

it("isteğe bağlı alanları açmadan yalnızca gerekli bilgilerle gönderebilir", async () => {
  const user = userEvent.setup();
  const { container } = render(<Contact draft={null} initialArea="web" />);
  expect(container.querySelector("details")?.open).toBe(false);
  await fillRequired(user);
  await user.click(
    screen.getByRole("button", { name: "Proje Özetini Gönder" }),
  );
  expect(submit).toHaveBeenCalledWith(
    expect.objectContaining({
      areas: ["web"],
      phone: "",
      company: "",
      budget: "",
    }),
    expect.any(String),
  );
  expect(await screen.findByText("Proje özetin iletildi.")).toBeTruthy();
});
it("ek bilgiler kapatılınca korunur, sunucu alan hatasında tekrar görünür olur", async () => {
  const user = userEvent.setup();
  const { container } = render(<Contact draft={null} initialArea="web" />);
  await fillRequired(user);
  await user.click(screen.getByText("Ek bilgi ekle"));
  const phone = screen.getByRole("textbox", { name: "Telefon" });
  await user.click(phone);
  await user.paste("0505 000 00 00");
  await user.click(screen.getByText("Ek bilgi ekle"));
  expect(container.querySelector("details")?.open).toBe(false);
  submit.mockRejectedValue(
    new ProjectSubmissionError("Telefonu kontrol et.", {
      phone: "Telefonu kontrol et.",
    }),
  );
  await user.click(
    screen.getByRole("button", { name: "Proje Özetini Gönder" }),
  );
  await waitFor(() => expect(document.activeElement).toBe(phone));
  expect(container.querySelector("details")?.open).toBe(true);
  expect((phone as HTMLInputElement).value).toBe("0505 000 00 00");
});
it("Yangan bütçesi geldiyse ek bilgiyi gösterir", () => {
  const { container } = render(
    <Contact
      draft={{
        area: "app",
        detail: "Bir uygulama fikri.",
        budget: "Kapsama göre",
      }}
    />,
  );
  expect(container.querySelector("details")?.open).toBe(true);
  expect(
    (screen.getByRole("textbox", { name: /bütçe/i }) as HTMLInputElement).value,
  ).toBe("Kapsama göre");
});
