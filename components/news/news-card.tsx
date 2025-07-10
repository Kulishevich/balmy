import React from "react";
import Image from "next/image";
import TallArrowRightIcon from "@/public/icons/tall-arrow-right.svg";
import Link from "next/link";
import HeartIcon from "@/public/icons/heart.svg";

export const NewsCard = () => {
  return (
    <Link
      className={
        "flex flex-col rounded-[5px] overflow-hidden bg-white text-black w-[630px]"
      }
      href={`#`}
    >
      <div className="relative w-[630px] h-[460px] rounded-[5px] overflow-hidden">
        <Image
          className="object-cover"
          src={"/images/news.png"}
          alt={"news"}
          fill
        />
        <div className="absolute top-0 right-0 flex gap-3 items-center p-5 bg-white rounded-b-[5px] rounded-r-none border border-black">
          <Image
            src={"/images/news-profile.png"}
            width={48}
            height={48}
            alt="profile-photo"
          />
          <div>
            <p className="font-semibold text-[17px]">Николай</p>
            <p className="font-normal text-[14px] opacity-70">11.11.2024</p>
          </div>
        </div>
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
        <div className="flex justify-between items-center w-full">
          <button className="flex items-center gap-[6px]">
            Подробнее
            <TallArrowRightIcon />
          </button>
          <p className="flex items-center gap-2 font-semibold text-[17px]">
            <HeartIcon />
            23 оценки
          </p>
        </div>
      </div>
    </Link>
  );
};
