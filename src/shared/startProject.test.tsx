// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import type { MouseEvent as ReactMouseEvent } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { startProject } from "./startProject";

const scroll = vi.fn();
beforeEach(() => {
  window.history.replaceState(null, "", "/");
  scroll.mockReset();
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: scroll,
  });
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  Reflect.deleteProperty(HTMLElement.prototype, "scrollIntoView");
});
function Fixture({ selected = false, name = "", invalid = false }) {
  return (
    <>
      <a href="#iletisim" onClick={startProject}>
        Projeni anlat
      </a>
      <section id="iletisim">
        <form className="contact-form">
          <input
            type="checkbox"
            data-field="areas"
            aria-label="Web"
            defaultChecked={selected}
          />
          <input name="name" required defaultValue={name} aria-label="Ad" />
          <input name="email" required aria-label="E-posta" />
          <textarea name="detail" required aria-label="Proje" />
          <details>
            <summary>Ek bilgiler</summary>
            <input name="phone" aria-label="Telefon" aria-invalid={invalid} />
          </details>
        </form>
      </section>
    </>
  );
}
it("hizmet seçilmediyse seçimden başlar ve formu görünür alana taşır", async () => {
  render(<Fixture />);
  await userEvent.click(screen.getByRole("link"));
  expect(document.activeElement).toBe(screen.getByRole("checkbox"));
  expect(window.location.hash).toBe("#iletisim");
  expect(scroll).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
});
it("mevcut hizmet ve adı koruyup ilk eksik alana odaklanır", async () => {
  render(<Fixture selected name="Örnek Kişi" />);
  await userEvent.click(screen.getByRole("link"));
  expect(document.activeElement).toBe(
    screen.getByRole("textbox", { name: "E-posta" }),
  );
  expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(true);
  expect(
    (screen.getByRole("textbox", { name: "Ad" }) as HTMLInputElement).value,
  ).toBe("Örnek Kişi");
});
it("kapalı bölümdeki hatayı açar ve azaltılmış hareket tercihini kullanır", async () => {
  vi.stubGlobal("matchMedia", () => ({ matches: true }));
  const { container } = render(<Fixture selected invalid />);
  await userEvent.click(screen.getByRole("link"));
  expect(container.querySelector("details")?.open).toBe(true);
  expect(document.activeElement).toBe(
    screen.getByRole("textbox", { name: "Telefon" }),
  );
  expect(scroll).toHaveBeenCalledWith({ behavior: "instant", block: "start" });
});
it("yeni sekme ve alternatif tıklama davranışlarına karışmaz", () => {
  render(<Fixture />);
  const anchor = screen.getByRole("link") as HTMLAnchorElement;
  for (const override of [
    { ctrlKey: true },
    { metaKey: true },
    { shiftKey: true },
    { button: 1 },
  ]) {
    const preventDefault = vi.fn();
    startProject({
      button: 0,
      currentTarget: anchor,
      preventDefault,
      ...override,
    } as unknown as ReactMouseEvent<HTMLAnchorElement>);
    expect(preventDefault).not.toHaveBeenCalled();
  }
  expect(scroll).not.toHaveBeenCalled();
});
