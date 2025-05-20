"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ReviewCard from "@/components/review-card";
import Title from "@/components/title";
import Action from "../action";
import ArrowLeft from "../arrow-left";
import ArrowRight from "../arrow-right";

function ReviewsSection() {
  const reviews = Array.from({ length: 6 });

  return (
    <section className="mt-[120px] container">
      <Title className="text-center">Отзывы</Title>
      <div className="relative mt-[40px]">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          navigation={{
            nextEl: ".review-arrow-right",
            prevEl: ".review-arrow-left",
          }}
          modules={[Navigation]}
        >
          {reviews.map((_, idx) => {
            return (
              <SwiperSlide key={idx}>
                <ReviewCard />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <ArrowLeft className="review-arrow-left absolute -left-24 top-1/2 -translate-y-1/2" />
        <ArrowRight className="review-arrow-right absolute -right-24 top-1/2 -translate-y-1/2" />
      </div>
      <Action className='mt-[44px] mx-auto max-w-[300px]' type="link" href="/" size="big" color="green">
        Все отзывы
      </Action>
    </section>
  );
}

export default ReviewsSection;
