import { useState } from "react";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Zoom } from "yet-another-react-lightbox/plugins";
import Lightbox, { ViewCallbackProps } from "yet-another-react-lightbox";
import Image from "next/image";
import ArrowLeft from "@/components/arrow-left";
import ArrowRight from "@/components/arrow-right";
import ArrowRightIcon from "@/public/icons/arrow-right.svg";
import ArrowLeftIcon from "@/public/icons/arrow-left.svg";

interface Props {
  thumbsSwiper: SwiperClass | null;
  photos: string[];
}

function PhotoSlider({ thumbsSwiper, photos }: Props) {
  const [swiperClass, setSwiperClass] = useState<SwiperClass | null>(null);
  const [realIdx, setRealIdx] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const photosMoreThanOne = photos.length > 1;
  photos = photos.length ? photos : ["/icons/logo-gray.svg"];

  function handleOnRealIndexChange(swiperClass: SwiperClass) {
    setRealIdx(swiperClass.realIndex);
  }

  function syncLightBoxWithSwiper({ index }: ViewCallbackProps) {
    swiperClass?.slideTo(index);
  }

  function handleCloseLightBox() {
    setIsOpen(false);
  }

  function handleClickOnSlide() {
    setIsOpen(true);
  }

  return (
    <div className="relative w-full border border-dark-gray rounded-[5px] overflow-hidden">
      <Swiper
        onInit={setSwiperClass}
        slidesPerView={1}
        navigation={{
          nextEl: ".photo-arrow-right",
          prevEl: ".photo-arrow-left",
        }}
        thumbs={{ swiper: thumbsSwiper }}
        onRealIndexChange={handleOnRealIndexChange}
        modules={[Navigation, Thumbs]}
      >
        <Lightbox
          index={realIdx}
          close={handleCloseLightBox}
          open={isOpen}
          slides={photos.map((photo) => ({ src: photo }))}
          plugins={[Zoom]}
          zoom={{
            maxZoomPixelRatio: 3,
            scrollToZoom: true,
            zoomInMultiplier: 2,
          }}
          carousel={{
            finite: true,
          }}
          controller={{
            closeOnBackdropClick: true,
            closeOnPullUp: true,
          }}
          on={{
            view: syncLightBoxWithSwiper,
          }}
          render={{
            iconNext: () =>
              photosMoreThanOne && <ArrowRightIcon className="fill-white" />,
            iconPrev: () =>
              photosMoreThanOne && <ArrowLeftIcon className="fill-white" />,
          }}
        />
        {photos.map((photo, idx) => {
          return (
            <SwiperSlide
              className="relative aspect-square w-full cursor-zoom-in"
              key={idx}
              onClick={handleClickOnSlide}
            >
              <Image
                className="object-contain"
                src={photo}
                alt="фото продукта"
                fill
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {photosMoreThanOne && (
        <>
          <ArrowLeft
            className="photo-arrow-left absolute left-[6px] top-1/2 -translate-y-1/2 z-10"
            variant="transparent"
            size="small"
          />
          <ArrowRight
            className="photo-arrow-right absolute right-[6px] top-1/2 -translate-y-1/2 z-10"
            variant="transparent"
            size="small"
          />
        </>
      )}
    </div>
  );
}

export default PhotoSlider;
