import type { APIRoute } from "astro";
import { publishedLocales } from "../i18n/locales";
import { alternateLinks, localizedPath, publishedDestinations, type Destination } from "../i18n/routes";

const ORIGIN = "https://getnotura.com";

interface Entry {
  path: string;
  destination: Destination;
}

const entries: Entry[] = [
  { path: "/", destination: "home" },
  ...publishedLocales.flatMap((locale) =>
    publishedDestinations.map((destination) => ({
      path: localizedPath(locale.id, destination),
      destination: destination as Destination,
    })),
  ),
];

const absolute = (path: string) => new URL(path, ORIGIN).href;

const urlEntry = ({ path, destination }: Entry) => {
  const alternates = alternateLinks(destination)
    .map(
      (alternate) =>
        `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${absolute(alternate.href)}" />`,
    )
    .join("\n");

  return `  <url>\n    <loc>${absolute(path)}</loc>\n${alternates}\n  </url>`;
};

export const GET: APIRoute = () => new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(urlEntry).join("\n")}
</urlset>
`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
