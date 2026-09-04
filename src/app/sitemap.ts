import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/schema";
import { getPosts } from "@/sanity/queries";
import { vacancies } from "@/app/career/components/VacanciesList";

export const revalidate = 60;

// Public, indexable pages only. Auth, checkout and the Studio are excluded
// here and disallowed in robots.ts.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // An unreachable dataset must never break the sitemap for the whole site.
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    posts = await getPosts();
  } catch {
    posts = [];
  }

  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/courses`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...[
      "individual-online",
      "group-online",
      "group-onsite",
      "teenagers",
    ].map((slug) => ({
      url: `${SITE_URL}/courses/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/blog`,
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
      url: `${SITE_URL}/team`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/content`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/language-test`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/materials`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/corporate`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/chat`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...["", "/teens", "/adults"].map((suffix) => ({
      url: `${SITE_URL}/register${suffix}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/career`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...vacancies.map(({ route }) => ({
      url: `${SITE_URL}/career/${route}`,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
