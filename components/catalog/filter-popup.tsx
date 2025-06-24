import LongArrowDownIcon from "@/public/icons/long-arrow-down.svg";
import Action from "../action";
import { sorts } from "./filter";
import { m } from "motion/react";
import { leftAppearanceAnimation } from "@/utils/animations";
import { usePopupStore } from "@/store/popup";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Direction, Sort, useFilterStore } from "@/store/filter";
import CloseIcon from "@/public/icons/close.svg";
import cn from "clsx";
import { useSwipeable } from "react-swipeable";
import { Brand } from "@/types/brand";

interface Props {
  brands: Brand[];
}

function FilterPopup({ brands }: Props) {
  const { removePopup } = usePopupStore();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathname = usePathname();
  const {
    sort,
    direction,
    brand_slug: currentBrand,
    setSort,
    setDirection,
    setBrand,
    clearFitler,
  } = useFilterStore();
  const swipeHandlers = useSwipeable({
    onSwipedRight: removePopup,
    trackTouch: true,
  });
  const currentSort = `${sort}-${direction}`;
  const categorySlug = pathname.split("/")[2];
  const page = pathname.split("/")[4];
  const showBrands = categorySlug !== "sets";

  function handleSortChange(sortDirection: string) {
    return () => {
      const [sort, direction] = sortDirection.split("-");

      setSort(sort as Sort);
      setDirection(direction as Direction);

      params.set("sort", sort);
      params.set("direction", direction);

      const newUrl = pathname.replace(`/page/${page}`, "");

      const url = `${newUrl}?${params.toString()}`;

      router.push(url);
    };
  }

  function handleBrandChange(brand: string) {
    return () => {
      if (brand == currentBrand) {
        setBrand("");
        params.delete("brand");
      } else {
        setBrand(brand);
        params.set("brand", brand);
      }

      const newUrl = pathname.replace(`/page/${page}`, "");

      const url = `${newUrl}?${params.toString()}`;

      router.push(url);
    };
  }

  function handleBrandClick(brand: string) {
    return () => {
      handleBrandChange(brand);
      removePopup();
    };
  }

  function handleSortClick() {
    removePopup();
  }

  function handleClickOnCleanFilterButton() {
    clearFitler();
    params.delete("brand");
    params.delete("sort");
    params.delete("direction");

    const newUrl = pathname.replace(`/page/${page}`, "");

    const url = `${newUrl}?${params.toString()}`;

    router.push(url);
    removePopup();
  }

  return (
    <m.div
      className="fixed z-20 sm:max-w-[425px] right-0 inset-y-0 w-full min-h-svh overflow-scroll sm:overflow-hidden bg-dark-grey py-4 sm:py-10 px-6 sm:px-8 flex flex-col"
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
      {showBrands && !!brands.length && (
        <>
          <p className="mt-6 text-[21px] font-semibold inline-flex justify-between items-center w-full">
            Бренды
            <LongArrowDownIcon />
          </p>
          <div className="mt-[10px] flex flex-col">
            {brands.map((brand) => {
              const { slug, name } = brand;

              return (
                <div
                  className="flex items-center gap-[10px] py-[6px]"
                  key={slug}
                  onClick={handleBrandClick(slug)}
                >
                  <input
                    className="custom-checkbox border-white/30"
                    id={slug}
                    type="radio"
                    checked={currentBrand == slug}
                    onChange={handleBrandChange(slug)}
                  />
                  <label className="cursor-pointer w-full" htmlFor={slug}>
                    {name}
                  </label>
                </div>
              );
            })}
          </div>
        </>
      )}
      <p
        className={cn(
          "mt-[10px] text-[21px] font-semibold inline-flex justify-between items-center w-full",
          { "mt-6": showBrands }
        )}
      >
        Сортировка
        <LongArrowDownIcon />
      </p>
      <div className="mt-4 flex flex-col">
        {sorts.map((item) => {
          const { id, direction, name } = item;
          const sortDirection = `${id}-${direction}`;

          return (
            <div
              className="flex items-center gap-[10px] py-[6px]"
              key={sortDirection}
              onClick={handleSortClick}
            >
              <input
                className="custom-checkbox border-white/30"
                id={sortDirection}
                type="radio"
                name="sort"
                checked={sortDirection == currentSort}
                onChange={handleSortChange(sortDirection)}
              />
              <label className="cursor-pointer w-full" htmlFor={sortDirection}>
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

export default FilterPopup;
