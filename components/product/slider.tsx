"use client";
import { useState } from "react";
import PhotoSlider from "./photo-slider";
import ThumbSlider from "./thumb-slider";
import { SwiperClass } from "swiper/react";

interface Props {
  photos: string[];
}

function ProductSlider({ photos }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="flex flex-col mx-auto lg:mx-0 items-center max-w-[412px] w-full">
      <PhotoSlider thumbsSwiper={thumbsSwiper} photos={photos} />
      <ThumbSlider setThumbsSwiper={setThumbsSwiper} photos={photos} />
    </div>
  );
}
export default ProductSlider;
