// @vitest-environment jsdom
import { afterEach, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Products from "./Products";

afterEach(cleanup);
it("ürün sekmeleri ok, Home ve End tuşlarıyla paneli ve odağı birlikte değiştirir", async () => {
  const user = userEvent.setup();
  render(<Products />);
  screen.getByRole("tab", { name: "Web" }).focus();
  await user.keyboard("{ArrowRight}");
  expect(document.activeElement).toBe(
    screen.getByRole("tab", { name: "Uygulama" }),
  );
  expect(screen.getByRole("tabpanel", { name: "Uygulama" })).toBeTruthy();
  await user.keyboard("{End}");
  expect(
    screen.getByRole("tab", { name: "Oyun" }).getAttribute("aria-selected"),
  ).toBe("true");
  await user.keyboard("{ArrowRight}");
  expect(document.activeElement).toBe(screen.getByRole("tab", { name: "Web" }));
  await user.keyboard("{ArrowLeft}");
  expect(document.activeElement).toBe(
    screen.getByRole("tab", { name: "Oyun" }),
  );
  await user.keyboard("{Home}");
  expect(screen.getByRole("tabpanel", { name: "Web" })).toBeTruthy();
});
