// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ServiceExample from "./ServiceExample";
import { serviceExamples } from "../content/serviceExamples";

const originalImages = structuredClone(serviceExamples.web.images);

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(HTMLDialogElement.prototype, "showModal");
  Reflect.deleteProperty(HTMLDialogElement.prototype, "close");
  vi.restoreAllMocks();
  document.body.style.overflow = "";
  serviceExamples.web.images = structuredClone(originalImages);
});
beforeEach(() => {
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
});
it("galeri açılır, klavyeyle diğer görsele geçer ve kapanınca odağı geri verir", async () => {
  const user = userEvent.setup();
  render(<ServiceExample area="web" />);
  const trigger = screen.getByRole("button", { name: /görsellerini büyüt/ });
  await user.click(trigger);
  const dialog = screen.getByRole("dialog");
  expect(document.body.style.overflow).toBe("hidden");
  screen.getByRole("button", { name: "Görseli kapat" }).focus();
  await user.keyboard("{Shift>}{Tab}{/Shift}");
  expect(document.activeElement).toBe(
    screen.getByRole("button", { name: "Sonraki görsel" }),
  );
  await user.tab();
  expect(document.activeElement).toBe(
    screen.getByRole("button", { name: "Görseli kapat" }),
  );
  fireEvent.keyDown(dialog, { key: "ArrowRight" });
  expect(
    screen.getByRole("img", { name: /ürün detayı/i }).getAttribute("src"),
  ).toContain("web-detail.svg");
  fireEvent(dialog, new Event("cancel", { cancelable: true }));
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(document.body.style.overflow).toBe("");
  expect(document.activeElement).toBe(trigger);
});

it("üç görselde ileri ve geri dolaşır, son görsel çıkarıldığında geçerli görseli gösterir", async () => {
  serviceExamples.web.images.push({ src: "/third.webp", alt: "Üçüncü ekran" });
  const user = userEvent.setup();
  const { rerender } = render(<ServiceExample area="web" />);
  await user.click(screen.getByRole("button", { name: /görsellerini büyüt/ }));
  await user.click(screen.getByRole("button", { name: "Önceki görsel" }));
  expect(
    screen.getByRole("img", { name: "Üçüncü ekran" }).getAttribute("src"),
  ).toBe("/third.webp");
  expect(screen.getByText("3 / 3")).toBeTruthy();
  fireEvent.keyDown(screen.getByRole("dialog"), { key: "ArrowRight" });
  expect(screen.getByText("1 / 3")).toBeTruthy();
  fireEvent.keyDown(screen.getByRole("dialog"), { key: "ArrowLeft" });
  expect(screen.getByText("3 / 3")).toBeTruthy();
  serviceExamples.web.images.pop();
  rerender(<ServiceExample area="web" />);
  expect(screen.getByText("1 / 2")).toBeTruthy();
});

it("tek görselde gezinme oklarını gizler, boş galeride kırık bir açıcı oluşturmaz", async () => {
  serviceExamples.web.images = originalImages.slice(0, 1);
  const user = userEvent.setup();
  const { rerender } = render(<ServiceExample area="web" />);
  await user.click(screen.getByRole("button", { name: /görsellerini büyüt/ }));
  expect(screen.getByText("1 / 1")).toBeTruthy();
  expect(screen.queryByRole("button", { name: "Sonraki görsel" })).toBeNull();
  const close = screen.getByRole("button", { name: "Görseli kapat" });
  close.focus();
  await user.tab();
  expect(document.activeElement).toBe(close);
  serviceExamples.web.images = [];
  rerender(<ServiceExample area="web" />);
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(screen.queryByRole("button")).toBeNull();
  expect(document.body.style.overflow).toBe("");
});
