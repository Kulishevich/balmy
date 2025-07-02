"use client";
import TopBrands from "@/components/home/top-brands";
import { useScreenSize } from "@/hooks/use-screen-size";
import { MainBanner } from "@/types/banner";
import Image from "next/image";

function MainSection({ mainBanner }: { mainBanner: MainBanner | null }) {
  const { isMobile } = useScreenSize();

  return (
    <section className="mt-4 lg:mt-[44px] container">
      <div className="relative w-full lg:min-h-[400px] min-h-[431px] bg-[#080F08] bg-center bg-no-repeat bg-cover rounded-[5px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${
            isMobile ? mainBanner?.mobile_image : mainBanner?.desktop_image
          }`}
          fill
          alt="main screen"
          className="object-cover rounded-[5px]"
        />

        <TopBrands className="absolute top-[calc(100%-82px)] lg:-bottom-[101px] w-[calc(100%-24px)] left-1/2 -translate-x-1/2 lg:w-full" />
      </div>
    </section>
  );
}

export default MainSection;
