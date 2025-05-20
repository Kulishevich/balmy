import { getCategory } from "@/api/category";
import { getProductsByCategoryId } from "@/api/products";
import { notFound } from "next/navigation";
import { Direction } from "@/store/filter";
import CategoryLayout from "@/components/catalog/category-layout";
import React from "react";

interface Props {
  params: Promise<{ "category-slug": string; page: string }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
    direction?: Direction;
    brand?: string;
  }>;
}

async function CatalogPage({ params, searchParams }: Props) {
  const { "category-slug": categorySlug, page } = await params;
  const responseSearchParams = await searchParams;
  const { category } = await getCategory(categorySlug);
  const isDiscounts = categorySlug == "discounts";
  const { products, totalPages } = await getProductsByCategoryId({
    categoryId: category?.id,
    page: page,
    sort: responseSearchParams.sort,
    direction: responseSearchParams.direction,
    brand: responseSearchParams.brand,
    discounts: isDiscounts,
  });

  if ((!isDiscounts && !category) || categorySlug == "sets") notFound();

  return (
    <CategoryLayout
      page={page}
      categorySlug={categorySlug}
      products={products}
      totalPages={totalPages}
    />
  );
}

export default CatalogPage;
