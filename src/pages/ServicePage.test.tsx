// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ServicePage from "./ServicePage";
import { webService } from "../content/serviceDetails";

beforeEach(() => {
  vi.stubGlobal("matchMedia", () =>
    Object.assign(new EventTarget(), { matches: false }),
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it("web hizmeti seçili başlar, hizmet seçimi yazılmış açıklamayı silmez", async () => {
  const user = userEvent.setup();
  render(<ServicePage service={webService} />);
  const web = screen.getByRole("checkbox", {
    name: "Web sitesi",
  }) as HTMLInputElement;
  expect(web.checked).toBe(true);
  const detail = screen.getByRole("textbox", { name: /fikrinden bahset/i });
  await user.type(detail, "Mevcut sitemizi yenilemek istiyoruz.");
  await user.click(screen.getByRole("checkbox", { name: "Uygulama" }));
  expect((detail as HTMLTextAreaElement).value).toBe(
    "Mevcut sitemizi yenilemek istiyoruz.",
  );
  expect(screen.queryByText("Yangan proje özetin forma aktarıldı.")).toBeNull();
  expect(
    screen.getByRole("link", { name: "Tüm hizmetler" }).getAttribute("href"),
  ).toBe("/#hizmetler");
});
