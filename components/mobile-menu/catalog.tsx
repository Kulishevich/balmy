import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { useMobileMenuStore } from "@/store/mobile-menu";
import { collapseAnimation } from "@/utils/animations";
import { Category } from "@/types/category";
import Link from "next/link";
import ArrowUpIcon from "@/public/icons/arrow-up.svg";
import cn from "clsx";

interface Props {
  categories: Category[];
}

function MobileMenuCatalog({ categories }: Props) {
  const { closeMobileMenu } = useMobileMenuStore();
  const [toggleCatalog, setToggleCatalog] = useState(false);
  const [activeCateogry, setActiveCateogry] = useState("");

  function handleClickOnCatalog() {
    setToggleCatalog(!toggleCatalog);
    setActiveCateogry("");
  }

  function handleClickOnCategory(name: string) {
    return () => {
      if (name == activeCateogry) {
        setActiveCateogry("");
        return;
      }

      setActiveCateogry(name);
    };
  }

  return (
    <li className="font-semibold inline-block w-full py-[10px]">
      <button
        className="flex justify-between items-center w-full text-[21px]"
        onClick={handleClickOnCatalog}
      >
        <span>Каталог</span>
        <ArrowUpIcon
          className={cn("transition", {
            "rotate-90": toggleCatalog,
          })}
        />
      </button>
      <AnimatePresence>
        {toggleCatalog && (
          <m.ul
            className="mt-[6px] flex flex-col -mb-[6px]"
            {...collapseAnimation}
          >
            {categories.map((category) => {
              const { name, slug } = category;

              return (
                <li className="inline-flex flex-col py-[6px]" key={slug}>
                  <button
                    className="font-semibold inline-flex items-center gap-[3px]"
                    onClick={handleClickOnCategory(name)}
                  >
                    {name}
                    <ArrowUpIcon
                      className={cn("transition scale-75", {
                        "rotate-90": activeCateogry == name,
                      })}
                    />
                  </button>
                  <AnimatePresence>
                    {activeCateogry == name && (
                      <m.ul
                        className="mt-[6px] flex flex-col -mb-[6px]"
                        {...collapseAnimation}
                      >
                        {category.subcategories?.map((subcategory) => {
                          const { name, slug: subcategorySlug } = subcategory;
                          return (
                            <li
                              key={subcategorySlug}
                              className="flex w-full py-[6px]"
                            >
                              <Link
                                className="text-[15px] font-semibold inline-block w-full"
                                href={`/catalog/${slug}/${subcategorySlug}`}
                                onClick={closeMobileMenu}
                              >
                                {name}
                              </Link>
                            </li>
                          );
                        })}
                      </m.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </m.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

export default MobileMenuCatalog;
