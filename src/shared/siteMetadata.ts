import { companyContact } from "../contact.ts";
import type { ServiceDetail } from "../content/serviceDetails.ts";

export const siteOrigin = "https://burkut.gemnative.com";
export function siteSchema(service?: ServiceDetail): string {
  const organizationId = `${siteOrigin}/#organization`;
  const websiteId = `${siteOrigin}/#website`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Bürküt",
      url: `${siteOrigin}/`,
      logo: `${siteOrigin}/images/brand/logo-lockup.webp`,
      email: companyContact.email,
      telephone: companyContact.phoneHref.replace("tel:", ""),
      sameAs: [companyContact.instagramHref],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: "Bürküt",
      url: `${siteOrigin}/`,
      inLanguage: "tr-TR",
      publisher: { "@id": organizationId },
    },
  ];
  if (service) {
    const url = siteOrigin + service.path;
    graph.push(
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.label,
        serviceType: service.eyebrow,
        description: service.intro,
        url,
        provider: { "@id": organizationId },
        mainEntityOfPage: { "@id": `${url}#webpage` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${service.label} — Bürküt`,
        inLanguage: "tr-TR",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Ana sayfa",
            item: `${siteOrigin}/`,
          },
          { "@type": "ListItem", position: 2, name: service.label, item: url },
        ],
      },
    );
  }
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");
}
