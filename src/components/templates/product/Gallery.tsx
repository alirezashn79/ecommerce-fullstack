"use client";
import { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

const Gallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  const images = [
    "https://set-coffee.com/wp-content/uploads/2020/12/Gold-DG-700x700.jpg",
    "https://set-coffee.com/wp-content/uploads/2020/12/Gold-box-DG--150x150.jpg",
  ];

  return (
    <section style={{ width: "36%" }}>
      <Swiper
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as any
        }
        spaceBetween={10}
        navigation={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 gallery-slider"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img src={img} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-slider-2"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img src={img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;
