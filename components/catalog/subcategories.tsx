import { getCategory } from "@/api/category";
import Action from "@/components/action";

interface Props {
  categorySlug: string;
  subcategorySlug?: string;
}

async function Subcategories({ categorySlug, subcategorySlug }: Props) {
  const { category } = await getCategory(categorySlug);

  return (
    <div className="hidden lg:flex flex-wrap gap-x-[30px] gap-y-[15px]">
      {category?.subcategories.map((subcategory, idx) => {
        const { subcategoryName, slug } = subcategory;
        const isActive = slug == subcategorySlug;

        return (
          <Action
            key={idx}
            type="link"
            href={`/catalog/${categorySlug}/${slug}`}
            color={isActive ? "gold" : "white"}
          >
            {subcategoryName}
          </Action>
        );
      })}
    </div>
  );
}

export default Subcategories;
