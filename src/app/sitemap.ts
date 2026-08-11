import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/schema";
import { getPosts } from "@/sanity/queries";

export const revalidate = 60;

// Public, indexable pages only. Auth, checkout and the Studio are excluded
// here and disallowed in robots.ts.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // An unreachable dataset must never break the sitemap for the whole site.
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    posts = await getPosts();
  } catch {
    posts = [];
  }

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
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
