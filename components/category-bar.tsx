import { Category } from "@/types/category";
import CategoryBarList from "./category-bar-list";
import { Brand } from "@/types/brand";

type Props = {
  categories: Category[];
  brands: Brand[];
};

function CategoryBar({ categories, brands }: Props) {
  return <CategoryBarList categories={categories} brands={brands} />;
}

export default CategoryBar;
