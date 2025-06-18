import Action from "@/components/action";
import { Category } from "@/types/category";

interface Props {
  category: Category;
  subcategory?: Category;
}

async function Subcategories({ category, subcategory }: Props) {
  return (
    <div className="hidden lg:flex flex-wrap gap-x-[30px] gap-y-[15px]">
      {category?.subcategories.map((subcategoryItem, idx) => {
        const { name, slug, id } = subcategoryItem;
        const isActive = slug == subcategory?.slug;

        return (
          <Action
            key={idx}
            type="link"
            href={`/catalog/${category.slug}_${category.id}/${slug}_${id}`}
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
