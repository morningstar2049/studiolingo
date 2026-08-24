import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { AiOutlineArrowRight } from "react-icons/ai";

import { SITE_URL } from "@/lib/schema";
import { urlForImage } from "@/sanity/client";
import { getPost, getPostSlugs, getPosts } from "@/sanity/queries";
import ArticleShare from "@/components/blog/ArticleShare";
import BlogCoursesCard from "@/components/blog/BlogCoursesCard";
import BlogCarousel from "@/components/HomeBlog/BlogCarousel";
import RevealOnScroll from "@/components/RevealOnScroll";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "სტატია ვერ მოიძებნა | Studio Lingo" };

  const image = post.coverImage?.asset
    ? urlForImage(post.coverImage).width(1200).height(630).url()
    : undefined;

  return {
    title: `${post.title} | Studio Lingo`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      ...(image && { images: [image] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(image && { images: [image] }),
    },
  };
}

// Pull the 11-char video id out of any common YouTube URL (watch, youtu.be,
// shorts, or an already-embed link).
function getYoutubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? match[1] : null;
}

// Only these two original articles keep their in-text heading reveal
// animation; every later article (and all future ones) renders headings
// statically.
const ANIMATED_HEADING_SLUGS = ["english-with-movies", "5-habits-for-english"];

const getComponents = (
  animateHeadings: boolean,
): PortableTextComponents => ({
  block: {
    h2: ({ children }) =>
      animateHeadings ? (
        <RevealOnScroll className="mt-8 mb-3" once>
          <h2 className="text-2xl font-bold text-lingo-black">{children}</h2>
        </RevealOnScroll>
      ) : (
        <h2 className="mt-8 mb-3 text-2xl font-bold text-lingo-black">
          {children}
        </h2>
      ),
    h3: ({ children }) =>
      animateHeadings ? (
        <RevealOnScroll className="mt-6 mb-2" once>
          <h3 className="text-xl font-bold text-lingo-black">{children}</h3>
        </RevealOnScroll>
      ) : (
        <h3 className="mt-6 mb-2 text-xl font-bold text-lingo-black">
          {children}
        </h3>
      ),
    blockquote: ({ children }) => (
      <blockquote className="pl-4 my-6 italic border-l-4 border-lingo-green">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-lingo-black">{children}</p>
    ),
  },
  marks: {
    green: ({ children }) => (
      <span style={{ color: "#2f9e4d" }}>{children}</span>
    ),
    navy: ({ children }) => (
      <span style={{ color: "#293142" }}>{children}</span>
    ),
    red: ({ children }) => <span style={{ color: "#e24b4a" }}>{children}</span>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        rel="noreferrer noopener"
        className="underline text-lingo-green"
      >
        {children}
      </a>
    ),
  },
  // Sanity lists carry no marker here (the ❌/✅ emoji is the marker), but they
  // still need the same vertical rhythm as paragraphs — Tailwind's reset zeroes
  // <ul>/<ol> margins, which otherwise glues the paragraph after a list to it.
  list: {
    bullet: ({ children }) => <ul className="my-4">{children}</ul>,
    number: ({ children }) => <ol className="my-4">{children}</ol>,
  },
  types: {
    divider: () => (
      <hr className="my-9 h-px border-0 bg-[#111111]" />
    ),
    image: ({ value }) => (
      <span className="relative block w-full my-6 h-80">
        <Image
          src={urlForImage(value).width(1200).url()}
          alt={value?.alt || ""}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-contain"
        />
      </span>
    ),
    youtube: ({ value }) => {
      const id = getYoutubeId(value?.url);
      if (!id) return null;
      return (
        <div className="relative w-full my-6 overflow-hidden aspect-video rounded-xl">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      );
    },
  },
});

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("ka-GE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  // Other published articles for the "similar articles" carousel.
  const relatedPosts = (await getPosts()).filter((p) => p.slug !== slug);

  const image = post.coverImage?.asset
    ? urlForImage(post.coverImage).width(1200).url()
    : undefined;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: "ka",
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(image && { image }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "მთავარი", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "ბლოგი",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, breadcrumbSchema]),
        }}
      />

      {/* Full-width navy headline band (desktop + mobile) */}
      <div
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(120deg, #2a375c, #181f33)" }}
      >
        <div className="max-w-6xl px-5 mx-auto py-5 sm:py-7">
          <Link
            href="/blog"
            className="text-sm font-bold transition-colors text-lingo-green hover:text-[#5fd07f]"
          >
            ← ყველა სტატია
          </Link>
          <h1
            style={{ fontFeatureSettings: "'case' on" }}
            className="mt-3 text-xl font-bold leading-snug text-[#fff] sm:text-2xl lg:text-[26px] max-w-3xl blog-rise"
          >
            {post.title}
          </h1>
          <time
            className="block mt-2.5 text-[13px] text-[#c3c9d4]"
            dateTime={post.publishedAt}
          >
            {formatDate(post.publishedAt)}
          </time>
        </div>
      </div>

      {/* Body: article on the left, sticky courses card on the right (desktop) */}
      <div className="max-w-6xl px-5 mx-auto mt-10 lg:mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_384px] lg:gap-12">
        <div className="min-w-0">
          {image && (
            <div className="relative w-full mb-8 h-64 sm:h-96">
              <Image
                src={image}
                alt={post.coverImage?.alt || post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 760px"
                className="object-cover rounded-xl"
                priority
              />
            </div>
          )}

          <article>
            <PortableText
              value={post.body}
              components={getComponents(
                ANIMATED_HEADING_SLUGS.includes(post.slug),
              )}
            />
          </article>

          {/* CTA + share — mobile only (desktop shows them in the sidebar) */}
          <div className="pt-8 mt-12 border-t border-[#e5e7eb] lg:hidden">
            <Link
              href="/courses"
              className="flex items-center justify-center gap-2 px-6 py-4 mb-8 font-bold text-center text-[#fff] transition-opacity bg-lingo-green rounded-xl shadow-lg shadow-lingo-green/25 hover:opacity-90"
            >
              <span style={{ fontFeatureSettings: "'case' on" }}>
                გაეცანი სტუდიო ლინგოს კურსებს
              </span>
              <AiOutlineArrowRight className="shrink-0" />
            </Link>

            <div className="p-5 bg-[#fff] border border-[#e7ecea] rounded-[20px] shadow-[0_14px_30px_-22px_rgba(41,49,66,0.3)]">
              <ArticleShare
                url={`${SITE_URL}/blog/${post.slug}`}
                title={post.title}
                hideLabel
                spread
              />
            </div>
          </div>
        </div>

        {/* right column — courses card + share, pinned, desktop only */}
        <aside className="hidden lg:block">
          <div className="sticky top-[168px]">
            <BlogCoursesCard />
            <div className="p-5 mt-5 bg-[#fff] border border-[#e7ecea] rounded-[20px] shadow-[0_14px_30px_-22px_rgba(41,49,66,0.3)]">
              <ArticleShare
                url={`${SITE_URL}/blog/${post.slug}`}
                title={post.title}
                hideLabel
                spread
              />
            </div>
          </div>
        </aside>
      </div>

      {relatedPosts.length > 0 && (
        <section className="max-w-6xl px-5 mx-auto pt-10 mt-12 border-t border-[#e5e7eb]">
          <h2
            style={{ fontFeatureSettings: "'case' on" }}
            className="mb-8 text-2xl font-bold text-center text-lingo-black"
          >
            მსგავსი <span className="text-lingo-green">სტატიები</span>
          </h2>
          <div className="-mx-5">
            <BlogCarousel posts={relatedPosts} />
          </div>
        </section>
      )}

      <ScrollToTopButton />
    </main>
  );
}
