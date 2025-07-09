"use client";
import SetCard from "@/components/set-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ArrowRight from "../arrow-right";
import ArrowLeft from "../arrow-left";
import { Banner } from "@/types/banner";

interface Props {
  banners: Banner[];
}

function SetSection({ banners }: Props) {
  const showSliderButtons = banners.length > 1;

  return (
    <section className="container h-[496px] relative">
      <Swiper
        className="h-full"
        slidesPerView={1}
        navigation={{
          nextEl: ".set-arrow-right",
          prevEl: ".set-arrow-left",
        }}
        modules={[Navigation]}
      >
        {banners.map((banner, idx) => {
          return (
            <SwiperSlide key={idx}>
              <SetCard banner={banner} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {showSliderButtons && (
        <>
          <ArrowLeft className="set-arrow-left absolute -left-1 xl:-left-25 bottom-[174px] z-[2]" />
          <ArrowRight className="set-arrow-right absolute -right-1 xl:-right-25 bottom-[174px] z-[2]" />
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-[413px] bg-[url('/images/sets-bg.webp')] bg-cover bg-center rounded-[5px] mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 2xl:mx-[123px]" />
    </section>
  );
}

export default SetSection;
