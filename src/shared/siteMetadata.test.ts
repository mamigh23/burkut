import { expect, it } from "vitest";
import { siteSchema, siteOrigin } from "./siteMetadata";
import { webService } from "../content/serviceDetails";
import { companyContact } from "../contact";

it("iletişim ve hizmet verisini aynı kaynaklardan üretir, doğrulanmamış vaatler eklemez", () => {
  const graph = JSON.parse(siteSchema(webService))["@graph"];
  expect(
    graph.find(
      (node: Record<string, unknown>) => node["@type"] === "Organization",
    ).email,
  ).toBe(companyContact.email);
  expect(
    graph.find((node: Record<string, unknown>) => node["@type"] === "Service")
      .url,
  ).toBe(siteOrigin + webService.path);
  expect(siteSchema(webService)).not.toMatch(
    /aggregateRating|priceRange|openingHours|postalAddress/,
  );
});
it("içerik metni script bloğunu kapatamaz; JSON verisi korunur", () => {
  const intro = '</script><img src=x onerror="alert(1)">';
  const encoded = siteSchema({ ...webService, intro });
  expect(encoded).not.toContain("</script>");
  const graph = JSON.parse(encoded)["@graph"];
  expect(
    graph.find((node: Record<string, unknown>) => node["@type"] === "Service")
      .description,
  ).toBe(intro);
});
