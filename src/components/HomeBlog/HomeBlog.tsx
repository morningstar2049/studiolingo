import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getPosts, type PostListItem } from "@/sanity/queries";
import RevealOnScroll from "../RevealOnScroll";
import BlogCarousel from "./BlogCarousel";

// Homepage "ლინგო ბლოგი" section — a carousel of the most recent articles,
// sitting between the corporate and reviews sections.
export default async function HomeBlog() {
  let posts: PostListItem[] = [];
  try {
    posts = await getPosts();
  } catch {
    posts = [];
  }
  const recent = posts.slice(0, 6);
  if (recent.length === 0) return null;

  return (
    <div className="flex flex-col py-16 mt-8 sm:py-20 bg-[#eef7f1]">
      <RevealOnScroll className="mx-auto mb-12">
        <h2
          style={{ fontFeatureSettings: "'case' on" }}
          className="text-2xl font-bold text-lingo-green sm:text-3xl"
        >
          ლინგო ბლოგი
        </h2>
      </RevealOnScroll>

      <BlogCarousel posts={recent} />

      <Link
        href="/blog"
        className="inline-flex items-center self-center gap-2 px-6 py-3 mt-8 font-bold transition-opacity rounded-xl text-lingo-green ring-1 ring-lingo-green hover:opacity-80"
      >
        <span style={{ fontFeatureSettings: "'case' on" }}>ყველა სტატია</span>
        <AiOutlineArrowRight className="shrink-0" />
      </Link>
    </div>
  );
}
