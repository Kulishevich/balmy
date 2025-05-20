"use client";
import { useSearchStore } from "@/store/search";
import { useEffect, useMemo, useRef } from "react";
import { Product } from "@/types/product";
import { AnimatePresence, m } from "motion/react";
import { appearanceAnimation } from "@/utils/animations";
import { MAX_SEARCH_RESULT } from "@/utils/constants";
import cn from "clsx";
import Fuse, { IFuseOptions } from "fuse.js";
import Image from "next/image";
import Link from "next/link";

interface Props {
  products: Product[];
  searchOptions: IFuseOptions<Product>;
  searchInputRef: React.RefObject<HTMLDivElement>;
}

function SearchResult({ products, searchOptions, searchInputRef }: Props) {
  const {
    searchQuery,
    searchResult,
    setSearchResult,
    cleanSearch,
    closeSearch,
  } = useSearchStore();
  const searchResultRef = useRef<HTMLDivElement | null>(null);
  const fuse = useMemo(
    () => new Fuse(products, searchOptions),
    [products, searchOptions],
  );

  function handleClickOnResultSearch() {
    cleanSearch();
    closeSearch();
  }

  useEffect(() => {
    if (searchQuery.trim()) {
      const timeout = setTimeout(() => {
        const result = fuse.search(searchQuery).slice(0, MAX_SEARCH_RESULT);
        setSearchResult(result);
      }, 300);

      return () => clearTimeout(timeout);
    } else {
      setSearchResult([]);
    }
  }, [searchQuery, fuse, setSearchResult]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const $searchInput = searchInputRef.current;
      const $searchResult = searchResultRef.current;

      if (
        $searchInput &&
        !$searchInput.contains(e.target as Node) &&
        $searchResult &&
        !$searchResult.contains(e.target as Node)
      ) {
        cleanSearch();
      }
    }

    if (searchResult.length) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchResult, cleanSearch, searchInputRef, searchResultRef]);

  return (
    <AnimatePresence>
      {searchResult.length && (
        <m.div
          ref={searchResultRef}
          className="absolute bg-light-gray top-full inset-x-4 sm:inset-x-8 md:inset-x-12 lg:inset-x-0 flex flex-col z-10 rounded-[5px] py-3 max-h-[420px] lg:max-h-[440px] overflow-y-auto"
          {...appearanceAnimation}
        >
          {searchResult.map((result) => {
            const { item: product, refIndex } = result;
            const { name, images, discount, slug, salePrices, discountPrices } =
              product;
            const alt = name.toLowerCase();

            return (
              <Link
                key={refIndex}
                href={`/product/${slug}`}
                className="inline-flex py-[10px] lg:py-3 px-[18px] lg:px-6 gap-4 transition hover:bg-gray/20"
                onClick={handleClickOnResultSearch}
              >
                <div className="relative max-w-[80px] w-full h-[80px] bg-white rounded-[5px] overflow-hidden border border-dark-gray">
                  <Image
                    className="object-contain"
                    src={images[0] || "/icons/logo-gray.svg"}
                    alt={alt}
                    fill
                  />
                  {!!discount && (
                    <span className="absolute right-0 text-white py-[3px] px-[6px] bg-red font-semibold text-[14px] rounded-[5px]">
                      -{discount}%
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-between">
                  <h4 className="line-clamp-2">{name}</h4>

                  <span className="text-[15px] font-bold inline-flex gap-[6px]">
                    <span
                      className={cn({
                        "opacity-50 line-through": !!discount,
                      })}
                    >
                      {salePrices.toFixed(2)} byn
                    </span>
                    {!!discount && discountPrices.toFixed(2) + " byn"}
                  </span>
                </div>
              </Link>
            );
          })}
        </m.div>
      )}
    </AnimatePresence>
  );
}

export default SearchResult;
