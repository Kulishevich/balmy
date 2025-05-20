"use client";
import SearchIcon from "@/public/icons/search.svg";
import { useSearchStore } from "@/store/search";
import { forwardRef } from "react";

const SearchInput = forwardRef<HTMLDivElement>((_, ref) => {
  const { setSearchQuery, searchQuery } = useSearchStore();

  function handleOnChangeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  return (
    <div className="relative" ref={ref}>
      <input
        className="py-[14px] px-4 bg-[#FCFCFC] placeholder:text-[#B1B1B1] placeholder:font-normal border border-[#B1B1B1] rounded-[5px] w-full"
        placeholder="Введите текст для поиска"
        value={searchQuery}
        onChange={handleOnChangeSearchInput}
      />
      <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
});

SearchInput.displayName = "SearchInput";

export default SearchInput;
