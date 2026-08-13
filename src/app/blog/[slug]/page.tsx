import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { AiOutlineArrowRight } from "react-icons/ai";

import { SITE_URL } from "@/lib/schema";
import { urlForImage } from "@/sanity/client";
import { getPost, getPostSlugs } from "@/sanity/queries";
import ArticleShare from "@/components/blog/ArticleShare";

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

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 text-2xl font-bold text-lingo-black">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
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
  types: {
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
  },
};

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

  return (
    <main className="max-w-3xl px-5 pt-10 pb-20 mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Link href="/blog" className="text-sm text-lingo-green hover:underline">
        ← ყველა სტატია
      </Link>

      <h1
        style={{ fontFeatureSettings: "'case' on" }}
        className="mt-4 mb-3 text-3xl font-bold sm:text-4xl text-lingo-black"
      >
        {post.title}
      </h1>
      <time className="block mb-8 text-sm text-gray-500" dateTime={post.publishedAt}>
        {formatDate(post.publishedAt)}
      </time>

      {image && (
        <div className="relative w-full mb-8 h-64 sm:h-96">
          <Image
            src={image}
            alt={post.coverImage?.alt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover rounded-xl"
            priority
          />
        </div>
      )}

      <article>
        <PortableText value={post.body} components={components} />
      </article>

      <div className="pt-8 mt-12 border-t border-gray-200">
        <Link
          href="/#courses"
          className="flex items-center justify-center gap-2 px-6 py-4 mb-8 font-bold text-center text-[#fff] transition-opacity bg-lingo-green rounded-xl hover:opacity-90"
        >
          გაეცანი სტუდიო ლინგოს კურსებს
          <AiOutlineArrowRight className="shrink-0" />
        </Link>

        <ArticleShare
          url={`${SITE_URL}/blog/${post.slug}`}
          title={post.title}
        />
      </div>
    </main>
  );
}
