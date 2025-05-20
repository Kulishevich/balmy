"use client";
import { Product } from "@/types/product";
import { IFuseOptions } from "fuse.js";
import { useRef } from "react";
import SearchInput from "./input";
import SearchResult from "./result";
import { useSearchStore } from "@/store/search";
import { AnimatePresence, m } from "motion/react";
import { topAppearanceAnimation } from "@/utils/animations";

interface Props {
  products: Product[];
  searchOptions: IFuseOptions<Product>;
}

function SearchWrapperMobile({ products, searchOptions }: Props) {
  const searchInputRef = useRef<HTMLDivElement | null>(null);
  const { show } = useSearchStore();

  return (
    <AnimatePresence>
      {show && (
        <m.div className="mt-[6px]" {...topAppearanceAnimation}>
          <SearchInput ref={searchInputRef} />
          <SearchResult
            searchOptions={searchOptions}
            products={products}
            searchInputRef={searchInputRef}
          />
        </m.div>
      )}
    </AnimatePresence>
  );
}

export default SearchWrapperMobile;
