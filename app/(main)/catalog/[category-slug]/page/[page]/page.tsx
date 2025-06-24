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
    brand_slug?: string;
  }>;
}

async function CatalogPage({ params, searchParams }: Props) {
  const { "category-slug": categorySlug, page } = await params;
  const responseSearchParams = await searchParams;

  const isBrands = categorySlug === "brands";
  const isDiscounts = categorySlug === "discounts";

  const category = await getCategory(categorySlug);
  const brands = await getBrands();

  const { last_page, data: products } = await getProductsByCategoryId({
    category_slug: !isDiscounts || !isBrands ? categorySlug : "",
    page: page,
    sort_by: responseSearchParams.sort,
    sort_direction: responseSearchParams.direction,
    brand_slug: responseSearchParams.brand_slug,
    on_sale: isDiscounts && true,
  });

  const brandsCategory = {
    id: "Бренды",
    slug: "brands",
    name: "Бренды",
    subcategories: brands,
  };

  const discountsCategory = {
    id: "Скидки",
    slug: "discounts",
    name: "Скидки",
  };

  if (!category && !isBrands && !isDiscounts) notFound();

  return (
    <CategoryLayout
      page={page}
      category={
        isBrands ? brandsCategory : isDiscounts ? discountsCategory : category
      }
      products={products}
      totalPages={last_page}
      brands={brands || []}
    />
  );
}

export default CatalogPage;
