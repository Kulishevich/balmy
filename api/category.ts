import { Category } from "@/types/category";

export async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    next: { revalidate: 60 },
  });
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as { data: Category[] };

  return data;
}

export async function getCategory(categorySlug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/slug/${categorySlug}`,
    {
      next: { revalidate: 60 },
    }
  );
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as { data: Category };

  return data;
}
