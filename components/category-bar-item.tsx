import { Category } from "@/types/category";
import { AnimatePresence, m } from "motion/react";
import { appearanceAnimation } from "@/utils/animations";
import { useParams } from "next/navigation";
import Link from "next/link";
import cn from "clsx";

interface Props {
  category: Category;
  activeCategorySlug: string;
}
function CategoryBarItem({ category, activeCategorySlug }: Props) {
  const { "subcategory-slug": subcategorySlug } = useParams();
  const { id: name, slug: categorySlug, subcategories } = category;
  const isActive = categorySlug == activeCategorySlug;

  return (
    <li
      className={cn("relative text-[21px] leading-[29px] transition group", {
        "text-white": isActive,
      })}
    >
      {categorySlug == "sets" ? (
        <span className="cursor-default">{name}</span>
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
      <div className="pt-[3px] absolute top-full left-1/2 -translate-x-1/2 z-10 opacity-0 h-0 transition pointer-events-none group-hover:opacity-100 group-hover:h-auto group-hover:pointer-events-auto">
        <ul className="bg-[#252525] min-w-[180px] flex flex-col py-3 text-center rounded-[5px] border-t-[5px] border-gold">
          {subcategories.map((subcategory) => {
            const { subcategoryName, slug, id } = subcategory;
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
                <Link href={`/catalog/${categorySlug}/${slug}`}>
                  {subcategoryName}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export default CategoryBarItem;
