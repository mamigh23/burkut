// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Yangan from "./Yangan";
import * as chat from "../services/chat";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it("hizmet bağlamında dört soruyla öneri oluşturur, düzenler ve özeti forma aktarır", async () => {
  const user = userEvent.setup();
  const onDraft = vi.fn();
  render(
    <Yangan open setOpen={vi.fn()} onDraft={onDraft} initialArea="game" />,
  );
  await user.click(screen.getByRole("button", { name: "Fikrimi netleştir" }));
  expect(screen.getByText("ADIM 1 / 4")).toBeTruthy();
  expect(screen.queryByText("Hangi alanda bir fikrin var?")).toBeNull();
  await user.click(
    screen.getByRole("button", { name: "Oynanabilir prototip" }),
  );
  await user.click(screen.getByRole("button", { name: "Fikir aşamasında" }));
  await user.click(screen.getByRole("button", { name: "Yakında" }));
  await user.click(screen.getByRole("textbox", { name: "Proje detayını yaz" }));
  await user.paste("Bilgisayarda tek oyunculu bir keşif oyunu.");
  await user.click(screen.getByRole("button", { name: "Mesajı gönder" }));
  const heading = screen.getByRole("heading", { name: "İyi bir başlangıç." });
  expect(document.activeElement).toBe(heading);
  expect(
    screen.getByRole("heading", { name: /Bir mekaniği sınayan/ }),
  ).toBeTruthy();
  await user.click(
    screen.getByRole("button", { name: "Zaman seçimini düzelt" }),
  );
  await user.click(screen.getByRole("button", { name: "Birkaç ay içinde" }));
  expect(
    screen.getByRole("heading", { name: "İyi bir başlangıç." }),
  ).toBeTruthy();
  await user.click(
    screen.getByRole("button", { name: "Detay seçimini düzelt" }),
  );
  const detail = screen.getByRole("textbox", {
    name: "Proje detayını yaz",
  }) as HTMLInputElement;
  expect(detail.value).toContain("keşif oyunu");
  await user.clear(detail);
  await user.paste("Bir bulmaca mekaniği denemek istiyorum.");
  await user.click(screen.getByRole("button", { name: "Mesajı gönder" }));
  await user.click(screen.getByRole("button", { name: "Forma aktar" }));
  expect(onDraft).toHaveBeenCalledWith({
    area: "game",
    budget: "",
    detail: expect.stringContaining("Bir bulmaca mekaniği"),
  });
  expect(onDraft.mock.calls[0][0].detail).toContain("Zaman: Birkaç ay içinde");
  expect(onDraft.mock.calls[0][0].detail).toContain("Başlangıç önerisi:");
});

it("başka hizmet seçildiğinde eski amaca devam etmez; yeni konuşma sayfanın bağlamına döner", async () => {
  const user = userEvent.setup();
  render(<Yangan open setOpen={vi.fn()} onDraft={vi.fn()} initialArea="web" />);
  await user.click(screen.getByRole("button", { name: "Fikrimi netleştir" }));
  await user.click(screen.getByRole("button", { name: "Geri" }));
  await user.click(screen.getByRole("button", { name: "Uygulama" }));
  expect(
    screen.getByText("Nasıl bir uygulama düşünüyorsun?", {
      selector: ".chat-message",
    }),
  ).toBeTruthy();
  expect(screen.queryByRole("button", { name: "Ürün satmak" })).toBeNull();
  await user.click(screen.getByRole("button", { name: "Yeni konuşma" }));
  await user.click(screen.getByRole("button", { name: "Fikrimi netleştir" }));
  expect(
    screen.getByText("Web sitenin öncelikli amacı ne olsun?"),
  ).toBeTruthy();
});

it("yanıt beklerken karakter tepki verir; yeni konuşma eski yanıtı geri getirmez", async () => {
  let resolveReply!: (reply: string) => void;
  const pending = new Promise<string>((resolve) => {
    resolveReply = resolve;
  });
  const request = vi.spyOn(chat, "replyToChat").mockReturnValue(pending);
  const user = userEvent.setup();
  const { container } = render(
    <Yangan open setOpen={vi.fn()} onDraft={vi.fn()} />,
  );
  await user.click(screen.getByRole("button", { name: "Önce bir sorum var" }));
  await user.click(screen.getByRole("textbox", { name: "Sorunu yaz" }));
  await user.paste("Nasıl başlayabilirim?");
  await user.click(screen.getByRole("button", { name: "Mesajı gönder" }));
  expect(container.querySelector(".chat-header .yangan-thinking")).toBeTruthy();
  expect(
    (screen.getByRole("button", { name: "Mesajı gönder" }) as HTMLButtonElement)
      .disabled,
  ).toBe(true);
  await user.click(screen.getByRole("button", { name: "Yeni konuşma" }));
  expect(request.mock.calls[0][1]?.aborted).toBe(true);
  await act(async () => {
    resolveReply("Eski konuşmanın yanıtı");
  });
  expect(container.querySelector(".yangan-thinking")).toBeNull();
  expect(screen.queryByText("Eski konuşmanın yanıtı")).toBeNull();
});
