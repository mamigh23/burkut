// @vitest-environment jsdom
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { MotionProvider, MotionToggle } from "./Motion";

let preference: EventTarget & { matches: boolean };
beforeEach(() => {
  preference = Object.assign(new EventTarget(), { matches: false });
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => preference),
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it("hareket düğmeleri ortak tercihi paylaşır ve sistem değişimini uygular", async () => {
  const user = userEvent.setup();
  render(
    <MotionProvider>
      <MotionToggle />
      <MotionToggle planet />
    </MotionProvider>,
  );
  await user.click(
    screen.getAllByRole("button", {
      name: "Hareketi durdur: dekoratif animasyonlar",
    })[0],
  );
  expect(document.documentElement.dataset.motion).toBe("paused");
  expect(
    screen.getAllByRole("button", {
      name: "Hareketi başlat: dekoratif animasyonlar",
    }),
  ).toHaveLength(2);
  act(() => {
    preference.matches = true;
    preference.dispatchEvent(new Event("change"));
  });
  expect(screen.queryAllByRole("button")).toHaveLength(0);
  expect(screen.getAllByText("Hareket azaltıldı")).toHaveLength(2);
  act(() => {
    preference.matches = false;
    preference.dispatchEvent(new Event("change"));
  });
  // Manual pause survives a temporary operating-system preference change.
  expect(document.documentElement.dataset.motion).toBe("paused");
  await user.click(
    screen.getAllByRole("button", {
      name: "Hareketi başlat: dekoratif animasyonlar",
    })[1],
  );
  expect(document.documentElement.dataset.motion).toBe("enabled");
});
it("sistem azaltılmış hareket isterken animasyonu ilk açılıştan kapatır", () => {
  preference.matches = true;
  render(
    <MotionProvider>
      <MotionToggle />
    </MotionProvider>,
  );
  expect(document.documentElement.dataset.motion).toBe("paused");
  expect(screen.queryByRole("button")).toBeNull();
});
