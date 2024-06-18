"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Banner() {
  return (
    <Swiper
      slidesPerView={1}
      navigation={true}
      loop={true}
      autoplay={{ delay: 5000 }}
      modules={[Navigation, Autoplay]}
      className="mySwiper home-slider"
      style={{ borderBottom: "2px solid white" }}
    >
      <SwiperSlide className="swiper-slide">
        <img src="/images/slider/slidernew.jpg" alt="slider" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/slider/setpresso-slide.jpg" alt="slider" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/slider/BW-and-LEO.jpg" alt="slider" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/slider/82.jpg" alt="slider" />
      </SwiperSlide>
    </Swiper>
  );
}
