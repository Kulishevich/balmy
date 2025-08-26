import { getProductsByCategoryId } from "@/api/products";
import { notFound } from "next/navigation";
import CategoryLayout from "@/components/catalog/category-layout";
import React from "react";
import { Direction } from "@/store/filter";
import { getCategory } from "@/api/category";
import { getBrands } from "@/api/brands";
import { getContacts } from "@/api/contacts";

interface Props {
  params: Promise<{
    "category-slug": string;
    "subcategory-slug": string;
    "subsubcategory-slug": string;
  }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
    direction?: Direction;
    brand_slug?: string;
  }>;
}

async function Page({ params, searchParams }: Props) {
  const {
    "category-slug": categorySlug,
    "subcategory-slug": subcategorySlug,
    "subsubcategory-slug": subsubcategorySlug,
  } = await params;
  const { brand_slug, direction, page, sort } = await searchParams;

  const category = await getCategory(categorySlug);
  const subcategory = await getCategory(subcategorySlug);
  const subsubcategory = await getCategory(subsubcategorySlug);

  const brands = await getBrands();
  const { social_links } = await getContacts();

  const { last_page, data: products } = await getProductsByCategoryId({
    category_slug: subsubcategorySlug,
    page: page,
    sort_by: sort,
    sort_direction: direction,
    brand_slug: brand_slug,
  });

  if (!subcategory || !category || !subsubcategory) notFound();

  return (
    <CategoryLayout
      page={page || "1"}
      category={category}
      subcategory={subcategory}
      subsubcategory={subsubcategory}
      products={products}
      totalPages={last_page}
      brands={brands || []}
      socialLinks={social_links}
    />
  );
}

export default Page;
