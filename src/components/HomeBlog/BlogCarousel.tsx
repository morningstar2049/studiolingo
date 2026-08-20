"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { urlForImage } from "@/sanity/client";
import type { PostListItem } from "@/sanity/queries";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("ka-GE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogCarousel({ posts }: { posts: PostListItem[] }) {
  const desktopSlides = Math.min(3, posts.length);
  const settings = {
    dots: true,
    infinite: posts.length > desktopSlides,
    speed: 500,
    autoplay: posts.length > desktopSlides,
    autoplaySpeed: 4000,
    cssEase: "ease",
    slidesToShow: desktopSlides,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
          infinite: posts.length > 1,
          autoplay: posts.length > 1,
          autoplaySpeed: 4000,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-6xl px-5 mx-auto blog-slider">
      <Slider {...settings}>
        {posts.map((post) => (
          <div key={post._id} className="h-full px-2 pb-2">
            <Link
              href={`/blog/${post.slug}`}
              className="flex flex-col h-full overflow-hidden bg-[#f3f4f6] group rounded-xl transition-all duration-300 shadow-[0_10px_24px_-8px_rgba(41,49,66,0.22)] hover:shadow-[0_22px_40px_-12px_rgba(47,158,77,0.28)] hover:-translate-y-[3px]"
            >
              {post.coverImage?.asset && (
                <div className="relative w-full h-44">
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
                <time
                  className="text-sm font-medium text-lingo-green"
                  dateTime={post.publishedAt}
                >
                  {formatDate(post.publishedAt)}
                </time>
                <h2
                  style={{ fontFeatureSettings: "'case' on" }}
                  className="text-lg font-bold transition-colors text-lingo-black sm:group-hover:text-lingo-green line-clamp-2"
                >
                  {post.title}
                </h2>
                <p className="text-sm text-[#4b5563] line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 pt-3 mt-auto text-sm font-bold text-lingo-green">
                  ვრცლად
                  <AiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
