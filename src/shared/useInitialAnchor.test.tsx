// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { useInitialAnchor } from "./useInitialAnchor";

const scroll = vi.fn();
beforeEach(() => {
  scroll.mockReset();
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: scroll,
  });
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    callback(0);
    return 1;
  });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  Reflect.deleteProperty(HTMLElement.prototype, "scrollIntoView");
  window.history.replaceState(null, "", "/");
});
function Fixture() {
  useInitialAnchor();
  return (
    <>
      <section id="iletisim">
        <form className="contact-form">
          <input aria-label="Ad" />
        </form>
      </section>
      <section id="sss" />
    </>
  );
}
it("doğrudan iletişim adresinde kopya metni yerine formu gösterir ve klavye açmaz", () => {
  window.history.replaceState(null, "", "/hizmetler/web/#iletisim");
  const { container } = render(<Fixture />);
  expect(scroll.mock.instances[0]).toBe(container.querySelector("form"));
  expect(scroll).toHaveBeenCalledWith({ behavior: "instant", block: "start" });
  expect(document.activeElement?.tagName).not.toBe("INPUT");
});
it("diğer bölüm bağlantılarının hedefini korur", () => {
  window.history.replaceState(null, "", "/#sss");
  const { container } = render(<Fixture />);
  expect(scroll.mock.instances[0]).toBe(container.querySelector("#sss"));
});
it("bozuk kodlanmış hash uygulamayı düşürmez", () => {
  window.history.replaceState(null, "", "/#%E0%A4%A");
  expect(() => render(<Fixture />)).not.toThrow();
  expect(scroll).not.toHaveBeenCalled();
});
