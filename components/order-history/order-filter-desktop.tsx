import React from "react";
import Action from "@/components/action";
import LongArrowDownIcon from "@/public/icons/long-arrow-down.svg";
import clsx from "clsx";
import { IOrderStatus } from "@/types/orders";

export default function OrderFilterDesktop({
  statuses,
}: {
  statuses: IOrderStatus[] | null;
}) {
  return (
    <div className="flex-col gap-6 hidden lg:flex w-[235px]">
      <div className="flex flex-col">
        <p
          className={clsx(
            "text-[21px] font-semibold inline-flex justify-between items-center w-full mt-[16px]"
          )}
        >
          Статус заказа
          <LongArrowDownIcon />
        </p>
        <div className="mt-4 flex flex-col gap-y-3">
          {statuses?.map((status) => (
            <div className="flex items-center gap-[10px]" key={"1"}>
              <input
                className="custom-checkbox border border-white/30"
                id={"1"}
                type="radio"
                name="sort"
                // checked={sortDirection == currentSort}
                // onChange={handleSortChange(sortDirection)}
              />
              <label className="cursor-pointer" htmlFor={"1"}>
                {status.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <p
          className={clsx(
            "text-[21px] font-semibold inline-flex justify-between items-center w-full mt-[16px]"
          )}
        >
          Сортировка
          <LongArrowDownIcon />
        </p>
        <div className="mt-4 flex flex-col gap-y-3">
          <div className="flex items-center gap-[10px]" key={"1"}>
            <input
              className="custom-checkbox border border-white/30"
              id={"1"}
              type="radio"
              name="sort"
              // checked={sortDirection == currentSort}
              // onChange={handleSortChange(sortDirection)}
            />
            <label className="cursor-pointer" htmlFor={"1"}>
              По дате
            </label>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-y-3">
          <div className="flex items-center gap-[10px]" key={"1"}>
            <input
              className="custom-checkbox border border-white/30"
              id={"1"}
              type="radio"
              name="sort"
              // checked={sortDirection == currentSort}
              // onChange={handleSortChange(sortDirection)}
            />
            <label className="cursor-pointer" htmlFor={"1"}>
              По возрастанию цены
            </label>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-y-3">
          <div className="flex items-center gap-[10px]" key={"1"}>
            <input
              className="custom-checkbox border border-white/30"
              id={"1"}
              type="radio"
              name="sort"
              // checked={sortDirection == currentSort}
              // onChange={handleSortChange(sortDirection)}
            />
            <label className="cursor-pointer" htmlFor={"1"}>
              По убыванию цены
            </label>
          </div>
        </div>
      </div>

      <Action
        color="black"
        type="button"
        className="mt-6 w-full"
        size="big"
        // onClick={handleClickOnCleanFilterButton}
      >
        Очистить фильтр
      </Action>
    </div>
  );
}
