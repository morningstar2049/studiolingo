"use client";
import Slider from "react-slick";
import ImageWrapper from "../ImageWrapper";
import { team } from "./teamData";

function TeamSliderCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          infinite: true,
          speed: 700,
          autoplay: true,
          autoplaySpeed: 3000,
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
    <>
      <Slider {...settings}>
        {team.map((teamMember) =>
          teamMember.videoUrl ? (
            <a key={teamMember.alt} href={teamMember.videoUrl} target="_blank">
              <ImageWrapper
                {...teamMember}
                extraStyles="h-[300px] lg:h-[400px]"
              />
            </a>
          ) : (
            <ImageWrapper
              key={teamMember.alt}
              {...teamMember}
              extraStyles="h-[300px] lg:h-[400px]"
            />
          )
        )}
      </Slider>
    </>
  );
}

export default TeamSliderCarousel;
