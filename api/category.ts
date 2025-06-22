import { Category } from "@/types/category";
// import { config } from "@/utils/config";
// import { slugifyWithOpts } from "@/utils/helper";
// import { getBrands } from "./brands";

export async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    cache: "no-store",
  });
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as { data: Category[] };

  return data;
}

export async function getCategory(categorySlug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/slug/${categorySlug}`,
    {
      cache: "no-store",
    }
  );
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as { data: Category };

  return data;
}
