import { Category } from "@/types/category";
import { AnimatePresence, m } from "motion/react";
import { appearanceAnimation } from "@/utils/animations";
import { useParams } from "next/navigation";
import Link from "next/link";
import cn from "clsx";
import { Brand } from "@/types/brand";

interface Props {
  category:
    | Category
    | { id: string; slug: string; name: string; subcategories: Brand[] };
  activeCategorySlug: string;
}
function CategoryBarItem({ category, activeCategorySlug }: Props) {
  const { "subcategory-slug": subcategorySlug } = useParams();
  const { name, slug: categorySlug, subcategories, id: categoryId } = category;
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
        <Link href={`/catalog/${categorySlug}_${categoryId}`}>{name}</Link>
      )}
      <AnimatePresence>
        {isActive && (
          <m.span
            {...appearanceAnimation}
            className="absolute h-[5px] w-full rounded-t-[5px] bg-gold left-1/2 -translate-x-1/2 -bottom-2"
          ></m.span>
        )}
      </AnimatePresence>
      <div className="pt-[3px] absolute top-full left-1/2 -translate-x-1/2 z-10 opacity-0 h-0 transition pointer-events-none group-hover:opacity-100 group-hover:h-auto group-hover:pointer-events-auto">
        <ul className="bg-[#252525] min-w-[180px] flex flex-col py-3 text-center rounded-[5px] border-t-[5px] border-gold">
          {subcategories.map((subcategory) => {
            const { name, slug, id } = subcategory;
            const isActive = subcategorySlug == slug;

            return (
              <li
                className={cn(
                  "cursor-pointer py-2 px-4 hover transition hover:text-gold inline-block",
                  {
                    "text-gold": isActive,
                    "text-white": !isActive,
                  }
                )}
                key={id}
              >
                {categorySlug == "brands" ? (
                  <Link href={`/catalog/brands/${slug}_${id}`}>{name}</Link>
                ) : (
                  <Link
                    href={`/catalog/${categorySlug}_${categoryId}/${slug}_${id}`}
                  >
                    {name}
                  </Link>
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
