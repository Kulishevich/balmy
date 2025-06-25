"use client";
import Action from "@/components/action";
import FilterIcon from "@/public/icons/filter.svg";
import Breadcrumbs from "@/components/breadcrumbs";
import OrderHistoryElem from "@/components/order-history-elem";
import Title from "@/components/title";
import LongArrowDownIcon from "@/public/icons/long-arrow-down.svg";
import clsx from "clsx";
import { usePopupStore } from "@/store/popup";

function PrivacyPolicyPage() {
  const { createPopup } = usePopupStore();

  function handleClickOnFilterButton() {
    createPopup({ type: "orders-filter" });
  }

  return (
    <div className="container">
      <Title type="h1" className="mt-10 text-center">
        История заказов
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <div className="lg:hidden flex justify-end mt-6">
        <button
          className="w-[42px] h-[42px] rounded-full border border-white grid place-items-center"
          onClick={handleClickOnFilterButton}
        >
          <FilterIcon />
        </button>
      </div>
      <div className="flex gap-[95px] mt-8 lg:mt-10">
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
                  Собирается
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
                  В пути
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
                  Выполнен
                </label>
              </div>
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

        <div className="flex flex-col gap-[30px] w-full lg:w-[960px]">
          <OrderHistoryElem />
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
