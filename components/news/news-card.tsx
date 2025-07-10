import React from "react";
import Image from "next/image";
import TallArrowRightIcon from "@/public/icons/tall-arrow-right.svg";
import Link from "next/link";

export const NewsCard = () => {
  return (
    <Link
      className={
        "flex flex-col rounded-[5px] overflow-hidden bg-white text-black w-[630px]"
      }
      href={`/news/${1}`}
    >
      <div className="relative w-[630px] h-[460px] rounded-[5px] overflow-hidden">
        <Image
          className="object-cover"
          src={"/images/news.png"}
          alt={"news"}
          fill
        />
        <p className="absolute top-[30px] left-9 bg-black text-white py-[2px] px-[10px] rounded-[14px]">
          11.08.2024
        </p>
      </div>
      <div className="flex flex-col px-[36px] py-[30px] items-start">
        <h5 className="font-medium text-[26px] mb-4">
          Как у звезды: форма бороды и усов, которые тебе подойдут, и советы по
          уходу за ними
        </h5>
        <p className="font-normal text-[17px] mb-8">
          Обращали ли вы когда-либо внимание на то, как выглядят знаменитые
          бородачи, например, Джордж Клуни или Дэвид Бэкхэм? Безусловно, у них
          есть стилисты и другие люди, которые работают...
        </p>
        <button className="flex items-center gap-[6px]">
          Подробнее
          <TallArrowRightIcon />
        </button>
      </div>
    </Link>
  );
};
