import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

import { urlForImage } from "@/sanity/client";
import { getPosts } from "@/sanity/queries";
import BlogHeader from "@/components/blog/BlogHeader";

const title = "ბლოგი — ინგლისურის სწავლის რჩევები | Studio Lingo";
const description =
  "სტატიები ინგლისურის სწავლის შესახებ: რჩევები, დონეები, მეთოდები და გამოცდილება Studio Lingo-ს მასწავლებლებისგან.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  // Blog keeps the tagline share image; the rest of the site uses the logo.
  openGraph: { title, description, type: "website", images: ["/og-image.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export const revalidate = 60;

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("ka-GE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="max-w-5xl px-5 pt-10 pb-20 mx-auto">
      <BlogHeader />

      {posts.length === 0 ? (
        <p className="text-center text-lingo-black">
          სტატიები მალე დაემატება.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="flex flex-col h-full overflow-hidden bg-[#fff] group rounded-xl transition-all duration-300 shadow-[0_10px_24px_-8px_rgba(41,49,66,0.22)] hover:shadow-[0_22px_40px_-12px_rgba(47,158,77,0.28)] hover:-translate-y-[3px]"
            >
              {post.coverImage?.asset && (
                <div className="relative w-full h-48">
                  <Image
                    src={urlForImage(post.coverImage).width(800).url()}
                    alt={post.coverImage.alt || post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 gap-2 p-5">
                <time className="text-sm font-medium text-lingo-green" dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <h2
                  style={{ fontFeatureSettings: "'case' on" }}
                  className="text-lg font-bold transition-colors text-lingo-black group-hover:text-lingo-green"
                >
                  {post.title}
                </h2>
                <p className="text-sm text-[#4b5563]">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 pt-3 mt-auto text-sm font-bold text-lingo-green">
                  ვრცლად
                  <AiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
