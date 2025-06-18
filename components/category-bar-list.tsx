"use client";
import { useCallback, useEffect, useState } from "react";
import { Category } from "@/types/category";
import { usePathname } from "next/navigation";
import { handleCategoryChangePath } from "@/utils/helper";
import CategoryBarItem from "./category-bar-item";
import clsx from "clsx";
import { Brand } from "@/types/brand";

type Props = {
  categories: Category[];
  brands: Brand[];
};

function CategoryBarList({ categories, brands }: Props) {
  const [hasShadow, setHasShadow] = useState(false);
  const pathname = usePathname();
  const [activeCategorySlug, setActiveCategorySlug] = useState("");
  const handleChangePath = useCallback(handleCategoryChangePath, [
    categories,
    pathname,
  ]);
  useEffect(() => {
    if (!pathname.includes("/catalog") && !pathname.includes("/product")) {
      setActiveCategorySlug("");
    }

    handleChangePath({
      pathname,
      categories,
      setActiveCategorySlug,
    });
  }, [pathname, categories, handleChangePath]);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={clsx(
        "hidden lg:block w-full bg-dark-grey sticky top-[153px] z-10 transition-shadow pb-2",
        hasShadow && "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
      )}
    >
      <ul className="container w-full  hidden lg:flex justify-between">
        {categories?.map((category) => {
          return (
            <CategoryBarItem
              key={category.id}
              category={category}
              activeCategorySlug={activeCategorySlug}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default CategoryBarList;
