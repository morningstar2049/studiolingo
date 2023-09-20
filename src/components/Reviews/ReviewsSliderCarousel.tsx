"use client";
import React from "react";
import Slider from "react-slick";
import { reviews } from "./reviewsData";
import ImageWrapper from "../ImageWrapper";
import "./reviewsCarousel.css";

function ReviewsSliderCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 4000,
    cssEase: "linear",
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          infinite: true,
          speed: 700,
          autoplay: false,
          autoplaySpeed: 6000,
          cssEase: "linear",
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          pauseOnHover: false,
        },
      },
    ],
  };

  return (
    <div className="lg:px-[45px] lg:py-4">
      <Slider {...settings}>
        {reviews.map((review) => (
          <ImageWrapper key={review.alt} {...review} />
        ))}
      </Slider>
    </div>
  );
}

export default ReviewsSliderCarousel;
