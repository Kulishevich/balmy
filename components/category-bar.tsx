import { Category } from "@/types/category";
import CategoryBarList from "./category-bar-list";

type Props = {
  categories: Category[];
};

function CategoryBar({ categories }: Props) {
  return <CategoryBarList categories={categories} />;
}

export default CategoryBar;
