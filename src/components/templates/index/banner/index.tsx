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
    >
      <SwiperSlide className="swiper-slide">
        <img src="/images/slider/slidernew.jpg" alt="slider" />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
        possimus quisquam consequuntur ea iure quae cumque expedita dolores,
        aspernatur inventore ratione! Debitis cupiditate vitae nobis, impedit
        vel ipsa nam, eligendi eius blanditiis vero voluptatum sit adipisci
        aperiam error quod, molestias cum! Sequi aut odit corrupti neque quas
        sed saepe modi assumenda ipsam, ratione, aspernatur, debitis harum.
        Ducimus aliquid aliquam quaerat cupiditate molestiae expedita magnam ea
        veniam iste, perferendis vero? Dignissimos accusamus voluptas culpa
        ipsam libero asperiores porro aliquam error sint recusandae quia
        voluptatum perferendis, hic quisquam repellat eaque, explicabo vero
        illum? Neque, et! Facilis, deserunt asperiores tempora omnis inventore
        optio ea reprehenderit! Ipsum et atque dolor amet, inventore voluptates
        veniam unde iste ut quia rem doloribus molestiae reiciendis beatae autem
        nihil facilis saepe maiores temporibus. Rerum, consectetur eveniet.
        Ipsum, totam. Ipsam impedit cumque porro, animi optio necessitatibus
        autem, magni, unde repellat ullam quod voluptatibus. Sit quia
        reprehenderit voluptates possimus minima quaerat officiis ea, quos
        excepturi distinctio libero blanditiis porro modi perferendis optio
        magni deserunt, illo itaque error nesciunt pariatur quo, repellat et
        dolorum. Soluta, laudantium ea voluptate impedit quasi at repudiandae
        recusandae sit exercitationem incidunt, quis, asperiores labore amet.
        Earum tempore repellendus architecto ut dicta dolor, aliquid iure vitae
        quaerat?
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
