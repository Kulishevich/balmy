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
    <section className="mt-[89px] container pt-[83px]">
      <div className="relative bg-[url('/images/sets-bg.webp')] bg-cover bg-center w-full text-white rounded-[5px] ">
        <div className="overflow-x-hidden overflow-y-visible">
          <Swiper
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
        </div>

        {showSliderButtons && (
          <>
            <ArrowLeft className="set-arrow-left absolute -left-4 xl:-left-24 top-1/2 -translate-y-1/2" />
            <ArrowRight className="set-arrow-right absolute -right-4 xl:-right-24 top-1/2 -translate-y-1/2" />
          </>
        )}
      </div>
    </section>
  );
}

export default SetSection;
