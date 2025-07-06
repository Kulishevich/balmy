import LongArrowDownIcon from "@/public/icons/long-arrow-down.svg";
import Action from "../action";
import { m } from "motion/react";
import { leftAppearanceAnimation } from "@/utils/animations";
import { usePopupStore } from "@/store/popup";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import CloseIcon from "@/public/icons/close.svg";
import cn from "clsx";
import { IOrderStatus } from "@/types/orders";
import { useSwipeable } from "react-swipeable";

export const sorts = [
  { id: "date_asc", name: "По дате" },
  { id: "price_asc", name: "По возрастанию цены" },
  { id: "price_desc", name: "По убыванию цены" },
];

function OrderHistoryFilterPopup({
  statuses,
}: {
  statuses: IOrderStatus[] | null;
}) {
  const { removePopup } = usePopupStore();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathname = usePathname();

  const selectedStatus = searchParams.get("status") || "";
  const selectedSort = searchParams.get("sort") || "";

  const swipeHandlers = useSwipeable({
    onSwipedRight: removePopup,
    trackTouch: true,
  });

  function handleSortChange(sortDirection: string) {
    params.set("sort", sortDirection);

    const url = `?${params.toString()}`;

    router.push(url);
  }

  function handleSortClick() {
    removePopup();
  }

  function handleStatusChange(status: string) {
    params.set("status", status);

    const url = `?${params.toString()}`;

    router.push(url);
  }

  function handleClickOnCleanFilterButton() {
    removePopup();
    router.push(pathname);
  }

  return (
    <m.div
      className="fixed z-20 sm:max-w-[425px] right-0 inset-y-0 w-full min-h-svh overflow-y-scroll bg-dark-grey py-4 sm:py-10 px-6 sm:px-8 flex flex-col"
      {...leftAppearanceAnimation}
      {...swipeHandlers}
    >
      <div className="flex gap-6 sm:mx-auto">
        <button className="sm:hidden" onClick={removePopup}>
          <CloseIcon className="fill-black" />
        </button>
        <h3 className="text-center font-bold text-[28px] sm:text-[30px]">
          Фильтр
        </h3>
      </div>

      <p
        className={cn(
          "mt-[10px] text-[21px] font-semibold inline-flex justify-between items-center w-full"
        )}
      >
        Статус заказа
        <LongArrowDownIcon />
      </p>
      <div className="mt-4 flex flex-col">
        {statuses?.map((item) => {
          const { id, code, name } = item;

          return (
            <div
              className="flex items-center gap-[10px] py-[6px]"
              key={id}
              onClick={handleSortClick}
            >
              <input
                className="custom-checkbox border border-white/30"
                id={code}
                type="radio"
                name="sort"
                checked={code == selectedStatus}
                onChange={() => handleStatusChange(code)}
              />
              <label className="cursor-pointer w-full" htmlFor={code}>
                {name}
              </label>
            </div>
          );
        })}
      </div>

      <p
        className={cn(
          "mt-[10px] text-[21px] font-semibold inline-flex justify-between items-center w-full"
        )}
      >
        Сортировка
        <LongArrowDownIcon />
      </p>
      <div className="mt-4 flex flex-col">
        {sorts.map((item) => {
          const { id, name } = item;

          return (
            <div
              className="flex items-center gap-[10px] py-[6px]"
              key={id}
              onClick={handleSortClick}
            >
              <input
                className="custom-checkbox border border-white/30"
                id={id}
                type="radio"
                name="sort"
                checked={id == selectedSort}
                onChange={() => handleSortChange(id)}
              />
              <label className="cursor-pointer w-full" htmlFor={id}>
                {name}
              </label>
            </div>
          );
        })}
      </div>

      <div className="mt-auto">
        <Action
          type="button"
          className="mt-6 w-full"
          size="big"
          color="white"
          onClick={handleClickOnCleanFilterButton}
        >
          Очистить фильтр
        </Action>
      </div>
    </m.div>
  );
}

export default OrderHistoryFilterPopup;
