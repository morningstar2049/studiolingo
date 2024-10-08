"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import ImageWrapper, { TImageWrapperProps } from "../ImageWrapper";

const partners: TImageWrapperProps[] = [
  {
    src: "/redix.png",
    alt: "redix",
    fill: true,
    objectFit: "contain",
    extraStyles: "h-[150px]",
  },
  {
    src: "/ants.png",
    alt: "ants",
    fill: true,
    objectFit: "contain",
    extraStyles: "h-[150px]",
  },
  {
    src: "/zoohub.png",
    alt: "zoohub",
    fill: true,
    objectFit: "contain",
    extraStyles: "h-[150px]",
  },
  {
    src: "/pasha-bank.png",
    alt: "pasha-bank",
    fill: true,
    objectFit: "contain",
    extraStyles: "h-[150px]",
  },
  {
    src: "/master-trade.png",
    alt: "master-trade",
    fill: true,
    objectFit: "contain",
    extraStyles: "h-[150px]",
  },
  {
    src: "/diplomat-holding.png",
    alt: "diplomat-holding",
    fill: true,
    objectFit: "contain",
    extraStyles: "h-[150px]",
  },
];

function PartnersSliderCarousel() {
  const settings: Settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 2000,
    arrows: false,
    cssEase: "linear",
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          autoplay: true,
          autoplaySpeed: 1500,
          cssEase: "linear",
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {partners.map((partner) => (
          <ImageWrapper key={partner.alt} {...partner} />
        ))}
      </Slider>
    </>
  );
}

export default PartnersSliderCarousel;
