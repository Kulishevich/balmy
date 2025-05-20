import { Category } from "@/types/category";
import { config } from "@/utils/config";
import { slugifyWithOpts } from "@/utils/helper";
import { getBrands } from "./brands";

export async function getCategories() {
  const res = await fetch(`${config.apiUrl}/categories`, { cache: "no-store" });
  const clonedResponse = res.clone();
  const data: Category[] = await clonedResponse.json();

  const categories = data.map((category) => ({
    ...category,
    slug: slugifyWithOpts(category.id),
    subcategories: category.subcategories.map((subcategory) => ({
      ...subcategory,
      slug: slugifyWithOpts(subcategory.subcategoryName),
    })),
  }));

  const { brands } = await getBrands();

  const categoriesWithSets = [
    {
      id: "Бренды",
      slug: "sets",
      subcategories: brands,
    },
    ...categories,
  ];

  return {
    categories: categoriesWithSets,
  };
}

export async function getCategory(categorySlug: string) {
  const { categories } = await getCategories();

  const category = categories?.find(
    (category) => category.slug == categorySlug
  );

  return {
    category,
  };
}
