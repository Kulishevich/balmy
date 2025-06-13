"use client";

import { getPaginationPages } from "@/utils/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LongArrowRightIcon from "@/public/icons/long-arrow-right.svg";
import cn from "clsx";

interface Props {
  totalPages: string;
  currentPage?: string;
}

function Pagination({ totalPages, currentPage = "1" }: Props) {
  const [paginationPages, setPaginationPages] = useState<number[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPageNumber = +currentPage;
  const totalPagesNumber = +totalPages;

  function handlePageChange(page: number) {
    return () => {
      const params = new URLSearchParams(searchParams);
      if (pathname.includes("/page")) {
        if (page === 1) {
          const newUrl = pathname.replace(`/page/${currentPageNumber}`, "");

          router.push(`${newUrl}?${params.toString()}`);
        } else {
          const newUrl = pathname.replace(
            `/page/${currentPageNumber}`,
            `/page/${page}`
          );

          router.push(`${newUrl}?${params.toString()}`);
        }
      } else {
        if (page === 1) {
          router.push(`${pathname}?${params.toString()}`);
        } else {
          router.push(`${pathname}/page/${page}?${params.toString()}`);
        }
      }
    };
  }

  useEffect(() => {
    const pages = getPaginationPages({
      currentPage: currentPageNumber,
      totalPages: totalPagesNumber,
    });

    setPaginationPages(pages);
  }, [currentPageNumber, totalPagesNumber]);

  if (totalPagesNumber < 2) {
    return <></>;
  }

  return (
    <div className="mt-20 flex justify-center items-center gap-x-4">
      {currentPageNumber !== 1 && (
        <button
          className="flex items-center gap-1 transition hover:text-gold"
          onClick={handlePageChange(currentPageNumber - 1)}
        >
          <LongArrowRightIcon className="rotate-180" /> Назад
        </button>
      )}
      <div className="flex">
        {paginationPages.map((page) => {
          const isActive = currentPageNumber == page;

          return (
            <button
              key={page}
              className={cn("relative text-[21px] px-3")}
              onClick={handlePageChange(page)}
            >
              {page}
              <span
                className={cn(
                  "absolute -bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-t-[2px] bg-gold opacity-0 transition",
                  { "opacity-100": isActive }
                )}
              ></span>
            </button>
          );
        })}
      </div>
      {currentPageNumber !== totalPagesNumber && (
        <button
          className="flex items-center gap-1 transition hover:text-gold"
          onClick={handlePageChange(currentPageNumber + 1)}
        >
          Дальше <LongArrowRightIcon />
        </button>
      )}
    </div>
  );
}

export default Pagination;
