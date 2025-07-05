import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";
import { getCategory } from "@/api/category";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    "category-slug": string;
    "subcategory-slug": string;
    "subsubcategory-slug": string;
  }>;
}): Promise<Metadata> {
  const searchParams = await params;
  const categorySlug = searchParams["category-slug"];
  const subcategorySlug = searchParams["subcategory-slug"];
  const subsubcategorySlug = searchParams["subsubcategory-slug"];

  const seo = await getSeoTags(
    `/catalog/${categorySlug}/${subcategorySlug}/${subsubcategorySlug}`
  );

  const subsubcategory = await getCategory(subsubcategorySlug);

  return {
    title: seo?.title || subsubcategory?.name,
    description: seo?.description || subsubcategory?.description,
    keywords: seo?.keywords,
    alternates: {
      canonical: `${config.homeUrl}/catalog/${categorySlug}/${subcategorySlug}/${subsubcategorySlug}`,
    },
    openGraph: {
      title: seo?.og_title,
      description: seo?.og_description,
      url: config.homeUrl,
    },
  };
}

export default async function SubcategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
