"use client";
import React, { useState } from "react";
import Image from "next/image";
import TallArrowRightIcon from "@/public/icons/tall-arrow-right.svg";
import Link from "next/link";
import HeartIcon from "@/public/icons/heart.svg";
import { likePost } from "@/api/posts";
import { INews } from "@/types/news";

export const NewsCard = ({
  content,
  title,
  photo_path,
  published_at,
  id,
  author,
  liked_by_me,
  likes_count,
  token,
}: INews & { token: string }) => {
  const [likesCount, setLikesCount] = useState(Number(likes_count));
  const [likedByMeToggle, setLikedByMeToogle] = useState(liked_by_me);

  const likedPost = async () => {
    if (likedByMeToggle) {
      setLikesCount((prev) => --prev);
    } else {
      setLikesCount((prev) => ++prev);
    }
    setLikedByMeToogle((prev) => !prev);

    try {
      await likePost(token, id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={
        "flex flex-col rounded-[5px] overflow-hidden bg-white text-black w-full"
      }
    >
      <Link
        href={`/news/${id}`}
        className="relative w-full h-[180px] sm:h-[460px] rounded-[5px] overflow-hidden"
      >
        <Image
          className="object-contain"
          src={
            !!photo_path
              ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${photo_path}`
              : "/icons/logo-gray.svg"
          }
          alt={"news"}
          fill
        />
        <div className="absolute top-0 right-0 flex flex-col gap-1 p-[14px] sm:px-5 sm:py-4 bg-white rounded-b-[5px] rounded-r-none border border-black">
          <p className="font-semibold text-[17px]">{author.name}</p>
          <p className="font-normal text-[14px] opacity-70">
            {new Date(published_at).toLocaleDateString("RU-ru")}
          </p>
        </div>
      </Link>
      <div className="flex flex-col p-4 sm:px-[36px] sm:py-[30px] items-start">
        <h5 className="font-medium text-[16px] sm:text-[26px] mb-3 sm:mb-4">
          {title}
        </h5>

        <div
          className="font-normal text-[12px] sm:text-[17px] mb-5 sm:mb-8 clampedText"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="flex justify-between items-center w-full">
          <Link
            href={`/news/${id}`}
            className="flex items-center gap-[6px] font-semibold text-[19px]"
          >
            Подробнее
            <TallArrowRightIcon />
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              className="transition-all hover:scale-110"
              onClick={likedPost}
            >
              <HeartIcon />
            </button>

            <p className="font-normal text-[15px] sm:text-[17px]">
              {likesCount} оценки
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
