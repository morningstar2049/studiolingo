import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/schema";

// Public, indexable pages only. Auth and checkout routes are excluded
// here and disallowed in robots.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/language-test`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/materials`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/chat`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/career`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
