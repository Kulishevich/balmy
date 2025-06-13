"use client";
import Title from "../title";
import HairoticBlackImage from "@/public/images/hairotic-black.webp";
import ZewBlackImage from "@/public/images/zew-white.webp";
import HeyJoeBlackImage from "@/public/images/hey-joe-black.webp";
import CaptainFawcettLimitedBlackImage from "@/public/images/captain-fawcett-limited-black.webp";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import SectionAnimationWrapper from "../section-animation-wrapper";
import Link from "next/link";

const brands = [
  {
    image: HairoticBlackImage,
    alt: "hairotc brand",
    href: "/catalog/sets/hairoticmen",
  },
  { image: ZewBlackImage, alt: "zew brand", href: "/catalog/sets/zew" },
  {
    image: HeyJoeBlackImage,
    alt: "hey joe brand",
    href: "/catalog/sets/hey-joe",
  },
  {
    image: CaptainFawcettLimitedBlackImage,
    alt: "captain fawcett limited brand",
    href: "/catalog/sets/captain-fawcett",
  },
];

function BrandsSection() {
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
            const { image, alt, href } = brand;

            return (
              <SwiperSlide className="max-w-[200px]" key={idx}>
                <Link href={href}>
                  <Image
                    className="mx-auto object-contain h-[120px] sm:h-[200px]"
                    src={image}
                    alt={alt}
                    placeholder="blur"
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
