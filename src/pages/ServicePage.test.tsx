// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ServicePage from "./ServicePage";
import {
  webService,
  appService,
  gameService,
  serviceForPath,
} from "../content/serviceDetails";

beforeEach(() => {
  vi.stubGlobal("matchMedia", () =>
    Object.assign(new EventTarget(), { matches: false }),
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it.each([
  [appService, "Uygulama"],
  [gameService, "Oyun"],
] as const)(
  "$0.area sayfası doğru alanı seçer ve diğer hizmetlere bağlanır",
  (service, label) => {
    render(<ServicePage service={service} />);
    expect(
      (screen.getByRole("checkbox", { name: label }) as HTMLInputElement)
        .checked,
    ).toBe(true);
    expect(
      (screen.getByRole("checkbox", { name: "Web sitesi" }) as HTMLInputElement)
        .checked,
    ).toBe(false);
    expect(
      screen.getByRole("link", { name: service.action }).getAttribute("href"),
    ).toBe("#iletisim");
    expect(
      screen.getByRole("link", { name: webService.label }).getAttribute("href"),
    ).toBe(webService.path);
  },
);
it("doğrudan ve index.html adresleri doğru hizmeti açar", () => {
  for (const service of [webService, appService, gameService]) {
    expect(serviceForPath(service.path)).toBe(service);
    expect(serviceForPath(service.path + "index.html")).toBe(service);
    expect(serviceForPath(service.path.slice(0, -1))).toBe(service);
  }
  expect(serviceForPath("/")).toBeUndefined();
  expect(serviceForPath("/hizmetler/bilinmeyen/")).toBeUndefined();
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
