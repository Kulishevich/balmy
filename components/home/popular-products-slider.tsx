"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import ProductCard from "@/components/product-card";
import ArrowLeft from "../arrow-left";
import ArrowRight from "../arrow-right";
import { Product } from "@/types/product";

interface Props {
  popularProducts: Product[];
}

function PopularProductsSlider({ popularProducts }: Props) {
  return (
    <div className="mt-6 lg:mt-[40px] relative flex">
      <Swiper
        className="w-full"
        slidesPerView={4}
        spaceBetween={30}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1536: {
            slidesPerView: 4,
          },
        }}
        autoplay={{ delay: 2000 }}
        navigation={{
          nextEl: ".popular-products-arrow-right",
          prevEl: ".popular-products-arrow-left",
        }}
        modules={[Navigation, Autoplay]}
      >
        {popularProducts.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <ArrowLeft className="hidden xl:block popular-products-arrow-left absolute -left-24 top-[118px] " />
      <ArrowRight className="hidden xl:block popular-products-arrow-right absolute -right-24 top-[118px] " />
    </div>
  );
}

export default PopularProductsSlider;
