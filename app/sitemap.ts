import type { MetadataRoute } from "next";
import { researchAreas } from "@/lib/data/research";
import { site } from "@/lib/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/research", priority: 0.9, changeFrequency: "monthly" },
    { path: "/publications", priority: 0.9, changeFrequency: "weekly" },
    { path: "/people", priority: 0.8, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
    { path: "/conference", priority: 0.8, changeFrequency: "weekly" },
    { path: "/upcoming", priority: 0.85, changeFrequency: "weekly" },
    { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" },
    { path: "/news", priority: 0.7, changeFrequency: "weekly" },
    { path: "/gallery", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    { path: "/join", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/accessibility", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...researchAreas.map((area) => ({
      url: `${site.url}/research/${area.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
