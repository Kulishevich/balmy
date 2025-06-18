import { getProductsByCategoryId } from "@/api/products";
import { notFound } from "next/navigation";
import CategoryLayout from "@/components/catalog/category-layout";
import React from "react";
import { Direction } from "@/store/filter";
import { getCategory } from "@/api/category";

interface Props {
  params: Promise<{
    "category-slug": string;
    "subcategory-slug": string;
    page: string;
  }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
    direction?: Direction;
    brand?: string;
  }>;
}

async function Page({ params, searchParams }: Props) {
  const {
    "category-slug": categorySlug,
    "subcategory-slug": subcategorySlug,
    page,
  } = await params;
  const responseSearchParams = await searchParams;

  const categoryId = categorySlug.split("_").findLast((elem) => elem) || "";
  const subcategoryId =
    subcategorySlug.split("_").findLast((elem) => elem) || "";

  const category = await getCategory(categoryId);
  const subcategory = await getCategory(subcategoryId);
  console.log(subcategory);

  const { last_page, data: products } = await getProductsByCategoryId({
    category_id: subcategoryId,
    page: page,
    sort_by: responseSearchParams.sort,
    sort_direction: responseSearchParams.direction,
    brand: responseSearchParams.brand,
  });

  if (!subcategory || !category) notFound();

  return (
    <CategoryLayout
      page={page}
      category={category}
      subcategory={subcategory}
      products={products}
      totalPages={last_page}
    />
  );
}

export default Page;
