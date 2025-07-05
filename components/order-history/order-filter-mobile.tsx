"use client";
import React from "react";
import FilterIcon from "@/public/icons/filter.svg";
import { usePopupStore } from "@/store/popup";
import { IOrderStatus } from "@/types/orders";

export default function OrderFilterMobile({
  statuses,
}: {
  statuses: IOrderStatus[] | null;
}) {
  const { createPopup } = usePopupStore();

  function handleClickOnFilterButton() {
    createPopup({ type: "orders-filter" });
  }

  return (
    <div className="lg:hidden flex justify-end mt-6">
      <button
        className="w-[42px] h-[42px] rounded-full border border-white grid place-items-center"
        onClick={handleClickOnFilterButton}
      >
        <FilterIcon />
      </button>
    </div>
  );
}
