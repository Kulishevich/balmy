import { getProductsBySubcategoryId } from "@/api/products";
import { notFound, redirect } from "next/navigation";
import CategoryLayout from "@/components/catalog/category-layout";
import React from "react";
import { getSubcategory } from "@/api/subcategory";
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
  const { category } = await getCategory(categorySlug);
  const { subcategory } = await getSubcategory(subcategorySlug);

  if (!subcategory) {
    const newSubcategorySlug = category?.subcategories.find(
      (elem) => elem.id.toLocaleLowerCase() === subcategorySlug
    )?.slug;

    if (newSubcategorySlug) {
      redirect(`/catalog/${categorySlug}/${newSubcategorySlug}`);
    } else {
      redirect("/404");
    }
  }

  const { products, totalPages } = await getProductsBySubcategoryId({
    category: categorySlug,
    subcategoryId: subcategory?.id,
    page: page,
    sort: responseSearchParams.sort,
    direction: responseSearchParams.direction,
    brand: responseSearchParams.brand,
  });
  if (!subcategory || !category) notFound();

  return (
    <CategoryLayout
      page={page}
      categorySlug={categorySlug}
      subcategorySlug={subcategorySlug}
      subcategoryName={subcategory.subcategoryName}
      products={products}
      totalPages={totalPages}
    />
  );
}

export default Page;
