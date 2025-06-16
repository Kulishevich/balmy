"use client";
import FilterIcon from "@/public/icons/filter.svg";
import { usePopupStore } from "@/store/popup";

interface Props {
  totalPages: number;
  countProducts: number;
}

function FilterHeader({ totalPages, countProducts }: Props) {
  const { createPopup } = usePopupStore();
  const foundByFilter = totalPages * countProducts;

  function handleClickOnFilterButton() {
    createPopup({ type: "filter" });
  }

  return (
    <div className="2xl:hidden mt-6 container flex justify-between items-center">
      <p className="font-normal text-[15px] text-gold">
        Найдено по фильтрам: <span className="font-bold">{foundByFilter}</span>
      </p>
      <button
        className="w-[42px] h-[42px] rounded-full border border-white grid place-items-center"
        onClick={handleClickOnFilterButton}
      >
        <FilterIcon />
      </button>
    </div>
  );
}

export default FilterHeader;
