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
            1024: {
              slidesPerView: 4,
              spaceBetween: 140,
            },
          }}
          spaceBetween={32}
          slidesPerView={"auto"}
          modules={[Navigation, Autoplay]}
        >
          {brands.map((brand, idx) => {
            const { image_path, slug } = brand;

            return (
              <SwiperSlide
                className="sm:w-[200px] sm:h-[200px]  w-[120px] h-[120px]"
                key={idx}
              >
                <Link
                  href={`/catalog/brands/${slug}`}
                  className="relative w-full h-full block"
                >
                  <Image
                    className="object-contain"
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image_path}`}
                    alt={slug}
                    fill
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
