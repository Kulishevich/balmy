"use client";
import { IFuseOptions } from "fuse.js";
import { useRef } from "react";
import SearchInput from "./input";
import SearchResult from "./result";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
  searchOptions: IFuseOptions<Product>;
}

function SearchWrapper({ products, searchOptions }: Props) {
  const searchInputRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <SearchInput ref={searchInputRef} />
      <SearchResult
        searchOptions={searchOptions}
        products={products}
        searchInputRef={searchInputRef}
      />
    </>
  );
}

export default SearchWrapper;
