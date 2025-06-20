import Action from "@/components/action";
import { Brand } from "@/types/brand";
import { Category } from "@/types/category";

interface Props {
  category:
    | Category
    | { id: string; slug: string; name: string; subcategories?: Brand[] };
  subcategory?: Category | Brand;
}

async function Subcategories({ category, subcategory }: Props) {
  return (
    <div className="hidden lg:flex flex-wrap gap-x-[30px] gap-y-[15px]">
      {category?.subcategories?.map((subcategoryItem, idx) => {
        const { name, slug } = subcategoryItem;
        const isActive = slug == subcategory?.slug;
        console.log(slug, subcategory?.slug);
        return (
          <Action
            key={idx}
            type="link"
            href={`/catalog/${category.slug}/${slug}`}
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
