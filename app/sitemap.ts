import type { MetadataRoute } from "next";
import { PUBLISHED_PROJECTS } from "@/lib/projects";
import { SITE_PAGES, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...SITE_PAGES.map((page) => ({ url: new URL(page.path, SITE_URL).href })),
    ...PUBLISHED_PROJECTS.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
    })),
  ];
}
