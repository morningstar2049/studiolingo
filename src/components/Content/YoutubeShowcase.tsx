import { FaYoutube, FaPlay } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import RevealOnScroll from "../RevealOnScroll";
import { featuredVideo, gridVideos, YT_CHANNEL } from "./contentData";

export default function YoutubeShowcase() {
  return (
    <section
      className="mt-16 sm:mt-24 -mb-20 pb-20 pt-14 sm:pt-16"
      style={{ background: "linear-gradient(180deg,#0f1526,#161d33)" }}
    >
      <div className="max-w-6xl px-5 mx-auto">
        <RevealOnScroll revealClass="blog-rise" className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-bold rounded-full text-[#fff] bg-[#ff0000]">
            <FaYoutube className="text-lg" /> YouTube
          </span>
          <h2
            style={{ fontFeatureSettings: "'case' on" }}
            className="text-2xl font-bold text-[#fff] sm:text-4xl"
          >
            ჩვენი <span className="text-[#2f9e4d]">ვიდეო</span> კონტენტი
          </h2>
          <p className="max-w-2xl mx-auto mt-3 text-[15px] text-[#aab2c2]">
            გრამატიკა, ლექსიკა და სასაუბრო ინგლისური — მარტივად, სახალისოდ და
            უფასოდ. აი, რას ვქმნით ყოველდღე ჩვენს არხზე.
          </p>
        </RevealOnScroll>

        {/* Featured video */}
        <RevealOnScroll revealClass="review-rise">
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden shadow-2xl aspect-video rounded-2xl ring-1 ring-[#ffffff1f]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${featuredVideo}`}
              title="Studio Lingo — featured video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </RevealOnScroll>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-2 gap-4 mt-8 sm:grid-cols-3 sm:gap-6">
          {gridVideos.map((id, i) => (
            <RevealOnScroll key={id} revealClass="review-rise" delay={i * 70}>
              <a
                href={`https://www.youtube.com/watch?v=${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block overflow-hidden group aspect-video rounded-xl ring-1 ring-[#ffffff14]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                  alt="Studio Lingo YouTube ვიდეო"
                  loading="lazy"
                  className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-[#0b1020]/25 transition-colors group-hover:bg-[#0b1020]/10" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex items-center justify-center text-lg text-[#fff] transition-transform duration-300 rounded-full w-12 h-12 bg-[#ff0000] shadow-lg group-hover:scale-110">
                    <FaPlay className="translate-x-[1px]" />
                  </span>
                </span>
              </a>
            </RevealOnScroll>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href={YT_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFeatureSettings: "'case' on" }}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-bold text-[#fff] transition-transform rounded-xl bg-[#ff0000] shadow-[0_16px_36px_-14px_rgba(255,0,0,0.6)] hover:scale-[1.03]"
          >
            <FaYoutube className="text-xl" />
            გამოიწერე არხი
            <AiOutlineArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
