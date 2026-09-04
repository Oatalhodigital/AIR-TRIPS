import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://air-trips.vercel.app";
  const routes = [
    "/",
    "/voos-corporativos",
    "/voos-comerciais",
    "/hoteis",
    "/passeios",
    "/servicos",
    "/roteiros",
    "/roteiros/rio-em-3-dias",
    "/roteiros/bh-executivos",
    "/internacional",
    "/sobre",
    "/contato",
    "/politica-de-privacidade",
  ];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "/" ? 1 : 0.7,
  }));
}
