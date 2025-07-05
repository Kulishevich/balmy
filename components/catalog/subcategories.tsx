import Action from "@/components/action";
import { Brand } from "@/types/brand";
import { Category } from "@/types/category";

interface Props {
  category:
    | Category
    | { id: string; slug: string; name: string; subcategories?: Brand[] };
  subcategory?: Category | Brand;
  subsubcategory?: Category;
}

async function Subcategories({ category, subcategory, subsubcategory }: Props) {
  const target = subsubcategory ? subcategory : category;
  const subTarget = subsubcategory ? subsubcategory : subcategory;

  const hasSubcategories =
    target &&
    typeof target === "object" &&
    "subcategories" in target &&
    Array.isArray(target.subcategories);

  if (!hasSubcategories) return null;

  return (
    <div className="hidden lg:flex flex-wrap gap-x-[30px] gap-y-[15px]">
      {target?.subcategories?.map((subcategoryItem, idx) => {
        const { name, slug } = subcategoryItem;
        const isActive = slug == subTarget?.slug;

        return (
          <Action
            key={idx}
            type="link"
            href={
              subsubcategory
                ? `/catalog/${category.slug}/${subcategory?.slug}/${slug}`
                : `/catalog/${category.slug}/${slug}`
            }
            color={isActive ? "gold" : "white"}
          >
            {name}
          </Action>
        );
      })}
    </div>
  );
}

export default Subcategories;
