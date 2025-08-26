import { getCategory } from "@/api/category";
import { getProductsByCategoryId } from "@/api/products";
import { notFound } from "next/navigation";
import { Direction } from "@/store/filter";
import CategoryLayout from "@/components/catalog/category-layout";
import React from "react";
import { getBrands } from "@/api/brands";
import { getContacts } from "@/api/contacts";

interface Props {
  params: Promise<{ "category-slug": string }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
    direction?: Direction;
    brand_slug?: string;
  }>;
}

async function CatalogPage({ params, searchParams }: Props) {
  const { "category-slug": categorySlug } = await params;
  const { brand_slug, direction, page, sort } = await searchParams;

  const isBrands = categorySlug === "brands";
  const isDiscounts = categorySlug === "discounts";

  const category = await getCategory(categorySlug);
  const brands = await getBrands();

  const { social_links } = await getContacts();

  const { last_page, data: products } = await getProductsByCategoryId({
    category_slug: !isDiscounts || !isBrands ? categorySlug : "",
    page: page,
    sort_by: sort,
    sort_direction: direction,
    brand_slug: brand_slug,
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
      page={page || "1"}
      category={
        isBrands ? brandsCategory : isDiscounts ? discountsCategory : category
      }
      products={products}
      totalPages={last_page}
      brands={brands || []}
      socialLinks={social_links}
    />
  );
}

export default CatalogPage;
