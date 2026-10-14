// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

let desktop: EventTarget;
beforeEach(() => {
  desktop = Object.assign(new EventTarget(), { matches: false });
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => desktop),
  );
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    callback(0);
    return 1;
  });
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
async function openMenu() {
  const user = userEvent.setup();
  render(
    <>
      <Header />
      <section id="hizmetler">Hizmetler bölümü</section>
      <button>Sayfadaki başka alan</button>
    </>,
  );
  await user.click(screen.getByRole("button", { name: "Menüyü aç" }));
  return {
    user,
    menu: screen.getByRole("navigation", { name: "Mobil navigasyon" }),
  };
}
describe("mobil navigasyon etkileşimleri", () => {
  it("Escape ile kapanır ve odağı menü düğmesine döndürür", async () => {
    const { user, menu } = await openMenu();
    within(menu).getByRole("link", { name: "Hizmetler" }).focus();
    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("navigation", { name: "Mobil navigasyon" }),
    ).toBeNull();
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Menüyü aç" }),
    );
  });
  it("dışarı tıklayınca kapanır ve kullanıcının yeni odağını korur", async () => {
    const { user } = await openMenu();
    const outside = screen.getByRole("button", {
      name: "Sayfadaki başka alan",
    });
    await user.click(outside);
    expect(
      screen.queryByRole("navigation", { name: "Mobil navigasyon" }),
    ).toBeNull();
    expect(document.activeElement).toBe(outside);
  });
  it("son bağlantıdan Tab ile çıkınca kapanır", async () => {
    const { user, menu } = await openMenu();
    within(menu).getByRole("link", { name: "İletişim" }).focus();
    await user.tab();
    expect(
      screen.queryByRole("navigation", { name: "Mobil navigasyon" }),
    ).toBeNull();
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Sayfadaki başka alan" }),
    );
  });
  it("bölüm bağlantısına basınca hedef bölüme odak taşır", async () => {
    const { user, menu } = await openMenu();
    await user.click(within(menu).getByRole("link", { name: "Hizmetler" }));
    expect(
      screen.queryByRole("navigation", { name: "Mobil navigasyon" }),
    ).toBeNull();
    expect(document.activeElement?.id).toBe("hizmetler");
  });
  it("masaüstüne geçince odağı karşılık gelen görünür bağlantıya taşır", async () => {
    const { menu } = await openMenu();
    within(menu).getByRole("link", { name: "Hizmetler" }).focus();
    act(() =>
      desktop.dispatchEvent(
        Object.assign(new Event("change"), { matches: true }),
      ),
    );
    expect(
      screen.queryByRole("navigation", { name: "Mobil navigasyon" }),
    ).toBeNull();
    expect(document.activeElement).toBe(
      within(
        screen.getByRole("navigation", { name: "Ana navigasyon" }),
      ).getByRole("link", { name: "Hizmetler" }),
    );
  });
  it("masaüstüne geçerken gizlenen menü düğmesinden marka bağlantısına geçer", async () => {
    await openMenu();
    act(() =>
      desktop.dispatchEvent(
        Object.assign(new Event("change"), { matches: true }),
      ),
    );
    expect(document.activeElement).toBe(
      screen.getByRole("link", { name: "Bürküt ana sayfa" }),
    );
  });
});
