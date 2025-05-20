"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Title from "@/components/title";
import Link from "next/link";
import Image from "next/image";
import ArrowLeft from "./arrow-left";
import ArrowRight from "./arrow-right";
import { useViewedProductsStore } from "@/store/viewed-products";
import { AnimatePresence, m } from "motion/react";
import { appearanceAnimation } from "@/utils/animations";

interface Props {
  currentProductSlug?: string;
}

function RecentlyViewedProductsSection({ currentProductSlug }: Props) {
  const { viewedProducts } = useViewedProductsStore();
  const filteredViewedProducts = viewedProducts.filter(
    (viewedProduct) => viewedProduct.slug !== currentProductSlug
  );
  const showSliderButtons = filteredViewedProducts.length > 5;

  return (
    <AnimatePresence>
      {filteredViewedProducts.length && (
        <m.section
          className="mt-[72px] lg:mt-[120px] container"
          {...appearanceAnimation}
        >
          <Title className="text-center">Ранее вы смотрели </Title>
          <div className="relative mt-[40px]">
            <Swiper
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1536: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
              }}
              navigation={{
                nextEl: ".recent-arrow-right",
                prevEl: ".recent-arrow-left",
              }}
              autoplay={{ delay: 2000 }}
              modules={[Navigation, Autoplay]}
            >
              {filteredViewedProducts.map((viewedProduct) => {
                const { image, slug } = viewedProduct;

                return (
                  <SwiperSlide key={slug}>
                    <Link
                      href={`/product/${slug}`}
                      className="relative block w-full aspect-square border border-dark-gray rounded-[5px] overflow-hidden group"
                    >
                      <Image
                        className="object-contain"
                        src={image}
                        alt="продукт"
                        fill
                      />
                      <div className="transition opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/85 before:absolute before:inset-1 before:border-[2px] before:border-white before:rounded-[5px]">
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[20px] font-normal">
                          Подробнее
                        </span>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {showSliderButtons && (
              <>
                <ArrowLeft className="hidden xl:block recent-arrow-left absolute -left-24 top-1/2 -translate-y-1/2" />
                <ArrowRight className="hidden xl:block recent-arrow-right absolute -right-24 top-1/2 -translate-y-1/2" />
              </>
            )}
          </div>
        </m.section>
      )}
    </AnimatePresence>
  );
}

export default RecentlyViewedProductsSection;
