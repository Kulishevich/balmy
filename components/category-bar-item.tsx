import { Category } from "@/types/category";
import { AnimatePresence, m } from "motion/react";
import { appearanceAnimation } from "@/utils/animations";
import { useParams } from "next/navigation";
import Link from "next/link";
import cn from "clsx";
import { Brand } from "@/types/brand";
import ArrowRightIcon from "@/public/icons/arrow-right-bar.svg";

interface Props {
  index: number;
  category:
    | Category
    | { id: string; slug: string; name: string; subcategories: Brand[] };
  activeCategorySlug: string;
}
function CategoryBarItem({ category, activeCategorySlug, index }: Props) {
  const { "subcategory-slug": subcategorySlug } = useParams();
  const { name, slug: categorySlug, subcategories } = category;
  const isActive = categorySlug == activeCategorySlug;

  return (
    <li
      className={cn("relative text-[21px] leading-[29px] transition group", {
        "text-white": isActive,
      })}
    >
      {categorySlug == "brands" ? (
        <Link href={`/catalog/brands`}>{name}</Link>
      ) : (
        <Link href={`/catalog/${categorySlug}`}>{name}</Link>
      )}
      <AnimatePresence>
        {isActive && (
          <m.span
            {...appearanceAnimation}
            className="absolute h-[5px] w-full rounded-t-[5px] bg-gold left-1/2 -translate-x-1/2 -bottom-2"
          ></m.span>
        )}
      </AnimatePresence>

      <div className="flex pt-[3px] absolute top-full left-1/2 -translate-x-1/2 z-10 opacity-0 h-0 transition pointer-events-none group-hover:opacity-100 group-hover:h-auto group-hover:pointer-events-auto">
        <ul className="w-[195px] flex flex-col text-center rounded-[5px] border-t-[5px] border-gold">
          {subcategories?.map((subcategory) => {
            const { name, slug, id } = subcategory;
            const isActive = subcategorySlug == slug;

            return (
              <li
                className={cn(
                  "cursor-pointer py-2 px-4 hover bg-[#252525] transition border-b border-[#FFFFFF33] border-r hover:bg-[#484848] last:rounded-b-[5px] last:border-b-0 inline-block text-start min-h-[48px] group/item",
                  {
                    "text-gold": isActive,
                    "text-white": !isActive,
                  }
                )}
                key={id}
              >
                {categorySlug == "brands" ? (
                  <Link
                    href={`/catalog/brands/${slug}`}
                    className="flex items-center justify-between w-full text-[15px] font-semibold"
                  >
                    {name}{" "}
                    <ArrowRightIcon
                      className={cn(
                        "transition text-white group-hover/item:text-gold flex-shrink-0"
                      )}
                    />
                  </Link>
                ) : (
                  <Link
                    href={`/catalog/${categorySlug}/${slug}`}
                    className="flex items-center justify-between w-full text-[15px] font-semibold"
                  >
                    {name}{" "}
                    <ArrowRightIcon
                      className={cn(
                        "transition text-white group-hover/item:text-gold flex-shrink-0"
                      )}
                    />
                  </Link>
                )}
                {"subcategories" in subcategory &&
                  !!subcategory.subcategories?.length && (
                    <div
                      className={cn(
                        "bg-[#252525] p-6 w-full absolute rounded-[5px] min-w-[380px] transition top-[7px] opacity-0 h-0 group-hover/item:opacity-100 group-hover/item:min-h-[calc(100%-7px)] group-hover/item:h-auto",
                        {
                          "left-[195px]": index <= 3,
                          "right-[195px]": index > 3,
                        }
                      )}
                    >
                      <ul className="grid grid-cols-2 gap-x-[64px] gap-y-3 w-full">
                        {subcategory.subcategories.map((sub, index) => (
                          <li
                            className={cn(
                              "cursor-pointer text-[15px] text-white font-normal hover transition hover:text-gold inline-block"
                            )}
                            key={index}
                          >
                            <Link
                              href={`/catalog/${categorySlug}/${slug}/${sub.slug}`}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export default CategoryBarItem;
