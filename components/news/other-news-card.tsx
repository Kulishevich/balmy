import { INews } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TallArrowRightIcon from "@/public/icons/tall-arrow-right.svg";

export const OtherNewsCard = ({ id, title, content, photo_path }: INews) => {
  return (
    <div className="news-item text-black">
      <Link href={`/news/${id}`} className="relative h-[180px] xl:h-[258px]">
        <Image
          src={
            !!photo_path
              ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${photo_path}`
              : "/icons/logo-gray.svg"
          }
          fill
          alt={title}
          className="object-contain rounded-[5px]"
        />
      </Link>

      <div className="flex flex-col gap-6 px-5 py-4">
        <p className="text-[16px] xl:text-[20px] font-medium">{title}</p>

        <div
          className="text-[12px] xl:text-[15px] font-normal clampedText"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <Link
          href={`/news/${id}`}
          className="flex items-center gap-[6px] font-semibold text-[19px]"
        >
          Подробнее
          <TallArrowRightIcon />
        </Link>
      </div>
    </div>
  );
};
