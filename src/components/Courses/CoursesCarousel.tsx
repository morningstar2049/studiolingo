"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import Link from "next/link";
import Slider from "react-slick";
import {
  AiOutlineArrowRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { courses } from "./coursesData";
import CourseCard from "./CourseCard";

const arrowCls =
  "shrink-0 flex items-center justify-center rounded-full bg-[#fff] text-lingo-green text-lg shadow-[0_12px_26px_-10px_rgba(41,49,66,0.4)] border border-[#e7ecea] transition-colors hover:bg-lingo-green hover:text-[#fff]";

export default function CoursesCarousel() {
  const sliderRef = useRef<Slider>(null);
  const prev = () => sliderRef.current?.slickPrev();
  const next = () => sliderRef.current?.slickNext();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4500,
    cssEase: "ease",
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1, dots: false } },
    ],
  };

  return (
    <div className="px-5 mx-auto max-w-7xl sm:px-4">
      {/* Desktop: arrows flank the slider. On mobile they are hidden so the
          card keeps full width — the mobile arrows sit below by the button. */}
      <div className="flex items-center gap-3 sm:gap-5">
        <button
          type="button"
          aria-label="წინა კურსი"
          onClick={prev}
          className={`${arrowCls} hidden sm:flex w-12 h-12`}
        >
          <AiOutlineLeft />
        </button>

        <div className="flex-1 min-w-0 blog-slider">
          <Slider ref={sliderRef} {...settings}>
            {courses.map((c) => (
              <div key={c.title} className="h-full px-2 pb-2">
                <CourseCard course={c} />
              </div>
            ))}
          </Slider>
        </div>

        <button
          type="button"
          aria-label="შემდეგი კურსი"
          onClick={next}
          className={`${arrowCls} hidden sm:flex w-12 h-12`}
        >
          <AiOutlineRight />
        </button>
      </div>

      {/* Controls below: mobile arrows flank the button; on desktop it is just
          the centred button. */}
      <div
        className="flex items-center justify-center gap-3 mt-10"
        style={{ fontFeatureSettings: "'case' on" }}
      >
        <button
          type="button"
          aria-label="წინა კურსი"
          onClick={prev}
          className={`${arrowCls} flex sm:hidden w-10 h-10`}
        >
          <AiOutlineLeft />
        </button>

        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-6 py-3 font-bold transition-opacity rounded-xl text-lingo-green ring-1 ring-lingo-green hover:opacity-80"
        >
          ყველა კურსი
          <AiOutlineArrowRight className="shrink-0" />
        </Link>

        <button
          type="button"
          aria-label="შემდეგი კურსი"
          onClick={next}
          className={`${arrowCls} flex sm:hidden w-10 h-10`}
        >
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
}
