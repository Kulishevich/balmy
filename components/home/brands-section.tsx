"use client";
import Title from "../title";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import SectionAnimationWrapper from "../section-animation-wrapper";
import Link from "next/link";
import { Brand } from "@/types/brand";

function BrandsSection({ brands }: { brands: Brand[] }) {
  return (
    <SectionAnimationWrapper>
      <section className="mt-[72px] lg:mt-[120px] container">
        <Title className="text-center">Бренды</Title>
        <Swiper
          className="mt-6 lg:mt-10"
          wrapperClass="flex justify-between"
          centerInsufficientSlides
          autoplay={{ delay: 2000 }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
          }}
          modules={[Navigation, Autoplay]}
        >
          {brands.map((brand, idx) => {
            const { image_path, slug } = brand;

            return (
              <SwiperSlide className="max-w-[200px]" key={idx}>
                <Link href={`/catalog/brands/${slug}`}>
                  <Image
                    className="mx-auto object-contain h-[120px] sm:h-[200px]"
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image_path}`}
                    alt={slug}
                    width={200}
                    height={200}
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </SectionAnimationWrapper>
  );
}

export default BrandsSection;
