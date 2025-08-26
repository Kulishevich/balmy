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
  }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
    direction?: Direction;
    brand_slug?: string;
  }>;
}

async function Page({ params, searchParams }: Props) {
  const { "category-slug": categorySlug, "subcategory-slug": subcategorySlug } =
    await params;
  const { brand_slug, direction, page, sort } = await searchParams;

  const isBrands = categorySlug === "brands";

  const category = await getCategory(categorySlug);
  const subcategory = await getCategory(subcategorySlug);
  const brands = await getBrands();

  const { social_links } = await getContacts();

  const { last_page, data: products } = await getProductsByCategoryId({
    category_slug: !isBrands ? subcategorySlug : "",
    page: page,
    sort_by: sort,
    sort_direction: direction,
    brand_slug: isBrands ? subcategorySlug : brand_slug,
  });

  if ((!subcategory && !isBrands) || (!category && !isBrands)) notFound();

  const brandsCategory = {
    id: "Бренды",
    slug: "brands",
    name: "Бренды",
    subcategories: brands,
  };

  const activeBrand = brands?.find(
    (elem) =>
      String(elem.slug) === subcategorySlug.split("_").find((elem) => elem)
  );

  return (
    <CategoryLayout
      page={page || "1"}
      category={!isBrands ? category : brandsCategory}
      subcategory={!isBrands ? subcategory : activeBrand}
      products={products}
      totalPages={last_page}
      brands={brands || []}
      socialLinks={social_links}
    />
  );
}

export default Page;
