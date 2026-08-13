import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

import { urlForImage } from "@/sanity/client";
import { getPosts } from "@/sanity/queries";

const title = "ბლოგი — ინგლისურის სწავლის რჩევები | Studio Lingo";
const description =
  "სტატიები ინგლისურის სწავლის შესახებ: რჩევები, დონეები, მეთოდები და გამოცდილება Studio Lingo-ს მასწავლებლებისგან.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
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
      <div className="mb-12 border-l-[5px] border-lingo-green pl-5">
        <h1
          style={{ fontFeatureSettings: "'case' on" }}
          className="text-3xl font-bold sm:text-4xl text-lingo-black"
        >
          ლინგო ბლოგი
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          რჩევები და სტატიები ინგლისურის სწავლის შესახებ.
        </p>
      </div>

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
              className="flex flex-col overflow-hidden transition-shadow bg-white border group rounded-xl hover:shadow-lg"
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
                <time className="text-sm text-gray-500" dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <h2 className="text-lg font-bold text-lingo-black">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
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
