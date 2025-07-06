"use client";
import React from "react";
import Action from "@/components/action";
import LongArrowDownIcon from "@/public/icons/long-arrow-down.svg";
import clsx from "clsx";
import { IOrderStatus } from "@/types/orders";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const sorts = [
  { id: "date_asc", name: "По дате" },
  { id: "price_asc", name: "По возрастанию цены" },
  { id: "price_desc", name: "По убыванию цены" },
];

export default function OrderFilterDesktop({
  statuses,
}: {
  statuses: IOrderStatus[] | null;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathname = usePathname();

  const selectedStatus = searchParams.get("status") || "";
  const selectedSort = searchParams.get("sort") || "";

  function handleSortChange(sortDirection: string) {
    params.set("sort", sortDirection);

    const url = `?${params.toString()}`;

    router.push(url);
  }

  function handleStatusChange(status: string) {
    params.set("status", status);

    const url = `?${params.toString()}`;

    router.push(url);
  }

  function handleClickOnCleanFilterButton() {
    router.push(pathname);
  }

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
          {statuses?.map((statusItem) => (
            <div className="flex items-center gap-[10px]" key={statusItem.id}>
              <input
                className="custom-checkbox border border-white/30"
                id={statusItem.code}
                type="radio"
                name="status"
                checked={selectedStatus === statusItem.code}
                onChange={() => handleStatusChange(statusItem.code)}
              />
              <label className="cursor-pointer" htmlFor={statusItem.code}>
                {statusItem.name}
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
          {sorts.map((item) => {
            const { id, name } = item;

            return (
              <div className="flex items-center gap-[10px]" key={id}>
                <input
                  className="custom-checkbox border border-white/30"
                  id={id}
                  type="radio"
                  name="sort"
                  checked={selectedSort == id}
                  onChange={() => handleSortChange(id)}
                />
                <label className="cursor-pointer" htmlFor={id}>
                  {name}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <Action
        color="black"
        type="button"
        className="mt-6 w-full"
        size="big"
        onClick={handleClickOnCleanFilterButton}
      >
        Очистить фильтр
      </Action>
    </div>
  );
}
