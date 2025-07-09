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
    <div className="px-[54px] lg:px-[110px] lg:pt-[131px] flex justify-between h-full">
      <div className="text-center mt-auto py-[70px] mx-auto lg:py-0 lg:mx-0 lg:text-left lg:mt-0 max-w-[438px]">
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
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[321px] h-[276px] lg:right-[46px] lg:translate-x-0 xl:w-[534px] xl:h-[460px]">
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
