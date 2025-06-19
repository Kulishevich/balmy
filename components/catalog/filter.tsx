"use client";
import LongArrowDownIcon from "@/public/icons/long-arrow-down.svg";
import Action from "../action";
import cn from "clsx";
import { Sort, Direction, useFilterStore } from "@/store/filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Brand } from "@/types/brand";

interface Props {
  className?: string;
  page: string;
  brands: Brand[];
  showBrands: boolean;
}

export const sorts = [
  { id: "name", direction: "asc", name: "По имени" },
  { id: "salePrices", direction: "asc", name: "По возрастанию цены" },
  { id: "salePrices", direction: "desc", name: "По убыванию цены" },
];

function CatalogFilter({ className, page, brands, showBrands }: Props) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathname = usePathname();

  const {
    sort,
    direction,
    brand: currentBrand,
    setSort,
    setDirection,
    setBrand,
    clearFitler,
  } = useFilterStore();
  const currentSort = `${sort}-${direction}`;

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
        params.delete("brand_id");
      } else {
        setBrand(brand);
        params.set("brand_id", brand);
      }

      params.delete("page");

      const newUrl = pathname.replace(`/page/${page}`, "");

      const url = `${newUrl}?${params.toString()}`;

      router.push(url);
    };
  }

  function handleClickOnCleanFilterButton() {
    clearFitler();
    params.delete("brand");
    params.delete("sort");
    params.delete("direction");
    params.delete("page");

    const url = `${pathname}?${params.toString()}`;

    router.push(url);
  }

  useEffect(() => {
    const sort = (params.get("sort") || "name") as Sort;
    const direction = (params.get("direction") || "asc") as Direction;
    const brand = params.get("brand") || "";

    setSort(sort);
    setDirection(direction);
    setBrand(brand);
  }, [pathname]);

  return (
    <div className={cn("max-w-[276px] w-full flex flex-col", className)}>
      {!showBrands && (
        <>
          <p className="text-[21px] font-semibold inline-flex justify-between items-center w-full">
            Бренды
            <LongArrowDownIcon />
          </p>
          <div className="mt-4 flex flex-col gap-y-3">
            {brands.map((brand) => {
              const { id, name } = brand;

              return (
                <div className="flex items-center gap-[10px]" key={id}>
                  <input
                    className="custom-checkbox border border-white/30"
                    id={String(id)}
                    type="radio"
                    checked={currentBrand == String(id)}
                    onChange={handleBrandChange(String(id))}
                    onClick={handleBrandChange(String(id))}
                  />
                  <label className="cursor-pointer" htmlFor={String(id)}>
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
          "text-[21px] font-semibold inline-flex justify-between items-center w-full mt-6"
        )}
      >
        Сортировка
        <LongArrowDownIcon />
      </p>
      <div className="mt-4 flex flex-col gap-y-3">
        {sorts.map((item) => {
          const { id, direction, name } = item;
          const sortDirection = `${id}-${direction}`;

          return (
            <div className="flex items-center gap-[10px]" key={sortDirection}>
              <input
                className="custom-checkbox border border-white/30"
                id={sortDirection}
                type="radio"
                name="sort"
                checked={sortDirection == currentSort}
                onChange={handleSortChange(sortDirection)}
              />
              <label className="cursor-pointer" htmlFor={sortDirection}>
                {name}
              </label>
            </div>
          );
        })}
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

export default CatalogFilter;
