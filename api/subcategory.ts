import { getCategories } from "./category";

export async function getSubcategory(subcategorySlug: string) {
  const { categories } = await getCategories();

  const subcategories = categories
    .map((category) => category.subcategories)
    .flat();
  const subcategory = subcategories?.find(
    (subcategory) => subcategory.slug == subcategorySlug,
  );

  return {
    subcategory,
  };
}
