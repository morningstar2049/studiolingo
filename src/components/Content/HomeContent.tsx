"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import { FaPlay, FaYoutube } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import RevealOnScroll from "../RevealOnScroll";
import { featuredVideo, gridVideos } from "./contentData";

const videos = [featuredVideo, ...gridVideos];

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 600,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "ease",
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

export default function HomeContent() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl px-5 mx-auto">
        <RevealOnScroll revealClass="blog-rise" className="mb-8 text-center">
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-lingo-green" />
          <h2
            style={{ fontFeatureSettings: "'case' on" }}
            className="text-2xl font-bold sm:text-3xl text-lingo-black"
          >
            ჩვენი <span className="text-lingo-green">კონტენტი</span>
          </h2>
          <p className="max-w-xl mx-auto mt-3 text-[15px] text-[#6b7280]">
            300 000+ გამომწერი YouTube-ზე, Instagram-ზე, TikTok-სა და Facebook-ზე
            — ვქმნით საქართველოში #1 ინგლისურ ვიდეო კონტენტს.
          </p>
        </RevealOnScroll>

        <div className="blog-slider">
          <Slider {...settings}>
            {videos.map((id) => (
              <div key={id} className="px-2">
                <a
                  href={`https://www.youtube.com/watch?v=${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block overflow-hidden group aspect-video rounded-2xl ring-1 ring-[#eceef2] shadow-[0_14px_30px_-18px_rgba(41,49,66,0.28)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                    alt="Studio Lingo ვიდეო კონტენტი"
                    loading="lazy"
                    className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-[#0b1020]/20 transition-colors group-hover:bg-[#0b1020]/5" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center w-12 h-12 text-lg text-[#fff] transition-transform duration-300 rounded-full bg-[#ff0000] shadow-lg group-hover:scale-110">
                      <FaPlay className="translate-x-[1px]" />
                    </span>
                  </span>
                </a>
              </div>
            ))}
          </Slider>
        </div>

        <div
          className="flex justify-center mt-10"
          style={{ fontFeatureSettings: "'case' on" }}
        >
          <Link
            href="/content"
            className="inline-flex items-center gap-2 px-6 py-3 font-bold transition-opacity rounded-xl text-lingo-green ring-1 ring-lingo-green hover:opacity-80"
          >
            <FaYoutube className="text-lg" />
            ნახე ჩვენი კონტენტი
            <AiOutlineArrowRight className="shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
