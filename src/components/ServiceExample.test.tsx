// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ServiceExample from "./ServiceExample";

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(HTMLDialogElement.prototype, "showModal");
  Reflect.deleteProperty(HTMLDialogElement.prototype, "close");
  vi.restoreAllMocks();
  document.body.style.overflow = "";
});
it("galeri açılır, klavyeyle diğer görsele geçer ve kapanınca odağı geri verir", async () => {
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    },
  });
  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.removeAttribute("open");
    },
  });
  const user = userEvent.setup();
  render(<ServiceExample area="web" />);
  const trigger = screen.getByRole("button", { name: /görsellerini büyüt/ });
  await user.click(trigger);
  const dialog = screen.getByRole("dialog");
  expect(document.body.style.overflow).toBe("hidden");
  fireEvent.keyDown(dialog, { key: "ArrowRight" });
  expect(
    screen.getByRole("img", { name: /ürün detayı/i }).getAttribute("src"),
  ).toContain("web-detail.svg");
  fireEvent(dialog, new Event("cancel", { cancelable: true }));
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(document.body.style.overflow).toBe("");
  expect(document.activeElement).toBe(trigger);
});
