import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import cn from "clsx";

interface Props {
  setThumbsSwiper: Dispatch<SetStateAction<SwiperClass | null>>;
  photos: string[];
}

function ThumbSlider({ setThumbsSwiper, photos }: Props) {
  const slides = photos.length >= 3 ? 3 : photos.length;

  if (slides == 1) {
    return <></>;
  }

  return (
    <div
      className={cn("mt-4 w-full", {
        "max-w-[338px] sm:max-w-[366px]": slides == 3,
        "max-w-[220px] sm:max-w-[234px]": slides == 2,
      })}
    >
      <Swiper
        className="product-thumb-swiper"
        onSwiper={setThumbsSwiper}
        slidesPerView={slides}
        breakpoints={{
          320: {
            spaceBetween: 16,
          },
          640: {
            spaceBetween: 30,
          },
        }}
        modules={[Navigation, Thumbs]}
      >
        {photos.map((photo, idx) => {
          return (
            <SwiperSlide className="transition cursor-pointer" key={idx}>
              <div className="relative max-w-[100px] w-full aspect-square border border-light-gray rounded-[5px] overflow-hidden">
                <Image
                  className="object-contain"
                  src={photo}
                  alt="фото продукта"
                  fill
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default ThumbSlider;
