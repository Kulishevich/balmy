import { getProductsByCategoryId } from "@/api/products";
import { notFound } from "next/navigation";
import CategoryLayout from "@/components/catalog/category-layout";
import React from "react";
import { Direction } from "@/store/filter";
import { getCategory } from "@/api/category";
import { getBrands } from "@/api/brands";

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
    brand_id?: string;
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

  const isBrands = categoryId === "brands";

  const category = await getCategory(categoryId);
  const subcategory = await getCategory(subcategoryId);
  const brands = await getBrands();

  const { last_page, data: products } = await getProductsByCategoryId({
    category_id: !isBrands ? subcategoryId : "",
    page: page,
    sort_by: responseSearchParams.sort,
    sort_direction: responseSearchParams.direction,
    brand_id: isBrands ? subcategoryId : responseSearchParams.brand_id,
  });

  if ((!subcategory && !isBrands) || (!category && !isBrands)) notFound();

  const brandsCategory = {
    id: "Бренды",
    slug: "brands",
    name: "Бренды",
    subcategories: brands,
  };

  const activeBrand = brands.find(
    (elem) =>
      String(elem.slug) === subcategorySlug.split("_").find((elem) => elem)
  );

  return (
    <CategoryLayout
      page={page}
      category={!isBrands ? category : brandsCategory}
      subcategory={!isBrands ? subcategory : activeBrand}
      products={products}
      totalPages={last_page}
      brands={brands}
    />
  );
}

export default Page;
