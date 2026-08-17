import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/schema";

export default function robots(): MetadataRoute.Robots {
  // Private pages (auth, checkout, Studio) are kept out of search with a
  // per-page `noindex` meta tag rather than a robots.txt disallow. Google must
  // be able to CRAWL a page to see its noindex — blocking it here would hide
  // the noindex and let the page get indexed anyway ("Excluded by noindex" /
  // conflicting-signals warnings in Search Console).
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
