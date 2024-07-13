"use client";
import ProductCard from "@/components/modules/product-card";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IFProduct } from "types/auth";

const MoreProducts = ({
  relatedProducts,
}: {
  relatedProducts: IFProduct[];
}) => {
  return (
    <div data-aos="fade-right">
      <section>
        <h2>محصولات مرتبط</h2>
        <div
          style={{
            height: "2px",
            width: "70px",
            background: "black",
            marginTop: "10px",
          }}
        ></div>
      </section>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        dir="rtl"
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper "
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product._id.toString()}>
            <ProductCard
              id={product._id.toString()}
              name={product.name}
              price={product.price}
              score={product.score}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoreProducts;
