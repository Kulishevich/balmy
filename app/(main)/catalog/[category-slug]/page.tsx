import { getCategory } from "@/api/category";
import { getProductsByCategoryId } from "@/api/products";
import { notFound } from "next/navigation";
import { Direction } from "@/store/filter";
import CategoryLayout from "@/components/catalog/category-layout";
import React from "react";
import { getBrands } from "@/api/brands";

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

  const categoryId = categorySlug.split("_").findLast((elem) => elem) || "";
  const isBrands = categoryId === "brands";

  const category = await getCategory(categoryId);
  const brands = await getBrands();

  const { last_page, data: products } = await getProductsByCategoryId({
    category_id: categoryId,
    page: page,
    sort_by: responseSearchParams.sort,
    sort_direction: responseSearchParams.direction,
    brand: responseSearchParams.brand,
  });

  const brandsCategory = {
    id: "Бренды",
    slug: "brands",
    name: "Бренды",
    subcategories: brands,
  };

  if (!category && !isBrands) notFound();

  return (
    <CategoryLayout
      page={page}
      category={!isBrands ? category : brandsCategory}
      products={products}
      totalPages={last_page}
      brands={brands}
    />
  );
}

export default CatalogPage;
