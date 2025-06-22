import Image from "next/image";
import Action from "./action";
import Title from "./title";
import { Banner } from "@/types/banner";

interface Props {
  banner: Banner;
}

function SetCard({ banner }: Props) {
  const { title, button_link, button_text, subtitle, photo_path } = banner;
  const alt = title.toLowerCase();

  return (
    <div className="px-[54px] lg:px-[110px] py-[60px] lg:py-[57px] flex justify-between">
      <div className="mt-[185px] text-center mx-auto lg:mx-0 lg:text-left lg:mt-0 max-w-[438px]">
        <Title>{title}</Title>
        <p className="mt-4 lg:mt-0 text-[20px] lg:text-[30px] font-semibold">
          {subtitle}
        </p>
        <Action
          type="link"
          href={button_link}
          className="mt-6 max-w-[300px] w-full hidden lg:block"
          size="big"
          color="white"
        >
          {button_text}
        </Action>
      </div>
      <div className="absolute -top-[80px] lg:bottom-0 xl:-top-[83px] translate-x-1/2 lg:translate-x-0 right-1/2 lg:right-[46px] max-w-[321px] xl:max-w-[534px] z-10 w-full h-[276px] xl:h-[460px]">
        <Image
          className="objectc-contain"
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${photo_path}`}
          alt={alt}
          fill
        />
      </div>
    </div>
  );
}

export default SetCard;
